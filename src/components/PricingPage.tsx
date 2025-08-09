import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Globe, Shield, ArrowLeft } from "lucide-react";

interface PricingPageProps {
  onBack: () => void;
  onGetStarted: (plan: string) => void;
}

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out our service",
    popular: false,
    features: [
      "3 server locations",
      "500MB daily data limit",
      "Basic encryption",
      "Limited speed",
      "Community support"
    ],
    limitations: [
      "Speed capped at 1 Mbps",
      "Daily data reset required",
      "No streaming optimization"
    ]
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "month",
    description: "Full access to all features",
    popular: true,
    features: [
      "50+ server locations worldwide",
      "Unlimited bandwidth",
      "Military-grade encryption",
      "Maximum speed (up to 1 Gbps)",
      "24/7 priority support",
      "Kill switch protection",
      "Streaming optimized servers",
      "Split tunneling",
      "Ad & malware blocker",
      "5 simultaneous devices"
    ],
    limitations: []
  },
  {
    name: "Enterprise",
    price: "$29.99",
    period: "month",
    description: "For teams and businesses",
    popular: false,
    features: [
      "Everything in Premium",
      "Dedicated IP addresses",
      "Advanced firewall",
      "Team management dashboard",
      "Unlimited devices",
      "Custom branding",
      "API access",
      "SLA guarantee",
      "Dedicated account manager"
    ],
    limitations: []
  }
];

export const PricingPage = ({ onBack, onGetStarted }: PricingPageProps) => {
  return (
    <div className="min-h-screen bg-vpn-dark p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-vpn-gradient bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect your privacy with our flexible pricing options. Start free and upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative bg-vpn-card backdrop-blur border-border/20 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary shadow-vpn-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-premium-gradient text-white px-4 py-1 font-semibold">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  {plan.name === 'Free' && <Zap className="h-5 w-5 text-primary" />}
                  {plan.name === 'Premium' && <Crown className="h-5 w-5 text-premium-gold" />}
                  {plan.name === 'Enterprise' && <Shield className="h-5 w-5 text-accent" />}
                  {plan.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "$0" && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-vpn-connected mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Limitations (for Free plan) */}
                {plan.limitations.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-border/30">
                    <h4 className="text-sm font-medium text-muted-foreground">Limitations:</h4>
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-destructive/20 border border-destructive/30 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  onClick={() => onGetStarted(plan.name)}
                  className={`w-full h-12 font-semibold transition-all ${
                    plan.popular
                      ? 'bg-premium-gradient hover:shadow-accent-glow text-black'
                      : plan.name === 'Free'
                      ? 'bg-primary hover:bg-primary/80'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  {plan.name === 'Free' ? 'Start Free' : `Get ${plan.name}`}
                </Button>

                {plan.name === 'Premium' && (
                  <p className="text-xs text-center text-muted-foreground">
                    30-day money-back guarantee
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose SecureVPN?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-vpn-card backdrop-blur border-border/20 text-center p-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Zero-Log Policy</h3>
              <p className="text-sm text-muted-foreground">
                We never track, collect, or share your private data
              </p>
            </Card>

            <Card className="bg-vpn-card backdrop-blur border-border/20 text-center p-6">
              <Zap className="h-8 w-8 text-premium-gold mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized servers for maximum speed and reliability
              </p>
            </Card>

            <Card className="bg-vpn-card backdrop-blur border-border/20 text-center p-6">
              <Globe className="h-8 w-8 text-vpn-connected mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Global Network</h3>
              <p className="text-sm text-muted-foreground">
                50+ countries with 1000+ high-speed servers
              </p>
            </Card>

            <Card className="bg-vpn-card backdrop-blur border-border/20 text-center p-6">
              <Crown className="h-8 w-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Expert support whenever you need assistance
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};