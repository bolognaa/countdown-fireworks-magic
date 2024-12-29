import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountrySelectProps {
  onSelect: (timezone: string) => void;
}

const CountrySelect = ({ onSelect }: CountrySelectProps) => {
  const countries = [
    { name: "United States", timezone: "America/New_York" },
    { name: "United Kingdom", timezone: "Europe/London" },
    { name: "Japan", timezone: "Asia/Tokyo" },
    { name: "Australia", timezone: "Australia/Sydney" },
    { name: "China", timezone: "Asia/Shanghai" },
    { name: "India", timezone: "Asia/Kolkata" },
    { name: "Brazil", timezone: "America/Sao_Paulo" },
    { name: "Russia", timezone: "Europe/Moscow" },
  ];

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-8">
        Select Your Country
      </h1>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[280px] bg-white/10 text-white border-white/20">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.timezone} value={country.timezone}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;