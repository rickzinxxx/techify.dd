import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

export default function ToonHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload all 4 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    // Check window width for mobility status
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % 4;
      } else {
        return (prev + 3) % 4;
      }
    });

    // Release animation lock after 650ms
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full h-[100vh] overflow-hidden">
        {/* 1. Grain overlay */}
        <div
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundSize: '200px 200px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* 2. Giant ghost text "3D SHAPE" */}
        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(90px, 28vw, 380px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            zIndex: 2,
            top: '18%',
          }}
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none text-white opacity-100 uppercase whiteSpace-nowrap font-black"
        >
          3D SHAPE
        </div>

        {/* 3. Top-left brand label "TOONHUB" */}
        <div
          style={{ zIndex: 60 }}
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]"
        >
          TOONHUB
        </div>

        {/* 4. Carousel list */}
        <div style={{ zIndex: 3 }} className="absolute inset-0">
          {IMAGES.map((img, index) => {
            let role: 'center' | 'left' | 'right' | 'back' = 'back';

            if (index === activeIndex) {
              role = 'center';
            } else if (index === (activeIndex + 3) % 4) {
              role = 'left';
            } else if (index === (activeIndex + 1) % 4) {
              role = 'right';
            }

            // Role styling logic
            let roleStyle: React.CSSProperties = {};

            if (role === 'center') {
              roleStyle = {
                transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
                filter: 'blur(0px)',
                opacity: 1,
                zIndex: 20,
                left: '50%',
                height: isMobile ? '60%' : '92%',
                bottom: isMobile ? '22%' : 0,
              };
            } else if (role === 'left') {
              roleStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '20%' : '30%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
              };
            } else if (role === 'right') {
              roleStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(2px)',
                opacity: 0.85,
                zIndex: 10,
                left: isMobile ? '80%' : '70%',
                height: isMobile ? '16%' : '28%',
                bottom: isMobile ? '32%' : '12%',
              };
            } else {
              roleStyle = {
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(4px)',
                opacity: 1,
                zIndex: 5,
                left: '50%',
                height: isMobile ? '13%' : '22%',
                bottom: isMobile ? '32%' : '12%',
              };
            }

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition: 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity',
                  ...roleStyle,
                }}
              >
                <img
                  src={img.src}
                  alt={`Toonhub Figurine ${index + 1}`}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          style={{ zIndex: 60, maxWidth: '320px' }}
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 text-left"
        >
          <p className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px] text-white opacity-95 leading-none">
            TOONHUB FIGURINES
          </p>
          <p className="hidden sm:block text-xs sm:text-sm text-white opacity-85 leading-1.6 mb-4 sm:mb-5">
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
          </p>

          <div className="flex gap-3">
            {/* Prev button */}
            <button
              onClick={() => navigate('prev')}
              aria-label="Previous figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white bg-transparent hover:bg-white/12 hover:scale-[1.08] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.25]" />
            </button>

            {/* Next button */}
            <button
              onClick={() => navigate('next')}
              aria-label="Next figurine"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white bg-transparent hover:bg-white/12 hover:scale-[1.08] transition-all duration-150 cursor-pointer active:scale-95"
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.25]" />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link "DISCOVER IT" */}
        <div
          style={{ zIndex: 60 }}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center"
        >
          <a
            href="#discover"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirecting to full interactive figurines collection!');
            }}
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
            className="flex items-center gap-2 text-white opacity-95 hover:opacity-100 transition-opacity duration-200 uppercase no-underline cursor-pointer"
          >
            <span>DISCOVER IT</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 stroke-[2.25]" />
          </a>
        </div>
      </div>
    </div>
  );
}
