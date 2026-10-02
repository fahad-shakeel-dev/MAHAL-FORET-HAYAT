"use client";

import { useEffect, useState } from "react";

export function ConstructionIntro({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const revealTimer = window.setTimeout(() => setExiting(true), motion.matches ? 0 : 3000);
    const timer = window.setTimeout(() => setVisible(false), motion.matches ? 0 : 3450);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(revealTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <>
      <noscript><style>{`.construction-intro { display: none !important; } .construction-content { display: flex !important; }`}</style></noscript>
      {visible && (
        <div className={`construction-intro${exiting ? " construction-intro-exiting" : ""}`} role="status" aria-label="Construction animation. The website will open shortly.">
          <div className="construction-intro-inner">
            <svg className="construction-scene" viewBox="0 0 600 340" role="img" aria-label="A construction crane builds a house beside a delivery truck">
              <defs>
                <linearGradient id="intro-wall" x1="0%" y1="0%" x2="100%" y2="100%"><stop stopColor="#e9e5dc" /><stop offset="1" stopColor="#aaa69b" /></linearGradient>
                <linearGradient id="intro-metal" x1="0%" y1="0%" x2="100%" y2="100%"><stop stopColor="#ebca82" /><stop offset=".5" stopColor="#c6a05a" /><stop offset="1" stopColor="#8e6b35" /></linearGradient>
                <linearGradient id="intro-glass" x1="0%" y1="0%" x2="100%" y2="100%"><stop stopColor="#526d7a" /><stop offset="1" stopColor="#1c2c35" /></linearGradient>
                <radialGradient id="intro-glow"><stop stopColor="#c6a05a" stopOpacity=".09" /><stop offset="1" stopColor="#c6a05a" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="335" cy="180" r="155" fill="url(#intro-glow)" />
              <circle cx="460" cy="85" r="35" fill="#c5ced3" opacity=".07" />
              <g fill="none" stroke="#414b52" strokeWidth="2">
                <path d="M50 275V180h55v95m400 0V150h45v125M65 200h25m-25 22h25m430-48h15m-15 22h15" />
              </g>
              <g stroke="url(#intro-metal)" strokeWidth="7" strokeLinejoin="round" fill="none">
                <path d="M150 280V65h22v215M150 65l22 35-22 35 22 35-22 35 22 35M95 65h305M110 65l50-40 115 40M160 25v40" />
              </g>
              <rect x="139" y="93" width="45" height="30" rx="4" fill="url(#intro-metal)" />
              <rect x="148" y="99" width="25" height="15" rx="2" fill="url(#intro-glass)" />
              <path className="construction-cable" d="M209 68v68" stroke="#9ca8ae" strokeWidth="2" />
              <g className="construction-hook" stroke="#9ca8ae" strokeWidth="3" fill="none">
                <path d="M203 136a7 7 0 1 0 12 5" />
                <path className="construction-slings" d="M209 148l-20 21m20-21 20 21" strokeWidth="2" />
              </g>
              <g className="construction-materials">
                <rect x="188" y="169" width="42" height="22" rx="2" fill="#b5b1a8" />
                <path d="M188 180h42m-28-11v11m14 0v11" stroke="#858178" strokeWidth="1.5" />
              </g>
              <g className="construction-house">
                <rect x="245" y="197" width="185" height="83" rx="3" fill="url(#intro-wall)" />
                <path d="M232 197l105-79 106 79" fill="#303b43" stroke="#75818a" strokeWidth="8" strokeLinejoin="round" />
                <path d="M248 222h180m-180 27h180M275 198v24m70 0v27m-40 0v31m88-82v24" stroke="#8f8b82" strokeWidth="1.5" />
                <rect x="317" y="228" width="39" height="52" rx="3" fill="#34332f" />
                <g fill="url(#intro-glass)" stroke="#d6d1c6" strokeWidth="3">
                  <rect x="267" y="216" width="29" height="29" rx="2" />
                  <rect x="378" y="216" width="29" height="29" rx="2" />
                </g>
              </g>
              <g className="construction-truck">
                <rect x="65" y="244" width="91" height="32" rx="4" fill="url(#intro-metal)" />
                <path d="M156 250h24l20 16v10h-44Z" fill="#b88f48" />
                <path d="M163 254h14l12 11h-26Z" fill="url(#intro-glass)" />
                <path d="M72 242h75m-65-10h56" stroke="#b5b1a8" strokeWidth="8" />
                <g fill="#171c20" stroke="#8a959c" strokeWidth="4"><circle cx="91" cy="277" r="12" /><circle cx="177" cy="277" r="12" /></g>
              </g>
              <path d="M42 290h516" stroke="#50585e" strokeWidth="3" strokeLinecap="round" />
              <g fill="#cba455"><path d="m468 285 10-29 10 29Zm34 0 10-29 10 29Z" /></g>
              <path d="M473 273h10m24 0h10" stroke="#fff" strokeWidth="4" />
            </svg>
            <div className="construction-progress" aria-hidden="true"><span /></div>
          </div>
        </div>
      )}
      <div className="construction-content flex min-h-dvh flex-col" style={{ display: visible && !exiting ? "none" : undefined }}>
        {children}
      </div>
    </>
  );
}
