import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
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
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium line-clamp-2">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <p className="font-semibold">
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
          <SheetFooter className="border-t pt-6">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}