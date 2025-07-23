import { ShoppingCart, Search, User, Menu } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ElectroCart Pro
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search electronics..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems() > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search electronics..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
      </div>
    </header>
  );
}