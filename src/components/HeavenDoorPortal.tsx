"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface HeavenDoorPortalProps {
  isOpen: boolean;
  onAnimationComplete: () => void;
  nextWorldName: string;
  nextRoundNumber: number;
  videoBg: string;
}

export default function HeavenDoorPortal({
  isOpen,
  onAnimationComplete,
  nextWorldName,
  nextRoundNumber,
  videoBg,
}: HeavenDoorPortalProps) {
  const [stage, setStage] = useState<"closed" | "bursting" | "entered">(
    "closed",
  );

  useEffect(() => {
    if (isOpen) {
      setStage("bursting");

      // Giant Celebration Blast
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.4 },
        colors: ["#f59e0b", "#fbbf24", "#fef08a", "#ffffff", "#dc2626"],
      });

      // Advance stage after majestic door opens
      const timer = setTimeout(() => {
        setStage("entered");
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
      >
        {/* 1. NEXT WORLD VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-110 saturate-150 contrast-125"
          >
            <source src={videoBg} type="video/mp4" />
          </video>
          {/* Volumetric Sunset Golden Haze Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-amber-950/40 to-yellow-500/20 mix-blend-color-dodge" />
        </div>

        {/* 2. VOLUMETRIC SUNSET GOD-RAYS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: stage === "bursting" ? [0, 1, 0.8] : 0.3,
            scale: [0.8, 1.4, 1.2],
            rotate: [0, 15, -15, 0],
          }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="absolute z-10 w-[140vw] h-[140vh] pointer-events-none flex items-center justify-center"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200 via-amber-500/50 to-transparent blur-3xl opacity-80" />
        </motion.div>

        {/* 3. THE GIANT 3D HOGWARTS PALACE GOTHIC DOORS */}
        <div className="relative z-20 w-full max-w-4xl h-[85vh] flex perspective-1000 items-center justify-center">
          {/* LEFT DOOR LEAF */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: stage === "bursting" || stage === "entered" ? -110 : 0,
            }}
            transition={{ duration: 3.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: "left center" }}
            className="w-1/2 h-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border-4 border-amber-600/70 rounded-l-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] relative flex flex-col justify-between p-8 overflow-hidden backface-hidden"
          >
            <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400 shadow-md" />
            <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400 shadow-md" />
            <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400 shadow-md" />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-amber-400 bg-amber-600 shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-yellow-400/40 pointer-events-none" />
          </motion.div>

          {/* RIGHT DOOR LEAF */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: stage === "bursting" || stage === "entered" ? 110 : 0,
            }}
            transition={{ duration: 3.2, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: "right center" }}
            className="w-1/2 h-full bg-gradient-to-l from-stone-900 via-amber-950 to-stone-900 border-4 border-amber-600/70 rounded-r-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] relative flex flex-col justify-between p-8 overflow-hidden backface-hidden"
          >
            <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400 shadow-md" />
            <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400 shadow-md" />
            <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400 shadow-md" />

            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-amber-400 bg-amber-600 shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-500/10 to-yellow-400/40 pointer-events-none" />
          </motion.div>
        </div>

        {/* 4. HEAVENLY ANNOUNCEMENT BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 50 }}
          animate={{
            opacity: stage === "entered" ? 1 : 0,
            scale: stage === "entered" ? 1 : 0.7,
            y: stage === "entered" ? 0 : 50,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute z-30 max-w-xl w-full p-8 text-center bg-slate-950/80 border-2 border-amber-400 backdrop-blur-xl rounded-3xl shadow-[0_0_100px_rgba(245,158,11,0.6)]"
        >
          <Sparkles className="w-14 h-14 text-amber-300 mx-auto mb-3 animate-spin" />
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-bold">
            Portal Gateway Unlocked
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 my-2">
            Entering: {nextWorldName}
          </h2>
          <p className="text-sm font-mono text-slate-300 mb-6">
            The ancient palace seals have shattered. You have unlocked Round{" "}
            {nextRoundNumber}!
          </p>

          <button
            onClick={onAnimationComplete}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-black rounded-xl text-base transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center gap-2 mx-auto"
          >
            Step Into {nextWorldName} <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
