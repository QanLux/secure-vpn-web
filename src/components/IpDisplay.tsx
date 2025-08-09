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
    "Vietnam": { ip: "103.28.36.167", city: "Ho Chi Minh City", country: "Vietnam", isp: "VNG Corporation", flag: "🇻🇳" },
    "South Korea": { ip: "175.126.232.12", city: "Seoul", country: "South Korea", isp: "KT Corporation", flag: "🇰🇷" },
    "Switzerland": { ip: "185.93.3.123", city: "Zurich", country: "Switzerland", isp: "Init7 AG", flag: "🇨🇭" },
    "Sweden": { ip: "194.58.102.78", city: "Stockholm", country: "Sweden", isp: "Telia Company", flag: "🇸🇪" },
    "Norway": { ip: "129.241.210.115", city: "Oslo", country: "Norway", isp: "Telenor ASA", flag: "🇳🇴" },
    "Italy": { ip: "151.38.39.114", city: "Milan", country: "Italy", isp: "Telecom Italia", flag: "🇮🇹" },
    "Spain": { ip: "88.27.137.205", city: "Madrid", country: "Spain", isp: "Telefonica", flag: "🇪🇸" },
    "Brazil": { ip: "200.160.2.3", city: "São Paulo", country: "Brazil", isp: "Telefônica Brasil", flag: "🇧🇷" },
    "Mexico": { ip: "201.175.53.78", city: "Mexico City", country: "Mexico", isp: "Telmex", flag: "🇲🇽" },
    "India": { ip: "103.21.244.8", city: "Mumbai", country: "India", isp: "Reliance Jio", flag: "🇮🇳" },
    "Hong Kong": { ip: "119.28.153.224", city: "Hong Kong", country: "Hong Kong", isp: "PCCW Limited", flag: "🇭🇰" },
    "Taiwan": { ip: "203.69.138.170", city: "Taipei", country: "Taiwan", isp: "Chunghwa Telecom", flag: "🇹🇼" },
    "Thailand": { ip: "203.154.83.106", city: "Bangkok", country: "Thailand", isp: "True Internet", flag: "🇹🇭" },
    "South Africa": { ip: "196.25.1.1", city: "Cape Town", country: "South Africa", isp: "Telkom SA", flag: "🇿🇦" },
    "Israel": { ip: "5.29.97.161", city: "Tel Aviv", country: "Israel", isp: "Bezeq International", flag: "🇮🇱" },
    "Turkey": { ip: "88.255.64.12", city: "Istanbul", country: "Turkey", isp: "Turk Telekom", flag: "🇹🇷" },
    "Russia": { ip: "5.61.16.97", city: "Moscow", country: "Russia", isp: "MTS PJSC", flag: "🇷🇺" },
    "Ukraine": { ip: "91.230.211.67", city: "Kiev", country: "Ukraine", isp: "Kyivstar", flag: "🇺🇦" },
    "Poland": { ip: "83.9.9.9", city: "Warsaw", country: "Poland", isp: "Orange Polska", flag: "🇵🇱" },
    "Czech Republic": { ip: "89.185.44.129", city: "Prague", country: "Czech Republic", isp: "O2 Czech Republic", flag: "🇨🇿" },
    "Austria": { ip: "194.208.0.1", city: "Vienna", country: "Austria", isp: "A1 Telekom Austria", flag: "🇦🇹" },
    "Belgium": { ip: "195.238.2.21", city: "Brussels", country: "Belgium", isp: "Proximus", flag: "🇧🇪" },
    "Denmark": { ip: "83.136.248.4", city: "Copenhagen", country: "Denmark", isp: "TDC NET", flag: "🇩🇰" },
    "Finland": { ip: "194.100.1.1", city: "Helsinki", country: "Finland", isp: "Elisa Oyj", flag: "🇫🇮" },
    "Romania": { ip: "86.106.121.194", city: "Bucharest", country: "Romania", isp: "RCS & RDS", flag: "🇷🇴" },
    "Hungary": { ip: "195.56.119.209", city: "Budapest", country: "Hungary", isp: "Magyar Telekom", flag: "🇭🇺" },
    "Portugal": { ip: "213.13.146.139", city: "Lisbon", country: "Portugal", isp: "MEO", flag: "🇵🇹" },
    "Ireland": { ip: "87.32.80.1", city: "Dublin", country: "Ireland", isp: "Eir", flag: "🇮🇪" },
    "New Zealand": { ip: "203.118.143.2", city: "Auckland", country: "New Zealand", isp: "Spark New Zealand", flag: "🇳🇿" },
    "Chile": { ip: "200.1.123.6", city: "Santiago", country: "Chile", isp: "Telefónica Chile", flag: "🇨🇱" },
    "Argentina": { ip: "200.51.211.11", city: "Buenos Aires", country: "Argentina", isp: "Telecom Argentina", flag: "🇦🇷" }
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