import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { ROUNDS_DATA } from "@/data/curriculum";

export async function POST(req: Request) {
  try {
    const { teamId, tileId, submittedAnswer } = await req.json();

    const allQuestions = ROUNDS_DATA.flatMap((r) => r.questions);
    const question = allQuestions.find((q) => q.id === tileId);

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 },
      );
    }

    const { data: team, error: fetchErr } = await supabase
      .from("teams")
      .select("*")
      .eq("id", teamId)
      .single();

    if (fetchErr || !team) {
      return NextResponse.json(
        { error: "Team not registered" },
        { status: 400 },
      );
    }

    const cleanInput = submittedAnswer?.trim().toUpperCase();
    const isCorrect = cleanInput === question.expectedAnswer.toUpperCase();

    if (isCorrect) {
      const alreadyUnlocked = team.unlocked_tiles?.includes(tileId);
      const newScore = alreadyUnlocked ? team.score : team.score + 10;
      const newTiles = alreadyUnlocked
        ? team.unlocked_tiles
        : [...(team.unlocked_tiles || []), tileId];

      const { error: updateErr } = await supabase
        .from("teams")
        .update({ score: newScore, unlocked_tiles: newTiles })
        .eq("id", teamId);

      if (updateErr) throw updateErr;

      return NextResponse.json({
        success: true,
        message: `Correct Option (${question.expectedAnswer})! Shard #${tileId} acquired! +10 Points!`,
        newScore,
        unlockedTiles: newTiles,
      });
    } else {
      const penalizedScore = Math.max(0, (team.score || 0) - 5);
      await supabase
        .from("teams")
        .update({ score: penalizedScore })
        .eq("id", teamId);

      return NextResponse.json({
        success: false,
        message: `Incorrect! Option ${cleanInput} is wrong. (-5 pts)`,
        newScore: penalizedScore,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
