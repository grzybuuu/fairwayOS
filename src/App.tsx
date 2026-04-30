import { motion, AnimatePresence } from "motion/react";
import { Cpu, Globe, Trophy, Smartphone, MapPin, Zap, ChevronRight, BarChart3, Database, ShieldCheck, Activity, Target, Layers, Linkedin, ArrowUpRight, Timer } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { useState, useEffect, useRef } from "react";
import React from "react";

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
    <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-golf-accent/30 rounded-tl-3xl" />
    <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-golf-accent/30 rounded-tr-3xl" />
    <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-golf-accent/30 rounded-bl-3xl" />
    <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-golf-accent/30 rounded-br-3xl" />
  </div>
);

const Navbar = ({ onNavClick, showLinks }: { onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void, showLinks: boolean }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 backdrop-blur-lg border-b border-white/5 bg-black/20">
    <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => onNavClick(e as any, 'hero')}>
      <div className="w-8 h-8 bg-golf-accent rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-golf-dark rounded-full shadow-[0_0_8px_white]" />
      </div>
      <span className="font-display font-bold text-xl tracking-tighter text-white">Fairway<span className="text-golf-accent">OS</span></span>
    </div>
    {showLinks && (
      <div className="hidden md:flex gap-8 text-sm font-medium text-white/70 uppercase tracking-widest">
        <a href="#vision" onClick={(e) => onNavClick(e, 'vision')} className="hover:text-white transition-colors">Vision</a>
        <a href="#tech" onClick={(e) => onNavClick(e, 'tech')} className="hover:text-white transition-colors">Technology</a>
        <a href="#leagues" onClick={(e) => onNavClick(e, 'leagues')} className="hover:text-white transition-colors">Leagues</a>
        <a href="#business" onClick={(e) => onNavClick(e, 'business')} className="hover:text-white transition-colors">Business</a>
      </div>
    )}
    <a 
      href="#leadership" 
      onClick={(e) => onNavClick(e, 'leadership')}
      className="bg-white text-golf-dark px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-golf-accent transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10 text-center"
    >
      Contact Us
    </a>
  </nav>
);

const Hero = ({ onSlideComplete }: { onSlideComplete: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sliderPos, setSliderPos] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
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
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-16 h-16 bg-golf-accent rounded-2xl rotate-12 flex items-center justify-center shadow-[0_0_30px_rgba(163,230,53,0.3)] group-hover:rotate-0 transition-transform duration-500">
                <div className="w-4 h-4 bg-golf-dark rounded-full shadow-[0_0_15px_white]" />
              </div>
              <div className="absolute inset-0 bg-golf-accent blur-xl opacity-20 -z-10" />
            </div>
            <span className="font-display font-black text-5xl md:text-6xl tracking-tighter uppercase italic">Fairway<span className="text-golf-accent">OS</span></span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
          <Zap size={12} /> Deep Tech from Poland | Scaling to USA
        </div>
        <h1 className="text-6xl md:text-9xl font-extrabold mb-6 leading-none selection:bg-white selection:text-black">
          The Future <br />
          <span className="text-gradient drop-shadow-[0_0_40px_rgba(163,230,53,0.4)]">Of Golf</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Autonomous Telemetry & Global E-sports Platform. <br />
          Transforming physical play into a high-precision digital experience.
        </p>

        {/* Slide to Explore Button */}
        <div className="relative w-64 md:w-80 h-16 glass-dark rounded-full border border-white/20 p-1 group mx-auto">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-x-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-white/50 transition-colors">
              {sliderPos > 200 ? "Release to Explore" : "Explore Ecosystem"}
            </span>
          </div>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 260 }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => setSliderPos(info.offset.x)}
            onDragEnd={(_, info) => {
              if (info.offset.x >= 250) {
                onSlideComplete();
              } else {
                setSliderPos(0);
              }
            }}
            animate={{ x: sliderPos === 0 ? 0 : undefined }}
            className="w-14 h-14 bg-golf-accent rounded-full flex items-center justify-center text-golf-dark cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(163,230,53,0.4)] relative z-10"
          >
            <ChevronRight size={24} />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #a3e635 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass p-8 rounded-3xl group hover:border-golf-accent/30 transition-all hover:-translate-y-2 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-golf-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-golf-accent/10 transition-colors" />
    <div className="w-12 h-12 rounded-2xl bg-golf-accent/10 flex items-center justify-center text-golf-accent mb-6 group-hover:bg-golf-accent group-hover:text-golf-dark transition-all duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/50 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

const TechShowcase = () => (
  <section id="tech" className="py-24 px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-golf-accent/5 blur-[150px] -z-10" />
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Digital Heart. <br />
            <span className="text-golf-accent text-gradient">Classic Form.</span>
          </h2>
          <p className="text-lg text-white/50 mb-12 font-light leading-relaxed">
            Our Smart Ball technology preserves the weight, flight, and feel of tour-grade balls while embedding high-precision sensors.
          </p>
          
          <div className="glass-dark p-6 rounded-3xl mb-12 border border-white/10">
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
              { label: "Latency", value: "<10ms", icon: Zap }
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
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="aspect-square relative"
          >
            <div className="absolute inset-0 bg-golf-accent/20 blur-[120px] rounded-full scale-75" />
            
            <div className="relative h-full w-full glass rounded-full flex items-center justify-center overflow-hidden border border-white/20 p-8">
              <div className="w-full h-full bg-white rounded-full shadow-[0_0_100px_rgba(255,255,255,0.4)] flex items-center justify-center relative inner-glow overflow-hidden">
                <img 
                  src="/telefon.png" 
                  alt="FairwayOS Mobile" 
                  className="w-full h-full object-cover mix-blend-multiply scale-110 group-hover:scale-125 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-8 border-dashed border-golf-accent/30 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
                <div className="absolute inset-10 border border-golf-dark/5 rounded-full" />
                
                <div className="absolute inset-12 opacity-80 pointer-events-none">
                  <Cpu className="text-golf-dark w-full h-full p-20 opacity-5" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-golf-accent rounded-full shadow-[0_0_20px_#a3e635]" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
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
    </div>
  </section>
);

const LeaguesSection = () => (
  <section id="leagues" className="py-24 px-6 bg-black/30 relative">
    <HUDOverlay />
    <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
       <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-neon/30 bg-golf-neon/5 text-golf-neon text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
         Global Networking
       </div>
       <h2 className="text-4xl md:text-7xl font-bold mb-6 italic">E-sports On <span className="text-golf-accent">Real Grass</span></h2>
       <p className="text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
         The distinction between physical and digital is gone. Play anytime, compete globally. 
         FairwayOS Leagues normalize course conditions for true competitive integrity.
       </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
      <div className="glass p-12 rounded-[2.5rem] border-t-2 border-t-white/10 group hover:bg-white/5 transition-colors">
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
        <button className="w-full bg-golf-accent text-golf-dark py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all hover:scale-[1.02] shadow-xl">Join Pro-Am</button>
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
          <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-golf-neon" /> Battery Health AI</li>
        </ul>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-24 border-y border-white/5 relative bg-golf-dark">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 px-6">
      {[
        { label: "Global Courses", value: "40k+" },
        { label: "Market Size", value: "$13B" },
        { label: "Target ROI", value: "9 Months" },
        { label: "Throughput", value: "+10%" }
      ].map((s, i) => (
        <div key={i} className="text-center group">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 group-hover:text-golf-accent transition-colors duration-500">{s.value}</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

const InfrastructureView = ({ onBack }: { onBack: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen bg-golf-dark"
    >
      {/* Main Core Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
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

        <div className="max-w-7xl mx-auto relative z-10">
          <button onClick={onBack} className="flex items-center gap-2 text-golf-accent font-bold uppercase text-xs tracking-widest mb-12 hover:translate-x-[-4px] transition-transform">
            <ChevronRight size={16} className="rotate-180" /> Back to Overview
          </button>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xl font-mono text-golf-accent mb-4 tracking-widest uppercase">Ecosystem Core</div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8">Marker Posts & <br /><span className="text-gradient">UWB Mesh</span></h2>
              <p className="text-xl text-white/50 leading-relaxed font-light mb-10">
                Our solar-powered marker posts create an autonomous tracking layer across the entire golf course. Using Ultra-Wideband (UWB) mesh technology, we achieve centimeter-level accuracy without requiring active staff management.
              </p>
              <div className="grid gap-6">
                <div className="glass p-6 rounded-2xl flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-golf-accent/10 flex items-center justify-center text-golf-accent">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">Solar Autonomy</h4>
                    <p className="text-xs text-white/40">Zero-touch infrastructure powered by the sun.</p>
                  </div>
                </div>
                <div className="glass p-6 rounded-2xl flex items-center gap-6">
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
            <div className="relative aspect-[4/5] glass rounded-[4rem] flex items-center justify-center border border-white/10 overflow-hidden shadow-2xl bg-black/40 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="/budowa.png" 
                alt="Hardware Infrastructure" 
                className="w-full h-full object-contain p-4 pb-24 group-hover:scale-105 transition-transform duration-700 -translate-y-4"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-golf-dark via-golf-dark/80 to-transparent pointer-events-none">
                 <div className="text-3xl font-mono text-golf-accent font-bold mb-1 tracking-tighter">SOLAR_MESH:01</div>
                 <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Autonomous Tracking Marker Post</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Logistics Section */}
      <section className="py-32 px-6 bg-black/40 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-golf-accent/5 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold tracking-tight mb-4 italic">Operational <span className="text-golf-accent">Logistics</span></h3>
            <p className="text-white/30 text-sm uppercase tracking-[0.4em] font-bold">Scaling physical efficiency with AI</p>
          </div>
          <div className="glass p-8 rounded-[3rem] border border-white/5 overflow-hidden relative group h-[400px] mb-8">
             <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity">
                <LoopingVideo src="/animacja.mp4" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-golf-dark via-transparent to-golf-dark/40" />
             </div>
             <div className="relative z-10 h-full flex flex-col justify-center max-w-xl">
                <div className="text-golf-accent font-mono text-[10px] tracking-[0.5em] mb-4 uppercase font-bold">Live Flow Visualization</div>
                <h3 className="text-4xl font-bold mb-6 italic">Dynamic Ecosystem <br />Synchronization.</h3>
                <p className="text-white/50 font-light text-lg leading-relaxed">
                   Witness the seamless coordination between hardware mesh and cloud telemetry. Real-time data loops ensure parity between the physical ball strike and digital scorecards.
                </p>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-12 rounded-[3rem] hover:bg-white/5 transition-colors border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/hive.png" 
                  alt="Smart Hive Infrastructure" 
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-golf-dark/80 via-golf-dark/20 to-transparent" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Smart Hive</h3>
                <p className="text-white/50 mb-8 font-light text-lg">The central logistics point for the FairwayOS ecosystem. Our automated ball rental kiosks handle everything from locker distribution to battery life management.</p>
                <div className="flex gap-4">
                   <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold">QR Pick-up</div>
                   <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold">AI Stocking</div>
                </div>
              </div>
            </div>
            <div className="glass p-12 rounded-[3rem] hover:bg-white/5 transition-colors border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/caddie.png" 
                  alt="AI Caddie Interface" 
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-golf-dark/80 via-golf-dark/20 to-transparent" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">AI Caddie</h3>
                <p className="text-white/50 mb-8 font-light text-lg">Your personal strategist on the course. Real-time swing analysis and club recommendations based on live radar-class telemetry in your pocket.</p>
                <div className="flex gap-4">
                   <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold">Trackman SDK</div>
                   <div className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold">Pro-Grade Stats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'infrastructure'>('landing');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Wait for transition
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen selection:bg-golf-accent selection:text-golf-dark">
      <Navbar onNavClick={handleNavClick} showLinks={currentView === 'landing'} />
      
      <AnimatePresence mode="wait">
        {currentView === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onSlideComplete={() => setCurrentView('infrastructure')} />
            <StatsSection />
            
            <section id="vision" className="py-24 px-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-golf-accent/5 -z-10" />
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">Decoupling <span className="text-golf-accent">Latency.</span></h2>
                  <p className="text-white/40 max-w-xl mx-auto italic font-light">The analog world is too slow. FairwayOS digitizes the game in real-time, removing the friction from the fairway.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <FeatureCard 
                    icon={Zap}
                    title="End Analog Play"
                    desc="No more 5-minute searches for lost balls. Experience continuous flow on the course."
                    delay={0.1}
                  />
                  <FeatureCard 
                    icon={BarChart3}
                    title="Trackman In Pocket"
                    desc="Radar-class statistics across the entire field, not just the range. Every strike recorded."
                    delay={0.2}
                  />
                  <FeatureCard 
                    icon={Globe}
                    title="Global Competition"
                    desc="Compete with players across the world regardless of local weather or terrain. Normalization via AI."
                    delay={0.3}
                  />
                </div>
              </div>
            </section>

            <TechShowcase />
            <LeaguesSection />

            <section id="business" className="py-24 px-6 overflow-hidden">
              <div className="max-w-7xl mx-auto glass p-12 md:p-24 rounded-[4rem] relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-golf-accent/10 blur-[100px] -z-10" />
                <div className="grid md:grid-cols-2 gap-20 items-center">
                  <div>
                    <div className="text-golf-accent font-mono text-sm tracking-[0.4em] mb-4 uppercase">Commercial Strategy</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Stability & Scalability.</h2>
                    <p className="text-white/50 mb-10 font-light text-lg leading-relaxed">
                      FairwayOS offers a predictable revenue model for course owners while opening new monetization channels through global leagues.
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-golf-accent group-hover:bg-golf-accent group-hover:text-golf-dark transition-all">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <div className="font-bold">B2B SaaS Model</div>
                          <div className="text-sm text-white/40">$2,500/mo subscription per course</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-golf-accent group-hover:bg-golf-accent group-hover:text-golf-dark transition-all">
                          <Activity size={18} />
                        </div>
                        <div>
                          <div className="font-bold">Tournament Marketplace</div>
                          <div className="text-sm text-white/40">10-15% commission on league fees</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-golf-accent group-hover:bg-golf-accent group-hover:text-golf-dark transition-all">
                          <Trophy size={18} />
                        </div>
                        <div>
                          <div className="font-bold">Hardware Payback</div>
                          <div className="text-sm text-white/40">ROI achieved in approximately 9 months</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="leadership" className="md:border-l border-white/10 md:pl-20">
                    <h3 className="text-xl font-bold mb-10 uppercase tracking-widest text-golf-accent flex items-center gap-3">
                      <div className="w-2 h-2 bg-golf-accent rounded-full shadow-[0_0_8px_#a3e635]" />
                      Leadership
                    </h3>
                    <div className="space-y-12">
                      <div className="relative group">
                        <div className="flex items-center gap-3">
                          <h4 className="text-2xl font-bold transition-colors">Hugo Piber-Dąbrowski</h4>
                          <a href="https://www.linkedin.com/in/hugo-piber-dąbrowski-b4b96231a/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5]/10 text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white">
                            <Linkedin size={14} />
                          </a>
                        </div>
                        <p className="text-sm text-white/40 uppercase tracking-widest mt-2 font-medium">AI & R&D Lead | Big Data @ SGH</p>
                        <p className="text-xs text-white/20 mt-2 italic">Expert in RL Algorithms & UWB Mesh Networks</p>
                        <div className="mt-4 space-y-1">
                          <p className="text-xs text-golf-accent/70 font-mono">hugo@fairwayos.com</p>
                          <p className="text-xs text-white/40 font-mono">+48 500 000 000</p>
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="flex items-center gap-3">
                          <h4 className="text-2xl font-bold transition-colors">Juliusz Grzybowski</h4>
                          <a href="https://www.linkedin.com/in/juliusz-grzybowski/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5]/10 text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white">
                            <Linkedin size={14} />
                          </a>
                        </div>
                        <p className="text-sm text-white/40 uppercase tracking-widest mt-2 font-medium">CFO & Mobile Dev | Big Data @ SGH</p>
                        <p className="text-xs text-white/20 mt-2 italic">Specializing in Business Analytics & Flutter</p>
                        <div className="mt-4 space-y-1">
                          <p className="text-xs text-golf-accent/70 font-mono">juliusz@fairwayos.com</p>
                          <p className="text-xs text-white/40 font-mono">+48 600 000 000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <InfrastructureView onBack={() => setCurrentView('landing')} />
        )}
      </AnimatePresence>

      <footer className="py-24 px-6 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
        <div className="flex justify-center items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-golf-accent/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-golf-accent rounded-full shadow-[0_0_10px_theme('colors.golf.accent')]" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">Fairway<span className="text-golf-accent">OS</span></span>
        </div>
        <div className="flex justify-center gap-10 mb-12 text-xs font-bold uppercase tracking-widest text-white/40">
          <a href="#" className="hover:text-golf-accent">Privacy</a>
          <a href="#" className="hover:text-golf-accent">Terms</a>
          <a href="#" className="hover:text-golf-accent">Press Kit</a>
        </div>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-4">Deep Tech from Poland | Scaling to USA</p>
        <p className="text-white/40 text-[10px]">© 2026 FairwayOS Technologies. ALL DATA ENCRYPTED.</p>
      </footer>
    </div>
  );
}
