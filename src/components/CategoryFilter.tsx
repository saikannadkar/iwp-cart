import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  productCounts: Record<string, number>;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  productCounts 
}: CategoryFilterProps) {
  return (
    <Card className="sticky top-24 shadow-lg border-0 bg-gradient-to-br from-card to-card/80 animate-slide-up">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-display">
          <Filter className="h-5 w-5 mr-2 text-primary" />
          Categories
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-between h-12 text-left font-medium transition-all duration-200 hover:scale-105"
          onClick={() => onCategoryChange(null)}
        >
          All Products
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {Object.values(productCounts).reduce((a, b) => a + b, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className="w-full justify-between h-12 text-left font-medium transition-all duration-200 hover:scale-105"
            onClick={() => onCategoryChange(category)}
          >
            {category}
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {productCounts[category] || 0}
            </Badge>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}