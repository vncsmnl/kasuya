import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee } from "lucide-react";
import RecipeTimerModal from "@/components/RecipeTimerModal";

export interface Pour {
  number: number;
  type: string;
  weight: number;
  cumulative: number;
}

export interface Recipe {
  coffeeWeight: number;
  waterTotal: number;
  flavor: string;
  intensity: string;
  pours: Pour[];
}

interface RecipeResultProps {
  recipe: Recipe | null;
}

export default function RecipeResult({ recipe }: RecipeResultProps) {
  if (!recipe) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
            <Coffee className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Insira valores válidos para calcular a receita</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Recipe Summary */}
      <Card className="border-border shadow-minimal">
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
      <Card className="border-border shadow-minimal">
        <CardHeader>
          <CardTitle className="text-2xl">Cronograma de Despejos</CardTitle>
          <CardDescription>Siga a sequência abaixo para sua extração perfeita</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recipe.pours.map((pour) => (
            <div
              key={pour.number}
              className="p-4 bg-secondary rounded-md border border-border hover:shadow-soft transition-shadow"
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
                  className="bg-primary h-full rounded transition-[width] duration-500"
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
  );
}
