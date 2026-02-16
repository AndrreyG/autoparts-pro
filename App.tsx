import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { SidebarFilters } from './components/SidebarFilters';
import { ProductCard } from './components/ProductCard';
import { Home } from './components/Home';
import { CarPart, FilterState } from './types';
import { MOCK_PARTS } from './constants';
import { generatePartsWithGemini } from './services/geminiService';
import { Sparkles, Loader2, AlertTriangle, Database } from 'lucide-react';

export default function App() {
  // State
  const [view, setView] = useState<'home' | 'shop'>('home');
  const [products, setProducts] = useState<CarPart[]>(MOCK_PARTS);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usingAI, setUsingAI] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    brand: '',
    model: '',
    year: '',
    category: ''
  });

  // Handlers
  const handleNavigate = (page: 'home' | 'shop') => {
    setView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // If we are on home and change filter (technically sidebar not visible), ensure we go to shop
    if (view === 'home') setView('shop');
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setView('shop');
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      brand: '',
      model: '',
      year: '',
      category: ''
    });
    setUsingAI(false);
    setProducts(MOCK_PARTS);
  };

  const addToCart = useCallback((part: CarPart) => {
    setCartCount(prev => prev + 1);
    console.log(`Added ${part.name} to cart`);
  }, []);

  // Filtering Logic
  const fetchProducts = useCallback(async () => {
    // Only fetch if we are in shop view or about to be
    if (view === 'home' && !filters.searchQuery) return;

    setLoading(true);

    try {
        if (usingAI) {
           const aiParts = await generatePartsWithGemini(filters);
           if (aiParts.length > 0) {
             setProducts(aiParts);
           } else {
             setProducts(MOCK_PARTS);
           }
        } else {
            // Local Filtering
            const filtered = MOCK_PARTS.filter(part => {
                const matchBrand = !filters.brand || part.brand === filters.brand;
                const matchCategory = !filters.category || part.category === filters.category;
                const matchYear = !filters.year || part.yearCompatibility.includes(parseInt(filters.year));
                
                const matchModel = !filters.model || part.modelCompatibility.some(m => m.toLowerCase().includes(filters.model.toLowerCase()));

                const query = filters.searchQuery.toLowerCase();
                const matchSearch = !query || 
                    part.name.toLowerCase().includes(query) || 
                    part.partNumber.toLowerCase().includes(query) ||
                    part.brand.toLowerCase().includes(query);

                return matchBrand && matchCategory && matchYear && matchModel && matchSearch;
            });
            setProducts(filtered);
        }
    } catch (error) {
        console.error("Error fetching products", error);
    } finally {
        setLoading(false);
    }
  }, [filters, usingAI, view]);

  // Effect to trigger fetch on filter change
  useEffect(() => {
    const timer = setTimeout(() => {
        fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
      <Navbar 
        onSearch={handleSearch} 
        cartCount={cartCount} 
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        currentPage={view}
        onNavigate={handleNavigate}
      />

      {/* Main Layout */}
      {view === 'home' ? (
        <Home onShopNow={() => handleNavigate('shop')} />
      ) : (
        <div className="flex flex-1 max-w-8xl mx-auto w-full animate-fadeIn">
          {/* Sidebar */}
          <SidebarFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            onReset={handleResetFilters}
            loading={loading}
          />

          {/* Shop Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-900/50">
            
            {/* Toolbar / Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                  <h1 className="text-2xl font-bold text-white">
                    {filters.brand ? `${filters.brand} Parts` : 'All Auto Parts'}
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                      {loading ? 'Searching...' : `Showing ${products.length} results`}
                  </p>
              </div>
              
              <div className="flex items-center gap-3">
                  {/* AI Toggle Button */}
                  <button
                      onClick={() => setUsingAI(!usingAI)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                          usingAI 
                          ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' 
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                  >
                      <Sparkles className="w-4 h-4" />
                      {usingAI ? 'AI Assistant Active' : 'Enable AI Search'}
                  </button>
              </div>
            </div>

            {/* Active Filters Tags */}
            {(filters.searchQuery || filters.brand || filters.category) && (
              <div className="flex flex-wrap gap-2 mb-6">
                  {filters.searchQuery && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800">
                          Search: {filters.searchQuery}
                      </span>
                  )}
                  {filters.brand && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          Make: {filters.brand}
                      </span>
                  )}
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="bg-slate-800 rounded-lg h-64 animate-pulse border border-slate-700"></div>
                  ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((part) => (
                  <ProductCard 
                    key={part.id} 
                    part={part} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                  <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-4">
                      {usingAI ? <AlertTriangle className="h-8 w-8 text-yellow-500" /> : <Database className="h-8 w-8 text-slate-500" />}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No parts found</h3>
                  <p className="text-slate-400 max-w-md mx-auto mb-6">
                      {usingAI 
                        ? "The AI couldn't find matching parts for your specific criteria. Try simplifying your search." 
                        : "We couldn't find any parts matching your filters in our catalog."}
                  </p>
                  {!usingAI && (
                      <button 
                          onClick={() => setUsingAI(true)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
                      >
                          <Sparkles className="w-4 h-4" />
                          Ask AI to find it
                      </button>
                  )}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}