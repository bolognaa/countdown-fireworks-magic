import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Fireworks from "@/components/Fireworks";
import Settings from "@/components/Settings";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [timeFormat24, setTimeFormat24] = useState(true);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.5);
  const [fontSize, setFontSize] = useState(4);
  const [fireworkSpeed, setFireworkSpeed] = useState(50);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [manualDateTime, setManualDateTime] = useState("");
  const [confirmedDateTime, setConfirmedDateTime] = useState("");
  const [gradientStart, setGradientStart] = useState("#1A1F2C");
  const [gradientEnd, setGradientEnd] = useState("#2A2F3C");
  const { toast } = useToast();

  useEffect(() => {
    if (!confirmedDateTime) return;

    const targetDate = new Date(confirmedDateTime);

    if (isNaN(targetDate.getTime())) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const distance = targetDate.getTime() - now.getTime();

      if (distance <= 0) {
        setTimeRemaining("00:00:00");
        setDaysRemaining(0);
        setIsCountdownComplete(true);
        clearInterval(interval);
        toast({
          title: "Countdown Complete!",
          description: "bring them back home 🎗",
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setDaysRemaining(days);
        setTimeRemaining(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [confirmedDateTime, toast]);

  const handleConfirmDateTime = () => {
    if (!manualDateTime) {
      toast({
        title: "Error",
        description: "Please select a date and time",
        variant: "destructive",
      });
      return;
    }
    setConfirmedDateTime(manualDateTime);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
      }}
    >
      <Fireworks isActive={isCountdownComplete} speed={fireworkSpeed} />

      {!confirmedDateTime ? (
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Set Your Countdown
          </h1>
          <div className="space-y-2">
            <Input
              type="datetime-local"
              value={manualDateTime}
              onChange={(e) => setManualDateTime(e.target.value)}
              className="bg-secondary/50 text-white [color-scheme:dark]"
            />
            <div className="text-sm text-white/60 mt-1">
              Times are set in your local timezone
            </div>
            <Button
              onClick={handleConfirmDateTime}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Start Countdown
            </Button>
          </div>
        </div>
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
              <div className="text-white font-mono">
                {daysRemaining > 0 && (
                  <div className="mb-2">{daysRemaining} days</div>
                )}
                <span>{timeRemaining}</span>
              </div>
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
            gradientStart={gradientStart}
            setGradientStart={setGradientStart}
            gradientEnd={gradientEnd}
            setGradientEnd={setGradientEnd}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Index;