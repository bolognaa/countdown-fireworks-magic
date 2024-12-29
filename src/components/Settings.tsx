import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface SettingsProps {
  showTime: boolean;
  setShowTime: (value: boolean) => void;
  timeFormat24: boolean;
  setTimeFormat24: (value: boolean) => void;
  backgroundOpacity: number;
  setBackgroundOpacity: (value: number) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  fireworkSpeed: number;
  setFireworkSpeed: (value: number) => void;
  onClose: () => void;
}

const Settings = ({
  showTime,
  setShowTime,
  timeFormat24,
  setTimeFormat24,
  backgroundOpacity,
  setBackgroundOpacity,
  fontSize,
  setFontSize,
  fireworkSpeed,
  setFireworkSpeed,
  onClose,
}: SettingsProps) => {
  return (
    <div className="bg-secondary/90 backdrop-blur-sm rounded-lg p-6 w-96 text-white space-y-4">
      <div className="flex items-center justify-between">
        <span>Show Time</span>
        <Switch checked={showTime} onCheckedChange={setShowTime} />
      </div>

      <div className="flex items-center justify-between">
        <span>24h Format</span>
        <Switch checked={timeFormat24} onCheckedChange={setTimeFormat24} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Background Opacity</span>
          <span>{Math.round(backgroundOpacity * 100)}%</span>
        </div>
        <Slider
          value={[backgroundOpacity * 100]}
          onValueChange={(value) => setBackgroundOpacity(value[0] / 100)}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Font Size</span>
          <span>{fontSize}rem</span>
        </div>
        <Slider
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={1}
          max={8}
          step={0.5}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Firework Speed</span>
          <span>{fireworkSpeed}%</span>
        </div>
        <Slider
          value={[fireworkSpeed]}
          onValueChange={(value) => setFireworkSpeed(value[0])}
          max={100}
          step={1}
        />
      </div>

      <Button
        onClick={onClose}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Close
      </Button>
    </div>
  );
};

export default Settings;