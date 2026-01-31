import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2, CheckCircle2 } from "lucide-react";

/**
 * Recipe-Specific Timer Component
 * Artisanal Minimalism Design
 * - Guides through each pour with exact timings
 * - Shows current pour and next pour information
 * - Audio alerts when it's time to pour
 */

interface Pour {
  number: number;
  type: string;
  weight: number;
  cumulative: number;
}

interface RecipeTimerProps {
  pours: Pour[];
  recipeName?: string;
  onPourReady?: (pourNumber: number) => void;
}

export default function RecipeTimer({ pours, recipeName, onPourReady }: RecipeTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentPourIndex, setCurrentPourIndex] = useState(0);

  // Calculate timing for each pour (45 seconds between pours)
  const POUR_DURATION = 45;
  const WAIT_BETWEEN_POURS = 5; // 5 seconds wait after pour completes

  // Build timeline: each pour takes 45s, then 5s wait before next
  const calculatePourTiming = (index: number) => {
    const startTime = index * (POUR_DURATION + WAIT_BETWEEN_POURS);
    const endTime = startTime + POUR_DURATION;
    return { startTime, endTime };
  };

  const totalDuration = pours.length * (POUR_DURATION + WAIT_BETWEEN_POURS);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && seconds < totalDuration) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;

          // Check if we've reached a new pour
          for (let i = 0; i < pours.length; i++) {
            const { startTime } = calculatePourTiming(i);
            if (next === startTime && i !== currentPourIndex) {
              setCurrentPourIndex(i);
              if (soundEnabled) {
                playAlert();
              }
              if (onPourReady) {
                onPourReady(i + 1);
              }
            }
          }

          // Stop when complete
          if (next >= totalDuration) {
            setIsRunning(false);
            if (soundEnabled) {
              playCompletionAlert();
            }
            return totalDuration;
          }

          return next;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, soundEnabled, currentPourIndex, pours, totalDuration, onPourReady]);

  // Update current pour based on elapsed time
  useEffect(() => {
    for (let i = 0; i < pours.length; i++) {
      const { startTime } = calculatePourTiming(i);
      if (seconds >= startTime) {
        setCurrentPourIndex(i);
      } else {
        break;
      }
    }
  }, [seconds, pours.length]);

  const playAlert = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log("Hora de despejar!");
    }
  };

  const playCompletionAlert = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 1000;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (e) {
      console.log("Preparo completo!");
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentPour = () => pours[currentPourIndex];
  const getNextPour = () => pours[currentPourIndex + 1];

  const { startTime: currentStartTime } = calculatePourTiming(currentPourIndex);
  const timeInCurrentPour = seconds - currentStartTime;
  const timeUntilNextAction = POUR_DURATION - timeInCurrentPour;

  const isCompleted = seconds >= totalDuration;
  const currentPour = getCurrentPour();
  const nextPour = getNextPour();

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setCurrentPourIndex(0);
  };

  return (
    <Card className="border-border shadow-minimal">
      <CardHeader>
        <CardTitle className="text-2xl">Cronômetro de Preparo</CardTitle>
        <CardDescription>
          {recipeName ? `Siga o cronograma para: ${recipeName}` : "Siga o cronograma da sua receita"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Tempo Total</p>
            <p className="font-mono text-6xl font-bold text-primary">{formatTime(seconds)}</p>
            <p className="text-xs text-muted-foreground">de {formatTime(totalDuration)}</p>
          </div>

          {/* Current Pour Information */}
          {!isCompleted && currentPour && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Despejo Atual
                </p>
                <p className="text-3xl font-mono font-semibold text-foreground">
                  {currentPour.number}º
                </p>
                <p className="text-xs text-muted-foreground mt-1">{currentPour.type}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Despejar
                </p>
                <p className="text-2xl font-mono font-semibold text-primary">
                  +{currentPour.weight}g
                </p>
              </div>
            </div>
          )}

          {/* Next Pour Preview */}
          {nextPour && !isCompleted && (
            <div className="p-3 bg-secondary rounded-md border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Próximo Despejo
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {nextPour.number}º Despejo ({nextPour.type})
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">+{nextPour.weight}g</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">em</p>
                  <p className="font-mono text-lg font-semibold text-primary">
                    {formatTime(calculatePourTiming(currentPourIndex + 1).startTime - seconds)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Completion Message */}
          {isCompleted && (
            <div className="p-4 bg-secondary rounded-md border border-border text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
              <p className="font-medium text-foreground">Preparo Completo!</p>
              <p className="text-sm text-muted-foreground">Aproveite seu café perfeito ☕</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{
                width: `${(seconds / totalDuration) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {formatTime(seconds)} / {formatTime(totalDuration)}
          </p>
        </div>

        {/* Pour Timeline */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Sequência de Despejos</p>
          <div className="grid grid-cols-auto gap-2">
            {pours.map((pour, index) => {
              const isActive = index === currentPourIndex;
              const isDone = index < currentPourIndex;
              const { startTime } = calculatePourTiming(index);

              return (
                <div
                  key={index}
                  className={`px-3 py-2 rounded text-xs font-mono font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : isDone
                        ? "bg-secondary text-muted-foreground line-through"
                        : "bg-secondary text-muted-foreground"
                  }`}
                  title={`${pour.number}º Despejo: +${pour.weight}g em ${formatTime(startTime)}`}
                >
                  {pour.number}º
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              disabled={isCompleted}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 transition-smooth disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" />
              Iniciar
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              variant="outline"
              className="flex-1 py-6 transition-smooth"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
          )}

          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 py-6 transition-smooth"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
        </div>

        {/* Sound Toggle */}
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <Volume2 className={`w-4 h-4 ${soundEnabled ? "text-primary" : "text-muted-foreground"}`} />
            <span>{soundEnabled ? "Som ativado" : "Som desativado"}</span>
          </button>
        </div>

        {/* Tips */}
        <div className="bg-secondary rounded-md p-3 border border-border">
          <p className="text-xs text-foreground">
            <span className="font-medium">💡 Dica:</span> O cronômetro segue os tempos específicos da sua receita. Cada despejo leva 45 segundos. O alerta soará quando for hora de despejar.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
