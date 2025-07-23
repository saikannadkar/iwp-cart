import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Checkout } from '@/components/Checkout';
import { CartProvider } from '@/contexts/CartContext';
import { products } from '@/data/products';

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
    <div className="min-h-screen bg-background">
      <Header 
        onCartClick={() => setCartOpen(true)}
        onSearchChange={setSearchTerm}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                productCounts={productCounts}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedCategory ? `${selectedCategory}` : 'All Electronics'}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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
