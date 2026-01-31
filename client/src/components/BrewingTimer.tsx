import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

/**
 * Brewing Timer Component
 * Artisanal Minimalism Design
 * - Clean timer display with monospace font
 * - Smooth transitions and subtle animations
 * - Audio alerts at each pour interval
 */

interface BrewingTimerProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function BrewingTimer({ isActive, onStart, onPause, onReset }: BrewingTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer interval: 45 seconds between pours
  const POUR_INTERVAL = 45;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;

          // Alert at each pour interval
          if (next % POUR_INTERVAL === 0 && soundEnabled) {
            playAlert();
          }

          return next;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, soundEnabled]);

  const playAlert = () => {
    // Create a simple beep sound using Web Audio API
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
      // Fallback: use console log if Web Audio API is not available
      console.log("Próximo despejo!");
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentPour = () => {
    return Math.floor(seconds / POUR_INTERVAL) + 1;
  };

  const getTimeUntilNextPour = () => {
    const timeInCurrentInterval = seconds % POUR_INTERVAL;
    return POUR_INTERVAL - timeInCurrentInterval;
  };

  const handleStart = () => {
    setIsRunning(true);
    onStart();
  };

  const handlePause = () => {
    setIsRunning(false);
    onPause();
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    onReset();
  };

  return (
    <Card className="border-border shadow-minimal">
      <CardHeader>
        <CardTitle className="text-2xl">Cronômetro de Preparo</CardTitle>
        <CardDescription>Acompanhe o tempo entre despejos (45s cada)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Tempo Total</p>
            <p className="font-mono text-6xl font-bold text-primary">{formatTime(seconds)}</p>
          </div>

          {/* Pour Information */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Despejo Atual
              </p>
              <p className="text-3xl font-mono font-semibold text-foreground">{getCurrentPour()}º</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Próximo em
              </p>
              <p className="text-3xl font-mono font-semibold text-primary">
                {getTimeUntilNextPour()}s
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{
                width: `${((seconds % POUR_INTERVAL) / POUR_INTERVAL) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {seconds % POUR_INTERVAL}s / {POUR_INTERVAL}s
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 transition-smooth"
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
            <span className="font-medium">💡 Dica:</span> O cronômetro alerta a cada 45 segundos,
            o tempo ideal entre despejos. Você pode pausar e retomar quando necessário.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
