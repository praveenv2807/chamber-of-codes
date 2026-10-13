"use client";

import React from "react";
import { motion } from "framer-motion";
import { PotionStyle } from "@/data/curriculum";

interface PotionBottleProps {
  potion: PotionStyle;
  roundNumber: number;
}

export default function PotionBottle({
  potion,
  roundNumber,
}: PotionBottleProps) {
  return (
    <div className="relative group cursor-grab active:cursor-grabbing select-none flex flex-col items-center">
      {/* Dynamic Magical Aura Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 rounded-full blur-2xl pointer-events-none"
        style={{ background: potion.glowColor }}
      />

      {/* Realistic 3D SVG Bottle */}
      <svg
        width="110"
        height="150"
        viewBox="0 0 100 140"
        className="relative z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
      >
        <defs>
          {/* Glass Gradient Reflection */}
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          {/* Wooden Cork Gradient */}
          <linearGradient id="corkWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Liquid Shimmer Gradient */}
          <linearGradient
            id={`liquidGrad-${roundNumber}`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor={potion.particleHex}
              stopOpacity="0.9"
            />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Wooden Cork Stopper */}
        <path d="M 40 5 L 60 5 L 58 18 L 42 18 Z" fill="url(#corkWood)" />
        <ellipse cx="50" cy="5" rx="10" ry="2.5" fill="#d97706" />

        {/* Golden Neck Twine & Rune Ring */}
        <rect x="41" y="18" width="18" height="5" rx="2" fill="#d97706" />
        <circle cx="50" cy="20.5" r="1.5" fill="#fef08a" />

        {/* 2. Glass Bottle Shapes by Round Profile */}
        {potion.bottleShape === "flask" && (
          <>
            <path
              d="M 43 23 L 57 23 L 57 45 L 85 105 A 15 15 0 0 1 70 125 L 30 125 A 15 15 0 0 1 15 105 L 43 45 Z"
              fill={`url(#liquidGrad-${roundNumber})`}
              opacity="0.85"
            />
            <path
              d="M 43 23 L 57 23 L 57 45 L 85 105 A 15 15 0 0 1 70 125 L 30 125 A 15 15 0 0 1 15 105 L 43 45 Z"
              fill="url(#glassReflect)"
              stroke="#e2e8f0"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </>
        )}

        {potion.bottleShape === "spherical" && (
          <>
            <circle
              cx="50"
              cy="85"
              r="38"
              fill={`url(#liquidGrad-${roundNumber})`}
              opacity="0.85"
            />
            <circle
              cx="50"
              cy="85"
              r="38"
              fill="url(#glassReflect)"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />
            <rect
              x="44"
              y="23"
              width="12"
              height="25"
              fill="url(#glassReflect)"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
          </>
        )}

        {potion.bottleShape === "crystal" && (
          <>
            <polygon
              points="50,23 68,50 82,90 50,128 18,90 32,50"
              fill={`url(#liquidGrad-${roundNumber})`}
              opacity="0.85"
            />
            <polygon
              points="50,23 68,50 82,90 50,128 18,90 32,50"
              fill="url(#glassReflect)"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />
          </>
        )}

        {potion.bottleShape !== "flask" &&
          potion.bottleShape !== "spherical" &&
          potion.bottleShape !== "crystal" && (
            <>
              <rect
                x="25"
                y="40"
                width="50"
                height="80"
                rx="20"
                fill={`url(#liquidGrad-${roundNumber})`}
                opacity="0.85"
              />
              <rect
                x="25"
                y="40"
                width="50"
                height="80"
                rx="20"
                fill="url(#glassReflect)"
                stroke="#e2e8f0"
                strokeWidth="2.5"
              />
              <rect
                x="42"
                y="23"
                width="16"
                height="20"
                fill="url(#glassReflect)"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
            </>
          )}

        {/* 3. Rising Magic Bubbles Inside Liquid */}
        <motion.circle
          cx="42"
          cy="100"
          r="3"
          fill="#ffffff"
          opacity="0.8"
          animate={{ cy: [100, 60], opacity: [0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="58"
          cy="110"
          r="4.5"
          fill="#ffffff"
          opacity="0.9"
          animate={{ cy: [110, 50], opacity: [0.9, 0] }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* 4. Glass Glare Arc Highlight */}
        <path
          d="M 30 55 A 35 35 0 0 1 70 55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* Potion Label Tag */}
      <div className="mt-3 text-center">
        <div className="font-serif font-black text-amber-200 text-sm tracking-wide drop-shadow-md">
          {potion.name}
        </div>
        <div className="text-[10px] font-mono text-amber-400/80 tracking-widest uppercase">
          ✦ Drag to Portal Cauldron ✦
        </div>
      </div>
    </div>
  );
}
