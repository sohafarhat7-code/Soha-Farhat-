/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';

export function IdentityPage({ onBack }: { onBack: () => void }) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'growth': true,
    'interests': true,
    'registries': true,
  });

  const [revealedLinks, setRevealedLinks] = useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const toggleLink = (linkId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedLinks((prev) => ({
      ...prev,
      [linkId]: !prev[linkId],
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
            [identity]
          </h1>
          <div className="flex flex-col font-mono text-[7.5px] sm:text-[8px] text-black/40 uppercase tracking-widest leading-tight pt-1">
            <span>VER: PROFILE_01</span>
            <span>ITEM: METADATA</span>
          </div>
        </div>

        {/* Structural Multi-Column Text Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 sm:gap-y-14">
          {/* Column 1: Artistic Identity & Personal Growth */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => toggleCategory('growth')}
              className="text-left w-full cursor-pointer focus:outline-none group block"
            >
              <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase group-hover:opacity-60 transition-opacity">
                [Artistic Identity & Personal Growth]
              </span>
            </button>

            {openCategories['growth'] && (
              <div className="space-y-3.5 pt-1 pl-2 font-mono text-[10px] sm:text-[10.5px] animate-in fade-in duration-200">
                <div className="space-y-0.5">
                  <span className="font-medium text-[#121212] block">
                    Experimental Synthesis
                  </span>
                  <p className="text-black/65 leading-relaxed text-[9px] sm:text-[9.5px]">
                    Developing alternative image-making mediums, balancing raw design concepts with automation frameworks.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="font-medium text-[#121212] block">
                    Metrical Experimentation
                  </span>
                  <p className="text-black/65 leading-relaxed text-[9px] sm:text-[9.5px]">
                    Transitioning into custom frontend creative engineering, testing boundaries of interactive web code styling.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Interests, Personal Explorations & Registries */}
          <div className="space-y-8 sm:space-y-10">
            {/* Interests & Personal Explorations */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => toggleCategory('interests')}
                className="text-left w-full cursor-pointer focus:outline-none group block"
              >
                <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase group-hover:opacity-60 transition-opacity">
                  [Interests & Personal Explorations]
                </span>
              </button>

              {openCategories['interests'] && (
                <div className="space-y-3.5 pt-1 pl-2 font-mono text-[10px] sm:text-[10.5px] animate-in fade-in duration-200">
                  <div className="space-y-0.5">
                    <span className="font-medium text-[#121212] block">
                      Technical Systems Design
                    </span>
                    <p className="text-black/65 leading-relaxed text-[9px] sm:text-[9.5px]">
                      Advanced tool building, custom organization scripts, and raw interface architecture.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="font-medium text-[#121212] block">
                      Acoustic/Visual Splicing
                    </span>
                    <p className="text-black/65 leading-relaxed text-[9px] sm:text-[9.5px]">
                      Slicing temporal frame tracks, rhythm-backed framing, and rhythmic motion dynamics.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Exhibitions & Independent Registries */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => toggleCategory('registries')}
                className="text-left w-full cursor-pointer focus:outline-none group block"
              >
                <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase group-hover:opacity-60 transition-opacity">
                  [Exhibitions & Independent Registries]
                </span>
              </button>

              {openCategories['registries'] && (
                <div className="space-y-2.5 pt-1 pl-2 font-mono text-[10px] sm:text-[10.5px] animate-in fade-in duration-200">
                  <div
                    onClick={(e) => toggleLink('saatchi', e)}
                    className="flex items-baseline justify-between gap-4 py-0.5 cursor-pointer text-black/75 hover:text-black transition-colors"
                  >
                    <span className="hover:underline underline-offset-4 decoration-black/30">
                      Saatchi Art Catalog
                    </span>
                    <a
                      href="https://www.saatchiart.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/40 hover:text-black text-[9px] uppercase tracking-wider"
                    >
                      {revealedLinks['saatchi'] ? 'saatchiart.com ↗' : '[reveal link]'}
                    </a>
                  </div>

                  <div
                    onClick={(e) => toggleLink('ig-finearts', e)}
                    className="flex items-baseline justify-between gap-4 py-0.5 cursor-pointer text-black/75 hover:text-black transition-colors"
                  >
                    <span className="hover:underline underline-offset-4 decoration-black/30">
                      Independent IG Fine Arts Registry
                    </span>
                    <a
                      href="https://instagram.com/sohafrht"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/40 hover:text-black text-[9px] uppercase tracking-wider"
                    >
                      {revealedLinks['ig-finearts'] ? '@sohafrht ↗' : '[reveal link]'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Identity Anchor */}
      <footer className="w-full flex items-baseline justify-between font-mono text-[8.5px] sm:text-[9px] text-black/40 uppercase tracking-widest pt-8">
        <span>SOHA FARHAT</span>
        <span>ARTISTIC IDENTITY & PHILOSOPHY</span>
      </footer>
    </div>
  );
}
