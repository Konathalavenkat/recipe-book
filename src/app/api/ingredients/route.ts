import { NextResponse } from "next/server";
import { query } from "@/services/db";
import { Ingredient } from "@/types";

export async function GET() {
  const res = await query<Ingredient>("SELECT id, name, created_at FROM ingredients ORDER BY id");
  return NextResponse.json(res.rows);
}

