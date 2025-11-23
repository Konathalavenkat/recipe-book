import { NextRequest, NextResponse } from "next/server";
import { query } from "@/services/db";
import { Recipe } from "@/types";

const getIngredientEntry = async (name: string) => {
  try {
    const res = await query<{ id: number; name: string }>(
      `SELECT id, name FROM ingredients WHERE name = $1`,
      [name]
    );
    if (res.rows.length === 0) {
      const temp = await query<{ id: number; name: string }>(
        `INSERT INTO ingredients (name) VALUES ($1) RETURNING id, name`,
        [name]
      );
      return temp.rows[0];
    }
    return res.rows[0];
  } catch (e) {
    return -1;
  }
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Recipe;
  if (!body.title || !Array.isArray(body.ingredients)) {
    return NextResponse.json(
      { error: "title and ingredients required" },
      { status: 400 }
    );
  }

  const parsedIngredients = await Promise.all(
    body.ingredients.map(async (i) => {
      if (i.id) {
        return i;
      }
      if (i.name) {
        return {
          ...i,
          id: (await getIngredientEntry(i.name)).id,
        };
      }
      return null;
    })
  );

  const ingredients = parsedIngredients.filter(
    Boolean
  ) as Recipe["ingredients"];
  // compute ingredient_ids array
  const ingredientIds = ingredients.map((i) => i.id);

  const insertSql = `
    INSERT INTO recipes (title, ingredients, ingredient_ids, image_url, created_by, recipe)
    VALUES ($1, $2::jsonb, $3::int[], $4, $5, $6)
    RETURNING id, title;
  `;
  const params = [
    body.title,
    JSON.stringify(ingredients),
    ingredientIds,
    body.image_url || null,
    body.created_by || null,
    body.recipe || null,
  ];
  const res = await query(insertSql, params);
  return NextResponse.json(res.rows[0]);
}

export async function PUT(req: NextRequest) {
  const body = (await req.json()) as any;

  if (!body?.id) return NextResponse.json({ error: "id is required in body" }, { status: 400 });
  if (!body.title || !Array.isArray(body.ingredients)) {
    return NextResponse.json({ error: "title and ingredients required" }, { status: 400 });
  }

  const parsedIngredients = await Promise.all(
    body.ingredients.map(async (i: any) => {
      if (i?.id) return i;
      if (i?.name) {
        const entry = await getIngredientEntry(i.name);
        if (entry === -1) throw new Error("failed to create ingredient");
        return { ...i, id: entry.id };
      }
      return null;
    })
  );
  const ingredients = parsedIngredients.filter(Boolean);
  const ingredientIds = ingredients.map((i: any) => i.id);

  const sql = `
    UPDATE recipes
    SET title = $2,
        ingredients = $3::jsonb,
        ingredient_ids = $4::int[],
        image_url = $5,
        created_by = $6,
        recipe = $7,
        updated_at = now()
    WHERE id = $1
    RETURNING id, title, updated_at;
  `;
  const params = [
    body.id,
    body.title,
    JSON.stringify(ingredients),
    ingredientIds,
    body.image_url || null,
    body.created_by || null,
    body.recipe || null    // <-- recipe included here
  ];

  try {
    const res = await query(sql, params);
    if (res.rowCount === 0) return NextResponse.json({ error: "recipe not found" }, { status: 404 });
    return NextResponse.json(res.rows[0]);
  } catch (err) {
    console.error("PUT /api/recipes error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await query(`DELETE FROM recipes WHERE id = $1`, [id]);
  return NextResponse.json({ id });
}