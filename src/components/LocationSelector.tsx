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