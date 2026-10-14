"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight } from "lucide-react";

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
  const [stage, setStage] = useState<"opening" | "opened">("opening");
  const [btnLocked, setBtnLocked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStage("opening");
      setBtnLocked(false);

      confetti({
        particleCount: 200,
        spread: 150,
        origin: { y: 0.5 },
        colors: ["#f59e0b", "#fbbf24", "#fef08a", "#ffffff", "#dc2626"],
      });

      const timer = setTimeout(() => {
        setStage("opened");
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setStage("opening");
      setBtnLocked(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen bg-black overflow-hidden flex items-center justify-center select-none">
      {/* Background World Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-110 saturate-150 contrast-125 scale-105"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-amber-950/25 to-yellow-500/20 mix-blend-color-dodge" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 3D Gate Panels */}
      <div
        className="absolute inset-0 w-full h-full flex z-10 pointer-events-none"
        style={{ perspective: "1200px" }}
      >
        {/* Left Gate Door */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -115 }}
          transition={{ duration: 2.6, ease: [0.25, 1, 0.5, 1] }}
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
          className="w-1/2 h-full bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 border-r-4 border-amber-500/90 shadow-[30px_0_70px_rgba(0,0,0,0.95)] relative flex flex-col justify-around p-8"
        >
          <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400" />
          <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400" />
          <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-amber-400 bg-amber-600 shadow-2xl flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-200" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-yellow-400/25" />
        </motion.div>

        {/* Right Gate Door */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 115 }}
          transition={{ duration: 2.6, ease: [0.25, 1, 0.5, 1] }}
          style={{
            transformOrigin: "right center",
            transformStyle: "preserve-3d",
          }}
          className="w-1/2 h-full bg-gradient-to-l from-stone-950 via-amber-950 to-stone-900 border-l-4 border-amber-500/90 shadow-[-30px_0_70px_rgba(0,0,0,0.95)] relative flex flex-col justify-around p-8"
        >
          <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400" />
          <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400" />
          <div className="h-4 bg-amber-700/60 rounded-full border border-amber-400" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-4 border-amber-400 bg-amber-600 shadow-2xl flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-200" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-amber-500/10 to-yellow-400/25" />
        </motion.div>
      </div>

      {/* Gateway Transition Dialog */}
      <AnimatePresence>
        {stage === "opened" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-30 max-w-lg w-11/12 p-8 text-center bg-slate-950/90 border-2 border-amber-400 backdrop-blur-2xl rounded-3xl shadow-[0_0_100px_rgba(245,158,11,0.8)]"
          >
            <Sparkles className="w-12 h-12 text-amber-300 mx-auto mb-2 animate-spin" />
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
              Portal Gateway Unlocked
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 my-2">
              Entering: {nextWorldName}
            </h2>
            <p className="text-xs font-mono text-slate-300 mb-6">
              The ancient palace seals have shattered. You have unlocked Round{" "}
              {nextRoundNumber}!
            </p>

            <button
              disabled={btnLocked}
              onClick={() => {
                if (btnLocked) return;
                setBtnLocked(true);
                onAnimationComplete();
              }}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-black rounded-xl text-sm transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer"
            >
              Step Into {nextWorldName} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
