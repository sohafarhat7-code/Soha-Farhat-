/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import visualImage from './assets/images/soha_visual.png';
import { ExperiencePage } from './components/ExperiencePage';
import { EducationPage } from './components/EducationPage';
import { EnginePage } from './components/EnginePage';
import { IndexPage } from './components/IndexPage';
import { IdentityPage } from './components/IdentityPage';

const ROLE_LIST = [
  'art director',
  'graphic designer & branding',
  'advertising',
  'illustration',
  'animation',
  'visual artist',
  'multimedia artist',
];

const FACE_HINTS = [
  { id: '01', coord: '[01 // COORD]' },
  { id: '02', coord: '[02 // COORD]' },
  { id: '03', coord: '[03 // COORD]' },
  { id: '04', coord: '[04 // COORD]' },
];

/**
 * Slower, clearly visible code-running glitch text animation with shadow movement.
 * Runs across ~500ms so the viewer can see the glyphs resolve step-by-step.
 */
function GlitchyWord({
  text,
  onClick,
  className,
  title,
}: {
  text: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  title?: string;
}) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isGlitching, setIsGlitching] = useState<boolean>(true);

  useEffect(() => {
    const chars = '01x_/<>-#%*{}[]=+^~';
    let frame = 0;
    const totalFrames = 14;
    const interval = 36; // 36ms * 14 frames ≈ 504ms total visible duration

    setIsGlitching(true);

    const timer = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplayText(text);
        setIsGlitching(false);
        clearInterval(timer);
      } else {
        const progress = frame / totalFrames;
        const scrambled = text
          .split('')
          .map((char, index) => {
            if (char === '[' || char === ']' || char === ' ' || char === '-' || char === '&') return char;
            if (index / text.length < progress) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        setDisplayText(scrambled);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} cursor-pointer transition-colors ${
        isGlitching ? 'animate-text-shadow-glitch' : ''
      }`}
      title={title}
    >
      <span className="font-mono">{displayText}</span>
      {isGlitching && (
        <span className="inline-block w-1 h-2.5 bg-black/60 ml-0.5 animate-pulse" />
      )}
    </button>
  );
}

export default function App() {
  const [currentVisual, setCurrentVisual] = useState<string>(() => {
    return localStorage.getItem('soha_portfolio_main_visual_v2') || visualImage;
  });

  const [hasReplaced, setHasReplaced] = useState<boolean>(() => {
    return localStorage.getItem('soha_image_replaced') === 'true';
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Controlled editable text states - defaults to ALL CAPS [SOHA FARHAT]
  const [nameText, setNameText] = useState<string>(() => {
    const saved = localStorage.getItem('soha_portfolio_name');
    if (saved && saved.toLowerCase() === '[soha farhat]') return '[SOHA FARHAT]';
    return saved || '[SOHA FARHAT]';
  });

  const [selectedRole, setSelectedRole] = useState<string>(() => {
    return localStorage.getItem('soha_portfolio_role') || 'art director';
  });

  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  // Exclusively track which single face label is shown:
  // 0: [track], 1: [origin-story], 2: [engine], 3: [index], null: none
  const [activeFaceIndex, setActiveFaceIndex] = useState<number | null>(null);

  // Slower, visible micro-glitch & shadow movement trigger on clicked face (lasts ~550ms)
  const [glitchingFace, setGlitchingFace] = useState<number | null>(null);

  // Sequential intro sequence states on initial load
  const [introWordIndex, setIntroWordIndex] = useState<number | null>(null);
  const [hasUserClicked, setHasUserClicked] = useState<boolean>(false);

  // Active space/page navigation state: null | 'track' | 'origin-story' | 'engine' | 'index' | 'identity'
  const [activePage, setActivePage] = useState<string | null>(null);

  // Complete sequential intro flow on entry: 4 Faces sequential flash
  useEffect(() => {
    if (!isLoaded || hasUserClicked) return;

    const timeouts: NodeJS.Timeout[] = [];

    // Phase 1: 4 Faces sequential flash: [track] -> [origin-story] -> [engine] -> [index]
    timeouts.push(
      setTimeout(() => {
        if (!hasUserClicked) {
          setIntroWordIndex(0);
          setGlitchingFace(0);
        }
      }, 400)
    );

    timeouts.push(
      setTimeout(() => {
        if (!hasUserClicked) {
          setIntroWordIndex(1);
          setGlitchingFace(1);
        }
      }, 900)
    );

    timeouts.push(
      setTimeout(() => {
        if (!hasUserClicked) {
          setIntroWordIndex(2);
          setGlitchingFace(2);
        }
      }, 1400)
    );

    timeouts.push(
      setTimeout(() => {
        if (!hasUserClicked) {
          setIntroWordIndex(3);
          setGlitchingFace(3);
        }
      }, 1900)
    );

    // Faces settle to serene canvas
    timeouts.push(
      setTimeout(() => {
        if (!hasUserClicked) {
          setIntroWordIndex(null);
          setGlitchingFace(null);
        }
      }, 2450)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isLoaded, hasUserClicked]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsListOpen(false);
      }
    };
    if (isListOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isListOpen]);

  // Subtle magnetic cursor parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFaceClick = (faceIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // User interacted: cancel any running intro flash immediately
    setHasUserClicked(true);
    setIntroWordIndex(null);

    // Trigger slower, noticeable shadow movement and glitch animation on the clicked face
    setGlitchingFace(faceIndex);
    setTimeout(() => {
      setGlitchingFace(null);
    }, 550);

    // Clicking any face immediately hides other words and displays ONLY this face's word
    setActiveFaceIndex((prev) => (prev === faceIndex ? null : faceIndex));
  };

  const handleNavigateToPage = (pageName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePage(pageName);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const dataUrl = event.target.result as string;
            setCurrentVisual(dataUrl);
            localStorage.setItem('soha_portfolio_main_visual_v2', dataUrl);
            setHasReplaced(true);
            localStorage.setItem('soha_image_replaced', 'true');
          }
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNameText(val);
    localStorage.setItem('soha_portfolio_name', val);
  };

  const handleSelectRole = (role: string) => {
    setSelectedRole(role);
    localStorage.setItem('soha_portfolio_role', role);
    setIsListOpen(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!hasReplaced && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const dataUrl = event.target.result as string;
            setCurrentVisual(dataUrl);
            localStorage.setItem('soha_portfolio_main_visual_v2', dataUrl);
            setHasReplaced(true);
            localStorage.setItem('soha_image_replaced', 'true');
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Helper to determine if a word should be shown (either clicked active or during intro sequence)
  const isWordVisible = (index: number) => {
    if (activeFaceIndex !== null) {
      return activeFaceIndex === index;
    }
    return !hasUserClicked && introWordIndex === index;
  };

  // 1. [track] (Experience Timeline)
  if (activePage === 'track' || activePage === 'experience') {
    return <ExperiencePage onBack={() => setActivePage(null)} />;
  }

  // 2. [origin-story] (Education History)
  if (activePage === 'origin-story' || activePage === 'education') {
    return <EducationPage onBack={() => setActivePage(null)} />;
  }

  // 3. [engine] (Capabilities & AI Progression)
  if (activePage === 'engine' || activePage === 'skills') {
    return <EnginePage onBack={() => setActivePage(null)} />;
  }

  // 4. [index] (Contact Arrays & Live QR Directories)
  if (activePage === 'index' || activePage === 'contact & links') {
    return <IndexPage onBack={() => setActivePage(null)} />;
  }

  // 5. [identity] (New Interactive Portal via [soha farhat] anchor)
  if (activePage === 'identity') {
    return <IdentityPage onBack={() => setActivePage(null)} />;
  }

  // Fallback subpage
  if (activePage) {
    return (
      <div className="relative min-h-screen w-full bg-[#f9f9f9] text-[#121212] flex flex-col justify-between p-8 sm:p-14 md:p-20 lg:p-28 select-none animate-in fade-in duration-300">
        <header className="w-full flex items-start justify-between">
          <button
            type="button"
            onClick={() => setActivePage(null)}
            className="font-mono text-[9px] sm:text-[10px] font-light text-black/40 hover:text-black transition-colors cursor-pointer tracking-wider"
            title="Return to canvas"
          >
            <span>[exit]</span>
          </button>
        </header>

        <main className="flex flex-col items-center justify-center text-center max-w-xl mx-auto my-auto space-y-4">
          <button
            type="button"
            onClick={() => setActivePage(null)}
            className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-[24px] sm:text-[32px] tracking-tight text-[#121212] hover:opacity-60 transition-opacity cursor-pointer"
            title="Click title to return to main canvas"
          >
            [{activePage}]
          </button>
          <p className="font-mono text-[9px] text-black/40 tracking-widest uppercase">
            [space reserved // click to return]
          </p>
        </main>

        <footer className="w-full flex items-baseline justify-between font-mono text-[8.5px] sm:text-[9px] text-black/40 uppercase tracking-widest pt-8">
          <span>SOHA FARHAT</span>
          <span>CREATIVE ARCHIVE</span>
        </footer>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative min-h-screen w-full bg-[#f9f9f9] flex items-center justify-center overflow-x-hidden p-6 sm:p-12 md:p-16 select-none"
    >
      {/* Hidden file input for one-time image replacement */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Main Minimalist Composition: Substantial empty space, centered on horizontal line */}
      <main className="relative z-10 w-full max-w-[1080px] flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-7 md:gap-9 my-auto">
        {/* Left Side: 4 Faces visual with interactive face buttons */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div
            className={`relative transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.99]'
            }`}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {/* The 4 Terms: Each animates in with visible code-running and shadow movement */}
            {/* 1. On top of 1st face (leftmost): [track] */}
            {isWordVisible(0) && (
              <GlitchyWord
                text="[track]"
                onClick={(e) => handleNavigateToPage('track', e)}
                className="absolute -top-7 sm:-top-8 left-[12.5%] -translate-x-1/2 font-mono text-[10px] sm:text-[11px] font-light text-black/75 hover:text-black tracking-wider whitespace-nowrap z-30"
                title="Click [track] to open space"
              />
            )}

            {/* 2. Under 2nd face from left: [origin-story] */}
            {isWordVisible(1) && (
              <GlitchyWord
                text="[origin-story]"
                onClick={(e) => handleNavigateToPage('origin-story', e)}
                className="absolute -bottom-7 sm:-bottom-8 left-[37.5%] -translate-x-1/2 font-mono text-[10px] sm:text-[11px] font-light text-black/75 hover:text-black tracking-wider whitespace-nowrap z-30"
                title="Click [origin-story] to open space"
              />
            )}

            {/* 3. Above 3rd face from left: [engine] */}
            {isWordVisible(2) && (
              <GlitchyWord
                text="[engine]"
                onClick={(e) => handleNavigateToPage('engine', e)}
                className="absolute -top-7 sm:-top-8 left-[62.5%] -translate-x-1/2 font-mono text-[10px] sm:text-[11px] font-light text-black/75 hover:text-black tracking-wider whitespace-nowrap z-30"
                title="Click [engine] to open space"
              />
            )}

            {/* 4. Under 4th face from left: [index] */}
            {isWordVisible(3) && (
              <GlitchyWord
                text="[index]"
                onClick={(e) => handleNavigateToPage('index', e)}
                className="absolute -bottom-7 sm:-bottom-8 left-[87.5%] -translate-x-1/2 font-mono text-[10px] sm:text-[11px] font-light text-black/75 hover:text-black tracking-wider whitespace-nowrap z-30"
                title="Click [index] to open space"
              />
            )}

            {/* Image Container with 4 Interactive Face Button Overlays */}
            <div className="relative block select-none">
              <img
                src={currentVisual}
                alt="soha farhat visual"
                referrerPolicy="no-referrer"
                onLoad={() => setIsLoaded(true)}
                className={`w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] h-auto max-h-[38vh] sm:max-h-[42vh] object-contain mx-auto mix-blend-multiply contrast-[1.02] ${
                  activeFaceIndex !== null ? '' : 'animate-slow-face-sway'
                }`}
                draggable={false}
              />

              {/* 4 Face Button Zones with Subtle Hover Coordinates & Corner Crop-Marks */}
              <div className="absolute inset-0 grid grid-cols-4 z-20">
                {FACE_HINTS.map((hint, idx) => (
                  <button
                    key={hint.id}
                    type="button"
                    onClick={(e) => handleFaceClick(idx, e)}
                    className={`group/face w-full h-full cursor-pointer focus:outline-none focus:ring-0 relative overflow-hidden transition-colors ${
                      glitchingFace === idx ? 'animate-face-shadow-glitch' : ''
                    }`}
                    title={`Click face ${idx + 1} to reveal section`}
                    aria-label={`Face ${idx + 1}`}
                  >
                    {/* Corner Crop-Marks (revealed on hover) */}
                    <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-black/40 pointer-events-none opacity-0 group-hover/face:opacity-100 transition-opacity duration-200" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-black/40 pointer-events-none opacity-0 group-hover/face:opacity-100 transition-opacity duration-200" />
                    <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-black/40 pointer-events-none opacity-0 group-hover/face:opacity-100 transition-opacity duration-200" />
                    <span className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-black/40 pointer-events-none opacity-0 group-hover/face:opacity-100 transition-opacity duration-200" />

                    {/* Subtle Coordinate Badge (visible on hover) */}
                    <span
                      className={`absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-widest text-black/55 pointer-events-none whitespace-nowrap transition-all duration-200 ${
                        activeFaceIndex === idx
                          ? 'opacity-0'
                          : 'opacity-0 group-hover/face:opacity-100 group-hover/face:translate-y-0 translate-y-0.5'
                      }`}
                    >
                      {hint.coord}
                    </span>

                    {/* Glitch & Shadow Sweep active states */}
                    {glitchingFace === idx && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-transparent blur-[1.5px] animate-shadow-sweep pointer-events-none" />
                        <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-difference" />
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Bottom-right watermark safeguard */}
              <div
                className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 100% 100%, #f9f9f9 70%, transparent 100%)',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Name & Role Entity (vertically centered with the faces on the horizontal line, closer to face) */}
        <div
          ref={dropdownRef}
          className="relative flex-shrink-0 flex flex-col items-start justify-center text-left -translate-y-2 sm:-translate-y-2.5"
        >
          {/* Tighter gap between [SOHA FARHAT] and art director */}
          <div className="flex flex-col gap-0 relative select-none">
            {/* 1. Name: [SOHA FARHAT] in bold non-serif neo-grotesque font, ALL CAPS - Clicking opens [identity] */}
            <div className="relative">
              {isEditingName ? (
                <input
                  type="text"
                  value={nameText}
                  onChange={handleNameChange}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingName(false);
                  }}
                  autoFocus
                  className="bg-white/80 border border-black/40 font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[15px] sm:text-[16px] tracking-tight text-black px-1 py-0.5 outline-none rounded-none uppercase"
                  aria-label="Edit Name"
                />
              ) : (
                <div
                  onClick={() => setActivePage('identity')}
                  className="inline-flex items-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[15px] sm:text-[16.5px] tracking-tight text-black leading-snug py-0 cursor-pointer group uppercase"
                  title="Click to open [identity]"
                >
                  <span className="hover:opacity-60 transition-opacity">{nameText}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingName(true);
                    }}
                    className="opacity-0 group-hover:opacity-30 hover:!opacity-100 text-[8px] font-mono transition-opacity ml-1.5 font-normal lowercase cursor-pointer"
                    title="Click to edit name"
                  >
                    edit
                  </button>
                </div>
              )}
            </div>

            {/* 2. Role: art director directly adjacent beneath the name with light line half-triangle swipe down arrow */}
            <div className="relative -mt-1 sm:-mt-1.5">
              <button
                type="button"
                onClick={() => setIsListOpen(!isListOpen)}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] font-light text-black/65 hover:text-black py-0 cursor-pointer transition-colors group"
                aria-expanded={isListOpen}
                aria-haspopup="listbox"
                title="Click to view disciplines"
              >
                <span className="lowercase">{selectedRole}</span>
                {/* 1 light line swipe down half-triangle arrow */}
                <svg
                  className={`w-2.5 h-2.5 text-black/60 group-hover:text-black transition-transform duration-200 ${
                    isListOpen ? '-rotate-180' : 'rotate-0'
                  }`}
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 4L5 6.5L7.5 4" />
                </svg>
              </button>

              {/* 3. Interactive Dropdown List: appended with exact titles down to Multimedia Artist */}
              {isListOpen && (
                <div
                  role="listbox"
                  className="absolute top-full left-0 mt-2 w-64 sm:w-72 bg-[#f9f9f9] border border-black/20 shadow-2xl p-1.5 z-40 font-mono text-[11px] sm:text-[12px] animate-in fade-in slide-in-from-top-1"
                >
                  <div className="px-2 py-1 text-[9px] uppercase tracking-wider text-black/40 border-b border-black/10 mb-1">
                    [disciplines]
                  </div>
                  <div className="space-y-0.5">
                    {ROLE_LIST.map((role) => (
                      <button
                        key={role}
                        type="button"
                        role="option"
                        aria-selected={selectedRole === role}
                        onClick={() => handleSelectRole(role)}
                        className={`w-full text-left px-2.5 py-1.5 transition-colors flex items-center justify-between cursor-pointer rounded-xs ${
                          selectedRole === role
                            ? 'bg-black text-[#f9f9f9] font-medium'
                            : 'text-black/75 hover:bg-black/8 hover:text-black'
                        }`}
                      >
                        <span className="lowercase">{role}</span>
                        {selectedRole === role && (
                          <span className="text-[10px] text-white/80">●</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
