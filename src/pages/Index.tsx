import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Fireworks from "@/components/Fireworks";
import Settings from "@/components/Settings";
import { useToast } from "@/hooks/use-toast";
import CountrySelect from "@/components/CountrySelect";

const Index = () => {
  const [selectedTimezone, setSelectedTimezone] = useState<string>("");
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
    if (!selectedTimezone) return;

    const targetDate = new Date("2025-01-01T00:00:00");
    targetDate.setHours(0, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const userTime = new Date(now.toLocaleString("en-US", { timeZone: selectedTimezone }));
      const distance = targetDate.getTime() - userTime.getTime();

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
  }, [selectedTimezone, toast]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center relative overflow-hidden">
      <Fireworks isActive={isCountdownComplete} speed={fireworkSpeed} />

      {!selectedTimezone ? (
        <CountrySelect onSelect={setSelectedTimezone} />
      ) : (
        <div className="text-center space-y-8 relative">
          {showTime && (
            <div
              className="bg-black/[.15] backdrop-blur-sm px-8 py-4 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
                fontSize: `${fontSize}rem`,
              }}
            >
              <span className="text-white font-mono">{timeRemaining}</span>
            </div>
          )}

          {isCountdownComplete && (
            <div 
              className="text-white animate-fade-in mt-8"
              style={{ fontSize: `${fontSize * 0.5}rem` }}
            >
              bring them back home 🎗
            </div>
          )}
        </div>
      )}

      <Button
        className="fixed bottom-4 right-4 bg-primary hover:bg-primary/90"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </Button>

      {showSettings && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2">
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
        </div>
      )}
    </div>
  );
};

export default Index;