import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Eye, EyeOff } from "lucide-react";

interface IpDisplayProps {
  isConnected: boolean;
  selectedLocation: string;
}

const mockIpData = {
  disconnected: {
    ip: "192.168.1.105",
    city: "Your City",
    country: "Your Country",
    isp: "Your ISP Provider",
    flag: "🏠"
  },
  connected: {
    "United States": { ip: "104.25.34.12", city: "New York", country: "United States", isp: "CloudFlare Inc.", flag: "🇺🇸" },
    "United Kingdom": { ip: "185.199.108.153", city: "London", country: "United Kingdom", isp: "GitHub Inc.", flag: "🇬🇧" },
    "Germany": { ip: "104.18.32.167", city: "Frankfurt", country: "Germany", isp: "CloudFlare Inc.", flag: "🇩🇪" },
    "Japan": { ip: "172.67.177.123", city: "Tokyo", country: "Japan", isp: "CloudFlare Inc.", flag: "🇯🇵" },
    "Singapore": { ip: "104.26.10.228", city: "Singapore", country: "Singapore", isp: "CloudFlare Inc.", flag: "🇸🇬" },
    "Australia": { ip: "104.18.33.167", city: "Sydney", country: "Australia", isp: "CloudFlare Inc.", flag: "🇦🇺" },
    "Canada": { ip: "199.232.41.23", city: "Toronto", country: "Canada", isp: "Fastly Inc.", flag: "🇨🇦" },
    "France": { ip: "151.101.1.140", city: "Paris", country: "France", isp: "Fastly Inc.", flag: "🇫🇷" },
    "Netherlands": { ip: "185.199.111.153", city: "Amsterdam", country: "Netherlands", isp: "GitHub Inc.", flag: "🇳🇱" },
    "Vietnam": { ip: "103.28.36.167", city: "Ho Chi Minh City", country: "Vietnam", isp: "VNG Corporation", flag: "🇻🇳" }
  }
};

export const IpDisplay = ({ isConnected, selectedLocation }: IpDisplayProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const currentData = isConnected 
    ? mockIpData.connected[selectedLocation as keyof typeof mockIpData.connected] || mockIpData.connected["United States"]
    : mockIpData.disconnected;

  const toggleVisibility = () => setIsVisible(!isVisible);

  const maskIp = (ip: string) => {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.xxx.xxx`;
  };

  return (
    <Card className="bg-vpn-card backdrop-blur border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            Your IP Information
          </div>
          <button
            onClick={toggleVisibility}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          >
            {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge 
            className={`${
              isConnected 
                ? 'bg-vpn-connected/20 text-vpn-connected border-vpn-connected/30' 
                : 'bg-vpn-disconnected/20 text-vpn-disconnected border-vpn-disconnected/30'
            }`}
            variant="outline"
          >
            {isConnected ? 'Protected' : 'Exposed'}
          </Badge>
        </div>

        {/* IP Address */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">IP Address</span>
            <span className="font-mono text-sm">
              {isVisible ? currentData.ip : maskIp(currentData.ip)}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentData.flag}</span>
              <span className="text-sm font-medium">{currentData.city}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Country</span>
            <span className="text-sm font-medium">{currentData.country}</span>
          </div>
        </div>

        {/* ISP */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">ISP</span>
          <span className="text-sm font-medium">{currentData.isp}</span>
        </div>

        {/* Security Indicator */}
        <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-vpn-connected animate-pulse' : 'bg-vpn-disconnected'
            }`} />
            <span className="text-sm font-medium">
              {isConnected 
                ? 'Your connection is encrypted and secure' 
                : 'Your connection is not protected'
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};