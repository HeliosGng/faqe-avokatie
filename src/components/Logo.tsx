import React from 'react';
import { Language } from '../types';

interface LogoProps {
  lang: Language;
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ lang, className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Scalable Vector Shield Logo */}
      <svg
        width="65"
        height="75"
        viewBox="0 0 130 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-[1.03]"
      >
        {/* Shield Structure */}
        <path
          d="M10 15V60C10 102.5 65 140 65 140C65 140 120 102.5 120 60V15L65 10L10 15Z"
          fill="#faf9f5"
          stroke="#0e4546"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        
        {/* Initials E.SH at top */}
        <text
          x="65"
          y="42"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="24"
          fontWeight="bold"
          fill="#0e4546"
          textAnchor="middle"
          letterSpacing="1"
        >
          E.SH
        </text>

        {/* Divider beneath E.SH */}
        <line x1="30" y1="52" x2="100" y2="52" stroke="#0e4546" strokeWidth="2" />

        {/* Scales of Justice SVG inside shield */}
        <g id="scales-of-justice" transform="translate(15, 52)">
          {/* Main Pillar (center shaft) */}
          <path d="M50 15 L50 63" stroke="#0e4546" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 63 L60 63" stroke="#0e4546" strokeWidth="4" strokeLinecap="round" /> {/* Base footer */}
          <circle cx="50" cy="11" r="3" fill="#0e4546" /> {/* Top finial */}

          {/* Balanced horizontal beam */}
          <path d="M22 25 L78 25" stroke="#0e4546" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Left Pan strings and plate */}
          <path d="M22 25 L12 45 M22 25 L32 45" stroke="#0e4546" strokeWidth="1.5" />
          <path d="M10 45 L34 45" stroke="#0e4546" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 45 C12 51 32 51 32 45" stroke="#0e4546" strokeWidth="2" />

          {/* Right Pan strings and plate */}
          <path d="M78 25 L68 45 M78 25 L88 45" stroke="#0e4546" strokeWidth="1.5" />
          <path d="M66 45 L90 45" stroke="#0e4546" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 45 C68 51 88 51 88 45" stroke="#0e4546" strokeWidth="2" />
        </g>
      </svg>

      {!iconOnly && (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm tracking-[0.25em] text-gold-600 font-bold uppercase">
            {lang === 'al' ? 'ZYRË' : 'LAW'}
          </span>
          <span className="font-display text-sm tracking-[0.18em] text-brand-900 font-bold uppercase">
            {lang === 'al' ? 'AVOKATIE' : 'CHAMBERS'}
          </span>
          <span className="font-serif text-lg text-brand-900 font-extrabold tracking-wide">
            ERNEST SHIMKA
          </span>
        </div>
      )}
    </div>
  );
}
