import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Grid, 
  List, 
  Map as MapIcon, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Phone, 
  MessageSquare, 
  ArrowUpDown, 
  ShieldCheck, 
  Tag, 
  Sparkles,
  ChevronRight,
  Eye,
  Sliders,
  X,
  ExternalLink
} from 'lucide-react';
import { SOCIETIES_LIST, CATEGORIES_LIST, PLOT_SIZES } from '../data/mockData';

export function PropertyListings({ 
  plots, 
  onViewPlotDetails, 
  onBookPlot, 
  initialFilter 
}) {
  // Filters State
  const [selectedLocation, setSelectedLocation] = useState(initialFilter?.location || 'All Locations');
  const [selectedCategory, setSelectedCategory] = useState(initialFilter?.category || 'All');
  const [selectedSizes, setSelectedSizes] = useState(initialFilter?.size ? [initialFilter.size] : []);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(initialFilter?.maxPrice || 60000000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'map'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeMapPin, setActiveMapPin] = useState(null);

  // Toggle size checkbox
  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedLocation('All Locations');
    setSelectedCategory('All');
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(60000000);
    setSortBy('featured');
  };

  // Filtered & Sorted Plots
  const filteredPlots = useMemo(() => {
    return plots.filter(plot => {
      // Location
      if (selectedLocation !== 'All Locations' && !plot.society.toLowerCase().includes(selectedLocation.toLowerCase().split(' ')[0])) {
        return false;
      }
      // Category
      if (selectedCategory !== 'All' && plot.category !== selectedCategory) {
        return false;
      }
      // Sizes
      if (selectedSizes.length > 0 && !selectedSizes.includes(plot.size)) {
        return false;
      }
      // Price range
      if (plot.pricePKR < minPrice || plot.pricePKR > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'size-desc') return b.sizeMarla - a.sizeMarla;
      return 0; // featured/default
    });
  }, [plots, selectedLocation, selectedCategory, selectedSizes, minPrice, maxPrice, sortBy]);

  const formatPKR = (amount) => {
    if (amount >= 10000000) {
      return `PKR ${(amount / 10000000).toFixed(2)} Crore`;
    }
    return `PKR ${(amount / 100000).toFixed(0)} Lacs`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb & Page Heading */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Home</span>
              <span>/</span>
              <span className="text-brand-700 font-semibold">Properties & Plot Search</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-display">
              Property Listings & Search Results
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Browse approved residential and commercial plots across Islamabad & Rawalpindi.
            </p>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-brand-700 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Search ({filteredPlots.length} Plots)</span>
          </button>
        </div>

        {/* 2-COLUMN RESPONSIVE SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT FILTER SIDEBAR ================= */}
          <aside className={`
            lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card sticky top-24 z-20 space-y-6
            ${mobileFilterOpen ? 'fixed inset-0 z-50 overflow-y-auto m-0 rounded-none' : 'hidden lg:block'}
          `}>
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-700" />
                <h3 className="font-bold text-slate-800 text-sm">Advanced Plot Filters</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-brand-700 hover:text-brand-900 font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                {mobileFilterOpen && (
                  <button 
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* 1. Location / Society Dropdown */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Location / Society
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-700 bg-slate-50"
              >
                {SOCIETIES_LIST.map((soc, idx) => (
                  <option key={idx} value={soc}>{soc}</option>
                ))}
              </select>
            </div>

            {/* 2. Category Toggle */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Property Category
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                      selectedCategory === cat
                        ? 'bg-brand-700 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Plot Size Checkboxes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Plot Size
                </label>
                {selectedSizes.length > 0 && (
                  <span className="text-[10px] text-brand-700 font-bold">
                    {selectedSizes.length} selected
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {PLOT_SIZES.map((size) => {
                  const isChecked = selectedSizes.includes(size);
                  return (
                    <label 
                      key={size}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors text-xs text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSizeToggle(size)}
                        className="w-4 h-4 rounded text-brand-700 accent-brand-700 focus:ring-brand-700"
                      />
                      <span className={`font-medium ${isChecked ? 'text-brand-900 font-bold' : ''}`}>
                        {size}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 4. Price Range Inputs (Min - Max PKR) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Price Range (PKR)
                </label>
                <span className="text-[11px] font-bold text-brand-700">
                  {formatPKR(maxPrice)}
                </span>
              </div>

              <input
                type="range"
                min={2000000}
                max={60000000}
                step={1000000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Min (Lacs)</span>
                  <input
                    type="number"
                    value={minPrice / 100000}
                    onChange={(e) => setMinPrice(Number(e.target.value) * 100000)}
                    placeholder="Min"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Max (Lacs)</span>
                  <input
                    type="number"
                    value={maxPrice / 100000}
                    onChange={(e) => setMaxPrice(Number(e.target.value) * 100000)}
                    placeholder="Max"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors text-center"
              >
                Apply Filters ({filteredPlots.length} Plots)
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
              >
                Clear All Filters
              </button>
            </div>

            {/* Trust box in sidebar */}
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-100 text-xs text-brand-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
              <p className="leading-tight">
                All plots listed are physically verified with verified NOCs from official authorities.
              </p>
            </div>

          </aside>

          {/* ================= RIGHT MAIN RESULTS AREA ================= */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Top Results Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Results count & active query summary */}
              <div>
                <span className="text-sm font-bold text-slate-800">
                  Showing <span className="text-brand-700">{filteredPlots.length}</span> Verified Plots
                </span>
                <span className="text-xs text-slate-500 block">
                  {selectedLocation !== 'All Locations' ? selectedLocation : 'All Societies'} • {selectedCategory}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 hidden md:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-700 cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="size-desc">Plot Size: Largest First</option>
                  </select>
                </div>

                {/* View Switcher (Grid, List, Map) */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="List View"
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    title="Interactive Society Map View"
                    className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold ${
                      viewMode === 'map' ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Map View</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ================= VIEW MODE 1: INTERACTIVE MAP VIEW ================= */}
            {viewMode === 'map' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
                <div className="p-4 bg-brand-900 text-white flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <MapIcon className="w-4 h-4 text-gold-400" />
                      Islamabad & Rawalpindi Master-Plan Plot Pins
                    </h3>
                    <p className="text-[11px] text-brand-200">Click on any plot marker pin to view live price, dimensions, and reserve</p>
                  </div>
                  <span className="text-xs bg-brand-800 text-gold-300 px-2.5 py-1 rounded-lg border border-white/10">
                    {filteredPlots.length} Pins Loaded
                  </span>
                </div>

                {/* Interactive Map Layout Canvas Simulation */}
                <div className="relative w-full h-[520px] bg-[#E9EFEF] overflow-hidden select-none">
                  {/* Subtle Grid / Roads Background */}
                  <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="none" stroke="#0F5257" strokeWidth="0.5" strokeOpacity="0.2" />
                      <circle cx="20" cy="20" r="1.5" fill="#0F5257" fillOpacity="0.3" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#mapgrid)" />
                    {/* Simulated Major Arteries / Expressways */}
                    <path d="M 0,260 Q 300,200 600,280 T 1200,240" fill="none" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                    <path d="M 200,0 Q 250,300 350,600" fill="none" stroke="#0F5257" strokeWidth="5" strokeLinecap="round" opacity="0.4" />
                    <path d="M 700,0 Q 750,250 850,600" fill="none" stroke="#0F5257" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                  </svg>

                  {/* Society Zone Labels */}
                  <div className="absolute top-12 left-10 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-300 text-[11px] font-bold text-brand-900 pointer-events-none shadow-sm">
                    🏛 Faisal Hills Zone (GT Road)
                  </div>
                  <div className="absolute top-14 right-16 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-300 text-[11px] font-bold text-brand-900 pointer-events-none shadow-sm">
                    🌲 Park View City (Zone IV)
                  </div>
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-300 text-[11px] font-bold text-brand-900 pointer-events-none shadow-sm">
                    🌿 Gulberg Greens & Residencia
                  </div>
                  <div className="absolute bottom-16 right-1/4 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-300 text-[11px] font-bold text-brand-900 pointer-events-none shadow-sm">
                    🏙 DHA Phase 2 & Bahria Phase 8
                  </div>

                  {/* Plot Markers Pins */}
                  {filteredPlots.map((plot) => {
                    const isActive = activeMapPin?.id === plot.id;
                    return (
                      <button
                        key={plot.id}
                        type="button"
                        onClick={() => setActiveMapPin(plot)}
                        style={{ left: `${plot.mapCoords.x}%`, top: `${plot.mapCoords.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                          isActive ? 'z-30 scale-125' : 'z-20 hover:scale-110'
                        }`}
                      >
                        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg font-bold text-xs transition-all ${
                          isActive 
                            ? 'bg-gold-500 text-slate-900 ring-4 ring-gold-400/40' 
                            : 'bg-brand-900 text-white hover:bg-brand-700'
                        }`}>
                          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span>{plot.priceFormatted}</span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Selected Plot Popup on Map */}
                  {activeMapPin && (
                    <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-40 animate-fadeIn">
                      <button
                        onClick={() => setActiveMapPin(null)}
                        className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:bg-slate-100"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex gap-3">
                        <img 
                          src={activeMapPin.image} 
                          alt={activeMapPin.title} 
                          className="w-24 h-24 object-cover rounded-xl shrink-0" 
                        />
                        <div className="flex-1">
                          <span className="text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                            {activeMapPin.size} • {activeMapPin.category}
                          </span>
                          <h4 className="font-bold text-sm text-slate-800 line-clamp-1 mt-1">
                            {activeMapPin.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {activeMapPin.block}, {activeMapPin.society}
                          </p>
                          <span className="text-base font-extrabold text-brand-700 font-display block mt-1">
                            {activeMapPin.priceFormatted}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onViewPlotDetails(activeMapPin)}
                          className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onBookPlot(activeMapPin)}
                          className="py-1.5 bg-brand-700 hover:bg-brand-800 text-white rounded-lg text-xs font-bold text-center"
                        >
                          Inquire Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= VIEW MODE 2: GRID VIEW ================= */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlots.map((plot) => (
                  <div
                    key={plot.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={plot.image}
                        alt={plot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-brand-900/90 text-white backdrop-blur-md">
                          {plot.size}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                          plot.status === 'Available' ? 'bg-emerald-500 text-white' :
                          plot.status === 'Reserved' ? 'bg-amber-500 text-white' :
                          'bg-rose-500 text-white'
                        }`}>
                          {plot.status === 'Available' ? (plot.tag || 'Available') : plot.status}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gold-300 block">Price</span>
                          <span className="text-xl font-extrabold text-white font-display">
                            {plot.priceFormatted}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          {plot.dimension}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-brand-700 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                          <span className="truncate">{plot.block}, {plot.society}</span>
                        </div>

                        <h3 className="font-bold text-slate-800 text-sm group-hover:text-brand-700 transition-colors line-clamp-1">
                          {plot.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {plot.features.slice(0, 2).map((feat, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onViewPlotDetails(plot)}
                          className="py-2 px-2 rounded-lg text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onBookPlot(plot)}
                          className="py-2 px-2 rounded-lg text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 transition-colors text-center"
                        >
                          Book / Inquire
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* ================= VIEW MODE 3: LIST VIEW ================= */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredPlots.map((plot) => (
                  <div
                    key={plot.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-luxury transition-all p-4 flex flex-col sm:flex-row gap-5 items-center group"
                  >
                    {/* Thumbnail */}
                    <div className="w-full sm:w-56 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden relative shrink-0">
                      <img
                        src={plot.image}
                        alt={plot.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand-900/90 text-white text-[10px] font-bold">
                        {plot.size}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-brand-700 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-gold-500" />
                          <span>{plot.block}, {plot.society}</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          plot.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          plot.status === 'Reserved' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {plot.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-800 text-base group-hover:text-brand-700 transition-colors">
                        {plot.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {plot.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Size: {plot.size} ({plot.sizeSqFt})
                        </span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Dimensions: {plot.dimension}
                        </span>
                        {plot.features.slice(0, 2).map((feat, idx) => (
                          <span key={idx} className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="w-full sm:w-48 sm:border-l sm:border-slate-100 sm:pl-5 flex flex-col justify-between shrink-0 space-y-3">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Demand</span>
                        <span className="text-xl font-black text-brand-900 font-display block">
                          {plot.priceFormatted}
                        </span>
                        {plot.installmentAvailable && (
                          <span className="text-[10px] text-gold-600 font-bold block mt-0.5">
                            Installments Available
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <button
                          onClick={() => onViewPlotDetails(plot)}
                          className="w-full py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onBookPlot(plot)}
                          className="w-full py-2 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                        >
                          Inquire / Book
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredPlots.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-800">No matching plots found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range, clearing some size checkboxes, or selecting "All Locations" to see more properties.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-brand-700 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}
