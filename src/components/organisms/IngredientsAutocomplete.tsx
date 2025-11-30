"use client";
import React, { useEffect, useState } from "react";
import type { Ingredient } from "@/types";
import { Autocomplete, TextField, Chip, Box, Typography } from "@mui/material";
import { fetchAllIngredients } from "@/services/api/ingredients";



const IngredientsAutocomplete = ({
  selected,
  onAdd,
  onRemove,
}: {
  selected: Ingredient[];
  onAdd: (ingredient: Ingredient) => void;
  onRemove: (id: number) => void;
}) => {
  const [ingredients, setIngredients] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");


  useEffect(() => {
    const getData = async () => {
      try{
        const data = await fetchAllIngredients();
        setIngredients(data);
      }catch(e){
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "60%" },
        mx: "auto",
        bgcolor: "grey.100",
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
      }}
    >
      <Typography variant="h6" sx={{textAlign: "center", margin: 2, fontWeight: "semi-bold"}}>Select Your Ingredients</Typography>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={ingredients}
        getOptionLabel={(option: Ingredient) => option?.name}
        getOptionKey={(option: Ingredient) => option?.id}
        onChange={(event, value) => {
          if (value) {
            onAdd(value);
          }
          setInputValue("");
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue: string) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Ingredients" variant="outlined" />
        )}
        value={null}
        
      />
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selected.map((ingredient) => (
          <Chip
            key={ingredient.id}
            label={ingredient.name}
            variant="contained"
            color="success"
            onDelete={() => onRemove(ingredient.id)}
            sx={
              {
                padding: 1
              }
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default IngredientsAutocomplete;