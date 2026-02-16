import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Truck, Search } from 'lucide-react';

interface HomeProps {
  onShopNow: () => void;
}

export const Home: React.FC<HomeProps> = ({ onShopNow }) => {
  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] bg-slate-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop" 
            alt="Car Mechanic Workshop" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now stocking 2024 performance parts
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Keep It <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Running Smooth.
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
              The professional's choice for auto parts. Use our AI-powered finder to locate the exact fit for any make, model, or year instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onShopNow}
                className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all shadow-lg shadow-blue-900/20"
              >
                Find Parts Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={onShopNow} // Redirects to shop effectively acts as browsing
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-lg text-lg font-medium transition-all"
              >
                <Search className="w-5 h-5 text-slate-400" />
                Browse Catalog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats/Trust Section */}
      <div className="border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Parts in Stock', value: '1M+' },
                { label: 'Brands Covered', value: '50+' },
                { label: 'Mechanic Verified', value: '100%' },
                { label: 'Fast Shipping', value: '24h' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start">
                   <span className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</span>
                   <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Mechanics</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We know you don't have time to waste on wrong parts. Our platform is designed for speed, accuracy, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Search</h3>
              <p className="text-slate-400 leading-relaxed">
                Describe the problem like "squeaky brakes on a 2018 Camry" and let our AI find the exact replacement parts you need.
              </p>
            </div>

            <div className="group bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-green-500/30 hover:bg-slate-800 transition-all duration-300">
              <div className="w-14 h-14 bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">OEM Quality</h3>
              <p className="text-slate-400 leading-relaxed">
                We only stock parts that meet or exceed Original Equipment Manufacturer specifications. Guaranteed fitment every time.
              </p>
            </div>

            <div className="group bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-800 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Priority Logistics</h3>
              <p className="text-slate-400 leading-relaxed">
                Order before 2 PM and get same-day dispatch. Our smart logistics network ensures your garage never stops working.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};