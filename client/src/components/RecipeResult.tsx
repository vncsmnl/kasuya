import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecipeTimerModal from "@/components/RecipeTimerModal";
import {
  DoodleCoffeeCup,
  DoodleTimerClock,
  DoodleV60,
  DoodleCitrus,
  DoodleScale,
  DoodleSweetness,
  DoodleFeather,
  DoodleGauge,
  DoodleFlame,
} from "@/components/DoodleIcons";

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
      <div className="h-96 flex items-center justify-center border border-dashed border-border rounded-lg bg-card/40">
        <div className="text-center space-y-4 max-w-xs px-4">
          <div className="w-20 h-20 bg-secondary/70 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <DoodleV60 size={42} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Pronto para começar?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ajuste as configurações ao lado para gerar sua receita personalizada do método 4:6.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Recipe Summary */}
      <Card className="border-border shadow-minimal">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <DoodleCoffeeCup size={26} className="text-primary inline-block" />
            <span>Sua Receita</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-3 bg-secondary/40 rounded-md border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Café
              </p>
              <p className="text-3xl font-mono font-semibold text-primary">
                {recipe.coffeeWeight}
                <span className="text-lg text-muted-foreground ml-1">g</span>
              </p>
            </div>
            <div className="space-y-2 p-3 bg-secondary/40 rounded-md border border-border/50">
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
              <span className="font-medium text-foreground flex items-center gap-1.5">
                {recipe.flavor === "Ácido" && <DoodleCitrus size={18} className="text-amber-500" />}
                {recipe.flavor === "Equilibrado" && <DoodleScale size={18} className="text-primary" />}
                {recipe.flavor === "Doce" && <DoodleSweetness size={18} className="text-rose-500" />}
                {recipe.flavor}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Intensidade</span>
              <span className="font-medium text-foreground flex items-center gap-1.5">
                {recipe.intensity === "Suave" && <DoodleFeather size={18} className="text-sky-500" />}
                {recipe.intensity === "Médio" && <DoodleGauge size={18} className="text-amber-600" />}
                {recipe.intensity === "Forte" && <DoodleFlame size={18} className="text-red-500" />}
                {recipe.intensity}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pouring Schedule */}
      <Card className="border-border shadow-minimal">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <DoodleTimerClock size={26} className="text-primary inline-block" />
            <span>Cronograma de Despejos</span>
          </CardTitle>
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
              <div className="w-full bg-background rounded h-1.5 mt-3">
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
