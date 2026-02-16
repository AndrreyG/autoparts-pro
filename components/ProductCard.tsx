import React from 'react';
import { CarPart } from '../types';
import { ShoppingCart, Check, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  part: CarPart;
  onAddToCart: (part: CarPart) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ part, onAddToCart }) => {
  return (
    <div className="group flex flex-col bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-900">
        <img
          src={part.imageUrl}
          alt={part.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        {!part.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-2 left-2">
            <span className="bg-slate-900/80 backdrop-blur-sm text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700 font-mono">
                {part.brand}
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
            <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
            {part.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">{part.partNumber}</p>
        </div>

        {/* Compatibility Badge - Simplified */}
        <div className="mb-3 flex flex-wrap gap-1">
            {part.modelCompatibility.slice(0, 2).map((model, idx) => (
                <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-700 text-slate-300">
                    {model}
                </span>
            ))}
            {part.modelCompatibility.length > 2 && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-700 text-slate-300">
                    +{part.modelCompatibility.length - 2}
                </span>
            )}
        </div>
        
        <div className="mt-auto pt-3 border-t border-slate-700/50 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-white">${part.price.toFixed(2)}</span>
                {part.inStock ? (
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> In Stock
                    </span>
                ) : (
                    <span className="text-[10px] text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Unavailable
                    </span>
                )}
            </div>
            <button
                onClick={() => onAddToCart(part)}
                disabled={!part.inStock}
                className={`p-2 rounded-md transition-colors ${
                    part.inStock 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
                title="Add to Cart"
            >
                <ShoppingCart className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};