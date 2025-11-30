import Heading from "@/components/molecules/Heading";
import { ALIGN_TYPES } from "@/components/molecules/Heading/Heading.constant";
import { useIngredients } from "@/hooks/useIngredients";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import React from "react";
import IngredientsAutocomplete from "@/components/organisms/IngredientsAutocomplete";
import { fetchRecipeWithIngredients } from "@/services/api/recipe";
import Card from "@/components/atoms/Card";
import Link from "next/link";
import { Recipe } from "@/types";
import HomeSkeleton from "./components/HomeSkeleton";

const Home = (props: any) => {
  const { children, ...rest } = props;

  const ingredientsContext = useIngredients();
  const [queryResults, setQueryResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!ingredientsContext) {
    return <HomeSkeleton />;
  }

  const { state, addIngredient, removeIngredient } = ingredientsContext;

  useEffect(() => {
    search();
  }, [])

  const search = async () => {
    setIsLoading(true);
    try {
      const res = await fetchRecipeWithIngredients(state?.items);
      setQueryResults(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading title="Recipe Finder" align={ALIGN_TYPES.CENTER} />
      <IngredientsAutocomplete
        selected={state?.items}
        onAdd={addIngredient}
        onRemove={removeIngredient}
      />
      <div className="flex justify-center mx-3.5">
        <Button
          onClick={search}
          variant="contained"
          color="success"
          sx={{ padding: 2, marginTop: 2 }}
        >
          Search recipes
        </Button>
      </div>

      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <section style={{ margin: 20 }}>
          <Grid container spacing={4}>
            {queryResults.map((r: any) => (
              <Grid key={r.id} size={{ xs: 12, sm: 6, md: 4 , lg: 3}}>
                <Link href={`/recipe/${r.id}`}>
                  <Card
                    onClick={() => console.log(r)}
                    imageUrl={r.image_url}
                    title={`${r.title}${r.match_count ? ` (${r.match_count} matches)` : ""}`}
                  >
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </section>
      )}
    </div>
  );
};

export default Home;
