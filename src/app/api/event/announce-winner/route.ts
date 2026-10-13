import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const adminSecret = body?.adminSecret;

    if (adminSecret !== (process.env.ADMIN_SECRET_KEY || "admin@ksrce")) {
      return NextResponse.json(
        { error: "Forbidden. Invalid Admin Secret." },
        { status: 403 },
      );
    }

    const { data: teams, error } = await supabase
      .from("teams")
      .select("*")
      .order("score", { ascending: false });

    if (error || !teams || teams.length === 0) {
      return NextResponse.json(
        { error: "No teams registered" },
        { status: 400 },
      );
    }

    const winner = teams[0];

    await supabase
      .from("event_state")
      .update({
        winner_announced: true,
        winning_team_id: winner.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    return NextResponse.json({ success: true, winner });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
