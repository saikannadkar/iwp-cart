import { Minus, Plus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onOpenChange, onCheckout }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  const handleQuantityChange = (productId: string, change: number) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + change);
    }
  };

  const handleCheckout = () => {
    onCheckout();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-background to-primary/5 border-l-2 border-primary/20">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center text-2xl font-display">
            <ShoppingBag className="mr-3 h-6 w-6 text-primary" />
            Shopping Cart
            {getTotalItems() > 0 && (
              <span className="ml-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-full animate-bounce-in">
                {getTotalItems()}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="text-base">
            Review your premium electronics and proceed to secure checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Add some premium electronics to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-card to-card/80 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative group">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h4 className="font-semibold font-display line-clamp-2 text-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          ${item.price.toFixed(2)} each
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 bg-secondary/50 rounded-full p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="font-bold text-lg text-gradient">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-6 bg-gradient-to-r from-background to-primary/5">
            <div className="w-full space-y-6">
              <div className="flex items-center justify-between text-2xl font-bold font-display">
                <span>Total:</span>
                <span className="text-gradient">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                size="lg"
              >
                <Sparkles className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}