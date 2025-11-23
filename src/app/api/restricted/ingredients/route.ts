import { NextRequest, NextResponse } from "next/server";
import { query } from "@/services/db";
import { Ingredient } from "@/types";

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
  const name = (body.name || "").trim();
  if(name == "") return NextResponse.json({ error: "name required" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

  const res = await query<{ id: number; name: string }>(
    `INSERT INTO ingredients (name) VALUES ($1) RETURNING id, name`,
    [name]
  );
  return NextResponse.json(res.rows[0]);
  }
  catch(e){
    return NextResponse.json({ error: "ingredient already exists" }, { status: 400 });
  }
}

export async function GET() {
  const res = await query<Ingredient>("SELECT id, name, created_at FROM ingredients ORDER BY id");
  return NextResponse.json(res.rows);
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await query(`DELETE FROM ingredients WHERE id = $1`, [id]);
  return NextResponse.json({ id });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  const name = body.name;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  await query(`UPDATE ingredients SET name = $2 WHERE id = $1`, [id, name]);
  return NextResponse.json({ id, name });
}
