/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

interface EducationItem {
  id: string;
  institution: string;
  subItem: string;
  timeline: string;
}

const ORIGIN_DATA: EducationItem[] = [
  {
    id: 'lu-masters',
    institution: '[LU - Faculty of Fine Arts]',
    subItem: 'Masters',
    timeline: '2016 - 2018',
  },
  {
    id: 'lu-bachelors',
    institution: '[LU - Faculty of Fine Arts]',
    subItem: 'Graphic Design',
    timeline: '2013 - 2016',
  },
  {
    id: 'abbasieh-hs',
    institution: '[Abbasieh High School]',
    subItem: 'Timeline',
    timeline: '2011 - 2013',
  },
  {
    id: 'tyr-official',
    institution: '[Tyr Official High School for Girls]',
    subItem: 'Timeline',
    timeline: '2010 - 2011',
  },
  {
    id: 'cadmous-school',
    institution: '[Cadmous School - Tyr]',
    subItem: 'Timeline',
    timeline: '1999 - 2010',
  },
];

/**
 * Fast digital glitch text decoder for revealed dates.
 */
function GlitchTimeline({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState<string>('');
  const [isGlitching, setIsGlitching] = useState<boolean>(true);

  useEffect(() => {
    const chars = '01X_/<>-#%*{}[]';
    let frame = 0;
    const totalFrames = 8;
    const interval = 22;

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
            if (char === ' ' || char === '-') return char;
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
    <span
      className={`font-mono text-[9.5px] sm:text-[10px] tracking-tight transition-colors whitespace-nowrap ${
        isGlitching ? 'text-black/80 animate-text-shadow-glitch' : 'text-[#121212]'
      }`}
    >
      {displayText}
      {isGlitching && <span className="inline-block w-1 h-2 bg-black/60 ml-0.5 animate-pulse" />}
    </span>
  );
}

export function EducationPage({ onBack }: { onBack: () => void }) {
  // Set of opened institution IDs (initially all collapsed)
  const [openInstitutions, setOpenInstitutions] = useState<Record<string, boolean>>({});

  // Set of revealed timeline dates
  const [revealedDates, setRevealedDates] = useState<Record<string, boolean>>({});

  const toggleInstitution = (id: string) => {
    setOpenInstitutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleTimeline = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedDates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f9f9f9] text-[#121212] flex flex-col justify-between p-8 sm:p-14 md:p-20 lg:p-28 select-none animate-in fade-in duration-300">
      {/* Top Left Navigation Link: Raw, zero border */}
      <header className="w-full flex items-start justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-mono text-[9px] sm:text-[10px] font-light text-black/40 hover:text-black transition-colors cursor-pointer tracking-wider"
          title="Return to canvas"
        >
          <span>[exit]</span>
        </button>
      </header>

      {/* Main Swiss Typographic Grid: Compact block framed by massive editorial whitespace */}
      <main className="w-full max-w-4xl mx-auto my-auto py-10 sm:py-16">
        {/* Master Archetype Header: Heavy Block Display Title + Tiny Technical Metadata */}
        <div className="flex items-start gap-4 sm:gap-6 mb-12 sm:mb-16">
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-[22px] sm:text-[28px] md:text-[34px] leading-none tracking-tight text-[#121212]">
            [origin-story]
          </h1>
          <div className="flex flex-col font-mono text-[7.5px] sm:text-[8px] text-black/40 uppercase tracking-widest leading-tight pt-1">
            <span>VER: PROFILE_01</span>
            <span>ITEM: METADATA</span>
          </div>
        </div>

        {/* Structural Multi-Column Text Blocks: Zero lines, pure asymmetric whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8 sm:gap-y-12">
          {ORIGIN_DATA.map((item) => {
            const isOpen = !!openInstitutions[item.id];
            const isDateRevealed = !!revealedDates[item.id];

            return (
              <div key={item.id} className="space-y-3">
                {/* Institution Name: Bolder with brackets indicating clickable accordion */}
                <button
                  type="button"
                  onClick={() => toggleInstitution(item.id)}
                  className="text-left w-full cursor-pointer focus:outline-none group block"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase group-hover:opacity-60 transition-opacity">
                    {item.institution}
                  </span>
                </button>

                {/* Sub-item (Major/Degree/Timeline): Revealed under institution */}
                {isOpen && (
                  <div className="space-y-2 pt-1 pl-2 animate-in fade-in duration-200">
                    <div
                      onClick={(e) => toggleTimeline(item.id, e)}
                      className="flex items-baseline justify-between gap-4 font-mono text-[10px] sm:text-[10.5px] text-black/75 hover:text-black cursor-pointer transition-colors py-0.5"
                      title="Click to reveal timeline"
                    >
                      <span className="tracking-tight hover:underline underline-offset-4 decoration-black/30">
                        {item.subItem}
                      </span>

                      <div className="text-right">
                        {isDateRevealed ? (
                          <GlitchTimeline text={item.timeline} />
                        ) : (
                          <span className="font-mono text-[8.5px] text-black/30 tracking-widest uppercase hover:text-black/60 transition-colors">
                            [timeline]
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Identity Anchor: Emulating master reference signature */}
      <footer className="w-full flex items-baseline justify-between font-mono text-[8.5px] sm:text-[9px] text-black/40 uppercase tracking-widest pt-8">
        <span>SOHA FARHAT</span>
        <span>EDUCATIONAL BACKGROUND & FOUNDATIONS</span>
      </footer>
    </div>
  );
}
