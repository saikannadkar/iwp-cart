import { Star, Plus, Check, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "✨ Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const inCart = isInCart(product.id);
  const isPopular = product.rating >= 4.8;
  const isLowStock = product.stock < 10 && product.stock > 0;

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card via-card to-card/80 border-0 shadow-card animate-fade-in">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground shadow-lg animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      <CardContent className="p-6 relative z-10">
        <div className="relative overflow-hidden rounded-xl mb-6 group/image">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"></div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100"></div>
          
          {/* Stock Badges */}
          <div className="absolute top-3 right-3 z-20">
            {isLowStock && (
              <Badge variant="destructive" className="shadow-lg animate-bounce-in mb-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary" className="shadow-lg">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-xl font-display line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-muted-foreground line-clamp-2 mt-2 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors duration-200 ${
                  i < Math.floor(product.rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2 font-medium">
              ({product.rating})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-3xl font-bold font-display text-gradient">
                ${product.price.toFixed(2)}
              </span>
              <div className="text-xs text-muted-foreground">
                Free shipping
              </div>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 transition-colors">
              {product.category}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 relative z-10">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || inCart}
          variant={inCart ? "success" : "cart"}
          className="w-full h-12 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 group/button"
        >
          {inCart ? (
            <>
              <Check className="mr-2 h-5 w-5 transition-transform duration-200 group-hover/button:scale-110" />
              In Cart
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5 transition-transform duration-200 group-hover/button:scale-110" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}