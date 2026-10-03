/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

interface RoleItem {
  id: string;
  company: string;
  timeline: string;
}

interface Category {
  id: string;
  title: string;
  items: RoleItem[];
}

const TRACK_DATA: Category[] = [
  {
    id: 'art-direction',
    title: '[Art Direction, Leadership & Strategy]',
    items: [
      { id: 'ad-1', company: 'Mohtawa', timeline: 'November 2025 - July 2026' },
      { id: 'ad-2', company: 'Memac Ogilvy', timeline: 'August 2021 - November 2025' },
      { id: 'ad-3', company: 'Digital Revamp', timeline: 'January 2020 - August 2021' },
      { id: 'ad-4', company: 'Brighten Ads', timeline: 'October 2018 - January 2020' },
    ],
  },
  {
    id: 'contract-roles',
    title: '[Short Contract Roles]',
    items: [
      { id: 'sc-1', company: 'Echoin Cup', timeline: 'November 2025' },
      { id: 'sc-2', company: 'Fruit Tree Revolution', timeline: 'September 2017 - November 2017' },
      { id: 'sc-3', company: 'Portable Talents', timeline: 'February 2017 - June 2017' },
      { id: 'sc-4', company: 'Kuwait Confidential Agency', timeline: 'Short Contract' },
    ],
  },
  {
    id: 'freelance-projects',
    title: '[Freelance Projects]',
    items: [
      { id: 'fl-1', company: 'Global', timeline: 'Ongoing' },
      { id: 'fl-2', company: 'USA', timeline: 'Ongoing' },
      { id: 'fl-3', company: 'GCC Region', timeline: 'Ongoing' },
      { id: 'fl-4', company: 'Lebanon', timeline: 'Ongoing' },
    ],
  },
  {
    id: 'internships-training',
    title: '[Internships & Training]',
    items: [
      { id: 'it-1', company: 'Limescent', timeline: 'July 2018' },
      { id: 'it-2', company: 'Drive Dentsu', timeline: 'Summer 2015-2016' },
      { id: 'it-3', company: 'Printshop', timeline: 'Summer Experience' },
    ],
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

export function ExperiencePage({ onBack }: { onBack: () => void }) {
  // Category accordion state (initially all collapsed)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  // Revealed timeline dates state (initially hidden)
  const [revealedDates, setRevealedDates] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const toggleRoleDate = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedDates((prev) => ({
      ...prev,
      [roleId]: !prev[roleId],
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
            [track]
          </h1>
          <div className="flex flex-col font-mono text-[7.5px] sm:text-[8px] text-black/40 uppercase tracking-widest leading-tight pt-1">
            <span>VER: PROFILE_01</span>
            <span>ITEM: METADATA</span>
          </div>
        </div>

        {/* Structural Multi-Column Text Blocks: Zero lines, pure asymmetric whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8 sm:gap-y-12">
          {TRACK_DATA.map((cat) => {
            const isOpen = !!openCategories[cat.id];

            return (
              <div key={cat.id} className="space-y-3">
                {/* Category Title: Bolder with brackets indicating clickable accordion */}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className="text-left w-full cursor-pointer focus:outline-none group block"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase group-hover:opacity-60 transition-opacity">
                    {cat.title}
                  </span>
                </button>

                {/* Sub-items (Roles): Revealed under category in restrained scale */}
                {isOpen && (
                  <div className="space-y-2 pt-1 pl-2 animate-in fade-in duration-200">
                    {cat.items.map((item) => {
                      const isDateRevealed = !!revealedDates[item.id];

                      return (
                        <div
                          key={item.id}
                          onClick={(e) => toggleRoleDate(item.id, e)}
                          className="flex items-baseline justify-between gap-4 font-mono text-[10px] sm:text-[10.5px] text-black/75 hover:text-black cursor-pointer transition-colors py-0.5"
                          title="Click to reveal timeline"
                        >
                          <span className="tracking-tight hover:underline underline-offset-4 decoration-black/30">
                            {item.company}
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
                      );
                    })}
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
        <span>METRICAL WORK TRACK & STRATEGY</span>
      </footer>
    </div>
  );
}
