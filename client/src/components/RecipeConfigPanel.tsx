import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Zap, Scale, Heart, Feather, Gauge, Flame, Lock, Unlock } from "lucide-react";

export interface RecipeConfig {
  coffeeVal: string;
  waterVal: string;
  ratioVal: string;
  isWaterLocked: boolean;
  isRatioLocked: boolean;
  flavor: string;
  intensity: string;
}

interface RecipeConfigPanelProps {
  config: RecipeConfig;
  onCoffeeChange: (val: string) => void;
  onWaterChange: (val: string) => void;
  onRatioChange: (val: string) => void;
  onFlavorChange: (flavor: string) => void;
  onIntensityChange: (intensity: string) => void;
  onToggleWaterLock: () => void;
  onToggleRatioLock: () => void;
}

export default function RecipeConfigPanel({
  config,
  onCoffeeChange,
  onWaterChange,
  onRatioChange,
  onFlavorChange,
  onIntensityChange,
  onToggleWaterLock,
  onToggleRatioLock,
}: RecipeConfigPanelProps) {
  const { coffeeVal, waterVal, ratioVal, isWaterLocked, isRatioLocked, flavor, intensity } = config;
  return (
    <Card className="border-border shadow-minimal">
      <CardHeader>
        <CardTitle className="text-2xl">Configuração</CardTitle>
        <CardDescription>Defina os parâmetros da sua receita</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Café (g) Input */}
        <div className="space-y-3">
          <Label htmlFor="coffee-weight" className="text-sm font-medium">
            Café (g)
          </Label>
          <Input
            id="coffee-weight"
            type="number"
            value={coffeeVal}
            onChange={(e) => onCoffeeChange(e.target.value)}
            className="font-mono text-lg"
          />
          <p className="text-xs text-muted-foreground">
            Quantidade de grãos de café moídos.
          </p>
        </div>

        {/* Água (ml) Input with Lock */}
        <div className="space-y-3">
          <Label htmlFor="water-weight" className="text-sm font-medium">
            Água (ml)
          </Label>
          <div className="relative flex items-center">
            <Input
              id="water-weight"
              type="number"
              value={waterVal}
              onChange={(e) => onWaterChange(e.target.value)}
              readOnly={isWaterLocked}
              className={`font-mono text-lg pr-10 ${isWaterLocked
                  ? "cursor-pointer bg-secondary/40 text-muted-foreground border-dashed"
                  : ""
                }`}
              onClick={() => {
                if (isWaterLocked) {
                  onToggleWaterLock();
                }
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWaterLock();
              }}
              className="absolute right-3 p-1 rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title={isWaterLocked ? "Clique para desbloquear e editar" : "Clique para bloquear"}
            >
              {isWaterLocked ? (
                <Lock className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Unlock className="w-4 h-4 text-primary" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Volume total de água para a extração.
          </p>
        </div>

        {/* Proporção Input with Lock */}
        <div className="space-y-3">
          <Label htmlFor="ratio" className="text-sm font-medium">
            Proporção
          </Label>
          <div className="relative flex items-center">
            <Input
              id="ratio"
              type="number"
              step="0.1"
              value={ratioVal}
              onChange={(e) => onRatioChange(e.target.value)}
              readOnly={isRatioLocked}
              className={`font-mono text-lg pr-10 ${isRatioLocked
                  ? "cursor-pointer bg-secondary/40 text-muted-foreground border-dashed"
                  : ""
                }`}
              onClick={() => {
                if (isRatioLocked) {
                  onToggleRatioLock();
                }
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleRatioLock();
              }}
              className="absolute right-3 p-1 rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title={isRatioLocked ? "Clique para desbloquear e editar" : "Clique para bloquear"}
            >
              {isRatioLocked ? (
                <Lock className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Unlock className="w-4 h-4 text-primary" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Proporção de extração (Café para Água).
          </p>
        </div>

        {/* Flavor Profile */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Perfil de Sabor</Label>
          <p className="text-xs text-muted-foreground mb-3">
            Controla o equilíbrio entre acidez e doçura (primeiros 40%)
          </p>
          <RadioGroup value={flavor} onValueChange={onFlavorChange}>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <RadioGroupItem value="acidity" id="acidity" />
              <Label
                htmlFor="acidity"
                className="flex-1 cursor-pointer font-normal text-foreground"
              >
                <span className="font-medium flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" />Acidez</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Mais brilhante e vivaz
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <RadioGroupItem value="balanced" id="balanced" />
              <Label
                htmlFor="balanced"
                className="flex-1 cursor-pointer font-normal text-foreground"
              >
                <span className="font-medium flex items-center gap-2"><Scale className="w-4 h-4 text-blue-500" />Equilibrado</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Harmonia perfeita entre sabores
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <RadioGroupItem value="sweetness" id="sweetness" />
              <Label
                htmlFor="sweetness"
                className="flex-1 cursor-pointer font-normal text-foreground"
              >
                <span className="font-medium flex items-center gap-2"><Heart className="w-4 h-4 text-pink-500" />Doçura</span>
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
          <RadioGroup value={intensity} onValueChange={onIntensityChange}>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <RadioGroupItem value="soft" id="soft" />
              <Label
                htmlFor="soft"
                className="flex-1 cursor-pointer font-normal text-foreground"
              >
                <span className="font-medium flex items-center gap-2"><Feather className="w-4 h-4 text-sky-400" />Suave</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Corpo leve e limpo
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <RadioGroupItem value="medium" id="medium" />
              <Label
                htmlFor="medium"
                className="flex-1 cursor-pointer font-normal text-foreground"
              >
                <span className="font-medium flex items-center gap-2"><Gauge className="w-4 h-4 text-orange-400" />Médio</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Corpo equilibrado
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <RadioGroupItem value="strong" id="strong" />
              <Label
                htmlFor="strong"
                className="flex-1 cursor-pointer font-normal text-foreground"
              >
                <span className="font-medium flex items-center gap-2"><Flame className="w-4 h-4 text-red-500" />Forte</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Corpo completo e intenso
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
