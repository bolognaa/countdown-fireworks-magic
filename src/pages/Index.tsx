import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Fireworks from "@/components/Fireworks";
import Settings from "@/components/Settings";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [targetTime, setTargetTime] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [timeFormat24, setTimeFormat24] = useState(true);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.5);
  const [fontSize, setFontSize] = useState(4);
  const [fireworkSpeed, setFireworkSpeed] = useState(50);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!targetTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetTime).getTime();
      const distance = target - now;

      if (distance <= 0) {
        setTimeRemaining("00:00:00");
        setIsCountdownComplete(true);
        clearInterval(interval);
        toast({
          title: "Countdown Complete!",
          description: "bring them back home 🎗",
        });
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, toast]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center relative overflow-hidden">
      <Fireworks isActive={isCountdownComplete} speed={fireworkSpeed} />

      <div
        className="text-center space-y-8 relative"
        style={{ zIndex: 1 }}
      >
        {!targetTime ? (
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white mb-8">
              Set Countdown Time
            </h1>
            <Input
              type="datetime-local"
              className="bg-white/10 text-white border-white/20"
              onChange={(e) => setTargetTime(e.target.value)}
            />
          </div>
        ) : (
          showTime && (
            <div
              className="bg-black/[.15] backdrop-blur-sm px-8 py-4 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
                fontSize: `${fontSize}rem`,
              }}
            >
              <span className="text-white font-mono">{timeRemaining}</span>
            </div>
          )
        )}

        {isCountdownComplete && (
          <div className="text-white text-2xl animate-fade-in mt-8">
            bring them back home 🎗
          </div>
        )}
      </div>

      <Button
        className="fixed bottom-4 right-4 bg-primary hover:bg-primary/90"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </Button>

      {showSettings && (
        <Settings
          showTime={showTime}
          setShowTime={setShowTime}
          timeFormat24={timeFormat24}
          setTimeFormat24={setTimeFormat24}
          backgroundOpacity={backgroundOpacity}
          setBackgroundOpacity={setBackgroundOpacity}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fireworkSpeed={fireworkSpeed}
          setFireworkSpeed={setFireworkSpeed}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Index;