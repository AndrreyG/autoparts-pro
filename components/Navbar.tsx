import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Wrench, User, X } from 'lucide-react';
import { APP_NAME } from '../constants';

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, cartCount, onMobileMenuToggle }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              {APP_NAME}
            </span>
          </div>

          {/* Search Bar - Centered */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="Search by part name, SKU, or vehicle..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-r-md transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden md:block p-2 text-slate-400 hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={onMobileMenuToggle}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};