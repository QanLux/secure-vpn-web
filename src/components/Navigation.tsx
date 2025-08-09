import { Button } from "@/components/ui/button";
import { Globe, User, Crown } from "lucide-react";

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navigation = ({ onNavigate, currentPage }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border/20">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 rounded-lg bg-vpn-gradient shadow-vpn-glow">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-vpn-gradient bg-clip-text text-transparent">
              SecureVPN
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'pricing' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Pricing
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('login')}
              className="hidden sm:flex"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={() => onNavigate('signup')}
              className="bg-vpn-gradient hover:shadow-vpn-glow transition-all"
            >
              <Crown className="h-4 w-4 mr-2" />
              Get Premium
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};