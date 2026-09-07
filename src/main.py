# Wymagane paczki (requirements.txt): fastapi, uvicorn, sqlalchemy, pydantic, pydantic[email]
import math
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, Session, relationship
from datetime import datetime
from passlib.context import CryptContext
import random
import string

app = FastAPI()

# Zezwolenie na zapytania z Twojej domeny frontendowej (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # W produkcji zamień na swoją domenę np. ["https://fairwayos.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLALCHEMY_DATABASE_URL = "postgresql://postgres.trrythsihsnxkurhuasl:mhYsq6fKHiQZaruM@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"

# UWAGA DLA SUPABASE: Zmień też parametr connect_args (usuwamy check_same_thread, bo to specyfika SQLite)
engine = create_engine(SQLALCHEMY_DATABASE_URL) # Znika connect_args={"check_same_thread": False}
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class WaitlistEntry(Base):
    __tablename__ = "waitlist"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# --- Modele i Endpointy ---
class EmailRequest(BaseModel):
    email: EmailStr

@app.post("/api/waitlist")
def join_waitlist(request: EmailRequest):
    db = SessionLocal()
    db_email = db.query(WaitlistEntry).filter(WaitlistEntry.email == request.email).first()
    if db_email:
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_entry = WaitlistEntry(email=request.email)
    db.add(new_entry)
    db.commit()
    db.close()
    return {"message": "Success"}

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    room_code = Column(String, unique=True, index=True)
    mode = Column(String) # "AUTO" lub "GPS"
    status = Column(String, default="waiting") # waiting, target_lock, playing
    creator_id = Column(Integer, ForeignKey("users.id"))
    map_id = Column(Integer, ForeignKey("game_maps.id"), nullable=True)
    target_lat = Column(Float, nullable=True) # NOWE: Koordynata celu (X)
    target_lng = Column(Float, nullable=True) # NOWE: Koordynata celu (Y)
    target_z = Column(Float, nullable=True)
    hardware_ready = Column(Boolean, default=False)

class Throw(Base):
    __tablename__ = "throws"
    id = Column(Integer, primary_key=True, index=True)
    room_code = Column(String, index=True)
    player_name = Column(String)
    disc_id = Column(String)
    score = Column(Float, nullable=True) # NOWE: Odległość od celu (wynik)
    vmax = Column(Float, nullable=True)  # NOWE
    vavg = Column(Float, nullable=True)  # NOWE
    timestamp = Column(DateTime, default=datetime.utcnow)

class ThrowUpdate(BaseModel):
    score: float
    vmax: float
    vavg: float

class RoomCreate(BaseModel):
    user_id: int

class RoomUpdate(BaseModel):
    mode: str
    map_id: int = None

class DiscTelemetry(Base):
    __tablename__ = "disc_telemetry"
    id = Column(Integer, primary_key=True, index=True)
    room_code = Column(String, index=True)
    disc_id = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    z = Column(Float)
    esp_timestamp = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class GameMap(Base):
    __tablename__ = "game_maps"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    is_community = Column(Boolean, default=True)
    creator_id = Column(Integer, ForeignKey("users.id"))
    pillars = relationship("Pillar", back_populates="game_map")

class Pillar(Base):
    __tablename__ = "pillars"
    id = Column(Integer, primary_key=True, index=True)
    map_id = Column(Integer, ForeignKey("game_maps.id"))
    lat = Column(Float)
    lng = Column(Float)
    x = Column(Float, nullable=True)
    y = Column(Float, nullable=True)
    z = Column(Float, default=0.0)
    order_index = Column(Integer) # Od 1 do 4
    game_map = relationship("GameMap", back_populates="pillars")

Base.metadata.create_all(bind=engine)

class TelemetryCreate(BaseModel):
    room_code: str
    disc_id: str
    d1: float
    d2: float
    d3: float
    d4: float
    timestamp: int

class CalibrateCreate(BaseModel):
    room_code: str
    d12: float
    d13: float
    d23: float
    d14: float
    d24: float
    d34: float

class RoomStatusUpdate(BaseModel):
    status: str

class TargetUpdate(BaseModel):
    lat: float
    lng: float
    z: float

class ThrowCreate(BaseModel):
    room_code: str
    player_name: str
    disc_id: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/rooms")
def create_room(req: RoomCreate, db: Session = Depends(get_db)):
    # Generowanie unikalnego 6-znakowego kodu przy wejściu do Lobby
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    
    new_room = Room(room_code=code, mode="PENDING", creator_id=req.user_id)
    db.add(new_room)
    db.commit()
    return {"room_code": code, "mode": "PENDING"}

@app.put("/api/rooms/{room_code}")
def update_room(room_code: str, req: RoomUpdate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == room_code).first()
    if room:
        room.mode = req.mode
        if req.map_id:
            room.map_id = req.map_id # Zapisujemy ID mapy do pokoju
        db.commit()
    return {"status": "ok", "mode": req.mode}

@app.post("/api/telemetry")
def add_telemetry(req: TelemetryCreate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == req.room_code).first()
    pillars = db.query(Pillar).filter(Pillar.map_id == room.map_id).order_by(Pillar.order_index).all()
    
    # Skoro kalibracja unifikuje X, Y, Z dla obu trybów, telemetria ZAWSZE używa METRÓW
    best_x = sum(p.x for p in pillars) / 4.0
    best_y = sum(p.y for p in pillars) / 4.0
    best_z = 1.0
    
    for _ in range(200):
        grad_x, grad_y, grad_z = 0.0, 0.0, 0.0
        for i in range(4):
            px, py, pz = pillars[i].x, pillars[i].y, pillars[i].z
            d_calc = math.sqrt((best_x - px)**2 + (best_y - py)**2 + (best_z - pz)**2) + 0.000001
            error = d_calc - [req.d1, req.d2, req.d3, req.d4][i]
            
            grad_x += 2 * error * (best_x - px) / d_calc
            grad_y += 2 * error * (best_y - py) / d_calc
            grad_z += 2 * error * (best_z - pz) / d_calc
            
        best_x -= 0.05 * grad_x
        best_y -= 0.05 * grad_y
        best_z -= 0.05 * grad_z
        if best_z < 0: best_z = abs(best_z)

    # Konwersja wyliczonych metrów (X, Y) z powrotem na GPS dla Leafleta
    if room.mode == "GPS":
        base_lat, base_lng = pillars[0].lat, pillars[0].lng
        final_lat = base_lat + (best_y / 111320.0)
        final_lng = base_lng + (best_x / (111320.0 * math.cos(math.radians(base_lat))))
    else:
        final_lat, final_lng = best_x, best_y

    point = DiscTelemetry(room_code=req.room_code, disc_id=req.disc_id, lat=final_lat, lng=final_lng, z=best_z, esp_timestamp=req.timestamp)
    db.add(point)
    db.commit()
    return {"status": "ok"}

@app.get("/api/telemetry/{room_code}")
def get_telemetry(room_code: str, db: Session = Depends(get_db)):
    points = db.query(DiscTelemetry).filter(DiscTelemetry.room_code == room_code).order_by(DiscTelemetry.timestamp.asc()).all()
    
    room = db.query(Room).filter(Room.room_code == room_code).first()
    pillars_data = []
    
    if room and room.map_id:
        pillars = db.query(Pillar).filter(Pillar.map_id == room.map_id).order_by(Pillar.order_index).all()
        for p in pillars:
            # ZMIANA: Zwracamy też Z słupków
            pillars_data.append({
                "lat": p.x if room.mode == "AUTO" else p.lat, 
                "lng": p.y if room.mode == "AUTO" else p.lng,
                "z": p.z if p.z is not None else 0.0
            })
    elif room:
        if room.mode == "AUTO":
            # ZMIANA: Fallback mock z wymiarem Z
            pillars_data = [
                {"lat": 0.0, "lng": 0.0, "z": 0.0},
                {"lat": 10.0, "lng": 0.0, "z": 0.0},
                {"lat": 10.0, "lng": 10.0, "z": 0.0},
                {"lat": 0.0, "lng": 10.0, "z": 0.0}
            ]
        else: # GPS
            base_lat, base_lng = 52.2297, 21.0122
            # ZMIANA: Fallback mock z wymiarem Z
            pillars_data = [
                {"lat": base_lat, "lng": base_lng, "z": 0.0},
                {"lat": base_lat + 0.0005, "lng": base_lng, "z": 0.0},
                {"lat": base_lat + 0.0005, "lng": base_lng + 0.0005, "z": 0.0},
                {"lat": base_lat, "lng": base_lng + 0.0005, "z": 0.0}
            ]

    return {
        "mode": room.mode if room else "GPS",
        "telemetry": [{"lat": p.lat, "lng": p.lng, "z": p.z, "time": p.esp_timestamp, "disc_id": p.disc_id} for p in points],
        "pillars": pillars_data
    }

@app.get("/api/rooms/{room_code}")
def get_room_status(room_code: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == room_code).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # ZMIANA: Zwracamy też Target, aby móc wczytać grę po ponownym wejściu
    target_data = {"lat": room.target_lat, "lng": room.target_lng, "z": room.target_z} if room.target_lat is not None else None
    return {"mode": room.mode, "status": room.status, "target": target_data, "map_id": room.map_id, "hardware_ready": room.hardware_ready}

@app.put("/api/rooms/{room_code}/status")
def update_room_status(room_code: str, req: RoomStatusUpdate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == room_code).first()
    if room:
        room.status = req.status
        db.commit()
    return {"status": "ok"}

@app.post("/api/calibrate")
def calibrate_mesh(req: CalibrateCreate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == req.room_code).first()
    is_gps = room.map_id is not None
    
    # 1. PRZYGOTOWANIE ZMIENNYCH
    if not is_gps:
        new_map = GameMap(description=f"Auto Mesh {req.room_code}", is_community=False, creator_id=room.creator_id)
        db.add(new_map)
        db.commit()
        room.map_id = new_map.id
        
        # Wstępne zgadywanie z trygonometrii dla AUTO (X, Y)
        orig_pts = [
            [0.0, 0.0, 0.0],
            [req.d12, 0.0, 0.0],
            [(req.d13**2 - req.d23**2 + req.d12**2)/(2*req.d12) if req.d12 else 0, math.sqrt(abs(req.d13**2 - ((req.d13**2 - req.d23**2 + req.d12**2)/(2*req.d12) if req.d12 else 0)**2)), 0.0],
            [(req.d14**2 - req.d24**2 + req.d12**2)/(2*req.d12) if req.d12 else 0, math.sqrt(abs(req.d14**2 - ((req.d14**2 - req.d24**2 + req.d12**2)/(2*req.d12) if req.d12 else 0)**2)), 0.0]
        ]
        pillars = []
        for i, pt in enumerate(orig_pts):
            p = Pillar(map_id=new_map.id, x=pt[0], y=pt[1], z=pt[2], lat=0, lng=0, order_index=i+1)
            db.add(p)
            pillars.append(p)
        db.commit()
    else:
        pillars = db.query(Pillar).filter(Pillar.map_id == room.map_id).order_by(Pillar.order_index).all()
        # Konwersja GPS (Stopnie) na Metry (X = Longitude, Y = Latitude)
        base_lat, base_lng = pillars[0].lat, pillars[0].lng
        for p in pillars:
            p.x = (p.lng - base_lng) * 111320.0 * math.cos(math.radians(base_lat))
            p.y = (p.lat - base_lat) * 111320.0
            p.z = 0.0
    
    # 2. OPTYMALIZACJA (GRADIENT DESCENT Z KARĄ)
    pts = [[p.x, p.y, p.z] for p in pillars]
    orig_pts = [[p.x, p.y, p.z] for p in pillars]
    
    d_target = {(0,1): req.d12, (0,2): req.d13, (1,2): req.d23, (0,3): req.d14, (1,3): req.d24, (2,3): req.d34}
    
    lr = 0.01
    penalty_w = 0.1 if is_gps else 0.001 # Duża kara dla GPS za odsunięcie od pinezki, bardzo mała dla AUTO
    
    for _ in range(500):
        grads = [[0,0,0] for _ in range(4)]
        for (i, j), target in d_target.items():
            dx, dy, dz = pts[i][0] - pts[j][0], pts[i][1] - pts[j][1], pts[i][2] - pts[j][2]
            dist = math.sqrt(dx*dx + dy*dy + dz*dz) + 0.0001
            error = dist - target
            
            grads[i][0] += 2 * error * (dx / dist); grads[j][0] -= 2 * error * (dx / dist)
            grads[i][1] += 2 * error * (dy / dist); grads[j][1] -= 2 * error * (dy / dist)
            grads[i][2] += 2 * error * (dz / dist); grads[j][2] -= 2 * error * (dz / dist)
            
        for i in range(1, 4): # P1 (i=0) jest naszą kotwicą układu (0,0)
            # KARA: Przyciąganie X, Y do początkowych ustawień (GPS Anchor)
            grads[i][0] += penalty_w * 2 * (pts[i][0] - orig_pts[i][0])
            grads[i][1] += penalty_w * 2 * (pts[i][1] - orig_pts[i][1])
            
            pts[i][0] -= lr * grads[i][0]; pts[i][1] -= lr * grads[i][1]; pts[i][2] -= lr * grads[i][2]
            if pts[i][2] < 0: pts[i][2] = abs(pts[i][2]) # Wypychanie nad ziemię

    if is_gps:
        orig_base_lat = pillars[0].lat
        orig_base_lng = pillars[0].lng

    for i, p in enumerate(pillars):
        p.x, p.y, p.z = pts[i][0], pts[i][1], pts[i][2]
        if is_gps:
            # Używamy zamrożonego orig_base_lat
            p.lat = orig_base_lat + (p.y / 111320.0)
            p.lng = orig_base_lng + (p.x / (111320.0 * math.cos(math.radians(orig_base_lat))))
        else:
            p.lat, p.lng = p.x, p.y

    room.status = "target_lock"
    db.commit()
    return {"status": "ok", "map_id": room.map_id}

@app.put("/api/rooms/{room_code}/target")
def update_room_target(room_code: str, req: TargetUpdate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == room_code).first()
    if room:
        room.target_lat = req.lat
        room.target_lng = req.lng
        room.target_z = req.z
        db.commit()
    return {"status": "ok"}

@app.post("/api/throws")
def create_throw(req: ThrowCreate, db: Session = Depends(get_db)):
    db.query(DiscTelemetry).filter(DiscTelemetry.room_code == req.room_code).delete()
    new_throw = Throw(room_code=req.room_code, player_name=req.player_name, disc_id=req.disc_id)
    db.add(new_throw)
    db.commit()
    return {"status": "ok"}

@app.put("/api/throws/{room_code}/latest")
def update_latest_throw(room_code: str, req: ThrowUpdate, db: Session = Depends(get_db)):
    # Aktualizujemy ostatni (najświeższy) rzut w danym pokoju
    latest_throw = db.query(Throw).filter(Throw.room_code == room_code).order_by(Throw.id.desc()).first()
    if latest_throw:
        latest_throw.score = req.score
        latest_throw.vmax = req.vmax
        latest_throw.vavg = req.vavg
        db.commit()
    return {"status": "ok"}

@app.get("/api/rooms/{room_code}/leaderboard")
def get_leaderboard(room_code: str, db: Session = Depends(get_db)):
    # Pobieramy rzuty, które mają wynik
    throws = db.query(Throw).filter(Throw.room_code == room_code, Throw.score != None).all()
    best_throws = {}
    # Wybieramy tylko najlepszy (najmniejszy dystans) rzut każdego gracza
    for t in throws:
        if t.player_name not in best_throws or t.score < best_throws[t.player_name]['score']:
            best_throws[t.player_name] = {"player_name": t.player_name, "score": t.score, "vmax": t.vmax, "vavg": t.vavg}
    
    leaderboard = list(best_throws.values())
    leaderboard.sort(key=lambda x: x["score"]) # Najniższy wynik (najbliżej celu) wygrywa
    return leaderboard

@app.get("/api/users/{user_id}/rooms")
def get_user_rooms(user_id: int, db: Session = Depends(get_db)):
    # Pobiera historię aktywnych gier użytkownika
    rooms = db.query(Room).filter(
        Room.creator_id == user_id,
        db.query(Throw).filter(Throw.room_code == Room.room_code).exists()
    ).order_by(Room.id.desc()).all()
    res = []
    for r in rooms:
        m = db.query(GameMap).filter(GameMap.id == r.map_id).first() if r.map_id else None
        desc = m.description if m else ("Auto Mesh Arena" if r.mode == "AUTO" else "Pending Arena")
        res.append({
            "room_code": r.room_code, "mode": r.mode, "status": r.status, "map_description": desc
        })
    return res

@app.post("/api/rooms/{room_code}/ping")
def ping_hardware(room_code: str, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.room_code == room_code).first()
    if room:
        room.hardware_ready = True
        db.commit()
    return {"status": "ok"}



# --- SCHEMATY PYDANTIC ---
class AuthRequest(BaseModel):
    email: EmailStr
    password: str

class PillarCreate(BaseModel):
    lat: float
    lng: float
    z: float
    order_index: int

class MapCreate(BaseModel):
    description: str
    is_community: bool
    pillars: list[PillarCreate]
    user_id: int

class GPSVerifyRequest(BaseModel):
    pillar_lat: float
    pillar_lng: float
    user_lat: float
    user_lng: float

# --- ENDPOINTY ---
@app.post("/api/auth/register")
def register(req: AuthRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = pwd_context.hash(req.password)
    user = User(email=req.email, hashed_password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "email": user.email}

@app.post("/api/auth/login")
def login(req: AuthRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not pwd_context.verify(req.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"id": user.id, "email": user.email}

@app.post("/api/maps")
def create_map(req: MapCreate, db: Session = Depends(get_db)):
    if len(req.pillars) != 4:
        raise HTTPException(status_code=400, detail="Exactly 4 pillars required")
    
    new_map = GameMap(description=req.description, is_community=req.is_community, creator_id=req.user_id)
    db.add(new_map)
    db.commit()
    db.refresh(new_map)
    
    for p in req.pillars:
        new_pillar = Pillar(map_id=new_map.id, lat=p.lat, lng=p.lng, z=p.z, order_index=p.order_index)
        db.add(new_pillar)
    db.commit()
    return {"map_id": new_map.id}

@app.get("/api/maps")
def get_community_maps(db: Session = Depends(get_db)):
    maps = db.query(GameMap).filter(GameMap.is_community == True).all()
    res = []
    for m in maps:
        pillars = db.query(Pillar).filter(Pillar.map_id == m.id).all()
        res.append({
            "id": m.id,
            "description": m.description,
            "pillars": [{"lat": p.lat, "lng": p.lng, "order": p.order_index} for p in pillars]
        })
    return res

@app.post("/api/verify-gps")
def verify_gps(req: GPSVerifyRequest):
    # Wzór Haversine'a - dystans między dwoma koordynatami w metrach
    R = 6371000 # Promień ziemi w metrach
    phi1, phi2 = math.radians(req.pillar_lat), math.radians(req.user_lat)
    dphi = math.radians(req.user_lat - req.pillar_lat)
    dlambda = math.radians(req.user_lng - req.pillar_lng)
    
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c
    
    # Akceptujemy odchylenie do np. 15 metrów
    is_verified = distance <= 15.0
    return {"verified": is_verified, "distance_meters": round(distance, 2)}