import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Heart, Plus } from "lucide-react";
import { SavedRecipe } from "@/hooks/useFavoriteRecipes";

/**
 * Favorite Recipes Component
 * Artisanal Minimalism Design
 * - Clean card layout for saved recipes
 * - Quick load functionality
 * - Delete and rename options
 */

interface FavoriteRecipesProps {
  recipes: SavedRecipe[];
  onLoadRecipe: (recipe: SavedRecipe) => void;
  onDeleteRecipe: (id: string) => void;
  onAddRecipe: (name: string, coffeeWeight: number, flavor: string, intensity: string) => void;
  currentCoffeeWeight: number;
  currentFlavor: string;
  currentIntensity: string;
}

export default function FavoriteRecipes({
  recipes,
  onLoadRecipe,
  onDeleteRecipe,
  onAddRecipe,
  currentCoffeeWeight,
  currentFlavor,
  currentIntensity,
}: FavoriteRecipesProps) {
  const [newRecipeName, setNewRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveRecipe = () => {
    if (newRecipeName.trim()) {
      onAddRecipe(newRecipeName, currentCoffeeWeight, currentFlavor, currentIntensity);
      setNewRecipeName("");
      setIsOpen(false);
    }
  };

  const getFlavorLabel = (flavor: string) => {
    const labels: { [key: string]: string } = {
      acidity: "Ácido",
      balanced: "Equilibrado",
      sweetness: "Doce",
    };
    return labels[flavor] || flavor;
  };

  const getIntensityLabel = (intensity: string) => {
    const labels: { [key: string]: string } = {
      soft: "Suave",
      medium: "Médio",
      strong: "Forte",
    };
    return labels[intensity] || intensity;
  };

  return (
    <Card className="border-border shadow-minimal">
      <CardHeader>
        <CardTitle className="text-2xl">Receitas Favoritas</CardTitle>
        <CardDescription>Salve e carregue suas receitas preferidas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Save Current Recipe */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 transition-smooth">
              <Heart className="w-4 h-4 mr-2" />
              Salvar Receita Atual
            </Button>
          </DialogTrigger>
          <DialogContent className="border-border">
            <DialogHeader>
              <DialogTitle>Salvar Nova Receita</DialogTitle>
              <DialogDescription>
                Dê um nome para esta receita para salvá-la nos favoritos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipe-name">Nome da Receita</Label>
                <Input
                  id="recipe-name"
                  placeholder="Ex: Café da Manhã Ácido"
                  value={newRecipeName}
                  onChange={(e) => setNewRecipeName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSaveRecipe()}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Café: {currentCoffeeWeight}g</p>
                  <p className="text-muted-foreground">Perfil: {getFlavorLabel(currentFlavor)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Água: {Math.round(currentCoffeeWeight * 15)}ml
                  </p>
                  <p className="text-muted-foreground">
                    Intensidade: {getIntensityLabel(currentIntensity)}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleSaveRecipe}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Saved Recipes List */}
        {recipes.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              {recipes.length} receita{recipes.length !== 1 ? "s" : ""} salva{recipes.length !== 1 ? "s" : ""}
            </p>
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-4 bg-secondary rounded-md border border-border hover:shadow-soft transition-smooth"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{recipe.name}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                      <p>Café: {recipe.coffeeWeight}g</p>
                      <p>Perfil: {getFlavorLabel(recipe.flavor)}</p>
                      <p>Água: {Math.round(recipe.coffeeWeight * 15)}ml</p>
                      <p>Intensidade: {getIntensityLabel(recipe.intensity)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onLoadRecipe(recipe)}
                      variant="outline"
                      size="sm"
                      className="transition-smooth"
                    >
                      Carregar
                    </Button>
                    <Button
                      onClick={() => onDeleteRecipe(recipe.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive transition-smooth"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Heart className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhuma receita salva ainda</p>
            <p className="text-xs mt-1">Crie uma receita e clique em "Salvar Receita Atual"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
