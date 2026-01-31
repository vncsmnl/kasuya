import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChefHat, Coffee } from "lucide-react";
import RecipeTimerModal from "@/components/RecipeTimerModal";
import FavoriteRecipes from "@/components/FavoriteRecipes";
import ThemeToggle from "@/components/ThemeToggle";
import { useFavoriteRecipes, SavedRecipe } from "@/hooks/useFavoriteRecipes";

/**
 * Artisanal Minimalism Design
 * - Clean, minimal interface with generous whitespace
 * - Warm coffee brown accents (#8B5A3C)
 * - Typography-driven hierarchy
 * - Smooth transitions and subtle interactions
 */

interface Recipe {
  coffeeWeight: number;
  waterTotal: number;
  flavor: string;
  intensity: string;
  pours: Pour[];
}

interface Pour {
  number: number;
  type: string;
  weight: number;
  cumulative: number;
}

export default function Home() {
  const [coffeeWeight, setCoffeeWeight] = useState<number>(20);
  const [flavor, setFlavor] = useState<string>("balanced");
  const [intensity, setIntensity] = useState<string>("medium");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const { recipes, isLoaded, addRecipe, deleteRecipe } = useFavoriteRecipes();

  // Kasuya 4:6 Method Calculation
  // First 40% of water: adjusts flavor profile (acidity vs sweetness)
  // Last 60% of water: adjusts intensity (body and strength)
  const calculateRecipe = () => {
    // Standard ratio: 1:15 (coffee:water)
    const waterTotal = Math.round(coffeeWeight * 15);
    const water40 = Math.round(waterTotal * 0.4);
    const water60 = Math.round(waterTotal * 0.6);

    let pours: Pour[] = [];

    // First 40% - Flavor Profile (2 pours)
    // Acidity: larger first pour, smaller second pour
    // Balanced: equal pours
    // Sweetness: smaller first pour, larger second pour
    let firstPourWeight: number;
    let secondPourWeight: number;

    if (flavor === "acidity") {
      firstPourWeight = Math.round(water40 * 0.6);
      secondPourWeight = water40 - firstPourWeight;
    } else if (flavor === "sweetness") {
      firstPourWeight = Math.round(water40 * 0.4);
      secondPourWeight = water40 - firstPourWeight;
    } else {
      // balanced
      firstPourWeight = Math.round(water40 / 2);
      secondPourWeight = water40 - firstPourWeight;
    }

    pours.push({
      number: 1,
      type: "Sabor",
      weight: firstPourWeight,
      cumulative: firstPourWeight,
    });

    pours.push({
      number: 2,
      type: "Sabor",
      weight: secondPourWeight,
      cumulative: firstPourWeight + secondPourWeight,
    });

    // Last 60% - Intensity (3 pours)
    // Soft: 1 large pour (full 60%)
    // Medium: 2 equal pours (30% each)
    // Strong: 3 equal pours (20% each)
    let intensityPours: { weight: number; type: string }[] = [];

    if (intensity === "soft") {
      intensityPours = [{ weight: water60, type: "Intensidade" }];
    } else if (intensity === "medium") {
      const mediumPour = Math.round(water60 / 2);
      intensityPours = [
        { weight: mediumPour, type: "Intensidade" },
        { weight: water60 - mediumPour, type: "Intensidade" },
      ];
    } else {
      // strong
      const strongPour = Math.round(water60 / 3);
      intensityPours = [
        { weight: strongPour, type: "Intensidade" },
        { weight: strongPour, type: "Intensidade" },
        { weight: water60 - strongPour * 2, type: "Intensidade" },
      ];
    }

    let cumulativeWeight = firstPourWeight + secondPourWeight;
    intensityPours.forEach((pour, index) => {
      cumulativeWeight += pour.weight;
      pours.push({
        number: 3 + index,
        type: pour.type,
        weight: pour.weight,
        cumulative: cumulativeWeight,
      });
    });

    const flavorLabel =
      flavor === "acidity" ? "Ácido" : flavor === "sweetness" ? "Doce" : "Equilibrado";
    const intensityLabel =
      intensity === "soft" ? "Suave" : intensity === "medium" ? "Médio" : "Forte";

    setRecipe({
      coffeeWeight,
      waterTotal,
      flavor: flavorLabel,
      intensity: intensityLabel,
      pours,
    });
    setShowRecipe(true);
  };

  const handleLoadRecipe = (savedRecipe: SavedRecipe) => {
    setCoffeeWeight(savedRecipe.coffeeWeight);
    setFlavor(savedRecipe.flavor);
    setIntensity(savedRecipe.intensity);
    calculateRecipe();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Toggle */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Kasuya 4:6</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="currentColor" className="text-primary" />
          </svg>
        </div>
        <div className="relative container py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-mono text-muted-foreground tracking-widest">
                MÉTODO 4:6
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl text-foreground mb-4 leading-tight">
              Calculadora Kasuya
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Calcule sua receita perfeita usando o método 4:6 de Tetsu Kasuya. Customize o perfil
              de sabor e intensidade para obter o café ideal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-border shadow-minimal">
              <CardHeader>
                <CardTitle className="text-2xl">Configuração</CardTitle>
                <CardDescription>Defina os parâmetros da sua receita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Coffee Weight Input */}
                <div className="space-y-3">
                  <Label htmlFor="coffee-weight" className="text-sm font-medium">
                    Peso do Café (gramas)
                  </Label>
                  <Input
                    id="coffee-weight"
                    type="number"
                    min="10"
                    max="50"
                    value={coffeeWeight}
                    onChange={(e) => setCoffeeWeight(Number(e.target.value))}
                    className="font-mono text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Água total: {Math.round(coffeeWeight * 15)}ml (proporção 1:15)
                  </p>
                </div>

                {/* Flavor Profile */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Perfil de Sabor</Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Controla o equilíbrio entre acidez e doçura (primeiros 40%)
                  </p>
                  <RadioGroup value={flavor} onValueChange={setFlavor}>
                    <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-smooth cursor-pointer">
                      <RadioGroupItem value="acidity" id="acidity" />
                      <Label
                        htmlFor="acidity"
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        <span className="font-medium">Acidez</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          Mais brilhante e vivaz
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-smooth cursor-pointer">
                      <RadioGroupItem value="balanced" id="balanced" />
                      <Label
                        htmlFor="balanced"
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        <span className="font-medium">Equilibrado</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          Harmonia perfeita entre sabores
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-smooth cursor-pointer">
                      <RadioGroupItem value="sweetness" id="sweetness" />
                      <Label
                        htmlFor="sweetness"
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        <span className="font-medium">Doçura</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          Mais suave e adocicado
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Intensity */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Intensidade</Label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Controla o corpo e força (últimos 60%)
                  </p>
                  <RadioGroup value={intensity} onValueChange={setIntensity}>
                    <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-smooth cursor-pointer">
                      <RadioGroupItem value="soft" id="soft" />
                      <Label
                        htmlFor="soft"
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        <span className="font-medium">Suave</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          Corpo leve e limpo
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-smooth cursor-pointer">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label
                        htmlFor="medium"
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        <span className="font-medium">Médio</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          Corpo equilibrado
                        </p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-smooth cursor-pointer">
                      <RadioGroupItem value="strong" id="strong" />
                      <Label
                        htmlFor="strong"
                        className="flex-1 cursor-pointer font-normal text-foreground"
                      >
                        <span className="font-medium">Forte</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          Corpo completo e intenso
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={calculateRecipe}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 transition-smooth"
                >
                  <ChefHat className="w-4 h-4 mr-2" />
                  Ver Receita
                </Button>
              </CardContent>
            </Card>

            {/* Favorite Recipes */}
            {isLoaded && (
              <FavoriteRecipes
                recipes={recipes}
                onLoadRecipe={handleLoadRecipe}
                onDeleteRecipe={deleteRecipe}
                onAddRecipe={addRecipe}
                currentCoffeeWeight={coffeeWeight}
                currentFlavor={flavor}
                currentIntensity={intensity}
              />
            )}
          </div>

          {/* Right Column: Recipe Display and Timer */}
          <div className="lg:col-span-2 space-y-8">
            {showRecipe && recipe && (
              <>
                {/* Recipe Summary */}
                <Card className="border-border shadow-minimal animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader>
                    <CardTitle className="text-2xl">Sua Receita</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                          Café
                        </p>
                        <p className="text-3xl font-mono font-semibold text-primary">
                          {recipe.coffeeWeight}
                          <span className="text-lg text-muted-foreground ml-1">g</span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                          Água Total
                        </p>
                        <p className="text-3xl font-mono font-semibold text-primary">
                          {recipe.waterTotal}
                          <span className="text-lg text-muted-foreground ml-1">ml</span>
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Perfil</span>
                        <span className="font-medium text-foreground">{recipe.flavor}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Intensidade</span>
                        <span className="font-medium text-foreground">{recipe.intensity}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pouring Schedule */}
                <Card className="border-border shadow-minimal animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                  <CardHeader>
                    <CardTitle className="text-2xl">Cronograma de Despejos</CardTitle>
                    <CardDescription>Siga a sequência abaixo para sua extração perfeita</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recipe.pours.map((pour, index) => (
                      <div
                        key={index}
                        className="p-4 bg-secondary rounded-md border border-border hover:shadow-soft transition-smooth animate-in fade-in slide-in-from-left duration-300"
                        style={{ animationDelay: `${100 + index * 50}ms` }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {pour.number}º Despejo ({pour.type})
                            </p>
                            <p className="text-2xl font-mono font-semibold text-primary mt-1">
                              +{pour.weight}
                              <span className="text-sm text-muted-foreground ml-2">g</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Total até agora</p>
                            <p className="text-xl font-mono font-semibold text-foreground">
                              {pour.cumulative}g
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-background rounded h-1 mt-3">
                          <div
                            className="bg-primary h-full rounded transition-all duration-500"
                            style={{
                              width: `${(pour.cumulative / recipe.waterTotal) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Timer Modal Button */}
                <RecipeTimerModal
                  pours={recipe.pours}
                  recipeName={`${recipe.flavor} - ${recipe.intensity}`}
                />

                {/* Tips */}
                <div className="bg-secondary rounded-md p-4 border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">💡 Dica:</span> Clique em "Iniciar Cronômetro" para abrir o timer.
                    Cada despejo deve levar cerca de 45 segundos. Deixe a água drenar
                    completamente entre os despejos.
                  </p>
                </div>
              </>
            )}

            {!showRecipe && (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                    <Coffee className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Configure seus parâmetros e clique em</p>
                  <p className="font-medium text-foreground">"Ver Receita"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              O método 4:6 de Tetsu Kasuya divide a água em 40% (para sabor) e 60% (para
              intensidade), permitindo controle preciso sobre o perfil da sua xícara. Desenvolvido
              pelo campeão mundial de café, este método revolucionou a forma como preparamos café
              filtrado.
            </p>
            <p className="text-xs text-muted-foreground mt-6">
              Calculadora Kasuya 4:6 • Método de Tetsu Kasuya
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
