import { useState, useEffect } from "react";

export interface SavedRecipe {
  id: string;
  name: string;
  coffeeWeight: number;
  flavor: string;
  intensity: string;
  createdAt: number;
}

const STORAGE_KEY = "kasuya_favorite_recipes";

export function useFavoriteRecipes() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load recipes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecipes(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Error loading favorite recipes:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      } catch (error) {
        console.error("Error saving favorite recipes:", error);
      }
    }
  }, [recipes, isLoaded]);

  const addRecipe = (
    name: string,
    coffeeWeight: number,
    flavor: string,
    intensity: string
  ): SavedRecipe => {
    const newRecipe: SavedRecipe = {
      id: Date.now().toString(),
      name,
      coffeeWeight,
      flavor,
      intensity,
      createdAt: Date.now(),
    };

    setRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  const updateRecipe = (
    id: string,
    name: string,
    coffeeWeight: number,
    flavor: string,
    intensity: string
  ) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === id
          ? { ...recipe, name, coffeeWeight, flavor, intensity }
          : recipe
      )
    );
  };

  return {
    recipes,
    isLoaded,
    addRecipe,
    deleteRecipe,
    updateRecipe,
  };
}
