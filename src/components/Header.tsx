import { ShoppingCart, Search, User, Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface HeaderProps {
  onCartClick: () => void;
  onSearchChange: (search: string) => void;
}

export function Header({ onCartClick, onSearchChange }: HeaderProps) {
  const { getTotalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-effect backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="h-8 w-8 text-primary animate-glow" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold font-display text-gradient animate-fade-in">
              ElectroCart Pro
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-primary" />
            <Input
              type="text"
              placeholder="Search premium electronics..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-12 pr-4 h-12 text-lg border-2 border-transparent bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:bg-background focus:shadow-lg hover:bg-background/80"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-all duration-200 hover:scale-110">
            <User className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCartClick}
            className="relative hover:bg-primary/10 transition-all duration-200 hover:scale-110 group"
          >
            <ShoppingCart className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
            {getTotalItems() > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold animate-bounce-in shadow-glow"
              >
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-primary" />
          <Input
            type="text"
            placeholder="Search electronics..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 pr-4 h-12 border-2 border-transparent bg-background/50 backdrop-blur-sm transition-all duration-300 focus:border-primary focus:bg-background focus:shadow-lg"
          />
        </div>
      </div>
    </header>
  );
}