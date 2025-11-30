// src/app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import type { Ingredient, RecipeIngredient } from "@/types";
import HomeWrapper from "@/components/pages/Home";

export default function Home() {
  const [selected, setSelected] = useState<Ingredient[]>([]);
  const [queryResults, setQueryResults] = useState<any[]>([]);

  function addIngredient(i: Ingredient) {
    if (selected.find((s) => s.id === i.id)) return;
    setSelected((s) => [...s, i]);
  }
  function removeIngredient(id: number) {
    setSelected((s) => s.filter((x) => x.id !== id));
  }

  async function search() {
    const q = selected.map((s) => s.id).join(",");
    const res = await fetch(`/api/recipes?ingredient_ids=${q}`);
    const json = await res.json();
    setQueryResults(json);
  }

  return (
    <main style={{ padding: 20 }}>
      <HomeWrapper />
    </main>
  );
}
