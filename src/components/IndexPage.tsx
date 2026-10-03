/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface LiveDirectory {
  id: string;
  name: string;
  url: string;
}

const DIRECTORIES: LiveDirectory[] = [
  { id: 'dir-linkedin', name: 'LinkedIn', url: 'https://linkedin.com' },
  { id: 'dir-behance', name: 'Behance', url: 'https://behance.net/sohafarhatd250' },
  { id: 'dir-instagram', name: 'Instagram', url: 'https://instagram.com/sohafrht' },
];

export function IndexPage({ onBack }: { onBack: () => void }) {
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});
  const [activeQr, setActiveQr] = useState<string | null>(null);

  useEffect(() => {
    const generateAllQrs = async () => {
      const results: Record<string, string> = {};
      for (const item of DIRECTORIES) {
        try {
          const dataUrl = await QRCode.toDataURL(item.url, {
            margin: 0,
            errorCorrectionLevel: 'L',
            width: 120,
            color: {
              dark: '#121212',
              light: '#00000000',
            },
          });
          results[item.id] = dataUrl;
        } catch (e) {
          console.error(e);
        }
      }
      setQrCodes(results);
    };
    generateAllQrs();
  }, []);

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
            [index]
          </h1>
          <div className="flex flex-col font-mono text-[7.5px] sm:text-[8px] text-black/40 uppercase tracking-widest leading-tight pt-1">
            <span>VER: PROFILE_01</span>
            <span>ITEM: METADATA</span>
          </div>
        </div>

        {/* Structural Multi-Column Text Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 sm:gap-y-14">
          {/* Column 1: Direct Communications & University Achievements */}
          <div className="space-y-8 sm:space-y-10">
            {/* Direct Communication Channels */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase block">
                [Direct Communication Channels]
              </span>
              <div className="space-y-2 pt-1 pl-2 font-mono text-[10px] sm:text-[10.5px]">
                <div className="flex items-baseline justify-between gap-4 py-0.5">
                  <span className="text-black/60">Communications</span>
                  <a
                    href="mailto:sohafarhat7@gmail.com"
                    className="text-[#121212] hover:underline underline-offset-4 decoration-black/40 transition-colors"
                  >
                    sohafarhat7@gmail.com
                  </a>
                </div>

                <div className="flex items-baseline justify-between gap-4 py-0.5">
                  <span className="text-black/60">Telecommunications</span>
                  <a
                    href="tel:+96171926805"
                    className="text-[#121212] hover:underline underline-offset-4 decoration-black/40 transition-colors"
                  >
                    +96171926805
                  </a>
                </div>

                <div className="flex items-baseline justify-between gap-4 py-0.5">
                  <span className="text-black/60">Geographic Coordinates</span>
                  <span className="text-[#121212]">Beirut, Lebanon</span>
                </div>

                <div className="flex items-baseline justify-between gap-4 py-0.5">
                  <span className="text-black/60">Temporal Metadata (DOB)</span>
                  <span className="text-[#121212]">3 August 1995</span>
                </div>
              </div>
            </div>

            {/* University Achievements & Engagement */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase block">
                [University Achievements & Engagement]
              </span>
              <div className="space-y-2.5 pt-1 pl-2 font-mono text-[10px] sm:text-[10.5px]">
                <div className="flex flex-col gap-0.5 py-0.5">
                  <span className="text-[#121212]">Lebanon Student Starpack 2016</span>
                  <span className="text-black/50 text-[9px]">
                    — Third Place Winner (Packaging Discipline)
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 py-0.5">
                  <span className="text-[#121212]">Sama Club (Lebanese University)</span>
                  <span className="text-black/50 text-[9px]">
                    — Institutional Collective Creative Coordination (2016 - 2017)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Live External Directories & QR Targets */}
          <div className="space-y-4">
            <span className="font-mono text-[11px] sm:text-[11.5px] font-semibold text-[#121212] tracking-wider uppercase block">
              [Live External Directories & QR Targets]
            </span>

            <div className="space-y-4 pt-1 pl-2">
              {DIRECTORIES.map((dir) => (
                <div
                  key={dir.id}
                  onMouseEnter={() => setActiveQr(dir.id)}
                  className="flex items-start justify-between gap-4 font-mono text-[10px] sm:text-[10.5px] py-1 border-b border-black/[0.04]"
                >
                  <div className="flex flex-col gap-0.5">
                    <a
                      href={dir.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#121212] hover:underline underline-offset-4 decoration-black/40 font-medium"
                    >
                      {dir.name}
                    </a>
                    <span className="text-black/40 text-[8.5px] tracking-tight">{dir.url}</span>
                  </div>

                  {/* Accompanying Vector QR Code Element */}
                  {qrCodes[dir.id] && (
                    <a
                      href={dir.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 group"
                      title={`Scan to open ${dir.name}`}
                    >
                      <img
                        src={qrCodes[dir.id]}
                        alt={`${dir.name} QR`}
                        className={`w-9 h-9 sm:w-10 sm:h-10 object-contain mix-blend-multiply transition-opacity ${
                          activeQr === dir.id ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-100'
                        }`}
                      />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Identity Anchor */}
      <footer className="w-full flex items-baseline justify-between font-mono text-[8.5px] sm:text-[9px] text-black/40 uppercase tracking-widest pt-8">
        <span>SOHA FARHAT</span>
        <span>COMMUNICATION DIRECTORIES & INDEX</span>
      </footer>
    </div>
  );
}
