import { NextRequest, NextResponse } from "next/server";
import { query } from "@/services/db";
import { Ingredient } from "@/types";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const id = searchParams.get("id");
  const ids = searchParams.get("ids");
  try{
    if (id) {
    const res = await query<Ingredient>(
      "SELECT id, name FROM ingredients WHERE id = $1",
      [id]
    );
    return NextResponse.json(res.rows[0]);
  }
  }
  catch(e){
    return NextResponse.json({ error: "ingredient not found" }, { status: 404 });
  }

  try{
    if (ids) {
      const idList = ids.split(",").map(id => parseInt(id, 10));
      const res = await query<Ingredient>(
        "SELECT id, name FROM ingredients WHERE id = ANY($1::int[])",
        [idList]
      );
      return NextResponse.json(res.rows);
    }
  }
  catch(e){
    return NextResponse.json({ error: "ingredients not found" }, { status: 404 });
  }
  const res = await query<Ingredient>("SELECT id, name, created_at FROM ingredients ORDER BY id");
  return NextResponse.json(res.rows);
}
