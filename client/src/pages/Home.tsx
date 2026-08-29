import { useState, useMemo, useCallback } from "react";
import RecipeConfigPanel from "@/components/RecipeConfigPanel";
import RecipeResult, { Recipe, Pour } from "@/components/RecipeResult";
import FavoriteRecipes from "@/components/FavoriteRecipes";
import ThemeToggle from "@/components/ThemeToggle";
import { useFavoriteRecipes, SavedRecipe } from "@/hooks/useFavoriteRecipes";
import {
  DoodleV60,
  DoodleKettle,
  DoodleCoffeeBean,
  DoodleCoffeeCup,
  DoodleStamp,
} from "@/components/DoodleIcons";

function calculateKasuyaRecipe(
  c: number,
  r: number,
  w: number,
  f: string,
  i: string
): Recipe {
  const water40 = Math.round(w * 0.4);
  const water60 = Math.round(w * 0.6);

  const pours: Pour[] = [];

  // First 40% - Flavor Profile (2 pours)
  let firstPourWeight: number;
  let secondPourWeight: number;

  if (f === "acidity") {
    firstPourWeight = Math.round(water40 * 0.6);
    secondPourWeight = water40 - firstPourWeight;
  } else if (f === "sweetness") {
    firstPourWeight = Math.round(water40 * 0.4);
    secondPourWeight = water40 - firstPourWeight;
  } else {
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
  let intensityPours: { weight: number; type: string }[] = [];

  if (i === "soft") {
    intensityPours = [{ weight: water60, type: "Intensidade" }];
  } else if (i === "medium") {
    const mediumPour = Math.round(water60 / 2);
    intensityPours = [
      { weight: mediumPour, type: "Intensidade" },
      { weight: water60 - mediumPour, type: "Intensidade" },
    ];
  } else {
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
    f === "acidity" ? "Ácido" : f === "sweetness" ? "Doce" : "Equilibrado";
  const intensityLabel =
    i === "soft" ? "Suave" : i === "medium" ? "Médio" : "Forte";

  return {
    coffeeWeight: c,
    waterTotal: w,
    flavor: flavorLabel,
    intensity: intensityLabel,
    pours,
  };
}

interface RecipeConfig {
  coffeeVal: string;
  waterVal: string;
  ratioVal: string;
  isWaterLocked: boolean;
  isRatioLocked: boolean;
  flavor: string;
  intensity: string;
}

const initialConfig: RecipeConfig = {
  coffeeVal: "20",
  waterVal: "300",
  ratioVal: "15",
  isWaterLocked: true,
  isRatioLocked: true,
  flavor: "balanced",
  intensity: "medium",
};

export default function Home() {
  const [config, setConfig] = useState<RecipeConfig>(initialConfig);
  const { coffeeVal, waterVal, ratioVal, isWaterLocked, isRatioLocked, flavor, intensity } = config;

  const { recipes, isLoaded, addRecipe, deleteRecipe } = useFavoriteRecipes();

  const recipe = useMemo<Recipe | null>(() => {
    const c = Number(coffeeVal);
    const r = Number(ratioVal);
    const w = Number(waterVal);
    if (!isNaN(c) && c > 0 && !isNaN(r) && r > 0 && !isNaN(w) && w > 0) {
      return calculateKasuyaRecipe(c, r, w, flavor, intensity);
    }
    return null;
  }, [coffeeVal, ratioVal, waterVal, flavor, intensity]);

  const handleCoffeeChange = (newVal: string) => {
    const parsedCoffee = Number(newVal);
    const newWater =
      !isNaN(parsedCoffee) && parsedCoffee > 0
        ? Math.round(parsedCoffee * (Number(config.ratioVal) || 15)).toString()
        : config.waterVal;

    setConfig((prev) => ({
      ...prev,
      coffeeVal: newVal,
      waterVal: newWater,
    }));
  };

  const handleWaterChange = (newVal: string) => {
    const parsedWater = Number(newVal);
    const parsedCoffee = Number(config.coffeeVal) || 20;
    let newRatio = config.ratioVal;
    if (!isNaN(parsedWater) && parsedWater > 0 && parsedCoffee > 0) {
      const computedRatio = (parsedWater / parsedCoffee).toFixed(1);
      newRatio = computedRatio.endsWith(".0")
        ? computedRatio.slice(0, -2)
        : computedRatio;
    }
    setConfig((prev) => ({
      ...prev,
      waterVal: newVal,
      ratioVal: newRatio,
    }));
  };

  const handleRatioChange = (newVal: string) => {
    const parsedRatio = Number(newVal);
    const parsedCoffee = Number(config.coffeeVal) || 20;
    const newWater =
      !isNaN(parsedRatio) && parsedRatio > 0
        ? Math.round(parsedCoffee * parsedRatio).toString()
        : config.waterVal;

    setConfig((prev) => ({
      ...prev,
      ratioVal: newVal,
      waterVal: newWater,
    }));
  };

  const handleFlavorChange = (newFlavor: string) => {
    setConfig((prev) => ({ ...prev, flavor: newFlavor }));
  };

  const handleIntensityChange = (newIntensity: string) => {
    setConfig((prev) => ({ ...prev, intensity: newIntensity }));
  };

  const toggleWaterLock = () => {
    setConfig((prev) => ({ ...prev, isWaterLocked: !prev.isWaterLocked }));
  };

  const toggleRatioLock = () => {
    setConfig((prev) => ({ ...prev, isRatioLocked: !prev.isRatioLocked }));
  };

  const handleLoadRecipe = useCallback((savedRecipe: SavedRecipe) => {
    const savedCoffee = savedRecipe.coffeeWeight;
    const savedRatio = savedRecipe.ratio ?? 15;
    const savedWater = savedRecipe.waterTotal ?? Math.round(savedCoffee * savedRatio);

    setConfig({
      coffeeVal: savedCoffee.toString(),
      ratioVal: savedRatio.toString(),
      waterVal: savedWater.toString(),
      flavor: savedRecipe.flavor,
      intensity: savedRecipe.intensity,
      isWaterLocked: true,
      isRatioLocked: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Toggle */}
      <header className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <DoodleV60 size={28} className="text-primary" />
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Kasuya 4:6</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section with Doodle Accents */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-secondary/20 to-background">
        {/* Background decorative doodles */}
        <div className="absolute top-6 right-10 md:right-24 opacity-15 dark:opacity-20 pointer-events-none rotate-12 hidden sm:block">
          <DoodleKettle size={130} className="text-primary" />
        </div>
        <div className="absolute bottom-6 right-32 md:right-64 opacity-15 dark:opacity-20 pointer-events-none -rotate-12 hidden md:block">
          <DoodleCoffeeBean size={65} className="text-primary" />
        </div>
        <div className="absolute top-12 right-2 md:right-10 opacity-15 dark:opacity-20 pointer-events-none rotate-6 hidden lg:block">
          <DoodleCoffeeCup size={75} className="text-primary" />
        </div>

        <div className="relative container py-14 md:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-foreground border border-border">
                <DoodleStamp size={16} className="text-primary inline-block" />
                MÉTODO 4:6
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-serif mb-4 leading-tight">
              Calculadora Kasuya
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Calcule sua receita perfeita usando o método 4:6 de Tetsu Kasuya. Customize o perfil
              de sabor e intensidade para obter o café ideal.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-4 leading-relaxed font-sans">
              テツ・カスヤの4:6メソッドを使って、あなたにぴったりのレシピを計算しましょう。理想のコーヒーを得るために、風味プロファイルと濃さをカスタマイズしてください。
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-1 space-y-8">
            <RecipeConfigPanel
              config={config}
              onCoffeeChange={handleCoffeeChange}
              onWaterChange={handleWaterChange}
              onRatioChange={handleRatioChange}
              onFlavorChange={handleFlavorChange}
              onIntensityChange={handleIntensityChange}
              onToggleWaterLock={toggleWaterLock}
              onToggleRatioLock={toggleRatioLock}
            />

            {/* Favorite Recipes */}
            {isLoaded && (
              <FavoriteRecipes
                recipes={recipes}
                onLoadRecipe={handleLoadRecipe}
                onDeleteRecipe={deleteRecipe}
                onAddRecipe={addRecipe}
                currentCoffeeWeight={Number(coffeeVal) || 20}
                currentFlavor={flavor}
                currentIntensity={intensity}
                currentRatio={Number(ratioVal) || 15}
                currentWaterTotal={Number(waterVal) || 300}
              />
            )}
          </div>

          {/* Right Column: Recipe Display and Timer */}
          <div className="lg:col-span-2 space-y-8">
            <RecipeResult recipe={recipe} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              テツ・カスヤの4:6メソッドは、お湯を40％（風味のため）と60％（濃度のため）に分けることで、
              カップのプロファイルを精密にコントロールできるようにします。世界チャンピオンのコーヒー
              競技者によって開発されたこのメソッドは、私たちがドリップコーヒーを淹れる方法に変革を
              もたらしました。
            </p>
            <p className="text-xs text-muted-foreground mt-6">
              テツ・カスヤの4:6メソッド • Kasuya 4:6 Method
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
