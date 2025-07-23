import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Categories</h3>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          className="w-full justify-between"
          onClick={() => onCategoryChange(null)}
        >
          All Products
          <Badge variant="secondary">
            {Object.values(productCounts).reduce((a, b) => a + b, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            className="w-full justify-between"
            onClick={() => onCategoryChange(category)}
          >
            {category}
            <Badge variant="secondary">{productCounts[category] || 0}</Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}