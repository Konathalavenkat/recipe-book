// src/app/api/recipes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/services/db";

// Helper: parse comma list into int[]
function parseIds(q: string | null) {
  if (!q) return [];
  return q
    .split(",")
    .map((s) => parseInt(s, 10))
    .filter((n) => Number.isFinite(n));
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const idsParam = url.searchParams.get("ingredient_ids"); // e.g., "1,2,3"
  const id = url.searchParams.get("id");
  if( id ){
    try{
      const res =  await query(`SELECT * FROM recipes WHERE id = $1`, [id]);
      return NextResponse.json(res.rows[0]);
    }
    catch(e){
      return NextResponse.json({ error: "recipe not found" }, { status: 404 });
    }
  }
  const wants = parseIds(idsParam);

  if (wants.length === 0) {
    // simple list of recipes without filtering (limit)
    const res = await query(
      `SELECT r.id, r.title, r.image_url, r.recipe,
        (
          SELECT jsonb_agg(
            jsonb_build_object(
              'id', (elem->>'id')::int,
              'name', ing.name,
              'qty', (elem->>'qty')::numeric,
              'unit', elem->>'unit'
            ) ORDER BY (elem->>'id')::int
          )
          FROM jsonb_array_elements(r.ingredients) elem
          JOIN ingredients ing ON ing.id = (elem->>'id')::int
        ) AS ingredients_with_names
       FROM recipes r
       ORDER BY lower(r.title)
       LIMIT 100`
    );
    return NextResponse.json(res.rows);
  }

  // cap to 20 ids
  const capped = wants.slice(0, 20);
  // Use ingredient_ids overlap if possible for best performance
  // Query computes match_count and returns full ingredient list with names
  const sql = `-- the parameterized SQL from above
SELECT
  r.id,
  r.title,
  r.image_url,
  r.recipe,
  mc.match_count,
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', (elem->>'id')::int,
        'name', ing.name,
        'qty', (elem->>'qty')::numeric,
        'unit', elem->>'unit'
      ) ORDER BY (elem->>'id')::int
    )
    FROM jsonb_array_elements(r.ingredients) elem
    JOIN ingredients ing ON ing.id = (elem->>'id')::int
  ) AS ingredients_with_names
FROM recipes r
JOIN LATERAL (
  SELECT count(*) AS match_count
  FROM unnest(r.ingredient_ids) AS x(i)
  WHERE i = ANY ($1::int[])
) mc ON true
WHERE r.ingredient_ids && $1::int[]
ORDER BY mc.match_count DESC, lower(r.title)
LIMIT 100;`;

  const res = await query(sql, [capped]); // pass JS array -> pg int[]
  return NextResponse.json(res.rows);
}

