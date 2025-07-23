import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Checkout } from '@/components/Checkout';
import { CartProvider } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { Sparkles } from 'lucide-react';

type View = 'shop' | 'checkout';

function ShoppingApp() {
  const [currentView, setCurrentView] = useState<View>('shop');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, []);

  const productCounts = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = products.filter(p => p.category === category).length;
      return acc;
    }, {} as Record<string, number>);
  }, [categories]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  if (currentView === 'checkout') {
    return <Checkout onBack={handleBackToShop} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header 
        onCartClick={() => setCartOpen(true)}
        onSearchChange={setSearchTerm}
      />
      
      {/* Hero Section */}
      <HeroSection />
      
      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              productCounts={productCounts}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8 animate-slide-up">
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                <h2 className="text-4xl font-bold font-display text-gradient">
                  {selectedCategory ? `${selectedCategory}` : 'Featured Electronics'}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground">
                {filteredProducts.length} premium product{filteredProducts.length !== 1 ? 's' : ''} 
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Sparkles className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold font-display mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or browse our categories</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <CartDrawer 
        open={cartOpen}
        onOpenChange={setCartOpen}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

const Index = () => {
  return (
    <CartProvider>
      <ShoppingApp />
    </CartProvider>
  );
};

export default Index;
