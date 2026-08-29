import { useState, useEffect, useCallback } from "react";

export interface SavedRecipe {
  id: string;
  name: string;
  coffeeWeight: number;
  flavor: string;
  intensity: string;
  createdAt: number;
  ratio?: number;
  waterTotal?: number;
}

const STORAGE_KEY = "kasuya_favorite_recipes_v1";

function loadInitialRecipes(): SavedRecipe[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Error loading favorite recipes:", error);
  }
  return [];
}

export function useFavoriteRecipes() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>(loadInitialRecipes);
  const isLoaded = true;

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error("Error saving favorite recipes:", error);
    }
  }, [recipes]);

  const addRecipe = useCallback((
    name: string,
    coffeeWeight: number,
    flavor: string,
    intensity: string,
    ratio?: number,
    waterTotal?: number
  ): SavedRecipe => {
    const newRecipe: SavedRecipe = {
      id: Date.now().toString(),
      name,
      coffeeWeight,
      flavor,
      intensity,
      createdAt: Date.now(),
      ratio,
      waterTotal,
    };

    setRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  }, []);

  const updateRecipe = useCallback((
    id: string,
    name: string,
    coffeeWeight: number,
    flavor: string,
    intensity: string,
    ratio?: number,
    waterTotal?: number
  ) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id
          ? { ...recipe, name, coffeeWeight, flavor, intensity, ratio, waterTotal }
          : recipe
      )
    );
  }, []);

  return {
    recipes,
    isLoaded,
    addRecipe,
    deleteRecipe,
    updateRecipe,
  };
}
