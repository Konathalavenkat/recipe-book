// src/app/api/init/route.ts
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/services/db";

// idempotent SQL steps
const STEPS: { name: string; sql: string }[] = [
  {
    name: "pgcrypto extension",
    sql: `CREATE EXTENSION IF NOT EXISTS pgcrypto;`,
  },
  {
    name: "create ingredients table",
    sql: `
CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
  },
  {
    name: "create recipes table",
    sql: `
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL UNIQUE,
  recipe TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  ingredient_ids int[] DEFAULT NULL,
  image_url TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
  },
  {
    name: "create/replace recipes_set_updated_at function",
    sql: `
CREATE OR REPLACE FUNCTION recipes_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`,
  },
  {
    name: "ensure trg_recipes_updated_at",
    sql: `
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_recipes_updated_at' AND tgrelid = 'recipes'::regclass
  ) THEN
    CREATE TRIGGER trg_recipes_updated_at
      BEFORE UPDATE ON recipes
      FOR EACH ROW
      EXECUTE FUNCTION recipes_set_updated_at();
  END IF;
END;
$$;`,
  },
  {
    name: "create/replace recipes_set_ingredient_ids function",
    sql: `
CREATE OR REPLACE FUNCTION recipes_set_ingredient_ids()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ingredient_ids := (
    SELECT COALESCE(ARRAY_AGG((e->>'id')::int), ARRAY[]::int[])
    FROM jsonb_array_elements(NEW.ingredients) AS e
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`,
  },
  {
    name: "ensure trg_recipes_set_ingredient_ids",
    sql: `
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_recipes_set_ingredient_ids' AND tgrelid = 'recipes'::regclass
  ) THEN
    CREATE TRIGGER trg_recipes_set_ingredient_ids
      BEFORE INSERT OR UPDATE ON recipes
      FOR EACH ROW
      EXECUTE FUNCTION recipes_set_ingredient_ids();
  END IF;
END;
$$;`,
  },
  {
    name: "create idx_recipes_ingredients_gin",
    sql: `
CREATE INDEX IF NOT EXISTS idx_recipes_ingredients_gin
  ON recipes USING GIN (ingredients jsonb_path_ops);`,
  },
  {
    name: "create idx_recipes_ingredient_ids_gin",
    sql: `
CREATE INDEX IF NOT EXISTS idx_recipes_ingredient_ids_gin
  ON recipes USING GIN (ingredient_ids);`,
  },
  {
    name: "create idx_recipes_title",
    sql: `
CREATE INDEX IF NOT EXISTS idx_recipes_title
  ON recipes (lower(title));`,
  },
  {
    name: "create/replace recipe_ingredient_ids view",
    sql: `
CREATE OR REPLACE VIEW recipe_ingredient_ids AS
SELECT id AS recipe_id,
       jsonb_path_query_array(ingredients, '$[*].id') AS ingredient_ids
FROM recipes;`,
  },
  {
    name: "populate ingredient_ids for existing rows",
    sql: `
WITH computed AS (
  SELECT id AS recipe_id,
         COALESCE(ARRAY_AGG((e->>'id')::int), ARRAY[]::int[]) AS ids
  FROM recipes r
  CROSS JOIN LATERAL jsonb_array_elements(r.ingredients) AS e
  GROUP BY id
)
UPDATE recipes
SET ingredient_ids = computed.ids
FROM computed
WHERE recipes.id = computed.recipe_id
  AND (recipes.ingredient_ids IS DISTINCT FROM computed.ids);`,
  },
];

export async function POST(req: NextRequest) {
  // simple protection: require secret header
  const results: { step: string; ok: boolean; error?: string }[] = [];
  try {
    for (const s of STEPS) {
      try {
        await query(s.sql);
        results.push({ step: s.name, ok: true });
      } catch (err: any) {
        // stop on fatal DDL errors but record the failure
        results.push({ step: s.name, ok: false, error: String(err.message || err) });
        throw err;
      }
    }
    return NextResponse.json({ ok: true, results });
  } catch (err: any) {
    return NextResponse.json({ ok: false, results, error: String(err.message || err) }, { status: 500 });
  } 
}
