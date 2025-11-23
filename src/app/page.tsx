// src/app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import type { Ingredient, RecipeIngredient } from "@/types";

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [queryResults, setQueryResults] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/ingredients").then(r => r.json()).then(setIngredients);
  }, []);

  function addIngredient(i: Ingredient) {
    if (selected.find(s => s.id === i.id)) return;
    setSelected(s => [...s, i]);
  }
  function removeIngredient(id: number) {
    setSelected(s => s.filter(x => x.id !== id));
  }

  async function search() {
    const q = selected.map(s => s.id).join(",");
    const res = await fetch(`/api/recipes?ingredient_ids=${q}`);
    const json = await res.json();
    setQueryResults(json);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Recipe Finder</h1>

      <div>
        <label>Pick ingredient:</label>
        <select onChange={e => {
          const v = Number(e.target.value);
          const ing = ingredients.find(x => x.id === v);
          if (ing) addIngredient(ing);
        }}>
          <option value="">-- choose --</option>
          {ingredients.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
      </div>

      <div style={{ marginTop: 8 }}>
        {selected.map(s =>
          <span key={s.id} style={{ display: "inline-block", padding: 6, border: "1px solid #ccc", borderRadius: 16, marginRight: 6 }}>
            {s.name} <button onClick={() => removeIngredient(s.id)} style={{ marginLeft: 6 }}>x</button>
          </span>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={search}>Search recipes</button>
      </div>

      <section style={{ marginTop: 20 }}>
        <h2>Results</h2>
        {queryResults.map((r: any) => (
          <div key={r.id} style={{ padding: 10, border: "1px solid #eee", marginBottom: 10 }}>
            <h3>{r.title} ({r.match_count})</h3>
            <img src={r.image_url} alt={r.title} style={{ maxWidth: 200 }} />
            <ul>
              {r.ingredients_with_names?.map((ing: any) => (
                <li key={ing.id}>{ing.name} — {ing.qty} {ing.unit}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
