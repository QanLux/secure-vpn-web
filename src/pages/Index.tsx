import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { VpnDashboard } from "@/components/VpnDashboard";
import { AuthPage } from "@/components/AuthPage";
import { PricingPage } from "@/components/PricingPage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { toast } = useToast();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const handleGetStarted = (plan: string) => {
    if (plan === 'Free') {
      toast({
        title: "Welcome to SecureVPN!",
        description: "Your free account is ready. You can start using the VPN with limited features.",
      });
      setCurrentPage('dashboard');
    } else {
      toast({
        title: "Supabase Integration Required",
        description: "To enable premium plans and payment processing, connect your project to Supabase.",
      });
      setCurrentPage('signup');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <AuthPage mode="login" onBack={() => setCurrentPage('dashboard')} />;
      case 'signup':
        return <AuthPage mode="signup" onBack={() => setCurrentPage('dashboard')} />;
      case 'pricing':
        return (
          <PricingPage 
            onBack={() => setCurrentPage('dashboard')} 
            onGetStarted={handleGetStarted}
          />
        );
      case 'dashboard':
      default:
        return (
          <>
            <Navigation onNavigate={handleNavigation} currentPage={currentPage} />
            <div className="pt-20">
              <VpnDashboard />
            </div>
          </>
        );
    }
  };

  return renderCurrentPage();
};

export default Index;
