import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import RecipeTimer from "@/components/RecipeTimer";

/**
 * Recipe Timer Modal Component
 * Artisanal Minimalism Design
 * - Opens timer in a modal dialog
 * - Allows user to choose when to use the timer
 */

interface Pour {
  number: number;
  type: string;
  weight: number;
  cumulative: number;
}

interface RecipeTimerModalProps {
  pours: Pour[];
  recipeName?: string;
}

export default function RecipeTimerModal({ pours, recipeName }: RecipeTimerModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 transition-smooth">
          <Clock className="w-4 h-4 mr-2" />
          Iniciar Cronômetro
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Cronômetro de Preparo</DialogTitle>
          <DialogDescription>
            {recipeName ? `Siga o cronograma para: ${recipeName}` : "Siga o cronograma da sua receita"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <RecipeTimer
            pours={pours}
            recipeName={recipeName}
            onPourReady={(pourNumber) => {
              console.log(`Hora de despejar! Despejo ${pourNumber}`);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
