import { motion, AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { Cpu, Globe, Trophy, Smartphone, MapPin, Zap, ChevronRight, BarChart3, Bluetooth,
Database, ShieldCheck, Activity, Target, Layers, Linkedin, ArrowUpRight, Timer, WifiOff,
TrendingUp, Clock, Users, Network, Brain, Grid, CheckCircle, Crosshair, Loader2, Gamepad2,
MapIcon, QrCode, Radio, LogIn, ArrowLeft, Lock, Plus, Check, Search, LocateFixed, Wifi, 
AlertTriangle, Info, X, Flag, UserPlus, History, Mail } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Trail, Cylinder, Box, Sphere, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Map as MapIcon2D } from 'lucide-react'; // Dodajemy nowe ikonki

const customIcon = new L.DivIcon({
  className: 'custom-icon',
  html: '<div style="width: 16px; height: 16px; background-color: #22d3ee; border-radius: 50%; box-shadow: 0 0 15px #22d3ee; border: 2px solid white;"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});
const verifiedIcon = new L.DivIcon({
  className: 'custom-icon',
  html: '<div style="width: 16px; height: 16px; background-color: #a3e635; border-radius: 50%; box-shadow: 0 0 15px #a3e635; border: 2px solid white;"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});
const discIcon = new L.DivIcon({
  className: 'custom-icon',
  html: '<div style="width: 14px; height: 14px; background-color: #f43f5e; border-radius: 50%; box-shadow: 0 0 15px #f43f5e; border: 2px solid white;"></div>',
  iconSize: [14, 14], iconAnchor: [7, 7]
});

const targetIcon = new L.DivIcon({
  className: 'custom-icon',
  html: '<div style="width: 20px; height: 20px; background-color: #eab308; border-radius: 50%; box-shadow: 0 0 20px #eab308; border: 2px solid white; display: flex; align-items: center; justify-content: center;"><span style="color: black; font-size: 12px;">X</span></div>',
  iconSize: [20, 20], iconAnchor: [10, 10]
});


// --- Mock Data ---
const telemetryData = [
  { distance: 0, height: 0 },
  { distance: 20, height: 12 },
  { distance: 50, height: 28 },
  { distance: 90, height: 40 },
  { distance: 140, height: 48 },
  { distance: 180, height: 45 },
  { distance: 220, height: 32 },
  { distance: 250, height: 15 },
  { distance: 270, height: 4 },
  { distance: 280, height: 0 },
];

const LoopingVideo = ({ src, className }: { src: string; className?: string }) => {
  return (
    <video
      src={src}
      className={className}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// --- Components ---

const HUDOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    <div className="absolute top-32 left-4 md:left-10 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-golf-accent/30 rounded-tl-3xl" />
    <div className="absolute top-32 right-4 md:right-10 w-12 h-12 md:w-20 md:h-20 border-t-2 border-r-2 border-golf-accent/30 rounded-tr-3xl" />
    <div className="absolute bottom-10 left-4 md:left-10 w-12 h-12 md:w-20 md:h-20 border-b-2 border-l-2 border-golf-accent/30 rounded-bl-3xl" />
    <div className="absolute bottom-10 right-4 md:right-10 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-golf-accent/30 rounded-br-3xl" />
  </div>
);

const YouTubeVideoSection = ({ 
  title, 
  subtitle, 
  videoId,
  className = "bg-black/20"
}: { 
  title?: React.ReactNode, 
  subtitle?: string, 
  videoId: string,
  className?: string
}) => (
  <section className={`py-12 md:py-16 px-4 md:px-6 relative overflow-hidden border-t border-white/5 flex flex-col justify-center items-center w-full ${className}`}>
    <div className="absolute top-0 right-0 w-1/2 h-full bg-golf-accent/5 blur-[150px] -z-10" />
    
    <div className="max-w-5xl mx-auto w-full text-center z-10 flex flex-col items-center justify-center">
      {subtitle && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
          <Play size={12} /> {subtitle}
        </div>
      )}
      {title && <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-8 italic">{title}</h2>}
      
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl glass p-2 md:p-3">
        <div className="w-full h-full rounded-xl overflow-hidden relative bg-black/50">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?si=placeholder`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);
const Navbar = ({ onNavClick, showLinks, viewMode, onViewModeChange, onPlayClick, isGameView }: { 
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void, 
  showLinks: boolean,
  viewMode: 'player' | 'investor',
  onViewModeChange: (mode: 'player' | 'investor') => void,
  onPlayClick: () => void,
  isGameView: boolean
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col px-4 sm:px-6 py-3.5 sm:py-4 backdrop-blur-lg border-b border-white/5 bg-black/20 gap-3 sm:gap-4 transition-all">
    <div className="flex flex-wrap justify-between items-center max-w-7xl mx-auto w-full relative gap-y-3 sm:gap-y-4">
      
      {/* Sekcja LOGO + JOIN THE GAME (Lewa strona na desktopie) */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-6 z-10">
        <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer" onClick={(e) => onNavClick(e as any, 'hero')}>
          <div className="relative">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-golf-accent rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.5)]">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-golf-dark rounded-full shadow-inner" />
            </div>
            <div className="absolute inset-0 bg-golf-accent blur-md opacity-30 -z-10" />
          </div>
          <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-tighter text-white">Fairway<span className="text-golf-accent">OS</span></span>
        </div>
        
        {/* Disc Range na desktopie obok logo */}
        {!isGameView && (
          <a 
            href="/disc-range"
            onClick={(e) => {
              e.preventDefault();
              onPlayClick();
            }}
            className="hidden md:flex items-center gap-2 text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0"
          >
            <Gamepad2 size={14} className="shrink-0" /> 
            <span>Disc Range</span>
          </a>
        )}
      </div>
      
      {/* Prawa strona: Disc na mobile + Contact */}
      <div className="flex items-center gap-2 sm:gap-3 z-10 shrink-0">
        {!isGameView && (
          <a 
            href="/disc-range"
            onClick={(e) => {
              e.preventDefault();
              onPlayClick();
            }}
            className="md:hidden flex items-center gap-1.5 text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0"
          >
            <Gamepad2 size={13} className="shrink-0" /> 
            <span>Disc</span>
          </a>
        )}
        <a 
          href="#leadership" 
          onClick={(e) => {
            if(!isGameView) onNavClick(e, 'leadership');
          }}
          className="bg-white text-golf-dark px-3.5 sm:px-4 py-1.5 md:px-5 md:py-2 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-golf-accent transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10 text-center"
        >
          Contact
        </a>
      </div>

      {/* Sekcja przełącznika Player / Investor (Idealnie wyśrodkowana absolutnie na desktopie, na mobile spada pod spód) */}
      {!isGameView && (
        <div className="flex w-full md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 items-center bg-white/5 rounded-full p-1 border border-white/10 order-last md:order-none z-0">
          <button 
            onClick={() => onViewModeChange('player')}
            className={`flex-1 md:flex-none px-4 py-2 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'player' ? 'bg-golf-accent text-golf-dark shadow-[0_0_15px_rgba(163,230,53,0.3)]' : 'text-white/50 hover:text-white'}`}
          >
            I'm a Player
          </button>
          <button 
            onClick={() => onViewModeChange('investor')}
            className={`flex-1 md:flex-none px-4 py-2 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'investor' ? 'bg-golf-accent text-golf-dark shadow-[0_0_15px_rgba(163,230,53,0.3)]' : 'text-white/50 hover:text-white'}`}
          >
            I'm an Investor
          </button>
        </div>
      )}
    </div>

    {showLinks && viewMode === 'investor' && !isGameView && (
      <div className="hidden md:flex justify-center gap-8 text-[11px] font-medium text-white/70 uppercase tracking-widest pb-1 max-w-7xl mx-auto w-full">
        <a href="#vision" onClick={(e) => onNavClick(e, 'vision')} className="hover:text-white transition-colors">Vision</a>
        <a href="#tech" onClick={(e) => onNavClick(e, 'tech')} className="hover:text-white transition-colors">Deep Tech</a>
        <a href="#facility-owners" onClick={(e) => onNavClick(e, 'facility-owners')} className="hover:text-white transition-colors">B2B</a>
        <a href="#leagues" onClick={(e) => onNavClick(e, 'leagues')} className="hover:text-white transition-colors">B2C E-Sport</a>
        <a href="#business" onClick={(e) => onNavClick(e, 'business')} className="hover:text-white transition-colors">Business Model</a>
      </div>
    )}
  </nav>
);

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden pt-16">
      <div className="absolute inset-0 z-0 flex items-center justify-center text-center">
        <img 
          src="/background.png"
          alt="FairwayOS Background" 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-golf-dark/80 via-golf-dark/40 to-golf-dark/90" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <HUDOverlay />
      <div className="scanline" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-20 max-w-4xl"
      >
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="flex items-center gap-4 md:gap-5 group">
            <div className="relative">
              <div className="w-14 h-14 md:w-18 md:h-18 bg-golf-accent rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(163,230,53,0.4)] group-hover:scale-105 transition-transform duration-500">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-golf-dark rounded-full shadow-inner" />
              </div>
              <div className="absolute inset-0 bg-golf-accent blur-2xl opacity-30 -z-10" />
            </div>
            <span className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter uppercase italic drop-shadow-[0_0_25px_rgba(163,230,53,0.25)] select-none">
              FAIRWAY<span className="text-golf-accent">OS</span>
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
          <Zap size={12} /> Deep Tech from Poland | Scaling to USA
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-3 md:mb-4 leading-none selection:bg-white selection:text-black">
          <span className="sr-only">FairwayOS: Smart Golf Balls and Autonomous UWB Telemetry. </span>
          Smarter Courses <br />
          <span className="text-gradient drop-shadow-[0_0_40px_rgba(163,230,53,0.4)]">Faster Rounds</span>
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-white/80 font-light mb-4 md:mb-6 max-w-xs sm:max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Autonomous Telemetry & Global E-sports Platform. <br className="hidden md:block" />
          Transforming physical play into a high-precision digital experience.
        </p>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 md:gap-3 mt-4 md:mt-8 z-20"
        >
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Scroll to Explore</span>
          <div className="w-[2px] h-8 md:h-12 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div 
              animate={{ y: ["0%", "200%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/3 bg-golf-accent rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #a3e635 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
}

const FeatureCard = ({ icon: Icon, title, desc, delay = 0, onAction, actionText }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass p-8 rounded-3xl group hover:border-golf-accent/30 transition-all hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-golf-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-golf-accent/10 transition-colors" />
    <div className="w-12 h-12 rounded-2xl bg-golf-accent/10 flex items-center justify-center text-golf-accent mb-6 group-hover:bg-golf-accent group-hover:text-golf-dark transition-all duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/50 leading-relaxed text-sm flex-grow mb-6">{desc}</p>
    {onAction && (
      <button 
        onClick={onAction} 
        className="inline-flex items-center gap-2 text-golf-accent text-[10px] font-bold uppercase tracking-widest hover:gap-3 transition-all w-fit"
      >
        {actionText} <ChevronRight size={14} />
      </button>
    )}
  </motion.div>
);

const OwnerBenefitsSection = () => (
  <section id="facility-owners" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-golf-dark border-t border-white/5 flex flex-col justify-center">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-10 md:mb-14">
        <h3 className="text-xl font-bold mb-4 uppercase tracking-[0.3em] text-golf-accent font-display">Strategic Partnership</h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">Maximize ROI. <br /><span className="text-white/40">Elevate Prestige.</span></h2>
        <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto font-light">
          FairwayOS transforms traditional golf courses into high-utilization tech hubs, maximizing throughput while offering unprecedented player analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          {
            icon: <MapPin className="text-golf-accent" size={24} />,
            title: "Heatmap Analytics",
            desc: "Monitor live player flow across the 100-hectare facility. Identify choke points with absolute precision.",
            metric: "+15% YoY Revenue"
          },
          {
            icon: <Clock className="text-golf-accent" size={24} />,
            title: "Optimized Velocity",
            desc: "Increase daily slots by ~10% with faster ball search and transit on the course. Perfect app for marshalls.",
            metric: "60min Faster Rounds"
          },
          {
            icon: <Zap className="text-golf-accent" size={24} />,
            title: "Tech Magnet",
            desc: "Attract a new generation of players with high-tech analytics and global connectivity.",
            metric: "98% User Satisfaction"
          },
          {
            icon: <Users className="text-golf-accent" size={24} />,
            title: "Active Community",
            desc: "Host global leagues, virtual tournaments, and persistent local leaderboards.",
            metric: "Up to 3x Player Retention"
          }
        ].map((benefit, i) => (
          <div key={i} className="glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-golf-accent/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-golf-accent/10 transition-colors">
              {benefit.icon}
            </div>
            <h4 className="text-xl font-bold mb-4">{benefit.title}</h4>
            <p className="text-sm text-white/40 leading-relaxed mb-8">{benefit.desc}</p>
            <div className="pt-6 border-t border-white/5">
              <span className="text-xs font-bold uppercase tracking-widest text-golf-accent">{benefit.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TechShowcase = ({ onLearnMore }: { onLearnMore: () => void }) => (
  <section id="tech" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-black/20 border-t border-white/5 flex flex-col justify-center">
    <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      style={{ backgroundImage: 'radial-gradient(circle, #a3e635 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
    />
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Digital Heart. <br />
            <span className="text-golf-accent text-gradient">Classic Form.</span>
          </h2>
          <p className="text-base md:text-lg text-white/50 mb-8 font-light leading-relaxed font-display">
            Our Smart Ball technology preserves the weight, flight, and feel of tour-grade balls while embedding high-precision sensors.
          </p>
          
          <div className="glass-dark p-6 rounded-3xl mb-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-golf-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Ball Flight Trajectory</span>
              </div>
              <div className="text-[10px] font-mono text-golf-accent">280 YDS // PIN_LOCKED</div>
            </div>
            <div className="h-40 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryData}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="height" stroke="#a3e635" fillOpacity={1} fill="url(#colorAcc)" animationDuration={2000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[8px] text-white/30 uppercase tracking-widest">
                  <ArrowUpRight size={10} className="text-golf-accent" /> Ball Speed
                </div>
                <div className="text-lg font-mono font-bold tracking-tighter">165 <span className="text-[10px] text-white/30">MPH</span></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[8px] text-white/30 uppercase tracking-widest">
                  <Layers size={10} className="text-golf-accent" /> Apex
                </div>
                <div className="text-lg font-mono font-bold tracking-tighter">48 <span className="text-[10px] text-white/30">YDS</span></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[8px] text-white/30 uppercase tracking-widest">
                  <Zap size={10} className="text-golf-accent" /> Total
                </div>
                <div className="text-lg font-mono font-bold tracking-tighter">280 <span className="text-[10px] text-white/30">YDS</span></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[8px] text-white/30 uppercase tracking-widest">
                  <Timer size={10} className="text-golf-accent" /> Hang Time
                </div>
                <div className="text-lg font-mono font-bold tracking-tighter">6.4 <span className="text-[10px] text-white/30">SEC</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Precision", value: "5-15cm", icon: Target },
              { label: "Shock Resist", value: "3000G", icon: ShieldCheck },
              { label: "Update Rate", value: "100Hz", icon: Activity }
            ].map((item, i) => (
              <div key={i} className="glass p-4 rounded-2xl border border-white/5">
                <item.icon size={16} className="text-golf-accent mb-2" />
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <motion.div 
            className="aspect-square relative"
          >
            <div className="absolute inset-0 bg-golf-accent/20 blur-[120px] rounded-full scale-75" />
            
            <div className="relative h-full w-full glass rounded-full flex items-center justify-center overflow-hidden border border-white/20 p-8">
              <div className="w-full h-full bg-golf-dark rounded-full shadow-[0_0_100px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/telefon.jpg" 
                  alt="FairwayOS: mobile app showing real-time 3D golf ball flight trajectory" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-8 border-dashed border-golf-accent/30 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <div className="absolute -top-10 -right-10 w-40 h-40 glass rounded-3xl p-4 border border-white/10 rotate-12 hidden md:block">
            <div className="text-[8px] text-white/40 font-bold mb-2">STRUCTURAL INTEGRITY</div>
            <div className="flex gap-1 h-2 items-end">
              {[10, 30, 20, 60, 40, 90, 70, 50, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-golf-accent/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 flex justify-center">
        <button 
          id="learn-more-trigger"
          onClick={onLearnMore}
          className="inline-flex items-center gap-4 bg-white/5 hover:bg-golf-accent hover:text-golf-dark text-white px-10 py-4 md:py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all border border-white/10 hover:border-golf-accent hover:scale-105 active:scale-95 group shadow-2xl"
        >
          Learn more
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-golf-dark/10 flex items-center justify-center transition-colors">
            <ChevronRight size={16} />
          </div>
        </button>
      </div>
    </div>
  </section>
);

const AITechSection = () => (
  <section id="ai-tech" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-black/50 border-t border-white/5 flex flex-col justify-center">
    <div className="absolute top-0 left-0 w-1/2 h-full bg-golf-accent/5 blur-[150px] -z-10" />
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
          Proprietary Algorithms
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 italic">The Brain: <span className="text-white/40">AI & RL</span></h2>
        <p className="text-white/50 max-w-2xl mx-auto font-light text-base md:text-lg">
          Deep tech isn't just hardware. Our proprietary Reinforcement Learning (RL) models are the core of our business viability and competitive integrity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* RL for CAPEX */}
        <div className="glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(163,230,53,0.05),transparent_50%)]" />
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-golf-accent mb-6 md:mb-8">
            <Network size={26} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">RL for CAPEX Optimization</h3>
          <h4 className="text-xs font-mono text-golf-accent mb-4 md:mb-6 uppercase tracking-widest">Business Viability Engine</h4>
          <p className="text-white/50 leading-relaxed font-light mb-6 text-sm md:text-base">
            Deploying a dense sensor network on a 100-hectare golf course is expensive. We trained an RL algorithm to simulate millions of RF wave propagation scenarios across difficult terrain (trees, hills).
          </p>
          <div className="p-4 rounded-2xl bg-golf-accent/5 border border-golf-accent/20">
            <p className="text-sm text-white/80 font-medium">
              Result: We reduced the required number of physical hardware anchors by <span className="text-golf-accent font-bold">~40%</span> compared to standard geometric grids, making our B2B SaaS model highly profitable.
            </p>
          </div>
        </div>

        {/* AI Normalization */}
        <div className="glass-dark p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-6 md:mb-8">
            <Brain size={26} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">"Stockfish for Golf"</h3>
          <h4 className="text-xs font-mono text-white/40 mb-4 md:mb-6 uppercase tracking-widest">AI Normalization Engine</h4>
          <p className="text-white/50 leading-relaxed font-light mb-6 text-sm md:text-base">
            Current handicap systems are static and flawed. Our RL Agent acts like a chess engine, evaluating the <i>quality</i> of a decision rather than just the raw outcome.
          </p>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/80 font-medium">
              It simulates optimal play considering real-time 3D topography, wind, and moisture. A player fighting a storm in Poland can now be fairly ranked against a player in sunny Spain.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


const BusinessSection = () => (
<section id="business" className="py-16 md:py-20 px-4 md:px-6 overflow-hidden bg-golf-dark relative flex flex-col justify-center">
    <div className="max-w-7xl mx-auto glass p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden border border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-golf-accent/5 blur-[120px] -z-10" />
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <div className="text-golf-accent font-mono text-sm tracking-[0.4em] mb-4 uppercase">Business Model & Scalability</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 italic">B2B2C <span className="text-white">Revenue Synergy.</span></h2>
          <p className="text-white/50 mb-8 md:mb-10 font-light text-base md:text-lg leading-relaxed">
            A diversified, highly recurring revenue model. We empower courses with infrastructure, monetizing both the facility (SaaS) and the global player base (Marketplace).
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-5 group">
              <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-golf-accent group-hover:bg-golf-accent group-hover:text-golf-dark transition-all">
                <Database size={20} />
              </div>
              <div>
                <div className="font-bold text-xl mb-1">B2B SaaS: Infrastructure</div>
                <p className="text-sm text-white/40 leading-relaxed"><span className="text-golf-accent font-bold">~$2,500/month per course.</span> Predictable subscription for the Mesh Network, Dashboard, and AI Analytics. Hardware setup fees cover initial CAPEX.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 group">
              <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-golf-accent group-hover:bg-golf-accent group-hover:text-golf-dark transition-all">
                <Activity size={20} />
              </div>
              <div>
                <div className="font-bold text-xl mb-1">Unit Economics: Circular Economy</div>
                <p className="text-sm text-white/40 leading-relaxed">"Forever Core" ball costs ~$7.00 to produce. Generates ~$10 revenue per round. With a conservative 30% survival rate per round, <span className="text-white font-bold">ROI on hardware setup is reached in just 9 months.</span></p>
              </div>
            </div>
            <div className="flex items-start gap-5 group">
              <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-golf-accent group-hover:bg-golf-accent group-hover:text-golf-dark transition-all">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="font-bold text-xl mb-1">B2C Marketplace</div>
                <p className="text-sm text-white/40 leading-relaxed">10-15% commission (Rake) on global tournament entry fees and token rewards, tapping into the Creator Economy and NIL sponsorships.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-dark p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-golf-accent/5 blur-3xl" />
           <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 italic">Financial Projections (Y5)</h3>
           <div className="space-y-6 md:space-y-8">
              <div>
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-3 text-white/40">
                    <span>SOM Target (USA Premium)</span>
                    <span className="text-golf-accent">350 Courses</span>
                 </div>
                 <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: '7%' }}
                       viewport={{ once: true }}
                       transition={{ duration: 1.5, delay: 0.5 }}
                       className="h-full bg-golf-accent rounded-full shadow-[0_0_15px_rgba(163,230,53,0.5)]" 
                    />
                 </div>
                 <p className="text-[10px] text-white/30 mt-2 uppercase tracking-widest">Just 7% of the US Premium Market (SAM)</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                 <div className="p-6 glass rounded-2xl border border-white/5">
                    <div className="text-3xl font-black text-white mb-1">$13M</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ARR Forecast (Y5)</div>
                 </div>
                 <div className="p-6 glass rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-golf-accent/10" />
                    <div className="text-3xl font-black text-golf-accent mb-1 relative">$130M</div>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest relative">Company Val. (Y5)</div>
                 </div>
              </div>
              <p className="text-xs text-white/30 italic text-center font-light leading-relaxed">
                 "Highly profitable unit economics even under pessimistic assumptions."
              </p>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const LeaguesSection = () => (
  <section id="leagues" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-black/30 border-t border-white/5 flex flex-col justify-center">
    <HUDOverlay />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-golf-accent/5 blur-[150px] -z-10" />
    <div className="max-w-7xl mx-auto text-center mb-10 md:mb-14 relative z-10">
       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-neon/30 bg-golf-neon/5 text-golf-neon text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
         Global Networking
       </div>
       <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 italic">E-sports On <span className="text-golf-accent">Real Grass</span></h2>
       <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
         The distinction between physical and digital is gone. Play anytime, compete globally. 
         FairwayOS Leagues normalize course conditions for true competitive integrity.
       </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
      <div className="glass p-6 md:p-8 rounded-[2rem] border-t-2 border-t-white/10 group hover:bg-white/5 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-golf-accent/10 flex items-center justify-center text-golf-accent mb-8">
          <Layers size={24} />
        </div>
        <h4 className="font-mono text-golf-accent mb-4 text-xs tracking-widest">PHASE 01</h4>
        <h3 className="text-2xl font-bold mb-4">Async Leagues</h3>
        <p className="text-white/40 text-sm mb-10 leading-relaxed font-light">Play on your schedule. Global divisions with skill-based matchmaking from Bronze to Diamond.</p>
        <ul className="text-sm space-y-5 text-white/70">
          <li className="flex items-center gap-3"><MapPin size={16} className="text-golf-accent" /> Environmental Normalization</li>
          <li className="flex items-center gap-3"><Trophy size={16} className="text-golf-accent" /> Equipment Token Rewards</li>
        </ul>
      </div>

      <div className="glass-dark p-12 rounded-[2.5rem] border-2 border-golf-accent ring-[16px] ring-golf-accent/5 md:scale-110 z-10 shadow-2xl shadow-golf-accent/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
        <div className="w-12 h-12 rounded-2xl bg-golf-accent flex items-center justify-center text-golf-dark mb-8 shadow-lg shadow-golf-accent/40">
          <Zap size={24} />
        </div>
        <h4 className="font-mono text-golf-accent mb-4 text-xs tracking-widest italic">LIVE COMBAT</h4>
        <h3 className="text-2xl font-bold mb-4">High Stakes Duels</h3>
        <p className="text-white/70 text-sm mb-10 leading-relaxed">The ultimate test. Synchronized 1v1 matches across continents. Video verified Anti-Cheat system.</p>
      </div>

      <div className="glass p-12 rounded-[2.5rem] border-t-2 border-t-white/10 group hover:bg-white/5 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-golf-neon/10 flex items-center justify-center text-golf-neon mb-8">
          <Database size={24} />
        </div>
        <h4 className="font-mono text-golf-neon mb-4 text-xs tracking-widest">ECOSYSTEM</h4>
        <h3 className="text-2xl font-bold mb-4">Smart Hive</h3>
        <p className="text-white/40 text-sm mb-10 leading-relaxed">Integrated hardware rental lockers. Pick up your smart balls with a single QR scan.</p>
        <ul className="text-sm space-y-5 text-white/70">
          <li className="flex items-center gap-3"><Smartphone size={16} className="text-golf-neon" /> Instant Cloud Sync</li>
          <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-golf-neon" /> Battery Health Monitoring</li>
        </ul>
      </div>
    </div>
  </section>
);


const InfrastructureView = ({ onBack }: { onBack: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen"
    >
      {/* Main Core Section */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 px-6 overflow-hidden flex flex-col justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 flex items-center justify-center text-center">
          <img 
            src="/background2.png"
            alt="Ecosystem Background" 
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-golf-dark/90 via-golf-dark/50 to-golf-dark/95" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <HUDOverlay />
        <div className="scanline" />

        <div className="max-w-7xl mx-auto relative z-10 pl-4 pr-4 pt-6 md:pl-16 md:pt-4">
          <button onClick={onBack} className="flex items-center gap-2 text-golf-accent font-bold uppercase text-xs tracking-widest mb-8 md:mb-10 hover:translate-x-[-4px] transition-transform">
            <ChevronRight size={16} className="rotate-180" /> Back to Overview
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="text-xl font-mono text-golf-accent mb-4 tracking-widest uppercase">Ecosystem Core</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Marker Posts & <br /><span className="text-gradient">UWB Mesh</span></h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed font-light mb-8">
                Our solar-powered marker posts create an autonomous tracking layer across the entire golf course. Using Ultra-Wideband (UWB) mesh technology, we achieve centimeter-level accuracy without requiring active staff management.
              </p>
              <div className="grid gap-4 md:gap-6">
                <div className="glass p-5 md:p-6 rounded-2xl flex items-center gap-5 md:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-golf-accent/10 flex items-center justify-center text-golf-accent shrink-0">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">-40% CAPEX Reduction</h4>
                    <p className="text-xs text-white/40">Our Reinforcement learning algorithms optimize anchor placement, drastically reducing hardware costs compared to standard geometric grids.</p>
                  </div>
                </div>
                <div className="glass p-5 md:p-6 rounded-2xl flex items-center gap-5 md:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-golf-accent/10 flex items-center justify-center text-golf-accent">
                    <Database size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">Ground Truth Data</h4>
                    <p className="text-xs text-white/40">Real-time digitalization of every physical play.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] glass rounded-[3rem] md:rounded-[4rem] flex items-center justify-center border border-white/10 overflow-hidden shadow-2xl bg-black/40 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="/budowa.png" 
                alt="Hardware Infrastructure" 
                className="w-full h-full object-contain p-4 pb-24 group-hover:scale-105 transition-transform duration-700 -translate-y-4"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 bg-gradient-to-t from-golf-dark via-golf-dark/80 to-transparent pointer-events-none">
                 <div className="text-2xl md:text-3xl font-mono text-golf-accent font-bold mb-1 tracking-tighter">SOLAR_MESH:01</div>
                 <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Autonomous Tracking Marker Post</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Ball Section */}
      <section className="py-16 md:py-20 px-6 border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-golf-accent/5 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative aspect-square lg:h-[520px] w-full glass rounded-[3rem] md:rounded-[4rem] border border-white/10 overflow-hidden group bg-black/20 flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.1),transparent_70%)] animate-pulse" />
               <img 
                 src="/ball.png" 
                 alt="Smart Ball Technology" 
                 className="w-full h-full object-contain p-10 md:p-12 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_35px_rgba(163,230,53,0.2)]"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 border-[20px] border-white/[0.02] rounded-[3rem] md:rounded-[4rem] pointer-events-none" />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="text-xl font-mono text-golf-accent mb-4 tracking-widest uppercase">The Hardware</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">Smart <span className="text-golf-accent">Ball.</span></h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed font-light mb-8">
                A professional golf ball re-engineered for the digital age. By transmitting UWB signals at 100 Hz to the marker posts, it enables precise real-time 3D trajectory tracking across the entire course.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                 {['Tour-Grade Polyurethane', '3-Piece Core', 'Micro-Telemetry Unit'].map((tag, i) => (
                    <div key={i} className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest bg-white/5">{tag}</div>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 md:p-6 glass rounded-2xl border border-white/5">
                   <div className="text-2xl md:text-3xl font-black text-white mb-1">3000G</div>
                   <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Impact Resistance</div>
                </div>
                <div className="p-5 md:p-6 glass rounded-2xl border border-white/5">
                   <div className="text-2xl md:text-3xl font-black text-golf-accent mb-1">20H+</div>
                   <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Battery Life</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 px-6 border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Proprietary AI Architecture
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 italic leading-tight">
                "Stockfish<br />
                <span className="text-golf-accent">for Golf"</span>
              </h2>
              <p className="text-white/70 font-light text-base md:text-lg leading-relaxed mb-8">
                The process is simple: we simulate an AI agent in real-time environmental conditions to benchmark human performance against optimal play. These high-fidelity simulations generate a comprehensive tactical heatmap, identifying strategic optimization points and critical decision paths - forming the ultimate foundation for an AI caddie.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-golf-accent/20 blur-[100px] -z-10 animate-pulse" />
              <div className="glass-dark aspect-square rounded-[2.5rem] md:rounded-[3rem] border border-white/10 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(163, 230, 53, 0.2) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                </div>
                <div className="relative text-center p-8 md:p-12">
                  <div className="mb-6 inline-block p-4 rounded-full bg-golf-accent/10 border border-golf-accent/20">
                    <Globe className="text-golf-accent animate-spin-slow" size={48} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 italic text-white">The Enabler.</h3>
                  <div className="h-px w-24 bg-golf-accent/50 mx-auto mb-6" />
                  <p className="text-white/60 font-mono text-xs md:text-sm leading-relaxed">
                    [ SYSTEM_STATUS: OPERATIONAL ]<br />
                    [ ENGINE_TYPE: DYNAMIC_NORMALIZATION ]<br />
                    [ COMPUTE_LOAD: OPTIMAL ]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Secondary Logistics Section */}
      <section className="py-16 md:py-20 px-6 border-t border-white/5 relative overflow-hidden flex flex-col justify-center">
        <HUDOverlay />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-golf-accent/5 blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          {/* Animacja na całą szerokość, pełniąca rolę wizualnego finału */}
          <div className="glass p-6 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[3rem] border border-white/5 overflow-hidden relative group min-h-[420px] flex items-center">
             <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-70 transition-opacity duration-1000">
                <LoopingVideo src="/animacja.mp4" className="w-full h-full object-cover" />
                {/* Gradient przyciemniający, żeby tekst był czytelny */}
                <div className="absolute inset-0 bg-gradient-to-r from-golf-dark via-golf-dark/60 to-transparent" />
             </div>
             
             <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
                  Live Flow Visualization
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 italic">Dynamic Ecosystem <br />Synchronization.</h3>
                <p className="text-white/50 font-light text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                   Witness the seamless coordination between the hardware mesh and cloud telemetry. Local ESP-NOW routing instantly pushes multi-hop data to the master node, ensuring real-time parity between the physical ball strike and digital scorecards.
                </p>
                
                {/* Opcjonalne małe tagi technologiczne pokazujące co się tam dzieje */}
                <div className="flex flex-wrap gap-3">
                   <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold bg-white/5 text-white/70">ESP-NOW Multi-Hop</div>
                   <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold bg-white/5 text-white/70">Edge Computing</div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const PlayerLanding = ({ 
  onPrivacyClick,
  onTermsClick
}: { 
  onPrivacyClick: () => void;
  onTermsClick?: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isLoaded, setIsLoaded] = useState(false);
  // --- CUSTOM ALERT DLA WAITLISTY ---
  const [alertData, setAlertData] = useState<{ msg: string, type: 'error' | 'success' | 'info' } | null>(null);

  const showAlert = (msg: string, type: 'error' | 'success' | 'info' = 'info') => {
    setAlertData({ msg, type });
    if (type !== 'error') {
      setTimeout(() => setAlertData(null), 5000);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    if(!acknowledged) {
      showAlert("Please check the box to acknowledge our terms and privacy policy.", "error");
      return;
    }
    setStatus('loading');
    
    try {
      // --- WERSJA LOKALNA BACKENDU (ZAKOMENTOWANA DO TESTÓW) ---
      /*
      const res = await fetch("http://127.0.0.1:8000/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      */

      let scriptUrl = (import.meta as ImportMeta & {
        env: { VITE_GOOGLE_SHEETS_URL?: string };
      }).env.VITE_GOOGLE_SHEETS_URL;
      
      if (!scriptUrl) {
        console.error("Missing VITE_GOOGLE_SHEETS_URL in .env");
        setStatus('error');
        return;
      }

      // Usunięcie ewentualnych cudzysłowów wklejonych w konfiguracji Vercela
      scriptUrl = scriptUrl.replace(/^["']|["']$/g, '').trim();

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ email: email })
      });

      setStatus('success');
      setEmail("");
      setAcknowledged(false);
      showAlert("Thank you for joining the waitlist. This helps a lot!", "success");
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    <AnimatePresence>
      {alertData && (
        <motion.div 
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-24 md:top-8 left-1/2 z-[9999] min-w-[320px] max-w-md w-full px-4"
        >
          <div className={`glass p-4 rounded-2xl border shadow-2xl flex items-start gap-4 
            ${alertData.type === 'error' ? 'border-red-500/50 bg-red-500/10' : 
              alertData.type === 'success' ? 'border-green-500/50 bg-green-500/10' : 
              'border-cyan-400/50 bg-cyan-400/10'}`}
          >
            <div className="shrink-0 mt-0.5">
              {alertData.type === 'error' && <AlertTriangle size={20} className="text-red-400" />}
              {alertData.type === 'success' && <CheckCircle size={20} className="text-green-400" />}
              {alertData.type === 'info' && <Info size={20} className="text-cyan-400" />}
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-widest">
                {alertData.type === 'error' ? 'Error' : alertData.type === 'success' ? 'Success' : 'System Info'}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">{alertData.msg}</p>
            </div>
            <button onClick={() => setAlertData(null)} className="shrink-0 text-white/50 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden pt-16">
        <div className="absolute inset-0 z-0 flex items-center justify-center text-center">
          <img 
            src="/background.png"
            alt="FairwayOS Background" 
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-golf-dark/80 via-golf-dark/40 to-golf-dark/90" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <HUDOverlay />
        <div className="scanline" />

        <div className="text-center z-20 max-w-4xl mt-0 md:mt-4">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="flex items-center gap-4 md:gap-5 group">
              <div className="relative">
                <div className="w-14 h-14 md:w-18 md:h-18 bg-golf-accent rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(163,230,53,0.4)] group-hover:scale-105 transition-transform duration-500">
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-golf-dark rounded-full shadow-inner" />
                </div>
                <div className="absolute inset-0 bg-golf-accent blur-2xl opacity-30 -z-10" />
              </div>
              <span className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter uppercase italic drop-shadow-[0_0_25px_rgba(163,230,53,0.25)] select-none">
                FAIRWAY<span className="text-golf-accent">OS</span>
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
            <Zap size={12} /> Early Access Waitlist
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-3 md:mb-4 leading-none selection:bg-white selection:text-black">
            <span className="sr-only">FairwayOS Global Golf E-Sports & Smart Ball Tracking. </span>
            The Future <br />
            <span className="text-gradient drop-shadow-[0_0_40px_rgba(163,230,53,0.4)]">Of Golf</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/80 font-light max-w-xs sm:max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Never lose a golf ball again. Get professional-grade analytics right in your pocket and compete in global asynchronous leagues on real grass.
          </p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 md:gap-3 mt-6 md:mt-10 z-20"
        >
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Scroll to Explore</span>
          <div className="w-[2px] h-8 md:h-12 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div 
              animate={{ y: ["0%", "200%", "0%"], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/3 bg-golf-accent rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. SEKCJA ZBIERANIA LEADÓW (WAITLIST) */}
      <section className="relative z-10 py-12 md:py-16 px-4 md:px-6 w-full flex flex-col justify-center items-center border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
          <div className="glass-dark p-6 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 max-w-3xl w-full text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-golf-accent/10 blur-[100px] -z-10" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 italic">Accelerate Our Journey</h2>
            <p className="text-white/50 text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto">
              Leaving your email significantly accelerates our hardware manufacturing process and shows course owners the demand. Join the waitlist today.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
                <input 
                  type="email" 
                  required
                  disabled={status === 'loading' || status === 'success'}
                  placeholder="player@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3 md:py-4 text-sm md:text-base text-white focus:outline-none focus:border-golf-accent/50 focus:bg-white/10 transition-all disabled:opacity-50 text-center sm:text-left"
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success' || !acknowledged}
                  className="bg-golf-accent text-golf-dark font-bold px-6 py-3 md:py-4 rounded-xl md:rounded-2xl uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center min-w-[140px] md:min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'idle' && "Join Waitlist"}
                  {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'success' && <><CheckCircle size={16} className="mr-2" /> Joined</>}
                  {status === 'error' && "Try Again"} 
                </button>
              </div>

              <label className="flex items-start gap-3 text-left cursor-pointer group select-none px-1">
                <input 
                  type="checkbox" 
                  required
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/5 text-golf-accent accent-[#a3e635] focus:ring-0 cursor-pointer shrink-0"
                />
                <span className="text-[11px] md:text-xs text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
                  I acknowledge that FairwayOS processes my email to manage waitlist participation and notifications in accordance with the{" "}
                  <a 
                    href="/privacy-policy" 
                    onClick={(e) => {
                      e.preventDefault();
                      onPrivacyClick();
                    }} 
                    className="text-golf-accent underline hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                  {onTermsClick && (
                    <>
                      {" "}and{" "}
                      <a 
                        href="/terms" 
                        onClick={(e) => {
                          e.preventDefault();
                          onTermsClick();
                        }} 
                        className="text-golf-accent underline hover:text-white transition-colors cursor-pointer"
                      >
                        Terms of Service
                      </a>
                    </>
                  )}
                  .
                </span>
              </label>
            </form>
            {status === 'success' && <p className="text-golf-accent text-xs md:text-sm mt-4 md:mt-6 font-bold tracking-widest uppercase">Thank you! You're on the list.</p>}
            {status === 'error' && <p className="text-red-400 text-xs md:text-sm mt-4 md:mt-6 font-bold tracking-widest uppercase">Something went wrong. Please try again.</p>}
            <p className="text-[9px] md:text-[10px] text-white/40 mt-6 leading-relaxed max-w-xl mx-auto text-left border-t border-white/5 pt-4 md:pt-6">
              Participation in the waitlist is voluntary and free of charge. You may terminate your participation at any time by contacting us. We may share anonymous, aggregated demand statistics with golf course partners.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SEKCJA WIDEO DLA GRACZA */}
      <YouTubeVideoSection 
        className="bg-golf-dark"
        subtitle="See it in action" 
        title={
          <>
            Stop searching.{" "}
            <span className="text-gradient drop-shadow-[0_0_40px_rgba(163,230,53,0.4)]">
              Start scoring.
            </span>
          </>
        } 
        videoId="dQw4w9WgXcQ" 
      />

      {/* 4. SEKCJA CECH */}
      <section className="relative overflow-hidden py-12 md:py-16 px-4 md:px-6 w-full flex flex-col justify-center items-center border-t border-white/5 bg-black/20">
        <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, #a3e635 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
        />
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {[
              { icon: Target, title: "0 Lost Balls", desc: "Find your ball instantly with precise GPS/UWB tracking directly on your phone." },
              { icon: BarChart3, title: "Pro Stats", desc: "Apex, speed, hang time, and total distance - analytics previously reserved for $25k simulators." },
              { icon: Globe, title: "Global E-Sports", desc: "Play on your local course, compete globally. Weather and terrain normalized by AI." },
              { icon: Zap, title: "Buy or Rent", desc: "Our smart balls will be available at pro-shops for purchase or direct rental via locker systems." }
            ].map((feat, i) => (
              <div key={i} className="glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-golf-accent/30 transition-all flex flex-col">
                <feat.icon size={24} className="text-golf-accent mb-4 md:mb-6" />
                <h3 className="font-bold text-lg md:text-xl mb-2">{feat.title}</h3>
                <p className="text-xs md:text-sm text-white/50 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- KOMPONENT DO ŁADOWANIA TWOJEGO MODELU 3D ---
const PillarModel = ({ position }: { position: THREE.Vector3 }) => {
  
  const { scene } = useGLTF('/Pillar.glb');
  return <primitive object={scene.clone()} position={position} scale={[1, 1, 1]} />;


  // return (
  //   <group position={position}>
  //     <Cylinder args={[0.2, 0.2, 1, 16]} position={[0, 0.5, 0]}>
  //       <meshStandardMaterial color="#a3e635" emissive="#a3e635" emissiveIntensity={0.5} />
  //     </Cylinder>
  //     <mesh position={[0, 1.1, 0]}>
  //       <Sphere args={[0.15]}><meshBasicMaterial color="#ffffff" /></Sphere>
  //     </mesh>
  //   </group>
  // );
};

// --- KOMPONENT PODŁOGI (Satelita dla GPS / Trawa dla AUTO) ---
const ArenaFloor = ({ isAuto }: { isAuto: boolean }) => {
  // Tryb AUTO używa lokalnego pliku, tryb GPS używa zdjęcia satelitarnego
  const textureUrl = isAuto 
    ? "/grass.jpg" 
    : "https://images.unsplash.com/photo-1589134751433-2ba9b8eeb5b0?q=80&w=2000&auto=format&fit=crop"; 
  
  const colorMap = useTexture(textureUrl);

  // Jeśli to tekstura trawy, włączamy powtarzanie (kafelkowanie), żeby nie była rozciągnięta jak guma
  if (isAuto && colorMap) {
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(10, 10); // Powiela teksturę 10x10 razy na boisku
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.05, 5]}>
      {/* 40x40 metrów */}
      <planeGeometry args={[40, 40]} />
      {/* Obydwa tryby używają teraz mapy tekstury */}
      <meshStandardMaterial map={colorMap} roughness={isAuto ? 0.9 : 0.8} metalness={0.1} />
    </mesh>
  );
};

// --- GŁÓWNY SILNIK POWTÓREK 3D ---
const Replay3D = ({ flightData, pillars, target, isAuto }: any) => {
  const discRef = React.useRef<THREE.Mesh>(null);
  const timeRef = React.useRef(0);

  const baseLat = pillars[0].lat;
  const baseLng = pillars[0].lng;
  const scale = isAuto ? 1 : 111320.0;

  const mapTo3D = (p: any) => new THREE.Vector3(
    (p.lat - baseLat) * scale, 
    p.z || 0, 
    (p.lng - baseLng) * scale 
  );

  const points3D = flightData.map(mapTo3D);
  const times = flightData.map((p: any) => p.time - flightData[0].time);
  const totalTime = times[times.length - 1];

  useFrame((state, delta) => {
    if (!discRef.current || points3D.length < 2) return;

    timeRef.current += delta * 1000; 
    if (timeRef.current > totalTime + 2000) timeRef.current = 0;

    let t = timeRef.current;
    if (t > totalTime) t = totalTime; 

    for (let i = 0; i < times.length - 1; i++) {
      if (t >= times[i] && t <= times[i + 1]) {
        const progress = (t - times[i]) / (times[i + 1] - times[i]);
        discRef.current.position.lerpVectors(points3D[i], points3D[i + 1], progress);
        break;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#a3e635" />
      
      {/* ZMIANA: target ustawiony precyzyjnie na środek boiska (5,0,5) */}
      <OrbitControls makeDefault target={[5, 0, 5]} maxPolarAngle={Math.PI / 2 - 0.05} />

      {/* Wywołanie naszej nowej podłogi z teksturą */}
      <ArenaFloor isAuto={isAuto} />
      
      {/* Delikatna, wyciszona siatka układu odniesienia */}
      <gridHelper args={[40, 40, '#1e293b', '#0f172a']} position={[5, 0, 5]} />

      {/* Słupki renderowane z wykorzystaniem naszego nowego loadera Modeli 3D */}
      {pillars.map((p: any, i: number) => (
        <PillarModel key={i} position={mapTo3D(p)} />
      ))}

      {/* Cel */}
      {target && (
        <mesh position={mapTo3D(target).setY(0.02)} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshBasicMaterial color="#eab308" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Latający Dysk */}
      <Trail width={1} color="#f43f5e" length={20} decay={1}>
        <mesh ref={discRef} position={points3D[0]}>
          <Cylinder args={[0.3, 0.3, 0.05, 32]}>
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={1} />
          </Cylinder>
        </mesh>
      </Trail>
    </>
  );
};

const MapClickCapture = ({ onMapClick }: { onMapClick: (e: any) => void }) => {
  useMapEvents({ click: onMapClick });
  return null;
};
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]);
  return null;
};
const AnimatedNumber = ({ value, suffix = "", decimals = 1 }: { value: number, suffix?: string, decimals?: number }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = display;
    const duration = 1000; // 1 sekunda animacji
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3); // Płynne zwalnianie
      setDisplay(start + (value - start) * easeOut);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{display.toFixed(decimals)}{suffix}</span>;
};

const GameLanding = ({ onBack }: { onBack: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const [appView, setAppView] = useState<'landing' | 'live_match' | 'auth' | 'map_select' | 'map_create' | 'verify' | 'auto_mesh' | 'target_lock'>('landing');
  
  const [user, setUser] = useState<{ id: number, email: string } | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Stan pokoju
  const [roomCode, setRoomCode] = useState<string | null>(null);
  // --- NOWE STANY DO HISTORII I LEADERBOARDA ---
  const [userRooms, setUserRooms] = useState<any[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  // Stan map
  const [communityMaps, setCommunityMaps] = useState<any[]>([]);
  const [newMapPillars, setNewMapPillars] = useState<{lat: number, lng: number, verified: boolean}[]>([]);
  const [mapDescription, setMapDescription] = useState('');
  const [saveToCommunity, setSaveToCommunity] = useState(true);
  const [activeMap, setActiveMap] = useState<any | null>(null);
  const [verifiedPillars, setVerifiedPillars] = useState<number[]>([]);
  
  // Wyszukiwarka mapy
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([52.2297, 21.0122]);

  // Stan Mesh / Disc
  const [meshStatus, setMeshStatus] = useState<'waiting' | 'calibrating' | 'ready'>('waiting');
  const [discStatus, setDiscStatus] = useState<'waiting' | 'detected'>('waiting');
  const [discData, setDiscData] = useState<any>(null);
  const [discLocations, setDiscLocations] = useState<{lat: number, lng: number, z: number}[]>([]);

  const [provSSID, setProvSSID] = useState('');
  const [provPass, setProvPass] = useState('');
  const [provStatus, setProvStatus] = useState<'idle' | 'connecting' | 'verifying' | 'success' | 'error'>('idle');

  const [alertData, setAlertData] = useState<{ msg: string, type: 'error' | 'success' | 'info' } | null>(null);

  // --- NOWE STANY DO MECZU ---
  const [matchState, setMatchState] = useState<'waiting_for_qr' | 'player_setup' | 'playing' | 'landed'>('waiting_for_qr');
  const [throwStats, setThrowStats] = useState<{vmax: number, vavg: number, score: number} | null>(null);
  const [targetLocation, setTargetLocation] = useState<{lat: number, lng: number, z: number} | null>(null);
  const [scannedDiscId, setScannedDiscId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [viewMode3D, setViewMode3D] = useState(false);

  // LOGIKA RZUTU: Detekcja chronologii i statystyk
  const processTelemetry = (rawTelemetry: any[]) => {
    if (!activeMap || !activeMap.pillars || rawTelemetry.length === 0) return rawTelemetry;

    // ZMIANA: Bypass dla fazy ustalania celu! 
    // Gracz może chodzić z dyskiem gdzie chce, oddajemy po prostu czystą trasę.
    if (appView === 'target_lock') {
      return rawTelemetry; 
    }
    
    const isAuto = activeMap.description.includes("Auto Mesh");
    const getForwardAxis = (p: any) => isAuto ? p.lng : p.lat;
    const startLinePos = isAuto ? 0 : activeMap.pillars[0].lat;

    // FAZA 1: Czekamy, aż gracz wróci z dyskiem ZA linię startu
    const idxBehind = rawTelemetry.findIndex((p: any) => getForwardAxis(p) < startLinePos);
    if (idxBehind === -1) {
      return []; // Ignorujemy - gracz przed linią (obowiązuje tylko w trybie gry)
    }

    // FAZA 2: Szukamy momentu rzutu (przekroczenie linii do przodu)
    let idxCross = -1;
    for (let i = idxBehind + 1; i < rawTelemetry.length; i++) {
      if (getForwardAxis(rawTelemetry[i]) >= startLinePos) {
        idxCross = i;
        break;
      }
    }

    if (idxCross === -1) {
      return []; // Gracz wciąż szykuje się do rzutu
    }

    const startIndex = idxCross - 1;
    const activeFlight = rawTelemetry.slice(startIndex);
    
    // FAZA 3: DETEKCJA LĄDOWANIA
    if (activeFlight.length >= 3 && matchState === 'playing') {
      
      const getDistInMeters = (pA: any, pB: any) => {
        const d = Math.hypot(pA.lat - pB.lat, pA.lng - pB.lng, (pA.z || 0) - (pB.z || 0));
        return isAuto ? d : d * 111320.0;
      };

      let landingIndex = -1;

      for (let i = 2; i < activeFlight.length; i++) {
        const p0 = activeFlight[i-2];
        const p1 = activeFlight[i-1];
        const p2 = activeFlight[i];
        
        if (getDistInMeters(p1, p0) < 0.3 && getDistInMeters(p2, p1) < 0.3 && getForwardAxis(p2) > startLinePos) {
          landingIndex = i;
          break; 
        }
      }

      if (landingIndex !== -1) {
        const finalFlight = activeFlight.slice(0, landingIndex + 1);
        
        let maxV = 0, totalV = 0, countV = 0;
        
        for (let i = 1; i < finalFlight.length - 2; i++) {
          const p1 = finalFlight[i-1];
          const p2 = finalFlight[i];
          const realDist = getDistInMeters(p1, p2);
          const timeSec = (p2.time - p1.time) / 1000.0;
          
          if (timeSec > 0) {
            const speedKmH = (realDist / timeSec) * 3.6;
            if (speedKmH > maxV && speedKmH < 150) maxV = speedKmH;
            if (speedKmH < 150) { totalV += speedKmH; countV++; }
          }
        }
        
        let score = 0;
        const landingPoint = finalFlight[finalFlight.length - 1]; 
        if (targetLocation) {
          const scoreDist = Math.hypot(landingPoint.lat - targetLocation.lat, landingPoint.lng - targetLocation.lng);
          score = isAuto ? scoreDist : scoreDist * 111320.0;
        }

        const calculatedVavg = countV > 0 ? totalV / countV : 0;

        // FINAŁ: Zapis do stanu lokalnego, zatrzymanie hardware'u i WYSŁANIE STATYSTYK!
        setThrowStats({ vmax: maxV, vavg: calculatedVavg, score });
        setMatchState('landed');
        setRoomStatus('landed');
        
        fetch(`${API_URL}/throws/${roomCode}/latest`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score: score, vmax: maxV, vavg: calculatedVavg })
        }).catch(err => console.error("Blad zapisu statystyk rzutu:", err));

        return finalFlight;
      }
    }
    
    return activeFlight; 
  };

  const confirmTargetAndStart = async () => {
    if (discLocations.length === 0) {
      showAlert("Brak danych telemetrii do ustalenia celu!", "error");
      return;
    }
    const target = discLocations[discLocations.length - 1]; 
    
    try {
      await fetch(`${API_URL}/rooms/${roomCode}/target`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        // DODANE: target.z
        body: JSON.stringify({ lat: target.lat, lng: target.lng, z: target.z })
      });
      
      setTargetLocation(target);
      await setRoomStatus('waiting_for_qr'); 
      setMatchState('waiting_for_qr');
      setAppView('live_match');
      setDiscLocations([]); 
    } catch(err) { console.error(err); }
  };

  const showAlert = (msg: string, type: 'error' | 'success' | 'info' = 'info') => {
    setAlertData({ msg, type });
    // Automatyczne zamykanie po 5 sekundach dla info i success
    if (type !== 'error') {
      setTimeout(() => setAlertData(null), 5000);
    }
  };

    const handleWebBluetoothProvisioning = async () => {
    // @ts-ignore - TypeScript domyślnie może nie mieć definicji navigator.bluetooth
    if (!navigator.bluetooth) {
      showAlert("Your browser doesn't support Web Bluetooth. Use Chrome, Edge, or Android.", "error");
      return;
    }
    if (!provSSID) {
      showAlert("Please provide a WiFi SSID!", "error");
      return;
    }
    try {
      setProvStatus('connecting');
      // @ts-ignore
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'FairwayOS_Node' }],
        optionalServices: [0x1111]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(0x1111);
      const encoder = new TextEncoder();

      const ssidChar = await service.getCharacteristic(0x2222);
      await ssidChar.writeValue(encoder.encode(provSSID));

      if (provPass) {
        const passChar = await service.getCharacteristic(0x3333);
        await passChar.writeValue(encoder.encode(provPass));
      }

      // ... (poprzedni kod wysyłania do bluetooth bez zmian)
      const roomChar = await service.getCharacteristic(0x4444);
      await roomChar.writeValue(encoder.encode(roomCode || ""));

      // ZMIANA: Zamiast "success", włączamy weryfikację
      setProvStatus('verifying');
      
      let attempts = 0;
      const maxAttempts = 15; // 15 sekund czekania na ESP32
      
      const verifyInterval = setInterval(async () => {
        attempts++;
        try {
          const res = await fetch(`${API_URL}/rooms/${roomCode}`);
          if (res.ok) {
            const data = await res.json();
            if (data.hardware_ready) {
              clearInterval(verifyInterval);
              setProvStatus('success');
              showAlert("Hardware synced and connected to WiFi successfully!", "success");
              return;
            }
          }
        } catch (e) { console.error(e); }
        
        if (attempts >= maxAttempts) {
          clearInterval(verifyInterval);
          setProvStatus('error');
          showAlert("Connection timeout. The device couldn't reach the server.", "error");
        }
      }, 1000);

    } catch (error: any) {
      console.error(error);
      if (error.name === 'NotFoundError' && error.message.includes('cancelled')) {
        setProvStatus('idle'); 
        return; 
      }
      setProvStatus('error');
      showAlert("Bluetooth sync failed. Make sure the device is on and nearby.", "error");
    }
  };
  // Odpytywanie chmury co 2 sekundy (Zarówno dla Target Lock jak i Live Match)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // ZMIANA: Nasłuchujemy w target_lock ORAZ gdy matchState to 'playing'
    if ((appView === 'target_lock' || matchState === 'playing') && roomCode) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/telemetry/${roomCode}`);
          if (res.ok) {
            const data = await res.json();
            
            if (data.telemetry && data.telemetry.length > 0) {
              const validTelemetry = data.telemetry.filter((t: any) => 
                t.lat !== null && t.lng !== null && t.z !== null && !isNaN(t.lat) && !isNaN(t.lng) && !isNaN(t.z)
              );
              
              if (validTelemetry.length > 0) {
                setDiscStatus('detected');
                setDiscLocations(processTelemetry(validTelemetry));
                setDiscData({ id: validTelemetry[0].disc_id });
              }
            }
            if (data.pillars && data.pillars.length === 4 && !activeMap) {
              setActiveMap({ 
                description: data.mode === "AUTO" ? "Auto Mesh System" : "GPS Arena", 
                pillars: data.pillars 
              });
            }
          }
        } catch(e) {}
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [appView, matchState, roomCode, activeMap]); // Dodano matchState do zależności


  // Nowa funkcja do symulacji strzału do bazy danych
  const simulateDiscThrow = async () => {
    if (!roomCode) return;
    
    // Punkt początkowy: bierzemy ze słupka 1 (jeśli mapa była mapowana GPS) lub ze środka mapy
    const baseLat = activeMap ? activeMap.pillars[0].lat : mapCenter[0];
    const baseLng = activeMap ? activeMap.pillars[0].lng : mapCenter[1];

    // Trzy odczyty symulujące lot dysku
    const trajectory = [
      { lat: baseLat + 0.0001, lng: baseLng + 0.0001 },
      { lat: baseLat + 0.00025, lng: baseLng + 0.00015 },
      { lat: baseLat + 0.0004, lng: baseLng + 0.0003 }, // Wylądował
    ];

    for (let i = 0; i < trajectory.length; i++) {
      await fetch(`${API_URL}/telemetry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_code: roomCode,
          disc_id: "DISC_RED_X1",
          lat: trajectory[i].lat,
          lng: trajectory[i].lng
        })
      });
      // Czekamy 2.5 sekundy między odczytami ESP
      await new Promise(r => setTimeout(r, 2500));
    }
  };

  const handleBackFromTargetLock = async () => {
    await setRoomStatus('waiting'); // Zatrzymuje telemetrię
    setAppView('auto_mesh');
    setMeshStatus('waiting'); // Resetuje status skanowania
  };

  const API_URL = "http://127.0.0.1:8000/api";

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    showAlert("We’re currently offering early access for businesses. Get in touch with us through any of the contact methods provided. Limited number of kits available.", "info");
    return;
    // setAuthLoading(true);
    // const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
    // try {
    //   const res = await fetch(`${API_URL}${endpoint}`, {
    //     method: "POST", headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password })
    //   });
    //   // Wewnątrz handleAuth:
    //   if (res.ok) {
    //     const data = await res.json();
    //     setUser(data);
    //     await enterLobby(data.id);
    //   } else {
    //     showAlert("Authentication failed. Check your credentials.", "error");
    //   }
    // } catch (err) { 
    //   console.error(err); 
    //   showAlert("Network error. Could not connect to the server.", "error");
    // } finally { setAuthLoading(false); }
  };
  // Wejście do Lobby -> Pobieranie starych map i TWORZENIE KODU POKOJU
  const enterLobby = async (userId: number) => {
    try {
      // Pobieranie historii gier
      const histRes = await fetch(`${API_URL}/users/${userId}/rooms`);
      if (histRes.ok) setUserRooms(await histRes.json());
      
      const roomRes = await fetch(`${API_URL}/rooms`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
      });
      const roomData = await roomRes.json();
      setRoomCode(roomData.room_code);

      const mapRes = await fetch(`${API_URL}/maps`);
      if (mapRes.ok) setCommunityMaps(await mapRes.json());
      
      setAppView('map_select');
    } catch (err) { console.error("Lobby error:", err); }
  };

  const resumeGame = async (roomToResume: any) => {
    setRoomCode(roomToResume.room_code);
    try {
      // 1. Pobieramy ustawienia pokoju (Cel itp.)
      const res = await fetch(`${API_URL}/rooms/${roomToResume.room_code}`);
      const data = await res.json();
      if (data.target) setTargetLocation(data.target);
      
      // 2. NOWE: Od razu pobieramy mapę (słupki) z telemetrii, by uniknąć czarnego ekranu!
      const mapRes = await fetch(`${API_URL}/telemetry/${roomToResume.room_code}`);
      if (mapRes.ok) {
        const mapData = await mapRes.json();
        if (mapData.pillars && mapData.pillars.length === 4) {
          setActiveMap({ 
            description: mapData.mode === "AUTO" ? "Auto Mesh System" : "GPS Arena", 
            pillars: mapData.pillars 
          });
        }
      }
      
      // 3. Przekierowanie do odpowiedniego widoku
      if (data.status === 'target_lock') {
        setAppView('target_lock');
      } else {
        setMatchState(data.status === 'playing' ? 'playing' : 'waiting_for_qr');
        setAppView('live_match');
      }
    } catch(e) { 
      console.error(e); 
      showAlert("Failed to resume game.", "error"); 
    }
  };

  const fetchLeaderboard = async () => {
    const res = await fetch(`${API_URL}/rooms/${roomCode}/leaderboard`);
    if(res.ok) setLeaderboard(await res.json());
  };

  const setRoomMode = async (mode: 'AUTO' | 'GPS', mapId?: number) => {
    if (!roomCode) return;
    try {
      await fetch(`${API_URL}/rooms/${roomCode}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, map_id: mapId }) // Wysyłamy do backendu
      });
    } catch (err) { console.error(err); }
  };

  const setRoomStatus = async (status: string) => {
    if (!roomCode) return;
    try {
      await fetch(`${API_URL}/rooms/${roomCode}/status`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
    } catch (err) { console.error(err); }
  };

  const handleSearchLocation = async () => {
    if(!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if(data && data.length > 0) {
        setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch(err) { console.error(err); }
  };

  const handleDropGPSMarker = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition((pos) => {
      if (newMapPillars.length < 4) {
        setNewMapPillars([...newMapPillars, { lat: pos.coords.latitude, lng: pos.coords.longitude, verified: true }]);
        setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      }
    }, () => alert("Location access denied."));
  };

  const handleMapClick = (e: any) => {
    if (newMapPillars.length < 4) {
      setNewMapPillars([...newMapPillars, { lat: e.latlng.lat, lng: e.latlng.lng, verified: false }]);
    }
  };

  const submitNewMap = async () => {
    if (newMapPillars.length !== 4 || !mapDescription || !user) return;
    try {
      // Łapiemy odpowiedź by wziąć wygenerowane map_id
      const res = await fetch(`${API_URL}/maps`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: mapDescription, is_community: saveToCommunity, user_id: user.id,
          pillars: newMapPillars.map((p, i) => ({ lat: p.lat, lng: p.lng, z: 0, order_index: i + 1 }))
        })
      });
      const mapData = await res.json();
      
      await setRoomMode('GPS', mapData.map_id); // Ustawiamy tryb i przypisujemy mapę do pokoju
      setActiveMap({ description: mapDescription, pillars: newMapPillars });
      
      const preVerified = newMapPillars.map((p, i) => p.verified ? i : -1).filter(i => i !== -1);
      setVerifiedPillars(preVerified);
      setAppView('verify');
    } catch (err) {}
  };

  const selectCommunityMap = async (map: any) => {
    await setRoomMode('GPS', map.id); // Przypisujemy wybraną mapę ze społeczności
    setActiveMap(map);
    setVerifiedPillars([]);
    setAppView('verify');
  };

  const simulateAutoMesh = async () => {
    setMeshStatus('calibrating');
    if (!activeMap || !activeMap.description.includes('GPS')) {
      await setRoomMode('AUTO');
    }
    setTimeout(() => setMeshStatus('ready'), 3000);
  };

  // PRAWDZIWA WERYFIKACJA GPS
  const handleVerifyGPS = async (pillarIndex: number, pillarLat: number, pillarLng: number) => {
    if (!navigator.geolocation) {
      showAlert("Geolocation is not supported by your browser.", "error");
      return;
    }
    
    // Wizualny feedback że ładujemy
    showAlert(`Getting GPS fix for Node ${pillarIndex + 1}... Please wait.`, "info");
    
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await fetch(`${API_URL}/verify-gps`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pillar_lat: pillarLat, pillar_lng: pillarLng,
            user_lat: position.coords.latitude, user_lng: position.coords.longitude
          })
        });
        const data = await res.json();
        if (data.verified) {
          setVerifiedPillars(prev => [...prev, pillarIndex]);
          showAlert("Pillar verified successfully!", "success");
        } else {
          showAlert(`You are too far! Distance: ${data.distance_meters}m (Max 15m). Walk closer to the pin.`, "error");
        }
      } catch (err) { console.error(err); }
    }, (err) => {
      showAlert(`Location access denied or failed. Code: ${err.code}`, "error");
    }, { enableHighAccuracy: true }); // Zmusza GPS do wysokiej dokładności w telefonie
  };

  return (
    <div className="min-h-screen flex flex-col bg-golf-dark relative overflow-hidden">
      {/* --- CUSTOM ALERT UI --- */}
      <AnimatePresence>
        {alertData && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-8 left-1/2 z-[9999] min-w-[320px] max-w-md w-full px-4"
          >
            <div className={`glass p-4 rounded-2xl border shadow-2xl flex items-start gap-4 
              ${alertData.type === 'error' ? 'border-red-500/50 bg-red-500/10' : 
                alertData.type === 'success' ? 'border-green-500/50 bg-green-500/10' : 
                'border-cyan-400/50 bg-cyan-400/10'}`}
            >
              <div className="shrink-0 mt-0.5">
                {alertData.type === 'error' && <AlertTriangle size={20} className="text-red-400" />}
                {alertData.type === 'success' && <CheckCircle size={20} className="text-green-400" />}
                {alertData.type === 'info' && <Info size={20} className="text-cyan-400" />}
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-widest">
                  {alertData.type === 'error' ? 'Error' : alertData.type === 'success' ? 'Success' : 'System Info'}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">{alertData.msg}</p>
              </div>
              <button onClick={() => setAlertData(null)} className="shrink-0 text-white/50 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Tło widoczne w całej aplikacji gry */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.1),transparent_80%)] pointer-events-none" />
      
      {/* HEADER: Wspólny dla obu części (Landing i App Flow) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-golf-accent rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.5)] group-hover:scale-105 transition-transform">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-golf-dark rounded-full shadow-inner" />
              </div>
              <div className="absolute inset-0 bg-golf-accent blur-md opacity-30 -z-10" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tighter text-white">Fairway<span className="text-golf-accent">OS</span></span>
          </a>

          {['map_create', 'verify', 'auto_mesh', 'target_lock', 'live_match'].includes(appView) && (
            <button 
              onClick={() => {
                setRoomCode(null);
                setActiveMap(null);
                setTargetLocation(null);
                setMatchState('waiting_for_qr');
                setAppView('map_select');
                if (user) {
                  fetch(`${API_URL}/users/${user.id}/rooms`)
                    .then(res => res.json())
                    .then(data => setUserRooms(data));
                }
              }} 
              className="flex items-center gap-1.5 text-white/50 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest transition-colors pl-3 md:pl-4 border-l border-white/10"
            >
              <ArrowLeft size={14} /> Back to Lobby
            </button>
          )}
        </div>
        <div className="text-white/50 text-[10px] uppercase font-bold tracking-widest font-mono">
          {user ? `User: ${user.email}` : "Not Authenticated"}
        </div>
      </nav>

      <div className={`relative z-10 flex-grow ${appView === 'landing' ? '' : 'pt-20'}`}>
        <AnimatePresence mode="wait">
          
          {/* =========================================
              CZĘŚĆ 1: LANDING PAGE (Prompty, 4 Kroki) 
              ========================================= */}
          {appView === 'landing' && (
            <motion.div key="landing-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full">
              
              {/* Główna sekcja Hero (Lobby) */}
              <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden pt-16">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0 flex items-center justify-center text-center pointer-events-none">
                  <img 
                    src="/disc-range.jpg"
                    alt="Disc Range Background" 
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-golf-dark/80 via-golf-dark/40 to-golf-dark/90" />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                <HUDOverlay />
                <div className="scanline" />

                <div className="text-center z-20 max-w-4xl mt-0 md:mt-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    <Gamepad2 size={12} /> Play Anywhere
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold mb-3 md:mb-4 italic leading-tight">
                    Next-Gen <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]">Digital Boules.</span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light max-w-xs sm:max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-5 md:mb-8">
                    Transform any open space: a beach, a park, or your backyard BBQ, into a high-tech arena. Long-distance throws with automated, real-time leaderboards powered by UWB IoT.
                  </p>

                  <div className="flex justify-center relative">
                    {!user ? (
                      <button onClick={() => setAppView('auth')} className="glass border border-cyan-400/50 hover:bg-cyan-400/10 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-xs md:text-sm flex items-center gap-3 transition-all hover:scale-105 group">
                        <LogIn size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" /> Login to create a room
                      </button>
                    ) : (
                      <button onClick={() => setAppView('map_select')} className="bg-cyan-400 text-black px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm flex items-center gap-3 transition-all hover:scale-105 hover:bg-white shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                        <Gamepad2 size={16} /> Enter Game Lobby
                      </button>
                    )}
                  </div>
                </div>

                {/* Zmniejszone marginesy i animacja strzałki */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col items-center gap-2 md:gap-3 mt-6 md:mt-10 z-20">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Scroll to learn how</span>
                  <div className="w-[2px] h-8 md:h-12 bg-white/10 rounded-full relative overflow-hidden">
                    <motion.div animate={{ y: ["0%", "200%", "0%"], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-1/3 bg-cyan-400 rounded-full" />
                  </div>
                </motion.div>
              </section>

              {/* Odtwarzacz Wideo dla kroków - spójnie z układem strony głównej */}
              <section className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden bg-black/20 border-t border-white/5 flex flex-col justify-center items-center w-full">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-400/5 blur-[150px] -z-10" />
                
                <div className="max-w-5xl mx-auto w-full text-center z-10 flex flex-col items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <Play size={12} /> Step-by-step
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-8 italic">Watch Tutorial</h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-4xl aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl glass p-2 md:p-3 z-10"
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden relative bg-black/50">
                      <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder" 
                        title="Setup Instructions" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* SEKCJA STEPS - dopasowane marginesy i tło sekcji */}
              <section className="relative py-12 md:py-16 px-4 md:px-6 w-full flex flex-col justify-center items-center border-t border-white/5 bg-golf-dark overflow-hidden">
                <div className="max-w-7xl mx-auto w-full z-10">
                  <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 italic">Set up in <span className="text-cyan-400">4 simple steps.</span></h2>
                    <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">From arriving at the park to your first high-speed throw in under 3 minutes.</p>
                  </div>

                  <div className="space-y-12 md:space-y-16">
                    {/* STEP 1 */}
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div className="order-2 lg:order-1 glass rounded-3xl aspect-[4/3] flex items-center justify-center p-6 md:p-8 border border-white/10 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-400/5" />
                        <div className="relative z-10 text-center w-full h-full flex items-center justify-center">
                          <img src="/Grid.png" alt="Grid" className="w-full h-full object-contain" />
                        </div>
                      </div>
                      <div className="order-1 lg:order-2">
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 block">Step 01</span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Choose Your Arena</h3>
                        <p className="text-white/50 text-sm md:text-base leading-relaxed">
                          Select an existing community map or create your own. Using Maps integration and your phone's GPS, simply drop pins where you plan to play to establish the digital boundary.
                        </p>
                      </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div>
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 block">Step 02</span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Deploy the Mesh</h3>
                        <p className="text-white/50 text-sm md:text-base leading-relaxed">
                          Place the physical UWB pillars according to the map on your screen. Once they turn on, they automatically connect to each other and to the cloud. Click "Accept Setup" on your phone. (~2 mins)
                        </p>
                      </div>
                      <div className="glass-dark rounded-3xl p-6 md:p-8 border border-white/10 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl" />
                        <div className="flex flex-col gap-3 md:gap-4 relative z-10">
                          {[1, 2, 3, 4].map((pillar) => (
                            <div key={pillar} className="flex items-center justify-between p-3.5 md:p-4 bg-white/5 rounded-xl border border-white/5">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-xs md:text-sm font-mono text-white/80">NODE_UWB_{pillar}</span>
                              </div>
                              <span className="text-[10px] md:text-xs text-cyan-400 uppercase tracking-widest font-bold">Connected</span>
                            </div>
                          ))}
                          <button disabled className="mt-2 md:mt-4 bg-white/10 text-white/50 py-3 rounded-xl text-xs uppercase tracking-widest font-bold">Setup Accepted</button>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div className="order-2 lg:order-1 glass rounded-3xl aspect-[4/3] flex items-center justify-center p-6 md:p-8 border border-white/10 relative">
                        <img src="/Target.png" alt="Target" className="w-full h-full object-contain" />
                      </div>
                      <div className="order-1 lg:order-2">
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 block">Step 03</span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Lock the Target</h3>
                        <p className="text-white/50 text-sm md:text-base leading-relaxed">
                          Walk with the smart disc to your desired target location. Stand still, click "Target Confirmed" in the app, and leave a physical indicator (like a flag or a stick). The system now knows exactly where to calculate distance to.
                        </p>
                      </div>
                    </div>

                    {/* STEP 4 */}
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      <div>
                        <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 block">Step 04</span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Scan, Throw, Dominate</h3>
                        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                          Before throwing, quickly scan the QR code on the disc to tag the throw to your profile. The line between the first two pillars acts as your starting line.
                        </p>
                        <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/70">
                          <li className="flex items-center gap-3"><QrCode size={16} className="text-cyan-400 shrink-0" /> Instant Player Tagging</li>
                          <li className="flex items-center gap-3"><BarChart3 size={16} className="text-cyan-400 shrink-0" /> Speed & Distance Analytics</li>
                          <li className="flex items-center gap-3"><Target size={16} className="text-cyan-400 shrink-0" /> Multiple Modes (Direct, Dartboard, Hazards)</li>
                        </ul>
                      </div>
                      <div className="glass rounded-3xl aspect-[4/3] flex items-center justify-center p-6 md:p-8 border border-white/10 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/10" />
                        <div className="relative z-10 text-center w-full h-full flex items-center justify-center">
                          <img src="/Shots.png" alt="Shots" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SEKCJA TEAM */}
              <section className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-black/20 border-t border-white/5 flex flex-col justify-center items-center w-full">
                <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle, #a3e635 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
                />
                
                <div className="max-w-5xl mx-auto w-full text-center z-10 flex flex-col items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                    <Users size={12} /> The Team
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-10 italic">
                    Meet the <span className="text-golf-accent">Team.</span>
                  </h2>
                  
                  <div className="relative w-full max-w-4xl rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl glass p-2 md:p-3">
                    <div className="w-full rounded-xl md:rounded-2xl overflow-hidden relative bg-black/50">
                      <img 
                        src="/team.jpg" 
                        alt="FairwayOS Team" 
                        className="w-full h-auto object-cover max-h-[75vh]"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {appView === 'auth' && (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center h-[calc(100vh-80px)] px-6">
              <div className="glass p-8 rounded-3xl w-full max-w-md relative">
                <button onClick={() => setAppView('landing')} className="absolute top-4 right-4 text-white/30 hover:text-white text-xs">Cancel</button>
                <h2 className="text-2xl font-bold mb-6">{authMode === 'login' ? 'Access Uplink' : 'Create Account'}</h2>
                <form onSubmit={handleAuth} className="flex flex-col gap-4">
                  <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400/50" />
                  <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400/50" />
                  <button type="submit" disabled={authLoading} className="bg-cyan-400 text-black font-bold py-3 rounded-xl mt-2 disabled:opacity-50 flex justify-center items-center gap-2">
                    {authLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                    {authMode === 'login' ? 'Login' : 'Register'}
                  </button>
                </form>
                <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-white/40 text-xs mt-6 underline w-full text-center hover:text-cyan-400">
                  {authMode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
                </button>
              </div>
            </motion.div>
          )}

          {/* =========================================
              CZĘŚĆ 3: WYBÓR MAPY (LOBBY Z KODEM POKOJU)
              ========================================= */}
          {appView === 'map_select' && (
            <motion.div key="map_select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6">
              <div className="w-full max-w-5xl flex flex-col items-center">
                
                {/* ZMODYFIKOWANY PANEL: KOD POKOJU + WEB BLUETOOTH PROVISIONING */}
                <div className="mb-10 w-full max-w-3xl glass p-8 rounded-3xl border border-cyan-400/30 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                  
                  <div className="text-center flex-1 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                      <Wifi size={12} /> Live Session
                    </div>
                    <h2 className="text-5xl md:text-6xl font-mono font-black text-white tracking-widest drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                      {roomCode || "------"}
                    </h2>
                  </div>

                  <div className="flex-1 w-full flex flex-col gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-2">Hardware Setup</h3>
                    <input 
                      type="text" placeholder="WiFi SSID (Network Name)" 
                      value={provSSID} onChange={(e) => setProvSSID(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/50"
                    />
                    <input 
                      type="password" placeholder="WiFi Password (Optional)" 
                      value={provPass} onChange={(e) => setProvPass(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400/50"
                    />
                    
                    <button 
                      onClick={provStatus === 'error' ? () => setProvStatus('idle') : handleWebBluetoothProvisioning}
                      disabled={provStatus === 'connecting' || provStatus === 'verifying' || provStatus === 'success'}
                      className={`mt-2 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all 
                        ${provStatus === 'success' ? 'bg-green-500 text-white' : 
                          provStatus === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white' : 
                          'bg-cyan-400 text-black hover:bg-white'} 
                        disabled:opacity-80`}
                    >
                      {provStatus === 'idle' ? <><Bluetooth size={16} /> Sync to Hardware</> : null}
                      {provStatus === 'connecting' ? <><Loader2 size={16} className="animate-spin" /> Connecting via BT...</> : null}
                      {provStatus === 'verifying' ? <><Loader2 size={16} className="animate-spin" /> Waiting for WiFi...</> : null}
                      {provStatus === 'success' ? <><Check size={16} /> Synced & Ready</> : null}
                      {provStatus === 'error' ? <><AlertTriangle size={16} /> Connection Failed - Retry</> : null}
                    </button>
                    {provStatus === 'error' && (
                      <p className="text-[10px] text-white/70 text-center leading-relaxed mt-1">
                        Could not connect to the network.<br/>
                        <span className="text-red-400 font-bold">Please TURN OFF the device, verify your WiFi credentials, turn it back on and click Retry.</span>
                      </p>
                    )}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col gap-6">
                    <div onClick={() => setAppView('auto_mesh')} className="glass border-2 border-cyan-400/50 p-6 rounded-3xl flex items-center gap-6 cursor-pointer hover:bg-cyan-400/10 hover:scale-[1.02] transition-all group relative overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex shrink-0 items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform"><Radio size={32} /></div>
                      <div><h3 className="font-bold text-xl text-white">Auto-Mesh (No GPS)</h3><p className="text-sm text-white/50 mt-1">UWB nodes self-calibrate. Play instantly anywhere.</p></div>
                    </div>
                    <div onClick={() => setAppView('map_create')} className="glass border border-white/10 p-6 rounded-3xl flex items-center gap-6 cursor-pointer hover:border-cyan-400/50 hover:bg-white/5 hover:scale-[1.02] transition-all group">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex shrink-0 items-center justify-center text-white/70 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-colors"><MapIcon size={32} /></div>
                      <div><h3 className="font-bold text-xl text-white">Map via GPS</h3><p className="text-sm text-white/50 mt-1">Pin your pillars on a real satellite map.</p></div>
                    </div>
                  </div>
                  <div className="glass border border-white/10 p-6 rounded-3xl max-h-[250px] overflow-y-auto">
                      <h3 className="font-bold text-sm uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2"><History size={16}/> Active Games</h3>
                      {userRooms.length === 0 ? <p className="text-xs text-white/30 italic">No recent games.</p> : (
                        <div className="flex flex-col gap-3">
                          {userRooms.map((r, idx) => (
                            <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer flex justify-between items-center" onClick={() => resumeGame(r)}>
                              <div>
                                <span className="font-bold text-sm block">{r.map_description}</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">Code: {r.room_code}</span>
                              </div>
                              <span className={`text-[10px] uppercase font-bold tracking-widest ${r.status === 'waiting' ? 'text-white/30' : 'text-green-400'}`}>{r.status}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  <div className="glass border border-white/10 p-6 rounded-3xl h-[250px] md:h-auto overflow-y-auto">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2"><MapPin size={16}/> Community Arenas</h3>
                    {communityMaps.length === 0 ? (
                       <p className="text-xs text-white/30 italic">No community maps found yet.</p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {communityMaps.map(map => (
                          <div key={map.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer flex justify-between items-center" onClick={() => selectCommunityMap(map)}>
                            <span className="font-bold text-sm">{map.description}</span>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">{map.pillars.length} Nodes</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================
              CZĘŚĆ 4: KREACJA MAPY GPS (Z Wyszukiwarką nad mapą)
              ========================================= */}
          {appView === 'map_create' && (
            <motion.div key="map_create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center min-h-[calc(100vh-80px)] p-6">
              <div className="w-full max-w-6xl mb-4">
                <button onClick={() => setAppView('map_select')} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase transition-colors">
                  <ArrowLeft size={14} /> Back to Arenas
                </button>
              </div>

              <div className="w-full max-w-6xl bg-black/50 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row gap-6">
                {/* LWA STRONA: Wyszukiwarka i Mapa */}
                <div className="flex-grow flex flex-col gap-4">
                  {/* Pasek wyszukiwania NAD mapą */}
                  <div className="flex gap-2">
                    <div className="flex-grow flex bg-white/5 border border-white/20 rounded-xl overflow-hidden focus-within:border-cyan-400/50 transition-colors">
                      <input type="text" placeholder="Search location (e.g. Central Park)" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onKeyDown={(e)=>e.key === 'Enter' && handleSearchLocation()} className="bg-transparent text-white px-4 py-3 w-full focus:outline-none text-sm" />
                      <button onClick={handleSearchLocation} className="px-5 bg-black/20 text-cyan-400 hover:text-white hover:bg-cyan-400/20 transition-colors"><Search size={18}/></button>
                    </div>
                    <button onClick={handleDropGPSMarker} className="bg-cyan-400 text-black px-6 rounded-xl flex items-center justify-center hover:bg-white transition-colors" title="Use my GPS position">
                      <LocateFixed size={18} className="mr-2" /> My GPS
                    </button>
                  </div>

                  {/* Kontener Mapy */}
                  <div className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 relative">
                    <MapContainer center={mapCenter} zoom={16} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="&copy; Esri" />
                      <MapUpdater center={mapCenter} />
                      <MapClickCapture onMapClick={handleMapClick} />
                      {newMapPillars.map((pos, idx) => <Marker key={idx} position={[pos.lat, pos.lng]} icon={pos.verified ? verifiedIcon : customIcon} />)}
                    </MapContainer>
                    {newMapPillars.length < 4 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] bg-black/80 px-4 py-2 rounded-full border border-cyan-400 text-xs font-bold text-cyan-400 shadow-lg pointer-events-none">
                        Tap map or use GPS to place pillar {newMapPillars.length + 1} / 4
                      </div>
                    )}
                  </div>
                </div>

                {/* PRAWA STRONA: Formularz */}
                <div className="w-full md:w-80 flex flex-col gap-4">
                  <h3 className="font-bold text-lg border-b border-white/10 pb-2">Arena Details</h3>
                  <p className="text-xs text-white/50">Nodes mapped: <span className={newMapPillars.length === 4 ? "text-cyan-400 font-bold" : ""}>{newMapPillars.length}/4</span></p>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    {newMapPillars.map((p, i) => (
                      <div key={i} className="flex justify-between items-center text-xs p-2 bg-white/5 rounded border border-white/5">
                        <span className="font-mono text-white/70">Pillar {i+1}</span>
                        {p.verified ? <span className="text-green-400 flex items-center gap-1"><Check size={12}/> Verified</span> : <span className="text-yellow-400">Manual Pin</span>}
                      </div>
                    ))}
                  </div>

                  <input type="text" placeholder="Arena Name" value={mapDescription} onChange={e => setMapDescription(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400" />
                  <label className="flex items-center gap-3 text-xs text-white/70 cursor-pointer"><input type="checkbox" checked={saveToCommunity} onChange={e => setSaveToCommunity(e.target.checked)} className="accent-cyan-400" /> Save to Community Maps</label>
                  
                  <div className="mt-auto flex flex-col gap-2">
                    <button onClick={() => setNewMapPillars([])} className="bg-white/5 text-white/50 text-xs py-3 rounded-xl hover:bg-white/10">Reset Markers</button>
                    <button onClick={submitNewMap} disabled={newMapPillars.length !== 4 || !mapDescription} className="bg-cyan-400 text-black font-bold py-3 rounded-xl disabled:opacity-30 disabled:bg-white/10 disabled:text-white/50">Confirm & Deploy Mesh</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================
              CZĘŚĆ 5: WERYFIKACJA SŁUPKÓW (GPS)
              ========================================= */}
          {appView === 'verify' && activeMap && (
            <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center min-h-[calc(100vh-80px)] p-6">
              <div className="w-full max-w-5xl flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-6">
                  <button onClick={() => setAppView('map_select')} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase transition-colors"><ArrowLeft size={14} /> Back to Arenas</button>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Physical Deployment</h2>
                  <p className="text-white/50 text-sm">Walk to each digital marker and click "Verify via GPS" when you place the physical UWB pillar.</p>
                </div>
                
                <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 relative">
                  <MapContainer center={[activeMap.pillars[0].lat, activeMap.pillars[0].lng]} zoom={18} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    {activeMap.pillars.map((p: any, idx: number) => {
                      const isVerified = verifiedPillars.includes(idx);
                      return (
                        <Marker key={idx} position={[p.lat, p.lng]} icon={isVerified ? verifiedIcon : customIcon}>
                          <Popup className="custom-popup">
                            <div className="p-1 text-center bg-transparent">
                              <div className="text-[10px] text-gray-500 font-mono mb-2">LAT: {p.lat.toFixed(5)}<br/>LNG: {p.lng.toFixed(5)}</div>
                              {isVerified ? (
                                 <div className="text-green-500 text-xs font-bold flex items-center justify-center gap-1"><Check size={14}/> Verified</div>
                              ) : (
                                <button onClick={() => handleVerifyGPS(idx, p.lat, p.lng)} className="bg-cyan-400 text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-white w-full">Verify via GPS</button>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
                
                <div className="mt-8 flex gap-4">
                  {/* ZMIANA: Oba przyciski kierują do kalibracji Mesh */}
                  <button onClick={() => setAppView('auto_mesh')} className="glass text-white/50 hover:text-white px-8 py-3 rounded-full text-xs font-bold uppercase transition-colors">
                    Skip GPS & Proceed to Mesh
                  </button>
                  <button disabled={verifiedPillars.length < 4} onClick={() => setAppView('auto_mesh')} className="bg-cyan-400 text-black px-8 py-3 rounded-full text-xs font-bold uppercase disabled:opacity-30 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                    Proceed to Mesh Calibration
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================
              CZĘŚĆ 5B: AUTO MESH / KALIBRACJA UWB
              ========================================= */}
          {appView === 'auto_mesh' && (
            <motion.div key="auto_mesh" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center min-h-[calc(100vh-80px)] p-6">
              <div className="w-full max-w-2xl flex flex-col items-center text-center">
                
                {/* ZMIANA: Inteligentny powrót zależny od tego, czy używamy mapy GPS */}
                <button onClick={() => {
                  if (activeMap && activeMap.description.includes('GPS')) setAppView('verify');
                  else setAppView('map_select');
                }} className="self-start flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase mb-8 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
                
                <div className="w-24 h-24 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-8 relative">
                  {meshStatus === 'calibrating' && <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-dashed animate-[spin_3s_linear_infinite]" />}
                  {meshStatus === 'ready' ? <Check size={48} className="text-green-400" /> : <Activity size={48} />}
                </div>

                <h2 className="text-3xl font-bold mb-4">UWB Mesh Calibration</h2>
                <p className="text-white/50 mb-10 max-w-lg leading-relaxed">
                  The UWB modules will use Time-of-Flight to automatically calculate their relative geometry and establish the 3D playing field.
                </p>

                {meshStatus === 'waiting' && (
                  <button onClick={simulateAutoMesh} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all">
                    Initiate Mesh Scan
                  </button>
                )}
                
                {meshStatus === 'calibrating' && (
                  <button disabled className="bg-cyan-400/20 text-cyan-400 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                    <Loader2 size={16} className="animate-spin" /> Calculating Distances...
                  </button>
                )}
                
                {meshStatus === 'ready' && (
                  <div className="flex flex-col items-center gap-6">
                    <div className="bg-cyan-400/10 border border-cyan-400/30 px-6 py-3 rounded-xl flex items-center gap-3">
                      <Wifi size={16} className="text-cyan-400" />
                      <span className="text-xs text-white/50 uppercase tracking-widest">Room Code:</span>
                      <span className="text-xl font-mono font-bold text-cyan-400 tracking-widest">{roomCode}</span>
                    </div>
                    
                    {/* ZMIANA: Przy przejściu wymuszamy zmianę statusu pokoju na target_lock! */}
                    <button onClick={async () => {
                      await setRoomStatus('target_lock');
                      setAppView('target_lock');
                    }} className="bg-cyan-400 hover:bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
                      Proceed to Target Lock
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* =========================================
              CZĘŚĆ 6: TARGET LOCK
              ========================================= */}
          {appView === 'target_lock' && (
             <motion.div key="target_lock" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center min-h-[calc(100vh-80px)] p-6">
                
                <div className="w-full max-w-6xl flex justify-between items-center mb-6">
                  <button onClick={handleBackFromTargetLock} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <div className="bg-cyan-400/10 border border-cyan-400/30 px-4 py-2 rounded-lg flex items-center gap-3">
                    <Wifi size={16} className={discStatus === 'waiting' ? "text-yellow-400 animate-pulse" : "text-green-400"} />
                    <span className="text-xs text-white/50 uppercase tracking-widest">Room Code:</span>
                    <span className="text-lg font-mono font-bold text-cyan-400 tracking-widest">{roomCode || "ERR_NO_ROOM"}</span>
                  </div>
                </div>

                <div className="w-full max-w-6xl bg-black/50 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row gap-6">
                  
                  <div className="h-[400px] md:h-[500px] flex-grow rounded-2xl overflow-hidden border border-white/10 relative">
                    
                    {/* ZMIANA: z-[1000] sprawia, że w końcu przykrywa Leafleta */}
                    {discStatus === 'waiting' && (
                      <div className="absolute inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                        <WifiOff size={48} className="text-yellow-400 mb-4 animate-pulse opacity-80" />
                        <h3 className="text-2xl font-bold text-white mb-2">Awaiting Telemetry</h3>
                        <p className="text-white/50 text-sm max-w-md mb-8">
                          Walk to the target area and turn on your Smart Disc. Querying the database every 2 seconds for initial ESP uplink...
                        </p>
                        <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 rounded-xl">
                          <Loader2 size={16} className="animate-spin" /> Fetching /api/telemetry/{roomCode}...
                        </div>
                      </div>
                    )}

                    {/* Logika wybierająca układ współrzędnych i kafelki na bazie trybu gry */}
                    <MapContainer 
                      key={activeMap ? activeMap.description : 'map-loading'} 
                      center={discLocations.length > 0 ? [discLocations[discLocations.length - 1].lat, discLocations[discLocations.length - 1].lng] : (activeMap ? [activeMap.pillars[0].lat, activeMap.pillars[0].lng] : [0,0])} 
                      zoom={activeMap && activeMap.description.includes('Auto Mesh') ? 4 : 18} 
                      crs={activeMap && activeMap.description.includes('Auto Mesh') ? L.CRS.Simple : L.CRS.EPSG3857}
                      style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
                    >
                      {activeMap && !activeMap.description.includes('Auto Mesh') && (
                        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="&copy; Esri" />
                      )}
                      
                      {/* Gdy AUTO: Wyświetlamy siatkę zamiast satelity */}
                      {activeMap && activeMap.description.includes('Auto Mesh') && (
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      )}

                      <MapUpdater 
                        center={discLocations.length > 0 ? [discLocations[discLocations.length - 1].lat, discLocations[discLocations.length - 1].lng] : (activeMap ? [activeMap.pillars[0].lat, activeMap.pillars[0].lng] : [0,0])} 
                      />
                      
                      {/* Rysowanie 4 głównych słupków Mesh */}
                      {activeMap && activeMap.pillars.map((p: any, idx: number) => (
                        <Marker key={`pillar-${idx}`} position={[p.lat, p.lng]} icon={verifiedIcon}>
                          <Popup className="custom-popup"><span className="text-xs font-mono font-bold text-green-400">Node {idx+1}</span></Popup>
                        </Marker>
                      ))}

                      {/* Renderowanie przebytych punktów przez dysk oraz linii */}
                      {discLocations.length > 0 && (
                        <>
                          <Polyline positions={discLocations.map(p => [p.lat, p.lng])} pathOptions={{ color: '#f43f5e', weight: 3, dashArray: '5, 10' }} />
                          {discLocations.map((pos, idx) => {
                            const pointOpacity = Math.max(0.2, (idx + 1) / discLocations.length);
                            return (
                              <Marker key={`disc-${idx}`} position={[pos.lat, pos.lng]} icon={discIcon} opacity={pointOpacity}>
                                <Popup className="custom-popup"><span className="text-xs font-mono">Ping #{idx+1}</span></Popup>
                              </Marker>
                            );
                          })}
                        </>
                      )}
                    </MapContainer>
                  </div>

                  {/* PRAWA STRONA: Panel Informacyjny */}
                  <div className="w-full md:w-80 flex flex-col gap-4">
                    <h3 className="font-bold text-xl border-b border-white/10 pb-2">Target Lock</h3>
                    
                    {discStatus === 'waiting' ? (
                      <div className="mt-4">
                        <button onClick={simulateDiscThrow} className="w-full text-[10px] bg-white/5 border border-white/10 text-white/50 p-3 rounded-lg uppercase tracking-widest hover:text-white hover:bg-white/10 transition-colors">
                          [Simulate Hardware Disc]
                        </button>
                        <p className="text-[10px] text-white/30 text-center mt-2">
                          Injects 3 telemetry coordinates into the DB.
                        </p>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-grow">
                        <p className="text-green-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                          <Check size={14}/> Target Locked
                        </p>
                        
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                          <div className="text-[10px] text-white/40 uppercase mb-1">Disc Identification</div>
                          <div className="font-mono text-cyan-400 font-bold">{discData?.id}</div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                          <div className="text-[10px] text-white/40 uppercase mb-1">Telemetry Status</div>
                          <div className="font-mono text-white text-sm">{discLocations.length} data packets received</div>
                        </div>
                        
                        <div className="mt-auto">
                          <p className="text-white/50 text-[10px] mb-4 text-center leading-relaxed">
                            Drop a physical indicator (flag) at the final red marker on the map.
                          </p>
                          <button onClick={() => confirmTargetAndStart()} className="w-full bg-cyan-400 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-white transition-all">
                            Confirm & Start
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
             </motion.div>
          )}
          {/* =========================================
              CZĘŚĆ 7: LIVE MATCH (QR + GRA)
              ========================================= */}
          {appView === 'live_match' && (
             <motion.div key="live_match" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center min-h-[calc(100vh-80px)] p-6">
                
                <div className="w-full max-w-6xl flex justify-between items-center mb-6">
                  <div className="bg-cyan-400/10 border border-cyan-400/30 px-4 py-2 rounded-lg flex items-center gap-3">
                    <Wifi size={16} className="text-cyan-400" />
                    <span className="text-xs text-white/50 uppercase tracking-widest">Room Code:</span>
                    <span className="text-lg font-mono font-bold text-cyan-400 tracking-widest">{roomCode}</span>
                  </div>
                </div>

                <div className="w-full max-w-6xl bg-black/50 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row gap-6">
                  
                  {/* LEWA STRONA: MAPA */}
                  {/* LEWA STRONA: MAPA (2D / 3D) */}
                  <div className="h-[400px] md:h-[600px] flex-grow rounded-2xl overflow-hidden border border-white/10 relative flex flex-col">
                    
                    {/* PRZEŁĄCZNIK WIDOKU (Pojawia się tylko po wylądowaniu) */}
                    {matchState === 'landed' && (
                      <div className="absolute top-4 right-4 z-[1000] flex bg-black/80 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden p-1 shadow-2xl">
                        <button 
                          onClick={() => setViewMode3D(false)} 
                          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all ${!viewMode3D ? 'bg-cyan-400 text-black' : 'text-white/50 hover:text-white'}`}
                        >
                          <MapIcon2D size={14} /> 2D Map
                        </button>
                        <button 
                          onClick={() => setViewMode3D(true)} 
                          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all ${viewMode3D ? 'bg-fuchsia-500 text-white' : 'text-white/50 hover:text-white'}`}
                        >
                          <Play size={14} /> 3D Replay
                        </button>
                      </div>
                    )}

                    {!viewMode3D ? (
                      // ==================== WIDOK 2D (LEAFLET) ====================
                      <MapContainer 
                        key={activeMap ? activeMap.description + 'live' : 'map-live'} 
                        center={discLocations.length > 0 ? [discLocations[discLocations.length - 1].lat, discLocations[discLocations.length - 1].lng] : (activeMap ? [activeMap.pillars[0].lat, activeMap.pillars[0].lng] : [0,0])} 
                        zoom={activeMap && activeMap.description.includes('Auto Mesh') ? 4 : 18} 
                        crs={activeMap && activeMap.description.includes('Auto Mesh') ? L.CRS.Simple : L.CRS.EPSG3857}
                        style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
                      >
                        {activeMap && !activeMap.description.includes('Auto Mesh') && <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />}
                        {activeMap && activeMap.description.includes('Auto Mesh') && <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '20px 20px' }} />}
                        <MapUpdater center={discLocations.length > 0 ? [discLocations[discLocations.length - 1].lat, discLocations[discLocations.length - 1].lng] : (activeMap ? [activeMap.pillars[0].lat, activeMap.pillars[0].lng] : [0,0])} />
                        
                        {activeMap && activeMap.pillars.map((p: any, idx: number) => (
                          <Marker key={`p-${idx}`} position={[p.lat, p.lng]} icon={verifiedIcon} />
                        ))}

                        {targetLocation && (
                          <Marker position={[targetLocation.lat, targetLocation.lng]} icon={targetIcon}>
                            <Popup className="custom-popup"><span className="text-xs font-bold text-yellow-400">Target</span></Popup>
                          </Marker>
                        )}

                        {matchState === 'landed' && discLocations.length > 0 && (
                          <>
                            <Polyline positions={discLocations.map(p => [p.lat, p.lng])} pathOptions={{ color: '#f43f5e', weight: 4 }} />
                            {discLocations.map((pos, idx) => {
                              const pointOpacity = Math.max(0.1, (idx + 1) / discLocations.length);
                              return <Marker key={`d-${idx}`} position={[pos.lat, pos.lng]} icon={discIcon} opacity={pointOpacity} />;
                            })}
                            {targetLocation && (
                              <Polyline positions={[[discLocations[discLocations.length - 1].lat, discLocations[discLocations.length - 1].lng], [targetLocation.lat, targetLocation.lng]]} pathOptions={{ color: '#eab308', weight: 2, dashArray: '4, 8' }} />
                            )}
                          </>
                        )}
                      </MapContainer>
                    ) : (
                      // ==================== WIDOK 3D (THREE.JS) ====================
                      <div className="w-full h-full bg-[#0b1121] cursor-move rounded-2xl overflow-hidden">
                        <Canvas camera={{ position: [5, 12, -12], fov: 45 }}>
                          <Replay3D 
                            flightData={discLocations} 
                            pillars={activeMap?.pillars || []} 
                            target={targetLocation} 
                            isAuto={activeMap?.description.includes("Auto Mesh")} 
                          />
                        </Canvas>
                      </div>
                    )}
                  </div>

                  {/* PRAWA STRONA: PANEL KONTROLNY (STAN MECZU) */}
                  <div className="w-full md:w-96 flex flex-col gap-4">
                    
                    {matchState === 'waiting_for_qr' && (
                      <div className="flex flex-col flex-grow">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 self-start">
                          <QrCode size={12} className="animate-pulse" /> Awaiting Disc
                        </div>
                        <h3 className="font-bold text-2xl mb-4">Scan Next Player</h3>
                        <p className="text-xs text-white/50 mb-6 leading-relaxed">
                          Show the Disc QR Code to your camera. Telemetry is currently paused to conserve power.
                        </p>
                        
                        {/* Wbudowany Skaner */}
                        <div className="rounded-2xl overflow-hidden border border-white/20 mb-6 bg-black aspect-square flex items-center justify-center relative">
                          <Scanner 
                            onScan={(result) => {
                              if(result && result[0]) {
                                setScannedDiscId(result[0].rawValue);
                                setMatchState('player_setup');
                                setViewMode3D(false);
                              }
                            }}
                            components={{ finder: false }}
                          />
                          <div className="absolute inset-0 border-4 border-cyan-400/30 pointer-events-none z-10 rounded-2xl" />
                        </div>
                        
                        {/* FALLBACK DO TESTÓW, gdyby kamera nie działała */}
                        <button 
                          onClick={() => { setScannedDiscId("DISC_BLUE_TEST_01"); setMatchState('player_setup'); }} 
                          className="mt-auto text-[10px] text-white/30 underline uppercase tracking-widest hover:text-white"
                        >
                          [Simulate QR Scan]
                        </button>
                      </div>
                    )}

                    {matchState === 'player_setup' && (
                      <div className="flex flex-col flex-grow">
                        <h3 className="font-bold text-2xl mb-2">Player Setup</h3>
                        <p className="text-xs text-white/50 mb-8">Disc <span className="text-cyan-400 font-mono">{scannedDiscId}</span> detected.</p>
                        
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
                          <label className="text-[10px] uppercase tracking-widest text-white/50">Who is throwing?</label>
                          <input 
                            type="text" placeholder="Enter Player Name" 
                            value={playerName} onChange={e => setPlayerName(e.target.value)}
                            className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyan-400/50 outline-none"
                          />
                        </div>

                        <button 
                          disabled={!playerName}
                          onClick={async () => {
                            // 1. Zapisz rzut w bazie
                            await fetch(`${API_URL}/throws`, {
                              method: "POST", headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ room_code: roomCode, player_name: playerName, disc_id: scannedDiscId })
                            });
                            // 2. Zmień status pokoju na "playing" -> ODBLOKOWUJE ESP32!
                            await setRoomStatus('playing');
                            setDiscLocations([]); // Czyścimy mapę przed rzutem
                            setMatchState('playing');
                          }} 
                          className="mt-auto bg-cyan-400 text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm disabled:opacity-30 hover:bg-white transition-all flex justify-center gap-2"
                        >
                          <UserPlus size={18} /> Confirm & Unpause Telemetry
                        </button>
                      </div>
                    )}

                    {matchState === 'playing' && (
                      <div className="flex flex-col flex-grow">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-400/30 bg-green-400/5 text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 self-start">
                          <Activity size={12} className="animate-pulse" /> Live Telemetry Active
                        </div>
                        <h3 className="font-bold text-2xl mb-1">{playerName}'s Throw</h3>
                        <p className="text-xs text-white/50 mb-8 font-mono">{scannedDiscId}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <div className="text-[10px] text-white/40 uppercase mb-1">Data Packets</div>
                            <div className="font-mono text-cyan-400 text-xl">{discLocations.length}</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-yellow-400/5 animate-pulse" />
                            <div className="text-[10px] text-white/40 uppercase mb-1 relative z-10">Status</div>
                            <div className="font-mono text-yellow-400 text-xl relative z-10">
                              {discLocations.length === 0 ? "Return Behind Line" : 
                               (discLocations.length === 1 ? "Ready. Throw!" : "In Air...")}
                            </div>
                          </div>
                        </div>
                        
                        <button onClick={simulateDiscThrow} className="text-[10px] bg-white/5 border border-white/10 text-white/50 p-3 rounded-lg uppercase tracking-widest hover:text-white transition-colors mb-auto">
                          [Simulate Hardware Throw]
                        </button>

                        <button onClick={async () => {
                           // Z powrotem do czekania na QR
                           await setRoomStatus('waiting_for_qr');
                           setPlayerName('');
                           setMatchState('waiting_for_qr');
                        }} className="w-full bg-white/10 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs border border-white/20 hover:bg-white hover:text-black transition-all">
                          Next Throw (Scan QR)
                        </button>
                      </div>
                    )}
                    {matchState === 'landed' && throwStats && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col flex-grow bg-cyan-400/5 p-6 rounded-3xl border border-cyan-400/30">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400 text-black text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
                          <Check size={12} /> Throw Complete
                        </div>
                        
                        {/* PRZEŁĄCZNIK WYNIKI / LEADERBOARD */}
                        <div className="flex gap-2 mb-6">
                           <button onClick={() => setShowLeaderboard(false)} className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${!showLeaderboard ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}>Result</button>
                           <button onClick={() => { setShowLeaderboard(true); fetchLeaderboard(); }} className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${showLeaderboard ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}>Leaderboard</button>
                        </div>
                        
                        {!showLeaderboard ? (
                          <div className="flex flex-col gap-4 mb-8">
                            <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex justify-between items-end">
                              <div className="text-xs text-white/50 uppercase tracking-widest">Max Speed</div>
                              <div className="font-mono text-cyan-400 text-3xl font-black italic shadow-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"><AnimatedNumber value={throwStats.vmax} suffix=" KM/H" /></div>
                            </div>
                            <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex justify-between items-end">
                              <div className="text-xs text-white/50 uppercase tracking-widest">Avg Speed</div>
                              <div className="font-mono text-white text-2xl font-bold"><AnimatedNumber value={throwStats.vavg} suffix=" KM/H" /></div>
                            </div>
                            <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-xl flex justify-between items-end">
                              <div className="text-xs text-yellow-400/70 uppercase tracking-widest">Dist to Target</div>
                              <div className="font-mono text-yellow-400 text-3xl font-black"><AnimatedNumber value={throwStats.score} suffix=" M" /></div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3 mb-8 max-h-[250px] overflow-y-auto pr-2">
                            {leaderboard.length === 0 ? <Loader2 size={24} className="animate-spin text-cyan-400 mx-auto" /> : 
                              leaderboard.map((entry, idx) => (
                                <div key={idx} className="bg-black/40 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold w-6 flex justify-center">
                                      {idx === 0 ? <Trophy size={18} className="text-[#ffd700]" /> : 
                                       idx === 1 ? <Trophy size={18} className="text-[#c0c0c0]" /> : 
                                       idx === 2 ? <Trophy size={18} className="text-[#cd7f32]" /> : 
                                       <span className="text-white/30 text-xs">{idx+1}</span>}
                                    </span>
                                    <span className="font-bold text-white text-sm">{entry.player_name}</span>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-cyan-400 font-bold font-mono text-lg">{entry.score.toFixed(1)}m</div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        )}

                        <div className="mt-auto flex flex-col gap-3">
                          <button onClick={async () => {
                             await fetch(`${API_URL}/throws`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ room_code: roomCode, player_name: playerName, disc_id: scannedDiscId }) });
                             await setRoomStatus('playing');
                             setThrowStats(null); setShowLeaderboard(false); setDiscLocations([]); setMatchState('playing'); setViewMode3D(false);
                          }} className="w-full bg-cyan-400 text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">Throw Again (Same Player)</button>
                          
                          <button onClick={async () => {
                             await setRoomStatus('waiting_for_qr');
                             setPlayerName(''); setThrowStats(null); setShowLeaderboard(false); setDiscLocations([]); setMatchState('waiting_for_qr'); setViewMode3D(false);
                          }} className="w-full bg-transparent text-white/50 py-3 rounded-xl font-bold uppercase tracking-widest text-xs border border-white/10 hover:bg-white/10 hover:text-white transition-all">Scan Next Player</button>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-golf-dark relative overflow-hidden pt-32 pb-24 px-6">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.05),transparent_80%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors mb-8">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 italic">Privacy Policy</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-12">Last Updated: September 2026</p>

          <div className="space-y-8 text-sm text-white/70 leading-relaxed">
            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">1. Data Controller</h2>
              <p>The Data Controller for your personal data is <strong>FairwayOS Sp. z o.o.</strong> based in Poland (ul. Gospodarcza 26, 20-213 Lublin). You can contact us regarding your data privacy via email contact@fairwayos.tech.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">2. Data We Collect, Purpose & Legal Basis</h2>
              <p>When you join our waitlist, we collect your email address. We process this data solely to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Manage your spot on the Early Access Waitlist and notify you about product launches (<strong>Legal basis:</strong> Your consent - Art. 6(1)(a) GDPR).</li>
                <li>Analyze aggregated, anonymous demand statistics for B2B partnerships (<strong>Legal basis:</strong> Legitimate interest - Art. 6(1)(f) GDPR).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">3. Data Storage & Retention Period</h2>
              <p>Your data is securely stored using <strong>Google Workspace (Google Sheets)</strong>, a GDPR-compliant cloud infrastructure provider. We do not sell your personal data to any third parties.</p>
              <p className="mt-2"><strong>Retention Period:</strong> We will store your email address until the official product launch or until you withdraw your consent, whichever comes first.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">4. Cookies & Analytics</h2>
              <p>We use cookies and similar technologies to measure website traffic and analyze how visitors interact with our platform. These insights help us optimize user experience and evaluate interest in our technology. You can control or disable cookies at any time through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">5. Your GDPR Rights & Complaints</h2>
              <p>Under the GDPR, you have the right to access, rectify, or erase your personal data, as well as restrict or object to its processing. You also have the right to withdraw your consent at any time.</p>
              <p className="mt-2">If you believe your data is being processed unlawfully, you have the <strong>right to lodge a complaint with the supervisory authority</strong> (in Poland: Prezes Urzędu Ochrony Danych Osobowych - PUODO, ul. Stawki 2, 00-193 Warszawa).</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const TermsOfService = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-golf-dark relative overflow-hidden pt-32 pb-24 px-6">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.05),transparent_80%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors mb-8">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="glass p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 italic">Terms of Service</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-12">Last Updated: September 2026</p>

          <div className="space-y-8 text-sm text-white/70 leading-relaxed">
            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">1. Overview & Acceptance</h2>
              <p>Welcome to FairwayOS. By accessing or using our website, participating in our early access waitlist, or interacting with our services, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">2. Service Description & Early Access</h2>
              <p>FairwayOS provides smart telemetry, hardware-enabled tracking, and asynchronous competitive platforms for golf courses and players. The current web platform provides product previews, telemetry simulations, and an Early Access Waitlist. Features and specifications are subject to continuous evolution and testing.</p>
              <p className="mt-3 text-white/60">Participation in the waitlist is voluntary and free of charge. You may terminate your waitlist participation at any time by sending a request to our contact email.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">3. Intellectual Property</h2>
              <p>All trademarks, proprietary hardware designs, telemetry algorithms, software, graphical assets, and brand elements (including the FairwayOS name and logos) are the exclusive property of <strong>FairwayOS Sp. z o.o.</strong> or its licensors. Unauthorized copying, reverse engineering, or reproduction is strictly prohibited.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">4. Limitation of Liability</h2>
              <p>FairwayOS and its representatives provide this platform on an "as is" and "as available" basis without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
            </section>

            <section>
              <h2 className="text-golf-accent font-bold text-lg mb-3">5. Contact Information</h2>
              <p>The platform is operated by <strong>FairwayOS Sp. z o.o.</strong>, ul. Gospodarcza 26, 20-213 Lublin, Poland (NIP: 9462770292, KRS: 0001255179). For inquiries regarding these Terms of Service, please contact us at <a href="mailto:contact@fairwayos.tech" className="text-golf-accent hover:underline">contact@fairwayos.tech</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const getInitialView = (): 'landing' | 'infrastructure' | 'game' | 'privacy' | 'terms' => {
  if (typeof window === 'undefined') return 'landing';
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  if (path === '/disc-range') return 'game';
  if (path === '/privacy-policy' || path === '/privacy') return 'privacy';
  if (path === '/terms' || path === '/terms-of-service') return 'terms';
  if (path === '/infrastructure') return 'infrastructure';
  return 'landing';
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'infrastructure' | 'game' | 'privacy' | 'terms'>(getInitialView);
  
  // Zmienne do "powrotu" z infrastructure (było wcześniej)
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [returnTarget, setReturnTarget] = useState<string>('hero');
  
  // Zmienne do trybów Landing Page
  const [viewMode, setViewMode] = useState<'player' | 'investor'>('player');

  // NOWE: Zmienne do zapamiętywania stanu przed włączeniem Gry
  const [preGameView, setPreGameView] = useState<'landing' | 'infrastructure' | 'privacy' | 'terms'>('landing');
  const [savedScrollY, setSavedScrollY] = useState(0);

  // Obsługa przycisków Wstecz / Dalej w przeglądarce
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronizacja title i canonical tagu dla SEO
  useEffect(() => {
    let title = "FairwayOS | The Future of Golf: Smart Balls, UWB Telemetry & E-Sports";
    let canonical = "https://fairwayos.tech/";

    if (currentView === 'game') {
      title = "FairwayOS | Disc Range - Autonomous Target Lock & Match Radar";
      canonical = "https://fairwayos.tech/disc-range";
    } else if (currentView === 'privacy') {
      title = "FairwayOS | Privacy Policy";
      canonical = "https://fairwayos.tech/privacy-policy";
    } else if (currentView === 'terms') {
      title = "FairwayOS | Terms of Service";
      canonical = "https://fairwayos.tech/terms";
    } else if (currentView === 'infrastructure') {
      title = "FairwayOS | Technical Infrastructure & UWB Architecture";
      canonical = "https://fairwayos.tech/infrastructure";
    }

    document.title = title;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    }
  }, [currentView]);

  useEffect(() => {
    if (currentView === 'landing' && scrollTarget) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setScrollTarget(null);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentView, scrollTarget]);

  const handleViewModeChange = (mode: 'player' | 'investor') => {
    setViewMode(mode);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      if (window.location.pathname !== '/') {
        window.history.pushState({ view: 'landing' }, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      setScrollTarget(id);
      setCurrentView('landing');
      if (window.location.pathname !== '/') {
        window.history.pushState({ view: 'landing' }, '', '/');
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const openInfrastructure = (sourceId: string) => {
    setReturnTarget(sourceId);
    setCurrentView('infrastructure');
    window.history.pushState({ view: 'infrastructure' }, '', '/infrastructure');
  };

  // NOWA FUNKCJA: Otwieranie widoku gry i zapamiętywanie scrolla
  const handlePlayClick = () => {
    setSavedScrollY(window.scrollY); // Zapamiętujemy dokładną pozycję (piksele)
    setPreGameView(currentView === 'game' ? 'landing': currentView);
    setCurrentView('game');
    if (window.location.pathname !== '/disc-range') {
      window.history.pushState({ view: 'game' }, '', '/disc-range');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // NOWA FUNKCJA: Zamykanie gry i powrót do dokładnego miejsca
  const handleExitGame = () => {
    setCurrentView(preGameView);
    const targetUrl = preGameView === 'landing' ? '/' : preGameView === 'privacy' ? '/privacy-policy' : preGameView === 'terms' ? '/terms' : preGameView === 'infrastructure' ? '/infrastructure' : '/';
    window.history.pushState({ view: preGameView }, '', targetUrl);
    // Używamy setTimeout, żeby DOM zdążył się przemapować przed próbą scrollowania
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    }, 50);
  };
  const handlePrivacyClick = () => {
    setCurrentView('privacy');
    window.history.pushState({ view: 'privacy' }, '', '/privacy-policy');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleTermsClick = () => {
    setCurrentView('terms');
    window.history.pushState({ view: 'terms' }, '', '/terms');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.history.pushState({ view: 'landing' }, '', '/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return (
    <div className="min-h-screen selection:bg-golf-accent selection:text-golf-dark">
      {/* Navbar ładuje się warunkowo w środku GameLanding, dla reszty jest tutaj */}
      {currentView !== 'game' && (
        <Navbar 
          onNavClick={handleNavClick} 
          showLinks={currentView === 'landing'} 
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onPlayClick={handlePlayClick}
          isGameView={false}
        />
      )}
      
      <AnimatePresence mode="wait">
        {currentView === 'privacy' ? (
          <motion.div
            key="privacy-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <PrivacyPolicy onBack={handleBackToLanding} />
          </motion.div>
        ) : currentView === 'terms' ? (
          <motion.div
            key="terms-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <TermsOfService onBack={handleBackToLanding} />
          </motion.div>
        ) : currentView === 'game' ? (
          <motion.div
            key="game-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <GameLanding onBack={handleExitGame} />
          </motion.div>
        ) : currentView === 'landing' ? (
          <motion.div
            key={`landing-${viewMode}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {/* PRZEKŁADKA GRACZ vs INWESTOR */}
            {viewMode === 'player' ? (
              <PlayerLanding onPrivacyClick={handlePrivacyClick} onTermsClick={handleTermsClick} />
            ) : (
              <>
                <Hero />
                <YouTubeVideoSection 
                  subtitle="See it in action" 
                  title="A Game Changer" 
                  videoId="dQw4w9WgXcQ" 
                />
                <section id="vision" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-golf-dark">
              <div className="absolute top-0 left-0 w-full h-full bg-golf-accent/[0.03] -z-10" />
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
                    The Problem: Golf is Analog
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 italic">Decoupling <span className="text-golf-accent font-black tracking-tighter">Latency.</span></h2>
                  <p className="text-white/40 max-w-2xl mx-auto italic font-light text-base md:text-lg">
                    Players lose ~5 minutes per shot searching for balls, causing massive bottlenecks ("Pace of Play" issues) that cost courses tens of thousands in lost Tee Times.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <FeatureCard 
                    icon={Zap}
                    title="End Analog Play"
                    desc="No more searching for lost balls in the rough. We digitize the game to ensure continuous flow, instantly locating every shot."
                    delay={0.1}
                    actionText="See Hardware Solution"
                    onAction={() => openInfrastructure('vision')} // Zapamięta 'vision'
                  />
                  <FeatureCard 
                    icon={BarChart3}
                    title="Trackman In Your Pocket"
                    desc="Professional analytics are locked behind $25k stationary simulators. We democratize this, putting pro-grade data in every player's pocket."
                    delay={0.2}
                    actionText="See Telemetry UI"
                    onAction={() => {
                      const el = document.getElementById('tech');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                  <FeatureCard 
                    icon={Globe}
                    title="Fair Global Competition"
                    desc="A golfer fighting wind in Poland can't be fairly compared to one in sunny Spain. We change that, enabling true global e-sports."
                    delay={0.3}
                    actionText="Discover AI Engine"
                    onAction={() => openInfrastructure('vision')} // Otworzy podstronę Deep Tech
                  />
                </div>
              </div>
            </section>

            {/* TECH SHOWCASE (Aplikacja na telefonie) */}
            <TechShowcase onLearnMore={() => openInfrastructure('tech')} />
            
            {/* B2B */}
            <OwnerBenefitsSection />

            {/* B2C LIGI */}
            <LeaguesSection />

            {/* BUSINESS MODEL */}
            {/* Upewnij się, że masz tu wklejony komponent BusinessSection z poprzedniej odpowiedzi */}
            <BusinessSection />
            </>
            )}

            {/* 7. LEADERSHIP & INVESTMENT ASK */}
            <section id="leadership-section" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden border-t border-white/5">
              <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
              <div className="max-w-7xl mx-auto relative z-10">
                <div id="leadership" className="max-w-4xl mx-auto">
                  <h3 className="text-xl font-bold mb-10 md:mb-14 uppercase tracking-widest text-golf-accent flex items-center justify-center gap-3">
                    <div className="w-2 h-2 bg-golf-accent rounded-full shadow-[0_0_8px_#a3e635]" />
                    Founding Team
                  </h3>
                  <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                    <div className="relative group text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <h4 className="text-3xl font-bold transition-colors">Hugo Piber-Dąbrowski</h4>
                        <a href="https://www.linkedin.com/in/hugo-piber-dąbrowski-b4b96231a/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5]/10 text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white">
                          <Linkedin size={14} />
                        </a>
                      </div>
                      <p className="text-sm text-white/40 uppercase tracking-widest mb-3 font-medium">CEO & R&D Lead | Big Data @ SGH</p>
                      <p className="text-xs text-white/30 mb-6 italic leading-relaxed max-w-sm mx-auto">
                        RL Algorithms for CAPEX optimization & UWB Mesh.
                        <br />
                        Currently Technology Consultant @ EY.
                      </p>
                    </div>
                    <div className="relative group text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <h4 className="text-3xl font-bold transition-colors">Juliusz Grzybowski</h4>
                        <a href="https://www.linkedin.com/in/juliusz-grzybowski/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5]/10 text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white">
                          <Linkedin size={14} />
                        </a>
                      </div>
                      <p className="text-sm text-white/40 uppercase tracking-widest mb-3 font-medium">COO & Mobile Dev | Big Data @ SGH</p>
                      <p className="text-xs text-white/30 mb-6 italic leading-relaxed max-w-sm mx-auto">
                        Business Analytics & Flutter Developer.
                        <br />
                        Currently Data Analyst @ PAYBACK.
                      </p>
                    </div>
                  </div>

                  {/* Centralny kontakt firmowy */}
                  <div className="mt-14 text-center">
                    <a 
                      href="mailto:contact@fairwayos.tech"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-golf-accent/30 bg-golf-accent/5 hover:bg-golf-accent/15 text-golf-accent text-sm font-mono tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.15)] group"
                    >
                      <Mail size={16} className="group-hover:scale-110 transition-transform" />
                      <span>contact@fairwayos.tech</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </motion.div>
        ) : (
          <InfrastructureView onBack={() => {
            setScrollTarget(returnTarget);
            setCurrentView('landing');
            window.history.pushState({ view: 'landing' }, '', '/');
          }} />
        )}
      </AnimatePresence>

      <footer className={`py-12 md:py-16 px-6 border-t border-white/5 text-center relative overflow-hidden ${currentView === 'infrastructure' ? 'bg-black/30' : 'bg-golf-dark'}`}>
        <div className="flex justify-center items-center gap-3 mb-6 md:mb-8">
          <div className="relative">
            <div className="w-8 h-8 bg-golf-accent rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.5)]">
              <div className="w-2 h-2 bg-golf-dark rounded-full shadow-inner" />
            </div>
            <div className="absolute inset-0 bg-golf-accent blur-md opacity-30 -z-10" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">Fairway<span className="text-golf-accent">OS</span></span>
        </div>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-4">Deep Tech from Poland | Scaling to USA</p>
        
        <div className="flex flex-col items-center justify-center gap-2 mb-5 text-xs text-white/40">
          <a 
            href="/privacy-policy" 
            onClick={(e) => {
              e.preventDefault();
              handlePrivacyClick();
            }} 
            className="hover:text-golf-accent transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            onClick={(e) => {
              e.preventDefault();
              handleTermsClick();
            }} 
            className="hover:text-golf-accent transition-colors underline-offset-4 hover:underline cursor-pointer"
          >
            Terms of Service
          </a>
        </div>

        <p className="text-white/40 text-[10px]">© 2026 FairwayOS. All rights reserved.</p>
      </footer>
      <Analytics />
    </div>
  );
}