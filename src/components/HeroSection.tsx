import { ArrowRight, Zap, Truck, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroBanner from '@/assets/hero-banner.jpg';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 lg:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Premium Electronics"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              #1 Premium Electronics Store
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight">
                <span className="text-gradient">Premium</span>
                <br />
                Electronics
                <br />
                <span className="text-foreground">Redefined</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Discover the latest cutting-edge technology with unmatched quality, 
                innovative design, and exceptional performance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8 bg-gradient-to-r from-primary to-primary-glow hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg h-14 px-8 border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300"
              >
                View Collection
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Star className="h-5 w-5 text-accent fill-accent" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Featured Product Showcase */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
              <img
                src={heroBanner}
                alt="Featured Electronics"
                className="relative z-10 w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}