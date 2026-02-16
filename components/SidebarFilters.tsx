import React from 'react';
import { FilterState, SelectOption } from '../types';
import { BRANDS, CATEGORIES, YEARS } from '../constants';
import { Filter, X } from 'lucide-react';

interface SidebarFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  className?: string;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onReset: () => void;
  loading: boolean;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters,
  onFilterChange,
  className = '',
  isOpenMobile,
  onCloseMobile,
  onReset,
  loading
}) => {
  const selectClass = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-slate-800 text-slate-200";
  const labelClass = "block text-sm font-medium text-slate-400 mb-1";

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between md:hidden mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Filter className="h-5 w-5" /> Filters
        </h2>
        <button onClick={onCloseMobile} className="text-slate-400 hover:text-white">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium leading-6 text-white mb-4 hidden md:block">Vehicle Selection</h3>
        
        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className={labelClass}>Make</label>
          <select
            id="brand"
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
            className={selectClass}
            disabled={loading}
          >
            {BRANDS.map((brand) => (
              <option key={brand.value || 'all'} value={brand.value}>{brand.label}</option>
            ))}
          </select>
        </div>

        {/* Model - Input for simplicity in mock, would be select in real app dependent on Brand */}
        <div className="mb-4">
          <label htmlFor="model" className={labelClass}>Model</label>
          <input
            type="text"
            id="model"
            value={filters.model}
            onChange={(e) => onFilterChange('model', e.target.value)}
            placeholder="e.g. Camry"
            className={`${selectClass} pr-3`} // adjust padding since it's input
            disabled={loading}
          />
        </div>

        {/* Year */}
        <div className="mb-4">
          <label htmlFor="year" className={labelClass}>Year</label>
          <select
            id="year"
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className={selectClass}
            disabled={loading}
          >
            {YEARS.map((year) => (
              <option key={year.value || 'all'} value={year.value}>{year.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h3 className="text-lg font-medium leading-6 text-white mb-4 hidden md:block">Part Type</h3>
        
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className={labelClass}>Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className={selectClass}
            disabled={loading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value || 'all'} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onReset}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-slate-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          disabled={loading}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block w-64 flex-shrink-0 bg-slate-800 border-r border-slate-700 min-h-[calc(100vh-4rem)] p-6 ${className}`}>
        {content}
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${isOpenMobile ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onCloseMobile}></div>
        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-slate-800 shadow-xl overflow-y-auto p-6 transition-transform transform duration-300 ease-in-out">
            {content}
        </div>
      </div>
    </>
  );
};