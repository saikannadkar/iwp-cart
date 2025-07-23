import { Star, Plus, Check } from 'lucide-react';
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
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const inCart = isInCart(product.id);

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              ({product.rating})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="outline">{product.category}</Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || inCart}
          variant={inCart ? "success" : "cart"}
          className="w-full"
        >
          {inCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              In Cart
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}