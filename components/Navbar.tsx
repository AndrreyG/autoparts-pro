import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Wrench, User, X } from 'lucide-react';
import { APP_NAME } from '../constants';

interface NavbarProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onMobileMenuToggle: () => void;
  currentPage: 'home' | 'shop';
  onNavigate: (page: 'home' | 'shop') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSearch, 
  cartCount, 
  onMobileMenuToggle,
  currentPage,
  onNavigate
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              {APP_NAME}
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('shop')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'shop' ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Catalog
            </button>
          </div>

          {/* Search Bar - Centered */}
          <div className="flex-1 max-w-xl mx-4 lg:mx-8">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-1.5 border border-slate-700 rounded-md leading-5 bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all"
                placeholder="Search parts..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden sm:block p-2 text-slate-400 hover:text-white transition-colors">
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