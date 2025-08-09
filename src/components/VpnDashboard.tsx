import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocationSelector } from "./LocationSelector";
import { IpDisplay } from "./IpDisplay";
import { Shield, Power, Zap, Globe } from "lucide-react";

export const VpnDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("United States");

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsConnecting(false);
    }, 2000);
  };

  const getConnectionStatus = () => {
    if (isConnecting) return { text: "Connecting...", color: "bg-vpn-connecting", icon: Zap };
    if (isConnected) return { text: "Connected", color: "bg-vpn-connected", icon: Shield };
    return { text: "Disconnected", color: "bg-vpn-disconnected", icon: Power };
  };

  const status = getConnectionStatus();
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-vpn-dark p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-vpn-gradient shadow-vpn-glow">
              <Globe className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-vpn-gradient bg-clip-text text-transparent">
              SecureVPN
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect your privacy and access the internet freely with our premium VPN service
          </p>
        </div>

        {/* Main Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Control */}
          <Card className="bg-vpn-card backdrop-blur border-border/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-3">
                <StatusIcon className="h-6 w-6" />
                VPN Connection
              </CardTitle>
              <Badge 
                className={`${status.color} text-white font-medium px-3 py-1`}
                variant="secondary"
              >
                {status.text}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <LocationSelector 
                value={selectedLocation}
                onChange={setSelectedLocation}
                disabled={isConnected}
              />
              
              <div className="text-center">
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  size="lg"
                  className={`
                    w-full h-14 text-lg font-semibold transition-all duration-300
                    ${isConnected 
                      ? 'bg-vpn-disconnected hover:bg-vpn-disconnected/80' 
                      : 'bg-vpn-gradient hover:shadow-vpn-glow'
                    }
                    ${isConnecting ? 'animate-pulse' : ''}
                  `}
                >
                  {isConnecting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </div>
                  ) : isConnected ? (
                    'Disconnect VPN'
                  ) : (
                    'Connect VPN'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* IP Information */}
          <IpDisplay isConnected={isConnected} selectedLocation={selectedLocation} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-vpn-card backdrop-blur border-border/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Military-Grade Encryption</h3>
              <p className="text-sm text-muted-foreground">
                AES-256 encryption protects your data
              </p>
            </CardContent>
          </Card>

          <Card className="bg-vpn-card backdrop-blur border-border/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized servers for maximum speed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-vpn-card backdrop-blur border-border/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-vpn-connected/20 rounded-xl flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6 text-vpn-connected" />
              </div>
              <h3 className="font-semibold">Global Network</h3>
              <p className="text-sm text-muted-foreground">
                50+ countries, 1000+ servers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};