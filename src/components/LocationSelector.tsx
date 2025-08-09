import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const locations = [
  { name: "United States", flag: "🇺🇸", ping: "25ms" },
  { name: "United Kingdom", flag: "🇬🇧", ping: "45ms" },
  { name: "Germany", flag: "🇩🇪", ping: "38ms" },
  { name: "Japan", flag: "🇯🇵", ping: "85ms" },
  { name: "Singapore", flag: "🇸🇬", ping: "95ms" },
  { name: "Australia", flag: "🇦🇺", ping: "120ms" },
  { name: "Canada", flag: "🇨🇦", ping: "35ms" },
  { name: "France", flag: "🇫🇷", ping: "42ms" },
  { name: "Netherlands", flag: "🇳🇱", ping: "40ms" },
  { name: "Vietnam", flag: "🇻🇳", ping: "110ms" },
  { name: "South Korea", flag: "🇰🇷", ping: "78ms" },
  { name: "Switzerland", flag: "🇨🇭", ping: "48ms" },
  { name: "Sweden", flag: "🇸🇪", ping: "52ms" },
  { name: "Norway", flag: "🇳🇴", ping: "58ms" },
  { name: "Italy", flag: "🇮🇹", ping: "46ms" },
  { name: "Spain", flag: "🇪🇸", ping: "50ms" },
  { name: "Brazil", flag: "🇧🇷", ping: "95ms" },
  { name: "Mexico", flag: "🇲🇽", ping: "65ms" },
  { name: "India", flag: "🇮🇳", ping: "88ms" },
  { name: "Hong Kong", flag: "🇭🇰", ping: "92ms" },
  { name: "Taiwan", flag: "🇹🇼", ping: "86ms" },
  { name: "Thailand", flag: "🇹🇭", ping: "105ms" },
  { name: "South Africa", flag: "🇿🇦", ping: "135ms" },
  { name: "Israel", flag: "🇮🇱", ping: "68ms" },
  { name: "Turkey", flag: "🇹🇷", ping: "72ms" },
  { name: "Russia", flag: "🇷🇺", ping: "82ms" },
  { name: "Ukraine", flag: "🇺🇦", ping: "76ms" },
  { name: "Poland", flag: "🇵🇱", ping: "54ms" },
  { name: "Czech Republic", flag: "🇨🇿", ping: "56ms" },
  { name: "Austria", flag: "🇦🇹", ping: "44ms" },
  { name: "Belgium", flag: "🇧🇪", ping: "42ms" },
  { name: "Denmark", flag: "🇩🇰", ping: "50ms" },
  { name: "Finland", flag: "🇫🇮", ping: "60ms" },
  { name: "Romania", flag: "🇷🇴", ping: "62ms" },
  { name: "Hungary", flag: "🇭🇺", ping: "58ms" },
  { name: "Portugal", flag: "🇵🇹", ping: "52ms" },
  { name: "Ireland", flag: "🇮🇪", ping: "48ms" },
  { name: "New Zealand", flag: "🇳🇿", ping: "125ms" },
  { name: "Chile", flag: "🇨🇱", ping: "115ms" },
  { name: "Argentina", flag: "🇦🇷", ping: "120ms" },
];

export const LocationSelector = ({ value, onChange, disabled }: LocationSelectorProps) => {
  const selectedLocation = locations.find(loc => loc.name === value);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Server Location
      </label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full h-12 bg-secondary/50 border-border/50 hover:border-primary/50 transition-colors">
          <SelectValue>
            {selectedLocation && (
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedLocation.flag}</span>
                <span className="font-medium">{selectedLocation.name}</span>
                <Badge variant="outline" className="ml-auto bg-primary/20 text-primary border-primary/30">
                  {selectedLocation.ping}
                </Badge>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-secondary border-border/50">
          {locations.map((location) => (
            <SelectItem 
              key={location.name} 
              value={location.name}
              className="hover:bg-primary/10 focus:bg-primary/10"
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-2xl">{location.flag}</span>
                <span className="font-medium flex-1">{location.name}</span>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                  {location.ping}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};