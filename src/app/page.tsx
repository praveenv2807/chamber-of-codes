"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import confetti from "canvas-confetti";
import {
  Trophy,
  Shield,
  Sparkles,
  Crown,
  Lock,
  RefreshCw,
  CheckCircle2,
  Play,
  AlertCircle,
  Wand2,
  Flame,
  ArrowRight,
  Check,
  Lightbulb,
  Castle,
  Compass,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  ROUNDS_DATA,
  RoundConfig,
  RoundQuestion,
  PotionStyle,
} from "@/data/curriculum";

interface Team {
  id: string;
  name: string;
  passkey: string;
  score: number;
  currentRound: number;
  unlockedTiles: number[];
}

const DEFAULT_TEAMS: Team[] = [
  {
    id: "team-gryf",
    name: "Gryffindor Coders",
    passkey: "gryf123",
    score: 0,
    currentRound: 1,
    unlockedTiles: [],
  },
  {
    id: "team-slyth",
    name: "Slytherin Hackers",
    passkey: "slyth123",
    score: 0,
    currentRound: 1,
    unlockedTiles: [],
  },
  {
    id: "team-raven",
    name: "Ravenclaw Logic",
    passkey: "raven123",
    score: 0,
    currentRound: 1,
    unlockedTiles: [],
  },
  {
    id: "team-huff",
    name: "Hufflepuff Loops",
    passkey: "huff123",
    score: 0,
    currentRound: 1,
    unlockedTiles: [],
  },
];

function getShuffledQuestionsForTeam(
  questions: RoundQuestion[],
  teamId: string,
  roundNum: number,
): RoundQuestion[] {
  const seedString = `${teamId}-round-${roundNum}`;
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed << 5) - seed + seedString.charCodeAt(i);
    seed |= 0;
  }

  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function PotionBottle({
  potion,
  roundNumber,
}: {
  potion: PotionStyle;
  roundNumber: number;
}) {
  return (
    <div className="relative group cursor-grab active:cursor-grabbing select-none flex flex-col items-center">
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 rounded-full blur-2xl pointer-events-none"
        style={{ background: potion.glowColor }}
      />

      <svg
        width="110"
        height="150"
        viewBox="0 0 100 140"
        className="relative z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="corkWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

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

        <path d="M 40 5 L 60 5 L 58 18 L 42 18 Z" fill="url(#corkWood)" />
        <ellipse cx="50" cy="5" rx="10" ry="2.5" fill="#d97706" />

        <rect x="41" y="18" width="18" height="5" rx="2" fill="#d97706" />
        <circle cx="50" cy="20.5" r="1.5" fill="#fef08a" />

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

        <path
          d="M 30 55 A 35 35 0 0 1 70 55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

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

function HeavenDoorPortal({
  isOpen,
  onAnimationComplete,
  nextWorldName,
  nextRoundNumber,
  videoBg,
}: {
  isOpen: boolean;
  onAnimationComplete: () => void;
  nextWorldName: string;
  nextRoundNumber: number;
  videoBg: string;
}) {
  const [stage, setStage] = useState<"closed" | "bursting" | "entered">(
    "closed",
  );

  useEffect(() => {
    if (isOpen) {
      setStage("bursting");

      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.4 },
        colors: ["#f59e0b", "#fbbf24", "#fef08a", "#ffffff", "#dc2626"],
      });

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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-amber-950/40 to-yellow-500/20 mix-blend-color-dodge" />
        </div>

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

        <div className="relative z-20 w-full max-w-4xl h-[85vh] flex perspective-1000 items-center justify-center">
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

export default function ChamberOfCodesArena() {
  const [currentUser, setCurrentUser] = useState<{
    role: "HOST" | "TEAM";
    teamId?: string;
  } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState<Team[]>(DEFAULT_TEAMS);
  const [loginRole, setLoginRole] = useState<"TEAM" | "HOST">("TEAM");
  const [selectedTeamId, setSelectedTeamId] = useState("team-gryf");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeQuestion, setActiveQuestion] = useState<RoundQuestion | null>(
    null,
  );
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showHint, setShowHint] = useState(false);

  const [puzzleOrder, setPuzzleOrder] = useState<number[]>([2, 5, 0, 4, 1, 3]);
  const [draggedTileIndex, setDraggedTileIndex] = useState<number | null>(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isGrannyCursed, setIsGrannyCursed] = useState(false);
  const [dragOverCauldron, setDragOverCauldron] = useState(false);

  const [isHeavenDoorOpen, setIsHeavenDoorOpen] = useState(false);

  const [winnerModal, setWinnerModal] = useState<{
    open: boolean;
    team: Team | null;
  }>({
    open: false,
    team: null,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("chamber_user");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch {
      // browser storage fallback
    }
    setIsLoaded(true);
  }, []);

  const activeTeam = teams.find((t) => t.id === currentUser?.teamId);
  const currentRoundIndex = (activeTeam ? activeTeam.currentRound : 1) - 1;
  const currentRoundConfig: RoundConfig =
    ROUNDS_DATA[Math.min(currentRoundIndex, 6)];

  const displayedQuestions = useMemo(() => {
    if (!currentUser?.teamId) return currentRoundConfig.questions;
    return getShuffledQuestionsForTeam(
      currentRoundConfig.questions,
      currentUser.teamId,
      currentRoundConfig.roundNumber,
    );
  }, [currentRoundConfig, currentUser?.teamId]);

  const roundQuestionIds = currentRoundConfig.questions.map((q) => q.id);
  const solvedRoundQuestions = (activeTeam?.unlockedTiles || []).filter((id) =>
    roundQuestionIds.includes(id),
  );
  const isRoundQuestionsComplete = solvedRoundQuestions.length === 6;

  useEffect(() => {
    fetchTeams();

    try {
      const teamsSubscription = supabase
        .channel("teams_realtime_channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "teams" },
          () => {
            fetchTeams();
          },
        )
        .subscribe();

      const eventSubscription = supabase
        .channel("event_realtime_channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "event_state" },
          (payload: any) => {
            const state = payload?.new;
            if (state?.winner_announced && state?.winning_team_id) {
              triggerWinnerPopup(state.winning_team_id);
            }
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(teamsSubscription);
        supabase.removeChannel(eventSubscription);
      };
    } catch {
      // offline fallback
    }
  }, []);

  const fetchTeams = async () => {
    try {
      const { data } = await supabase
        .from("teams")
        .select("*")
        .order("score", { ascending: false });
      if (data && data.length > 0) {
        setTeams(
          data.map((d: any) => ({
            id: d.id,
            name: d.name,
            passkey: d.passkey,
            score: d.score,
            currentRound: d.current_round || 1,
            unlockedTiles: d.unlocked_tiles || [],
          })),
        );
      }
    } catch {
      // keeps default teams if disconnected
    }
  };

  const triggerWinnerPopup = (teamId: string) => {
    const winner = teams.find((t) => t.id === teamId) || teams[0];
    setWinnerModal({ open: true, team: winner });
    confetti({
      particleCount: 250,
      spread: 140,
      origin: { y: 0.5 },
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (loginRole === "HOST") {
      const validAdminSecret =
        process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin@ksrce";

      if (passwordInput === validAdminSecret) {
        const user = { role: "HOST" as const };
        try {
          localStorage.setItem("chamber_user", JSON.stringify(user));
        } catch {}
        setCurrentUser(user);
      } else {
        setAuthError("Invalid Master Admin Secret Key");
      }
    } else {
      const team = teams.find((t) => t.id === selectedTeamId);
      if (team && team.passkey === passwordInput) {
        const user = { role: "TEAM" as const, teamId: team.id };
        try {
          localStorage.setItem("chamber_user", JSON.stringify(user));
        } catch {}
        setCurrentUser(user);
      } else {
        setAuthError("Invalid House Squad Passkey");
      }
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("chamber_user");
    } catch {}
    setCurrentUser(null);
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestion || !currentUser?.teamId || !selectedOption) return;

    const isCorrect =
      selectedOption.toUpperCase() ===
      activeQuestion.expectedAnswer.toUpperCase();

    if (isCorrect) {
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.8 } });

      const targetTeam = teams.find((t) => t.id === currentUser.teamId);
      const prevTiles = targetTeam?.unlockedTiles || [];
      const updatedTiles = prevTiles.includes(activeQuestion.id)
        ? prevTiles
        : [...prevTiles, activeQuestion.id];
      const updatedScore = (targetTeam?.score || 0) + 10;

      setTeams((prev) =>
        prev.map((t) => {
          if (t.id === currentUser.teamId) {
            return { ...t, score: updatedScore, unlockedTiles: updatedTiles };
          }
          return t;
        }),
      );

      try {
        await supabase
          .from("teams")
          .update({
            score: updatedScore,
            unlocked_tiles: updatedTiles,
          })
          .eq("id", currentUser.teamId);
      } catch {
        // network sync safeguard
      }

      setActiveQuestion(null);
      setSelectedOption("");
      setShowHint(false);
    } else {
      if (containerRef.current) {
        gsap
          .timeline()
          .to(containerRef.current, {
            x: -16,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
          })
          .to(containerRef.current, { x: 0, duration: 0.05 });
      }

      const targetTeam = teams.find((t) => t.id === currentUser.teamId);
      const penalizedScore = Math.max(0, (targetTeam?.score || 0) - 5);

      setTeams((prev) =>
        prev.map((t) => {
          if (t.id === currentUser.teamId) {
            return { ...t, score: penalizedScore };
          }
          return t;
        }),
      );

      try {
        await supabase
          .from("teams")
          .update({ score: penalizedScore })
          .eq("id", currentUser.teamId);
      } catch {
        // network sync safeguard
      }

      alert(
        `Incorrect! Option ${selectedOption} is wrong. Professor Snape deducts 5 points from your house!`,
      );
      setSelectedOption("");
    }
  };

  const handleTileDragStart = (index: number) => {
    setDraggedTileIndex(index);
  };

  const handleTileDrop = (targetIndex: number) => {
    if (draggedTileIndex === null || draggedTileIndex === targetIndex) return;

    const newOrder = [...puzzleOrder];
    const temp = newOrder[draggedTileIndex];
    newOrder[draggedTileIndex] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setPuzzleOrder(newOrder);
    setDraggedTileIndex(null);
  };

  const verifyPuzzleSolution = () => {
    const isCorrect = puzzleOrder.every((val, idx) => val === idx);

    if (isCorrect) {
      setIsPuzzleSolved(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    } else {
      setIsGrannyCursed(true);

      if (containerRef.current) {
        gsap
          .timeline()
          .to(containerRef.current, {
            x: -25,
            rotate: 1.5,
            duration: 0.06,
            repeat: 8,
            yoyo: true,
          })
          .to(containerRef.current, { x: 0, rotate: 0, duration: 0.06 });
      }

      setTimeout(() => {
        setPuzzleOrder([3, 0, 5, 1, 4, 2]);
        setIsGrannyCursed(false);
      }, 3500);
    }
  };

  const handlePotionDrop = () => {
    setIsHeavenDoorOpen(true);
  };

  const handleDoorTransitionComplete = async () => {
    if (!currentUser?.teamId) return;

    const nextRound = Math.min(currentRoundConfig.roundNumber + 1, 7);
    const targetTeam = teams.find((t) => t.id === currentUser.teamId);
    const bonusScore = (targetTeam?.score || 0) + 50;

    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === currentUser.teamId) {
          return {
            ...t,
            currentRound: nextRound,
            score: bonusScore,
          };
        }
        return t;
      }),
    );

    try {
      await supabase
        .from("teams")
        .update({
          current_round: nextRound,
          score: bonusScore,
        })
        .eq("id", currentUser.teamId);
    } catch {
      // network sync safeguard
    }

    setIsHeavenDoorOpen(false);
    setIsPuzzleSolved(false);
    setPuzzleOrder([2, 5, 0, 4, 1, 3]);

    if (currentRoundConfig.roundNumber === 7) {
      triggerWinnerPopup(currentUser.teamId);
    }
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-700 relative overflow-x-hidden ${
        isGrannyCursed ? "bg-rose-950/80" : ""
      }`}
    >
      <HeavenDoorPortal
        isOpen={isHeavenDoorOpen}
        onAnimationComplete={handleDoorTransitionComplete}
        nextWorldName={currentRoundConfig.nextWorldName}
        nextRoundNumber={Math.min(currentRoundConfig.roundNumber + 1, 7)}
        videoBg={currentRoundConfig.worldVideoBg}
      />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-b ${currentRoundConfig.themeColor} opacity-50 transition-colors duration-1000`}
        />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <AnimatePresence>
        {isGrannyCursed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "-120vw", y: 150, rotate: -15, scale: 0.8 }}
              animate={{
                x: "120vw",
                y: -100,
                rotate: 20,
                scale: [0.8, 1.4, 0.9],
              }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className="absolute text-center drop-shadow-[0_0_40px_rgba(239,68,68,0.9)]"
            >
              <div className="text-8xl select-none">🧙‍♀️🧹💨</div>
              <div className="bg-rose-950 border-2 border-rose-500 text-rose-200 font-serif font-black px-6 py-2 rounded-full text-xl shadow-2xl mt-2 animate-bounce">
                "HEHEHEHE! BROOMSTICK CURSE! SHUFFLING TILES!"
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-6 bg-slate-900/90 border border-rose-500 rounded-3xl shadow-[0_0_50px_rgba(244,63,94,0.4)]"
            >
              <Flame className="w-16 h-16 text-rose-500 mx-auto animate-pulse" />
              <h2 className="text-2xl font-serif font-bold text-rose-400 mt-2">
                Mismatched Spell Fragments!
              </h2>
              <p className="text-sm font-mono text-slate-300 mt-1">
                Granny Broomstick has scrambled your puzzle order.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative z-40 border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h1 className="font-serif font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-amber-100">
              CHAMBER OF CODES
            </h1>
            <p className="text-[11px] text-amber-500/80 font-mono">
              Round {currentRoundConfig.roundNumber} of 7:{" "}
              {currentRoundConfig.title} • KSRCE CSE
            </p>
          </div>
        </div>

        {currentUser && (
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono">
              Squad:{" "}
              <strong>
                {currentUser.role === "HOST"
                  ? "Master Host"
                  : activeTeam?.name}
              </strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-xs bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 px-3 py-1.5 rounded-lg transition"
            >
              Exit Arena
            </button>
          </div>
        )}
      </header>

      <AnimatePresence>
        {winnerModal.open && winnerModal.team && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-b from-amber-950/80 via-slate-900 to-black border-2 border-amber-400 p-8 rounded-3xl max-w-lg w-full text-center shadow-[0_0_80px_rgba(245,158,11,0.5)]"
            >
              <Crown className="w-20 h-20 text-amber-400 mx-auto mb-3 animate-bounce" />
              <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                Grand Tournament Champion
              </div>
              <h2 className="text-4xl font-serif font-black text-white mt-1 mb-2">
                {winnerModal.team.name}
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Completed All 7 Harry Potter Palace & Coding Trials!
              </p>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/80 border border-amber-500/30 p-4 rounded-xl mb-6">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">
                    Total Points
                  </div>
                  <div className="text-3xl font-mono font-bold text-amber-400">
                    {winnerModal.team.score} pts
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">
                    Palaces Conquered
                  </div>
                  <div className="text-3xl font-mono font-bold text-emerald-400">
                    7 / 7
                  </div>
                </div>
              </div>

              <button
                onClick={() => setWinnerModal({ open: false, team: null })}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-serif font-bold py-3 rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                Close Victory Scroll
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!currentUser ? (
        <div className="flex-1 flex items-center justify-center p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900/90 border border-amber-500/40 p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
          >
            <div className="text-center mb-6">
              <Castle className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-pulse" />
              <h2 className="text-2xl font-serif font-bold text-amber-300">
                Enter The Hogwarts Trials
              </h2>
              <p className="text-xs text-slate-400">
                7 Harry Potter Movie Puzzles • Handcrafted Potions • Giant
                Gateway Doors
              </p>
            </div>

            <div className="flex border-b border-slate-800 mb-6">
              <button
                onClick={() => {
                  setLoginRole("TEAM");
                  setAuthError("");
                }}
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition ${loginRole === "TEAM" ? "border-amber-400 text-amber-400 font-bold" : "border-transparent text-slate-400"}`}
              >
                House Squad Login
              </button>
              <button
                onClick={() => {
                  setLoginRole("HOST");
                  setAuthError("");
                }}
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition ${loginRole === "HOST" ? "border-amber-400 text-amber-400 font-bold" : "border-transparent text-slate-400"}`}
              >
                Master Host Login
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {loginRole === "TEAM" ? (
                <div>
                  <label className="block text-xs font-mono text-amber-300 font-semibold mb-2">
                    Select Squad
                  </label>
                  <select
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="w-full bg-slate-950 border border-amber-500/40 rounded-xl p-3 text-sm text-amber-100 font-medium focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {teams.map((t: Team) => (
                      <option
                        key={t.id}
                        value={t.id}
                        className="bg-slate-950 text-amber-100 py-1"
                      >
                        {t.name} (Round {t.currentRound})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-300">
                  Organizer command deck: live scoreboard & winner announcement.
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-slate-300 font-medium mb-1">
                  {loginRole === "HOST"
                    ? "Admin Master Secret Key"
                    : "House Squad Passkey"}
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={
                    loginRole === "HOST"
                      ? "Enter host secret key"
                      : "Enter squad passkey"
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm font-mono text-slate-100 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                {loginRole === "HOST"
                  ? "Enter Host Command Deck"
                  : "Unlock Chamber Terminal"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      ) : (
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8 relative z-10">
          {currentUser.role === "HOST" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/90 border border-amber-500/40 p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Host Command Deck
                  </h2>
                  <p className="text-xs text-slate-400">
                    Monitoring all 7 Hogwarts Palace Trials
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const top = [...teams].sort(
                        (a, b) => b.score - a.score,
                      )[0];
                      triggerWinnerPopup(top.id);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-serif font-black rounded-xl text-sm transition shadow-lg shadow-amber-500/30"
                  >
                    <Trophy className="w-4 h-4" /> Announce The Winner
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {teams.map((t: Team) => (
                  <div
                    key={t.id}
                    className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm text-slate-200">
                        {t.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {t.score} pts
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mb-1 font-mono">
                      Current Stage:{" "}
                      <span className="text-emerald-400 font-bold">
                        Round {t.currentRound} / 7
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${(t.currentRound / 7) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentUser.role === "TEAM" && activeTeam && (
            <div className="space-y-8">
              <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center font-serif text-3xl font-black text-slate-950 shadow-xl shrink-0">
                  {currentRoundConfig.character[0]}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                    <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                      Round {currentRoundConfig.roundNumber} of 7
                    </span>
                    <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
                      Guardian: {currentRoundConfig.character} (
                      {currentRoundConfig.characterRole})
                    </span>
                    <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40 flex items-center gap-1">
                      <Compass className="w-3 h-3" />{" "}
                      {currentRoundConfig.locationName}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-black text-amber-300 mt-2">
                    {currentRoundConfig.title}
                  </h2>
                  <p className="text-sm font-mono text-slate-300 mt-1">
                    "Earn all 6 pieces to restore the movie scene of{" "}
                    {currentRoundConfig.locationName}. Brew the{" "}
                    {currentRoundConfig.potion.name} to breach the Heaven
                    Gateway Doors!"
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center min-w-[140px]">
                  <div className="text-xs font-mono text-slate-500">
                    Squad Score
                  </div>
                  <div className="text-2xl font-mono font-bold text-amber-400">
                    {activeTeam.score} pts
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-amber-300">
                      Phase 1: Choose The Best Answer
                    </h3>
                    <p className="text-xs text-slate-400">
                      Randomized for {activeTeam.name} (
                      {solvedRoundQuestions.length}/6 gathered)
                    </p>
                  </div>
                  {isRoundQuestionsComplete && (
                    <span className="text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-700/50 px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> All 6 Shards Unlocked
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {displayedQuestions.map((q, idx) => {
                    const isSolved = solvedRoundQuestions.includes(q.id);
                    return (
                      <motion.div
                        key={q.id}
                        whileHover={!isSolved ? { scale: 1.05 } : {}}
                        onClick={() => {
                          if (!isSolved) {
                            setActiveQuestion(q);
                            setSelectedOption("");
                            setShowHint(false);
                          }
                        }}
                        className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
                          isSolved
                            ? "bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "bg-slate-950/80 border-slate-800 hover:border-amber-400/60 hover:bg-slate-900"
                        }`}
                      >
                        {isSolved ? (
                          <>
                            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase">
                              Piece #{idx + 1}
                            </span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 text-amber-500/60 mb-2" />
                            <span className="text-xs font-mono font-bold text-amber-300">
                              Card #{idx + 1}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate w-full mt-0.5">
                              {q.category}
                            </span>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4 mb-6">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-amber-300 flex items-center gap-2">
                      <Castle className="w-5 h-5 text-amber-400" />{" "}
                      {currentRoundConfig.movieSceneTitle}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isRoundQuestionsComplete
                        ? "Drag and swap tiles to reconstruct the enchanted movie scene!"
                        : `Locked! Solve all 6 cards above to reveal the fragments of ${currentRoundConfig.locationName}.`}
                    </p>
                  </div>

                  {isRoundQuestionsComplete && !isPuzzleSolved && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={verifyPuzzleSolution}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
                    >
                      Verify Puzzle Placement
                    </motion.button>
                  )}
                </div>

                {isRoundQuestionsComplete ? (
                  <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto aspect-[3/2] bg-slate-950 p-3 rounded-2xl border border-amber-500/40 shadow-2xl relative">
                    {puzzleOrder.map((pieceIndex, gridPosition) => {
                      const col = pieceIndex % 3;
                      const row = Math.floor(pieceIndex / 3);

                      return (
                        <div
                          key={gridPosition}
                          draggable={!isPuzzleSolved}
                          onDragStart={() => handleTileDragStart(gridPosition)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleTileDrop(gridPosition)}
                          className={`aspect-video rounded-xl border border-amber-500/50 relative cursor-grab active:cursor-grabbing overflow-hidden transition-all duration-300 select-none bg-slate-900 ${
                            draggedTileIndex === gridPosition
                              ? "opacity-40 scale-95 border-amber-400"
                              : "hover:scale-[1.02]"
                          }`}
                        >
                          <div className="w-full h-full relative overflow-hidden">
                            <img
                              src={currentRoundConfig.puzzleImage}
                              alt={`Puzzle shard ${gridPosition + 1}`}
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                              className="absolute max-w-none pointer-events-none select-none"
                              style={{
                                width: "300%",
                                height: "200%",
                                left: `-${col * 100}%`,
                                top: `-${row * 100}%`,
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="absolute bottom-1 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300 font-bold border border-amber-500/20 z-10">
                            Slot #{gridPosition + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                    <Lock className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-mono text-slate-400">
                      Answer {6 - solvedRoundQuestions.length} more questions to
                      reveal {currentRoundConfig.locationName}.
                    </p>
                  </div>
                )}
              </div>

              {isPuzzleSolved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-amber-950/50 via-purple-950/60 to-emerald-950/50 border-2 border-amber-400 rounded-3xl p-8 shadow-[0_0_60px_rgba(245,158,11,0.3)]"
                >
                  <div className="text-center mb-6">
                    <h3 className="font-serif font-black text-2xl md:text-3xl text-amber-300">
                      Movie Scene Restored! {currentRoundConfig.potion.name}{" "}
                      Brewed
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 font-mono mt-1">
                      Drag the glowing 3D potion bottle into the Golden Gateway
                      Portal to blow open the Palace Doors!
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
                    <div
                      draggable
                      onDragStart={(e) =>
                        e.dataTransfer.setData("text/plain", "potion")
                      }
                      className="cursor-grab active:cursor-grabbing p-6 bg-slate-950/80 border-2 border-amber-400/80 rounded-3xl shadow-2xl hover:scale-105 transition-all"
                    >
                      <PotionBottle
                        potion={currentRoundConfig.potion}
                        roundNumber={currentRoundConfig.roundNumber}
                      />
                    </div>

                    <ArrowRight className="w-10 h-10 text-amber-400/70 hidden md:block animate-pulse" />

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverCauldron(true);
                      }}
                      onDragLeave={() => setDragOverCauldron(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverCauldron(false);
                        handlePotionDrop();
                      }}
                      className={`text-center p-8 rounded-3xl border-4 border-dashed transition-all duration-300 min-w-[280px] ${
                        dragOverCauldron
                          ? "border-yellow-300 bg-amber-500/30 scale-105 shadow-[0_0_60px_rgba(251,191,36,0.8)]"
                          : "border-amber-400/50 bg-slate-950/80"
                      }`}
                    >
                      <div className="text-6xl mb-3 animate-pulse">🚪🌅</div>
                      <h4 className="font-serif font-black text-lg text-slate-100">
                        {currentRoundConfig.roundNumber < 7
                          ? `Gateway to: ${currentRoundConfig.nextWorldName}`
                          : "Gateway to Champion Hall"}
                      </h4>
                      <p className="text-xs font-mono text-amber-400/90 mt-1">
                        ✦ Drop Potion Here to Breach Doors ✦
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-amber-300 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" /> Chamber
                      Leaderboard
                    </h3>
                    <p className="text-xs text-slate-400">
                      Live standings of Hogwarts squads
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Live
                    Synchronized
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs text-slate-500 uppercase">
                        <th className="py-3 px-4">Rank</th>
                        <th className="py-3 px-4">House Squad</th>
                        <th className="py-3 px-4">Palace Progress</th>
                        <th className="py-3 px-4">Points</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {[...teams]
                        .sort(
                          (a, b) =>
                            b.score - a.score ||
                            b.currentRound - a.currentRound,
                        )
                        .map((team, index) => (
                          <tr
                            key={team.id}
                            className={`hover:bg-slate-800/30 transition ${
                              currentUser?.teamId === team.id
                                ? "bg-amber-500/10"
                                : ""
                            }`}
                          >
                            <td className="py-4 px-4 font-bold flex items-center gap-2">
                              {index === 0 && (
                                <Crown className="w-4 h-4 text-amber-400" />
                              )}
                              {index === 1 && (
                                <span className="text-slate-300">2</span>
                              )}
                              {index === 2 && (
                                <span className="text-amber-600">3</span>
                              )}
                              {index > 2 && index + 1}
                            </td>
                            <td className="py-4 px-4 font-sans font-medium text-slate-200">
                              {team.name}
                              {currentUser?.teamId === team.id && (
                                <span className="ml-2 text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                                  Your Squad
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-emerald-400 font-bold">
                              Round {team.currentRound} / 7
                            </td>
                            <td className="py-4 px-4 font-bold text-amber-400">
                              {team.score} pts
                            </td>
                            <td className="py-4 px-4">
                              {team.currentRound === 7 ? (
                                <span className="inline-flex items-center gap-1 text-xs text-purple-400">
                                  <Sparkles className="w-3.5 h-3.5" /> Final
                                  Trial
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                                  <Play className="w-3.5 h-3.5" /> Battling
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      <AnimatePresence>
        {activeQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-amber-500/40 max-w-lg w-full rounded-3xl p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded border border-amber-500/30">
                  Round #{currentRoundConfig.roundNumber} •{" "}
                  {activeQuestion.category}
                </span>
                <button
                  onClick={() => {
                    setActiveQuestion(null);
                    setShowHint(false);
                    setSelectedOption("");
                  }}
                  className="text-slate-400 hover:text-slate-200 text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-serif font-bold text-slate-100">
                  {activeQuestion.name}
                </h3>

                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition border ${
                    showHint
                      ? "bg-amber-500/20 border-amber-400 text-amber-300"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-400"
                  }`}
                >
                  <Lightbulb
                    className={`w-3.5 h-3.5 ${showHint ? "text-amber-400 animate-pulse" : ""}`}
                  />
                  {showHint ? "Conceal Hint" : "Cast Lumos Hint"}
                </button>
              </div>

              <p className="text-sm text-slate-200 font-medium mb-3">
                {activeQuestion.questionText}
              </p>

              {activeQuestion.codeSnippet && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 mb-4 overflow-x-auto">
                  <pre>{activeQuestion.codeSnippet}</pre>
                </div>
              )}

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl flex items-start gap-3 shadow-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-serif font-bold text-sm">
                        H
                      </div>
                      <div>
                        <div className="text-[11px] font-mono uppercase font-bold text-amber-400">
                          Hermione's Lumos Clue:
                        </div>
                        <p className="text-xs text-amber-200/90 font-mono mt-0.5">
                          {activeQuestion.hint}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleAnswerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeQuestion.options.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSelectedOption(opt.key)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        selectedOption === opt.key
                          ? "border-amber-400 bg-amber-500/20 text-amber-200 shadow-md shadow-amber-500/10"
                          : "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300 hover:bg-slate-900"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                          selectedOption === opt.key
                            ? "bg-amber-400 text-black"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-xs font-mono">{opt.text}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-mono text-slate-400">
                    Selected:{" "}
                    <strong className="text-amber-400">
                      {selectedOption || "None"}
                    </strong>
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveQuestion(null);
                        setSelectedOption("");
                        setShowHint(false);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
                    >
                      Retreat
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={!selectedOption}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-serif font-bold rounded-xl text-xs transition shadow-lg shadow-amber-500/20 disabled:opacity-40"
                    >
                      Lock Choice (Submit)
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-4 text-center text-xs text-slate-500 font-mono relative z-10">
        Department of Computer Science & Engineering • K.S.R. College of
        Engineering (Autonomous), Tiruchengode
      </footer>
    </div>
  );
}