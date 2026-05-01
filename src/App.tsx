import { motion, AnimatePresence } from "motion/react";
import { Cpu, Globe, Trophy, Smartphone, MapPin, Zap, ChevronRight, BarChart3,
Database, ShieldCheck, Activity, Target, Layers, Linkedin, ArrowUpRight, Timer,
TrendingUp, Clock, Users, Network, Brain } from "lucide-react";
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
    <div className="absolute top-20 left-10 w-20 h-20 border-t-2 border-l-2 border-golf-accent/30 rounded-tl-3xl" />
    <div className="absolute top-20 right-10 w-20 h-20 border-t-2 border-r-2 border-golf-accent/30 rounded-tr-3xl" />
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
        <a href="#tech" onClick={(e) => onNavClick(e, 'tech')} className="hover:text-white transition-colors">Deep Tech</a>
        <a href="#facility-owners" onClick={(e) => onNavClick(e, 'facility-owners')} className="hover:text-white transition-colors">B2B</a>
        <a href="#leagues" onClick={(e) => onNavClick(e, 'leagues')} className="hover:text-white transition-colors">B2C E-Sport</a>
        <a href="#business" onClick={(e) => onNavClick(e, 'business')} className="hover:text-white transition-colors">Business Model</a>
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

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Scroll to Explore</span>
          <div className="w-[2px] h-12 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div 
              animate={{ 
                y: [0, 48, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
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
};

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
  <section id="facility-owners" className="py-32 px-6 relative overflow-hidden bg-golf-dark border-t border-white/5">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-24">
        <h3 className="text-xl font-bold mb-6 uppercase tracking-[0.3em] text-golf-accent font-display">Strategic Partnership</h3>
        <h2 className="text-5xl md:text-7xl font-bold mb-8 italic">Maximize ROI. <br /><span className="text-white/40">Elevate Prestige.</span></h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
          FairwayOS transforms traditional golf courses into high-utilization tech hubs, maximizing throughput while offering unprecedented player analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            desc: "Increase daily slots by ~10% with faster ball search and transit on the course",
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
          <div key={i} className="glass-dark p-8 rounded-[2.5rem] border border-white/10 hover:border-golf-accent/30 transition-all group">
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
  <section id="tech" className="py-32 px-6 relative overflow-hidden bg-black/30 border-t border-white/5">
    <HUDOverlay />
    <div className="absolute top-0 right-0 w-1/2 h-full bg-golf-accent/5 blur-[150px] -z-10" />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      style={{ backgroundImage: 'radial-gradient(circle, #a3e635 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
    />
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Digital Heart. <br />
            <span className="text-golf-accent text-gradient">Classic Form.</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 font-light leading-relaxed font-display">
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
              <div className="w-full h-full bg-white rounded-full shadow-[0_0_100px_rgba(255,255,255,0.4)] flex items-center justify-center relative inner-glow overflow-hidden">
                <img 
                  src="/telefon.png" 
                  alt="FairwayOS Mobile" 
                  className="w-full h-full object-cover mix-blend-multiply"
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

      <div className="mt-20 flex justify-center">
        <button 
          id="learn-more-trigger"
          onClick={onLearnMore}
          className="inline-flex items-center gap-4 bg-white/5 hover:bg-golf-accent hover:text-golf-dark text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all border border-white/10 hover:border-golf-accent hover:scale-105 active:scale-95 group shadow-2xl"
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
  <section id="ai-tech" className="py-32 px-6 relative overflow-hidden bg-black/50 border-t border-white/5">
    <div className="absolute top-0 left-0 w-1/2 h-full bg-golf-accent/5 blur-[150px] -z-10" />
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          Proprietary Algorithms
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">The Brain: <span className="text-white/40">AI & RL</span></h2>
        <p className="text-white/50 max-w-2xl mx-auto font-light text-lg">
          Deep tech isn't just hardware. Our proprietary Reinforcement Learning (RL) models are the core of our business viability and competitive integrity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* RL for CAPEX */}
        <div className="glass p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(163,230,53,0.05),transparent_50%)]" />
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-golf-accent mb-8">
            <Network size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-4">RL for CAPEX Optimization</h3>
          <h4 className="text-xs font-mono text-golf-accent mb-6 uppercase tracking-widest">Business Viability Engine</h4>
          <p className="text-white/50 leading-relaxed font-light mb-6">
            Deploying a dense sensor network on a 100-hectare golf course is expensive. We trained an RL algorithm to simulate millions of RF wave propagation scenarios across difficult terrain (trees, hills).
          </p>
          <div className="p-4 rounded-2xl bg-golf-accent/5 border border-golf-accent/20">
            <p className="text-sm text-white/80 font-medium">
              Result: We reduced the required number of physical hardware anchors by <span className="text-golf-accent font-bold">~40%</span> compared to standard geometric grids, making our B2B SaaS model highly profitable.
            </p>
          </div>
        </div>

        {/* AI Normalization */}
        <div className="glass-dark p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_50%)]" />
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-8">
            <Brain size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-4">"Stockfish for Golf"</h3>
          <h4 className="text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">AI Normalization Engine</h4>
          <p className="text-white/50 leading-relaxed font-light mb-6">
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
  <section id="business" className="py-24 px-6 overflow-hidden bg-golf-dark relative">
    <div className="max-w-7xl mx-auto glass p-12 md:p-24 rounded-[4rem] relative overflow-hidden border border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-golf-accent/5 blur-[120px] -z-10" />
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="text-golf-accent font-mono text-sm tracking-[0.4em] mb-4 uppercase">Business Model & Scalability</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">B2B2C <span className="text-white">Revenue Synergy.</span></h2>
          <p className="text-white/50 mb-10 font-light text-lg leading-relaxed">
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
        
        <div className="glass-dark p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-golf-accent/5 blur-3xl" />
           <h3 className="text-2xl font-bold mb-8 italic">Financial Projections (Y5)</h3>
           <div className="space-y-8">
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
              <div className="grid grid-cols-2 gap-6">
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
  <section id="leagues" className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
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
                  <div className="w-12 h-12 rounded-xl bg-golf-accent/10 flex items-center justify-center text-golf-accent shrink-0">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">-40% CAPEX Reduction</h4>
                    <p className="text-xs text-white/40">Our Reinforcement learning algorithms optimize anchor placement, drastically reducing hardware costs compared to standard geometric grids.</p>
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

      {/* Smart Ball Section */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-golf-accent/5 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative aspect-square lg:h-[600px] w-full glass rounded-[4rem] border border-white/10 overflow-hidden group bg-black/20 flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.1),transparent_70%)] animate-pulse" />
               <img 
                 src="/ball.png" 
                 alt="Smart Ball Technology" 
                 className="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_0_35px_rgba(163,230,53,0.2)]"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 border-[20px] border-white/[0.02] rounded-[4rem] pointer-events-none" />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="text-xl font-mono text-golf-accent mb-4 tracking-widest uppercase">The Hardware</div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 italic">Smart <span className="text-golf-accent">Ball.</span></h2>
              <p className="text-xl text-white/50 leading-relaxed font-light mb-10">
                A professional golf ball re-engineered for the digital age. By transmitting UWB signals at 100 Hz to the marker posts, it enables precise real-time 3D trajectory tracking across the entire course.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                 {['Tour-Grade Polyurethane', '3-Piece Core', 'Micro-Telemetry Unit'].map((tag, i) => (
                    <div key={i} className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest bg-white/5">{tag}</div>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 glass rounded-2xl border border-white/5">
                   <div className="text-3xl font-black text-white mb-1">3000G</div>
                   <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Impact Resistance</div>
                </div>
                <div className="p-6 glass rounded-2xl border border-white/5">
                   <div className="text-3xl font-black text-golf-accent mb-1">20H+</div>
                   <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Battery Life</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32 px-6 bg-black/40 border-t border-white/5 relative overflow-hidden">
        <HUDOverlay />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">"Stockfish <span className="text-white/40">for Golf"</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light text-lg">
              Hardware simply collects data. Our AI Normalization Engine gives it meaning, replacing flawed, static handicap systems.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-dark p-12 rounded-[3rem] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <Brain size={48} className="text-golf-accent/20" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Normalization Engine</h3>
            <p className="text-white/50 leading-relaxed font-light mb-8 text-lg">
              It simulates optimal play using real-time 3D topography, wind, and moisture, evaluating shots through reinforcement learning–based agent gameplay rather than raw physical outcomes. It builds a shot quality map of the course, showing the best plays from any position, forming the foundation for an AI caddie.
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <Globe className="text-golf-accent shrink-0 mt-1" size={20} />
              <p className="text-sm text-white/80 font-medium leading-relaxed">
                <span className="text-golf-accent font-bold">The E-sports Enabler:</span> A player fighting a storm in Poland can now be fairly and mathematically ranked against a player in sunny Spain. This is the foundation of our global B2C leagues.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Secondary Logistics Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-black/40 to-golf-dark border-t border-white/5 relative overflow-hidden">
        <HUDOverlay />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-golf-accent/5 blur-[150px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          {/* Animacja na całą szerokość, pełniąca rolę wizualnego finału */}
          <div className="glass p-8 md:p-16 rounded-[3rem] border border-white/5 overflow-hidden relative group min-h-[500px] flex items-center">
             <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-70 transition-opacity duration-1000">
                <LoopingVideo src="/animacja.mp4" className="w-full h-full object-cover" />
                {/* Gradient przyciemniający, żeby tekst był czytelny */}
                <div className="absolute inset-0 bg-gradient-to-r from-golf-dark via-golf-dark/60 to-transparent" />
             </div>
             
             <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-golf-accent/30 bg-golf-accent/5 text-golf-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  Live Flow Visualization
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 italic">Dynamic Ecosystem <br />Synchronization.</h3>
                <p className="text-white/50 font-light text-lg leading-relaxed mb-8">
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

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'infrastructure'>('landing');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  // Dodany stan do pamiętania skąd kliknięto "Learn more"
  const [returnTarget, setReturnTarget] = useState<string>('hero');

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      setScrollTarget(id);
      setCurrentView('landing');
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openInfrastructure = (sourceId: string) => {
    setReturnTarget(sourceId);
    setCurrentView('infrastructure');
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
            <Hero />
            
            {/* WIZJA */}
            <section id="vision" className="py-24 px-6 relative overflow-hidden bg-golf-dark">
              <div className="absolute top-0 left-0 w-full h-full bg-golf-accent/[0.03] -z-10" />
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                    The Problem: Golf is Analog
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 italic">Decoupling <span className="text-golf-accent font-black tracking-tighter">Latency.</span></h2>
                  <p className="text-white/40 max-w-2xl mx-auto italic font-light text-lg">
                    Players lose ~5 minutes per shot searching for balls, causing massive bottlenecks ("Pace of Play" issues) that cost courses tens of thousands in lost Tee Times.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
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


            {/* 7. LEADERSHIP & INVESTMENT ASK */}
            <section id="leadership-section" className="py-32 px-6 relative overflow-hidden border-t border-white/5">
              <div className="absolute inset-0 bg-golf-accent/5 -z-10" />
              <div className="max-w-7xl mx-auto relative z-10">
                <div id="leadership" className="max-w-4xl mx-auto">
                  <h3 className="text-xl font-bold mb-16 uppercase tracking-widest text-golf-accent flex items-center justify-center gap-3">
                    <div className="w-2 h-2 bg-golf-accent rounded-full shadow-[0_0_8px_#a3e635]" />
                    Founding Team
                  </h3>
                  <div className="grid md:grid-cols-2 gap-20">
                    <div className="relative group text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <h4 className="text-3xl font-bold transition-colors">Hugo Piber-Dąbrowski</h4>
                        <a href="https://www.linkedin.com/in/hugo-piber-dąbrowski-b4b96231a/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5]/10 text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white">
                          <Linkedin size={14} />
                        </a>
                      </div>
                      <p className="text-sm text-white/40 uppercase tracking-widest mb-3 font-medium">CEO & R&D Lead | Big Data @ SGH</p>
                      <p className="text-xs text-white/20 mb-6 italic leading-relaxed max-w-sm mx-auto">RL Algorithms for CAPEX optimization & UWB Mesh. Currently in-house technology consultant @ Otto Alte-Teigeler GMBH.</p>
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-golf-accent/70 font-mono">hugopdmat@gmail.com</p>
                        <p className="text-xs text-white/40 font-mono">+48 123 456 789</p>
                      </div>
                    </div>
                    <div className="relative group text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <h4 className="text-3xl font-bold transition-colors">Juliusz Grzybowski</h4>
                        <a href="https://www.linkedin.com/in/juliusz-grzybowski/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077b5]/10 text-[#0077b5] transition-all hover:bg-[#0077b5] hover:text-white">
                          <Linkedin size={14} />
                        </a>
                      </div>
                      <p className="text-sm text-white/40 uppercase tracking-widest mb-3 font-medium">COO & Mobile Dev | Big Data @ SGH</p>
                      <p className="text-xs text-white/20 mb-6 italic leading-relaxed max-w-sm mx-auto">Business Analytics & Flutter Developer. Currently Data Analyst @ Oriflame (Supply chain & Finance).</p>
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-xs text-golf-accent/70 font-mono">julek.grzybowski@gmail.com</p>
                        <p className="text-xs text-white/40 font-mono">+48 123 456 789</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </motion.div>
        ) : (
          <InfrastructureView onBack={() => {
            setScrollTarget(returnTarget);
            setCurrentView('landing');
          }} />
        )}
      </AnimatePresence>

      <footer className="py-24 px-6 border-t border-white/5 text-center relative overflow-hidden bg-golf-dark">
        <div className="flex justify-center items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-golf-accent/20 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-golf-accent rounded-full shadow-[0_0_10px_theme('colors.golf.accent')]" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">Fairway<span className="text-golf-accent">OS</span></span>
        </div>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-4">Deep Tech from Poland | Scaling to USA</p>
        <p className="text-white/40 text-[10px]">© 2026 FairwayOS Technologies. ALL DATA ENCRYPTED.</p>
      </footer>
    </div>
  );
}