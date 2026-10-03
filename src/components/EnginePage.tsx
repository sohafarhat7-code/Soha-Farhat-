/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';

interface EngineItem {
  id: string;
  name: string;
  meter: string;
  note?: string;
}

interface EngineCategory {
  id: string;
  title: string;
  items: EngineItem[];
}

const ENGINE_DATA: EngineCategory[] = [
  {
    id: 'languages',
    title: '[Languages]',
    items: [
      { id: 'lang-1', name: 'Arabic', meter: '[■■■■■■■■■■]' },
      { id: 'lang-2', name: 'English', meter: '[■■■■■■■■■□]' },
      { id: 'lang-3', name: 'French', meter: '[■■■■■■■□□□]' },
    ],
  },
  {
    id: 'adobe-suite',
    title: '[Adobe Suite & Design Core]',
    items: [
      { id: 'ad-1', name: 'Photoshop', meter: '[■■■■■■■■■■]' },
      { id: 'ad-2', name: 'Illustrator', meter: '[■■■■■■■■■□]' },
      { id: 'ad-3', name: 'After Effects', meter: '[■■■■■■■■■□]' },
      { id: 'ad-4', name: 'Premiere', meter: '[■■■■■■■■□□]' },
      { id: 'ad-5', name: 'Indesign', meter: '[■■■■■■■□□□]' },
      {
        id: 'ad-6',
        name: 'Adobe Animate',
        meter: '[■■■□□□□□□□]',
        note: 'Status: Learning / Active Progress',
      },
      {
        id: 'ad-7',
        name: 'Adobe Substance 3D',
        meter: '[■□□□□□□□□□]',
        note: 'Status: System Integration / Suggested Core',
      },
    ],
  },
  {
    id: 'product-workspace',
    title: '[Product & Interface Workspace]',
    items: [
      {
        id: 'pw-1',
        name: 'Figma',
        meter: '[■■■□□□□□□□]',
        note: 'Status: Learning / Active Progress',
      },
    ],
  },
  {
    id: 'ai-systems',
    title: '[Advanced AI Systems & Workflow Integration]',
    items: [
      {
        id: 'ai-1',
        name: 'Agentic Intelligence & Deep Research (Claude / ChatGPT / Google AI Studio / Gemini Pro)',
        meter: '[■■■■■■■■□□]',
      },
      {
        id: 'ai-2',
        name: 'Generative Media & Ideation (Midjourney / Higgsfield / Runway / Kling AI / Luma / Pika)',
        meter: '[■■■■■■■□□□]',
      },
      {
        id: 'ai-3',
        name: 'Vibe Coding & Automated Architecture (Replit Agent / GitHub / Cursor AI / V0 by Vercel)',
        meter: '[■■■■■■■□□□]',
      },
      {
        id: 'ai-4',
        name: 'Workflow Integration (Concept optimization / Data modeling / Synthesizer tool)',
        meter: '[■■■■■■■□□□]',
      },
    ],
  },
];

/**
 * Fast digital glitch text decoder for meter strings [■■■■■□□□□□].
 */
function GlitchMeter({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState<string>('');
  const [isGlitching, setIsGlitching] = useState<boolean>(true);

  useEffect(() => {
    const chars = '01X■□_/<>-#%*{}';
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
            if (char === '[' || char === ']') return char;
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
      className={`font-mono text-[9.5px] sm:text-[10px] tracking-widest transition-colors whitespace-nowrap ${
        isGlitching ? 'text-black/80 animate-text-shadow-glitch' : 'text-[#121212]'
      }`}
    >
      {displayText}
      {isGlitching && <span className="inline-block w-1.5 h-2 bg-black/60 ml-0.5 animate-pulse" />}
    </span>
  );
}

export function EnginePage({ onBack }: { onBack: () => void }) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'languages': true,
    'adobe-suite': true,
    'product-workspace': true,
    'ai-systems': true,
  });

  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const toggleItemMeter = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f9f9f9] text-[#121212] flex flex-col justify-between p-8 sm:p-14 md:p-20 lg:p-28 select-none animate-in fade-in duration-300">
      {/* Top Left Navigation Link */}
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

      {/* Main Swiss Typographic Grid */}
      <main className="w-full max-w-4xl mx-auto my-auto py-10 sm:py-16">
        {/* Master Archetype Header */}
        <div className="flex items-start gap-4 sm:gap-6 mb-12 sm:mb-16">
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-[22px] sm:text-[28px] md:text-[34px] leading-none tracking-tight text-[#121212]">
            [engine]
          </h1>
          <div className="flex flex-col font-mono text-[7.5px] sm:text-[8px] text-black/40 uppercase tracking-widest leading-tight pt-1">
            <span>VER: PROFILE_01</span>
            <span>ITEM: METADATA</span>
          </div>
        </div>

        {/* Structural Multi-Column Text Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8 sm:gap-y-12">
          {ENGINE_DATA.map((cat) => {
            const isOpen = !!openCategories[cat.id];

            return (
              <div key={cat.id} className="space-y-3">
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

                {isOpen && (
                  <div className="space-y-2.5 pt-1 pl-2 animate-in fade-in duration-200">
                    {cat.items.map((item) => {
                      const isRevealed = !!revealedItems[item.id];

                      return (
                        <div
                          key={item.id}
                          onClick={(e) => toggleItemMeter(item.id, e)}
                          className="flex flex-col gap-0.5 font-mono text-[10px] sm:text-[10.5px] text-black/75 hover:text-black cursor-pointer transition-colors py-0.5"
                          title="Click to toggle parameter meter"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="tracking-tight hover:underline underline-offset-4 decoration-black/30">
                              {item.name}
                            </span>

                            <div className="text-right flex-shrink-0">
                              {isRevealed ? (
                                <GlitchMeter text={item.meter} />
                              ) : (
                                <span className="font-mono text-[8.5px] text-black/30 tracking-widest uppercase hover:text-black/60 transition-colors">
                                  {item.meter}
                                </span>
                              )}
                            </div>
                          </div>

                          {item.note && (
                            <span className="font-mono text-[8px] sm:text-[8.5px] text-black/40 tracking-wider">
                              ({item.note})
                            </span>
                          )}
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

      {/* Bottom Identity Anchor */}
      <footer className="w-full flex items-baseline justify-between font-mono text-[8.5px] sm:text-[9px] text-black/40 uppercase tracking-widest pt-8">
        <span>SOHA FARHAT</span>
        <span>CAPABILITIES & SYSTEM ENGINE</span>
      </footer>
    </div>
  );
}
