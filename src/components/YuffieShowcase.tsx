import React, { useEffect, useRef, useState } from 'react';
import { CornerDownLeft, Play, Pause, Volume2 } from 'lucide-react';

interface YuffieShowcaseProps {
  onBack: () => void;
}

class Petal {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  speedY: number = 0;
  speedX: number = 0;
  angle: number = 0;
  spin: number = 0;
  color: string = '';
  canvasWidth: number;
  canvasHeight: number;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.reset();
    // randomize y so they don't start all at the top
    this.y = Math.random() * height;
  }

  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = -10;
    this.size = Math.random() * 5 + 3;
    this.speedY = Math.random() * 0.7 + 0.3;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.angle = Math.random() * 360;
    this.spin = Math.random() * 0.8 - 0.4;
    
    const colors = [
      'rgba(239, 68, 68, 0.35)',  // red
      'rgba(249, 115, 22, 0.28)', // orange
      'rgba(254, 205, 211, 0.35)' // delicate rose/white
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(petalsParamX: number) {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y / 40) * 0.25 + (petalsParamX * 0.02);
    this.angle += this.spin;

    if (this.y > this.canvasHeight + 10 || this.x < -10 || this.x > this.canvasWidth + 10) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 1.8, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

export default function YuffieShowcase({ onBack }: YuffieShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Parallax Coordinates with Lerp
  const coordsRef = useRef({ mouseX: 0, mouseY: 0, charX: 0, charY: 0, petalsParamX: 0 });
  const [charTransform, setCharTransform] = useState('translate(0px, 0px)');

  // Audio Play status
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // Load custom fonts on mount if not loaded
  useEffect(() => {
    if (!document.getElementById('yuffie-fonts')) {
      const link = document.createElement('link');
      link.id = 'yuffie-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;900&family=Syncopate:wght@700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Parallax and canvas loop
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      coordsRef.current.mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      coordsRef.current.mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Setup Canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = containerRef.current?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Instantiate Petals
    const petals: Petal[] = [];
    const maxPetals = 35;
    for (let i = 0; i < maxPetals; i++) {
      petals.push(new Petal(canvas.width, canvas.height));
    }

    // Animation frames update loop
    const renderLoop = () => {
      // 1. Update parallax with smooth LERP
      const targetX = coordsRef.current.mouseX * 25;
      const targetY = coordsRef.current.mouseY * 18;
      
      coordsRef.current.charX += (targetX - coordsRef.current.charX) * 0.08;
      coordsRef.current.charY += (targetY - coordsRef.current.charY) * 0.08;
      coordsRef.current.petalsParamX += (-coordsRef.current.mouseX * 10 - coordsRef.current.petalsParamX) * 0.05;

      setCharTransform(`translate(${coordsRef.current.charX}px, ${coordsRef.current.charY}px)`);

      // 2. Draw petals on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        // adjust to current canvas boundaries
        p.canvasWidth = canvas.width;
        p.canvasHeight = canvas.height;
        p.update(coordsRef.current.petalsParamX);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Audio trigger systems
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio autoplay/play was prevented by the preview browser sandbox context', err));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = (clickX / width) * duration;
    audioRef.current.currentTime = newProgress;
    setCurrentTime(newProgress);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const percentProgress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative min-h-screen w-full bg-[#060608] flex items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Absolute Radial Overlay bg */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2b0404_0%,_#060608_100%)] pointer-events-none z-0" />

      {/* Floating Demo Sair helper on the top-left */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="liquid-glass rounded-full px-4 py-2 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
        >
          <CornerDownLeft className="h-3.5 w-3.5 text-brand-lime" />
          <span>Sair para o Portfólio</span>
        </button>
      </div>

      {/* Primary Kinetic interface container window */}
      <div
        ref={containerRef}
        className="w-full max-w-[1200px] h-auto lg:h-[620px] aspect-video border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-md shadow-2xl grid grid-cols-1 md:grid-cols-[45%_42%_13%] bg-[url('https://u.cubeupload.com/zmonochrome/tumblr8b1866a9355004.jpg')] bg-cover bg-center z-10"
      >
        {/* Border-less soft vignette shadow layer inside */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_35%,_rgba(6,6,8,0.92)_100%)] pointer-events-none z-10" />

        {/* Dynamic Scan Line Grid Dot Overlays */}
        <div 
          style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 15%, transparent 16%)', backgroundSize: '6px 6px' }} 
          className="absolute inset-0 pointer-events-none z-[12]" 
        />

        {/* Brackets decoration corner pins */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/20 pointer-events-none z-20" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-white/20 pointer-events-none z-20" />

        {/* Floating nihilism text scrolling layer */}
        <div 
          style={{ fontFamily: "'Syncopate', sans-serif" }}
          className="absolute select-none pointer-events-none top-[45%] left-0 w-[400%] h-auto -translate-y-1/2 text-white/[0.02] text-8xl sm:text-[11rem] tracking-[30px] font-bold uppercase whitespace-nowrap z-[1] leading-none animate-[move-nihility_32s_linear_infinite]"
        >
          NIHILITY NIHILITY NIHILITY NIHILITY
        </div>

        {/* Flow petal overlay canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[13]" />

        {/* LEFT COMPACT PANEL (Info & Music control core player system) */}
        <div className="p-6 md:p-8 flex flex-col justify-between z-20 bg-gradient-to-r from-[#060608]/98 via-[#460303]/60 to-transparent">
          
          <div className="border-l-4 border-amber-600 pl-3 leading-tight mb-8">
            <span className="block text-[11px] font-black uppercase text-slate-200 tracking-wider">
              Fret not! The hero Chixia has arrived!
            </span>
            <span className="block text-[9px] text-slate-400 font-medium tracking-wide">
              心配ご無用！正義 de 味方、熾霞のおおまわりだ！
            </span>
          </div>

          <div className="my-auto">
            <span className="text-white text-xs tracking-[6px] block font-black uppercase mb-1">
              ブレイジング・ブライト
            </span>
            <h1 
              style={{ textShadow: '2px 2px 0px #b5893d, 4px 4px 20px rgba(0,0,0,0.9)' }} 
              className="text-7xl md:text-8xl font-black text-white select-none leading-none tracking-tight"
            >
              朝日
            </h1>
            <span className="inline-block bg-white text-black font-extrabold text-[10px] tracking-[4px] px-3.5 py-1.5 rounded-sm mt-3 shadow-lg">
              1542991141
            </span>

            {/* Custom Interactive Music Player System */}
            <div className={`mt-8 bg-neutral-950/80 border rounded-lg p-4 backdrop-blur-xl flex flex-col gap-3 transition-all duration-300 ${isPlaying ? 'border-amber-600/55 shadow-[0_0_15px_rgba(181,137,61,0.2)]' : 'border-white/10'}`}>
              <audio
                ref={audioRef}
                src="https://www.dropbox.com/scl/fi/ersb17v6uwmcelmvapgxp/Fall-To-Hell-DOLLWAVE-Darkwave-Lyrics-visualizer.mp3?rlkey=3pfivpdswvsnwxwzqnix01wnl&st=vs1tmdms&dl=1"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnded}
              />
              
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate w-[160px]">
                  Fall To Hell - DOLLWAVE
                </span>
                <span className="text-[9px] text-slate-400 font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Progress Bar Seeker */}
              <div 
                onClick={handleProgressClick}
                className="w-full h-1 bg-white/15 relative rounded cursor-pointer group"
              >
                <div 
                  style={{ width: `${percentProgress}%`, boxShadow: '0 0 8px #b5893d' }} 
                  className="h-full bg-gradient-to-r from-amber-600 to-white rounded transition-all duration-75"
                />
              </div>

              {/* Player Controlls bottom line */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={togglePlay}
                  className="bg-white hover:bg-slate-200 text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3 w-3 fill-black text-black" />
                      <span>PAUSAR</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 fill-black text-black" />
                      <span>OUVIR</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 rounded bg-white/10 appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              </div>

            </div>

          </div>

          <div className="border-t border-white/5 pt-4 flex items-center justify-between mt-6">
            <span className="text-[8px] font-extrabold text-neutral-500 tracking-widest uppercase">
              OVERDRIVE MODE // FREQUENCY: STABLE
            </span>
            <span className="border border-white/40 text-white rounded px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider">
              BOOM BOOM!
            </span>
          </div>

        </div>

        {/* MID-PORTION: Aesthetic Framed Artwork Screen with Parallax layers */}
        <div className="relative flex items-center justify-center p-4 z-15">
          
          <div className="w-11/12 h-[90%] border border-white/5 rounded relative overflow-hidden backdrop-blur-[3px] bg-gradient-to-tr from-cyan-950/5 via-neutral-950/20 to-transparent">
            
            {/* Interactive scan laser line animation */}
            <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-600/75 to-transparent z-[2] animate-[laser-scan_4.5s_linear_infinite]" />

            <span className="absolute top-2 left-2 text-white/[0.02] text-[15rem] font-black select-none pointer-events-none z-[1] leading-none">
              古
            </span>

            <div className="absolute right-4 top-1/4 flex flex-col items-end gap-1.5 text-white/30 text-[8px] font-mono z-10 uppercase">
              <span>STATUS: ACTIVE</span>
              <span>GLASS: JINSHI_DARK</span>
              <div className="w-10 h-0.5 bg-amber-600 animate-[bar-stretch_1s_infinite_ease-in-out]" />
            </div>

          </div>

          {/* PARALLAX RENDER IMAGE (Smooth transition coords) */}
          <div
            style={{ transform: charTransform }}
            className="absolute bottom-4 left-[-15%] w-[130%] h-[110%] pointer-events-none z-20 will-change-transform"
          >
            <img
              src="https://u.cubeupload.com/zmonochrome/b00chisarenderwuthering.png"
              alt="Yuffie Kinematic character"
              className="w-full h-full object-contain object-bottom select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
            />
          </div>

        </div>

        {/* RIGHT COMPACT SIDEBAR: Badges & Stamps vertical stack */}
        <div className="p-6 md:p-8 flex flex-col justify-between items-center z-20 bg-gradient-to-l from-black/45 to-transparent">
          
          <div className="border border-white/20 select-none rounded-full px-4 py-1 text-[9px] font-extrabold uppercase tracking-widest bg-white/[0.02] text-slate-200">
            YUFFIE
          </div>

          <div className="flex flex-col items-center gap-4 my-8">
            <span style={{ writingMode: 'vertical-rl' }} className="text-3xl font-black text-white tracking-[8px] uppercase">
              朝日
            </span>
            <span style={{ writingMode: 'vertical-rl' }} className="text-[9px] tracking-[6px] text-white/50 uppercase">
              ASAHI
            </span>
            <span className="text-amber-500 font-mono text-[10px] animate-pulse">✦</span>
            <span style={{ writingMode: 'vertical-rl' }} className="text-[9px] tracking-[6px] text-white/50 uppercase">
              CREATIVE
            </span>
          </div>

          <div className="text-center">
            <span className="text-white/20 text-xs block">—</span>
            <span style={{ writingMode: 'vertical-rl' }} className="text-[7px] font-bold text-white/30 tracking-[3px] uppercase mt-2 transform rotate-180 inline-block">
              システム起動完了
            </span>
          </div>

        </div>

      </div>

      {/* Styled background nihility loop keyframe injections */}
      <style>{`
        @keyframes move-nihility {
          0% { transform: translate(0, -50%); }
          100% { transform: translate(-50%, -50%); }
        }
        @keyframes laser-scan {
          0% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes bar-stretch {
          0%, 100% { width: 12px; }
          50% { width: 44px; }
        }
      `}</style>

    </div>
  );
}
