import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Ruler, 
  ShieldCheck, 
  Award, 
  BadgePercent, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Phone, 
  Mail, 
  Clock, 
  Building, 
  Layers, 
  Calculator, 
  Star, 
  ChevronRight,
  ExternalLink,
  Sliders,
  DollarSign
} from 'lucide-react';
import { WHY_CHOOSE_US, SOCIETIES_LIST } from '../data/mockData';

export function LandingPage({ 
  plots, 
  onViewPlotDetails, 
  onBookPlot, 
  onSearchSubmit, 
  onNavigateToListings 
}) {
  // Hero Filter State
  const [purpose, setPurpose] = useState('Buy');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [propertyType, setPropertyType] = useState('Residential');
  const [maxBudget, setMaxBudget] = useState(40000000); // 4 Crore default

  // Featured Section Tab Filter
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Installment Calculator State
  const [calcPlotPrice, setCalcPlotPrice] = useState(15000000); // 1.5 Crore
  const [calcDownPercent, setCalcDownPercent] = useState(25);
  const [calcTenureMonths, setCalcTenureMonths] = useState(24);

  const calcDownPayment = (calcPlotPrice * calcDownPercent) / 100;
  const calcRemaining = calcPlotPrice - calcDownPayment;
  const calcQuarterlyInstallment = Math.round(calcRemaining / (calcTenureMonths / 3));
  const calcMonthlyEquivalent = Math.round(calcRemaining / calcTenureMonths);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      location: selectedLocation,
      category: propertyType,
      maxPrice: maxBudget
    });
  };

  // Filter plots for featured section
  const filteredFeaturedPlots = plots.filter(plot => {
    if (featuredFilter === 'All') return true;
    if (featuredFilter === '5 Marla') return plot.size === '5 Marla';
    if (featuredFilter === '10 Marla') return plot.size === '10 Marla';
    if (featuredFilter === '1 Kanal') return plot.size === '1 Kanal';
    if (featuredFilter === 'Commercial') return plot.category === 'Commercial';
    return true;
  });

  const formatPKR = (amount) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Crore`;
    }
    return `${(amount / 100000).toFixed(0)} Lacs`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 1. HERO SECTION WITH IMAGE & SEARCH OVERLAY */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-brand-950">
        {/* Background Image with High Quality Architecture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_society.jpg" 
            alt="Chishti Properties Luxury Housing Society" 
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 animate-pulse-subtle"
            onError={(e) => {
              // Fallback to high-res architectural Unsplash if local fails
              e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";
            }}
          />
          {/* Deep green gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/80 to-brand-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center lg:text-left flex flex-col items-center">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-800/80 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Pakistan's Most Trusted Plots & Real Estate Advisory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping"></span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display max-w-4xl text-center leading-tight">
            Invest in Verified Prime Plots with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">High ROI</span> & Legal Peace
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl text-center font-normal leading-relaxed">
            Exclusive inventory across <span className="text-white font-semibold">Gulberg Islamabad, DHA Phase 2, Bahria Town Phase 8,</span> and <span className="text-white font-semibold">Park View City</span> with direct balloting, clear NOCs, and flexible installment plans.
          </p>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-brand-900/60 px-3 py-1.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% CDA/RDA NOC Verified
            </span>
            <span className="flex items-center gap-1.5 bg-brand-900/60 px-3 py-1.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> Direct Plot Registry Transfer
            </span>
            <span className="flex items-center gap-1.5 bg-brand-900/60 px-3 py-1.5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0% Hidden Brokerage
            </span>
          </div>

          {/* 2. SEARCH OVERLAY BAR */}
          <div className="w-full max-w-5xl mt-10">
            <div className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/30 text-slate-800">
              
              {/* Purpose Tabs (Buy / Rent) */}
              <div className="flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => setPurpose('Buy')}
                  className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    purpose === 'Buy'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Buy Plot
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose('Rent')}
                  className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    purpose === 'Rent'
                      ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Commercial Rent
                </button>
                <span className="ml-auto text-xs text-slate-500 hidden sm:inline-block">
                  Verified Plot Directory • {plots.length} Active Listings
                </span>
              </div>

              {/* Filter Controls Grid */}
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                
                {/* 1. Location / Society dropdown */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-700" />
                    City / Society
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:bg-white transition-all cursor-pointer"
                  >
                    {SOCIETIES_LIST.map((soc, idx) => (
                      <option key={idx} value={soc}>{soc}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Property Type */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-brand-700" />
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Residential">Residential Plot</option>
                    <option value="Commercial">Commercial Plaza Plot</option>
                    <option value="Farmhouses">Luxury Agro Farmhouse</option>
                  </select>
                </div>

                {/* 3. Budget Range Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-brand-700" />
                      Max Budget
                    </label>
                    <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      {formatPKR(maxBudget)}
                    </span>
                  </div>
                  <div className="pt-2">
                    <input
                      type="range"
                      min={2000000}
                      max={60000000}
                      step={1000000}
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(Number(e.target.value))}
                      className="w-full accent-brand-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>20 Lacs</span>
                      <span>3 Crore</span>
                      <span>6 Crore+</span>
                    </div>
                  </div>
                </div>

                {/* 4. Search CTA */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-brand-700 to-brand-800 hover:from-brand-800 hover:to-brand-900 text-white font-bold text-sm shadow-lg shadow-brand-700/25 hover:shadow-brand-700/40 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Search className="w-4 h-4 text-gold-300 group-hover:scale-110 transition-transform" />
                    <span>Search Plots</span>
                    <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </form>

              {/* Quick Filters */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Trending Searches:</span>
                {['5 Marla Gulberg', '10 Marla DHA-2', 'Commercial Broadway', 'Park View Overseas'].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (item.includes('Gulberg')) setSelectedLocation('Gulberg Islamabad');
                      if (item.includes('DHA')) setSelectedLocation('DHA Phase 2 Islamabad');
                      if (item.includes('Park View')) setSelectedLocation('Park View City');
                      if (item.includes('Commercial')) setPropertyType('Commercial');
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS BAR / MARKET SUMMARY */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-display">250+</span>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Verified Plots Listed</p>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-display">100%</span>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Clear Legal Title Guaranteed</p>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-display">PKR 450M+</span>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Successful Property Transfers</p>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-900 font-display">15+ Years</span>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Islamabad Real Estate Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PLOTS SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 mb-2">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
              Handpicked Verified Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">
              Featured Prime Plots
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Carefully vetted residential and commercial plots in high-appreciation zones with complete documentation and instant possession.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', '5 Marla', '10 Marla', '1 Kanal', 'Commercial'].map((category) => (
              <button
                key={category}
                onClick={() => setFeaturedFilter(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  featuredFilter === category
                    ? 'bg-brand-700 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-700 hover:text-brand-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid of Plot Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFeaturedPlots.slice(0, 6).map((plot) => (
            <div 
              key={plot.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Plot Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img 
                  src={plot.image} 
                  alt={plot.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-900/90 text-white backdrop-blur-md border border-white/20">
                    {plot.size}
                  </span>
                  
                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${
                    plot.status === 'Available' ? 'bg-emerald-500 text-white' :
                    plot.status === 'Reserved' ? 'bg-amber-500 text-white' :
                    'bg-rose-500 text-white'
                  }`}>
                    {plot.status === 'Available' ? (plot.tag || 'Available') : plot.status}
                  </span>
                </div>

                {/* Bottom Overlay on Image: Price & Dimension */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-300 block tracking-wider">Demand Price</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-white font-display">
                      {plot.priceFormatted}
                    </span>
                  </div>
                  <span className="text-xs text-slate-200 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                    {plot.dimension}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Society & Block */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>{plot.block}, {plot.society}</span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-base group-hover:text-brand-700 transition-colors line-clamp-1">
                    {plot.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {plot.description}
                  </p>

                  {/* Amenities Quick Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {plot.features.slice(0, 2).map((feat, idx) => (
                      <span key={idx} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        ✓ {feat}
                      </span>
                    ))}
                    {plot.installmentAvailable && (
                      <span className="text-[11px] font-medium bg-gold-50 text-gold-800 px-2 py-0.5 rounded border border-gold-200">
                        Installments Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onViewPlotDetails(plot)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors text-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onBookPlot(plot)}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-brand-700 hover:bg-brand-800 transition-colors shadow-sm text-center flex items-center justify-center gap-1"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToListings}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-900 text-white hover:bg-brand-800 font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            <span>Explore All {plots.length} Verified Plots</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </button>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION (4 Feature Cards with Icons) */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-brand-50/50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              The Chishti Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display mt-2">
              Why Invest Through Chishti Properties?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              We eliminate real estate speculation and fraud by providing 100% physically surveyed, authority-verified files with legal guarantees.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-luxury hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 border border-brand-100">
                      {item.id === 'legal' && <ShieldCheck className="w-6 h-6 text-brand-700" />}
                      {item.id === 'prime' && <MapPin className="w-6 h-6 text-brand-700" />}
                      {item.id === 'flexible' && <BadgePercent className="w-6 h-6 text-brand-700" />}
                      {item.id === 'trusted' && <Award className="w-6 h-6 text-brand-700" />}
                    </div>
                    <span className="text-[10px] font-bold text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-950 mb-2 font-display">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                  <span>Guaranteed Verification</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE INSTALLMENT CALCULATOR */}
      <section className="py-16 bg-brand-900 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-700/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest bg-brand-800/80 px-3 py-1 rounded-full border border-gold-400/30">
                Financial Planning Tool
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Plot Installment & ROI Estimator
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Estimate your monthly and quarterly budget for residential or commercial plots. Our schemes offer 0% markup and direct registry transfer upon 60% clearance.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>No penalty for early balloon payments</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>Immediate computerized file issuance upon down payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>Islamic banking verified installment schedules</span>
                </div>
              </div>
            </div>

            {/* Interactive Calculator Box */}
            <div className="lg:col-span-7 bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100">
              <div className="space-y-6">
                
                {/* 1. Plot Value Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-600 uppercase">Estimated Plot Value</span>
                    <span className="text-lg font-extrabold text-brand-800">{formatPKR(calcPlotPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={3000000}
                    max={50000000}
                    step={1000000}
                    value={calcPlotPrice}
                    onChange={(e) => setCalcPlotPrice(Number(e.target.value))}
                    className="w-full accent-brand-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>30 Lacs</span>
                    <span>1.5 Crore</span>
                    <span>5 Crore</span>
                  </div>
                </div>

                {/* 2. Down Payment Percentage */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-600 uppercase">Down Payment Rate ({calcDownPercent}%)</span>
                    <span className="text-sm font-bold text-slate-800">{formatPKR(calcDownPayment)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 20, 25, 30].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setCalcDownPercent(pct)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          calcDownPercent === pct
                            ? 'bg-brand-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Tenure */}
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase block mb-2">Installment Duration</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[12, 24, 36].map((months) => (
                      <button
                        key={months}
                        type="button"
                        onClick={() => setCalcTenureMonths(months)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                          calcTenureMonths === months
                            ? 'bg-brand-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {months} Months ({months / 12} Years)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 bg-brand-50 rounded-2xl border border-brand-100">
                    <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block">Estimated Monthly</span>
                    <span className="text-2xl font-black text-brand-900 font-display">
                      PKR {calcMonthlyEquivalent.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Across {calcTenureMonths} equal months</span>
                  </div>

                  <div className="p-4 bg-gold-50 rounded-2xl border border-gold-200">
                    <span className="text-[11px] font-bold text-gold-800 uppercase tracking-wider block">Quarterly Installment</span>
                    <span className="text-2xl font-black text-gold-900 font-display">
                      PKR {calcQuarterlyInstallment.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gold-700 block mt-0.5">Due every 3 months</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookPlot({
                    id: 'CALC-INQUIRY',
                    title: `Calculated Plan: ${formatPKR(calcPlotPrice)} Plot`,
                    priceFormatted: formatPKR(calcPlotPrice),
                    size: 'Selected Size',
                    society: 'Islamabad Society'
                  })}
                  className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-gold-400" />
                  <span>Lock This Payment Plan with Senior Advisor</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PROJECTS SHOWCASE */}
      <section id="projects-section" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Exclusive Partnerships
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display mt-2">
            Top Master-Planned Societies
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Chishti Properties is the authorized sales partner for Pakistan's premier housing developments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'DHA Phase 2 Islamabad',
              location: 'Main GT Road & Islamabad Expressway',
              roi: '+28% Annual ROI',
              badge: 'Federal Capital Hub',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80',
              desc: 'High-end gated living with world-class golf course, international schools, and prime commercial sectors.'
            },
            {
              name: 'Gulberg Greens & Residencia',
              location: 'Direct Expressway Access',
              roi: '+35% Capital Gain',
              badge: 'Green Agro & Living',
              image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=80',
              desc: 'Serene farmhouse zones and urban commercial civic centers with RDA certified masterplan.'
            },
            {
              name: 'Bahria Town Phase 8',
              location: 'Rawalpindi Ring Road Junction',
              roi: '+22% Rapid Turnover',
              badge: 'Commercial Broadway',
              image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
              desc: 'Vibrant civic and corporate business district with continuous 24/7 uninterrupted power supply.'
            }
          ].map((proj, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-luxury transition-all group">
              <div className="relative aspect-video overflow-hidden">
                <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-brand-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {proj.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                  {proj.roi}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-brand-900 font-display">{proj.name}</h3>
                <p className="text-xs text-brand-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {proj.location}
                </p>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{proj.desc}</p>
                <button
                  onClick={() => onSearchSubmit({ location: proj.name.split(' ')[0] })}
                  className="mt-4 w-full py-2 bg-slate-50 hover:bg-brand-50 text-brand-700 text-xs font-bold rounded-lg border border-slate-200 hover:border-brand-200 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Explore Plots in {proj.name.split(' ')[0]}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. COMPREHENSIVE FOOTER */}
      <footer id="contact-footer" className="bg-brand-950 text-slate-300 pt-16 pb-12 border-t border-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-brand-900/80">
            
            {/* Col 1: About & Logo */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white">
                  <Building className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <span className="text-xl font-bold font-display text-white tracking-tight">CHISHTI</span>
                  <span className="text-xl font-light text-brand-400 ml-1">PROPERTIES</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Chishti Properties is Islamabad's foremost real estate advisory and land brokerage firm, offering 100% physically surveyed and NOC-cleared plots with seamless registry transfers.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
                <a href="mailto:info@chishtiproperties.com" className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-brand-700 text-white flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Top Locations */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
                Prime Societies
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {['Gulberg Islamabad', 'DHA Phase 2', 'Bahria Phase 8', 'Park View City', 'Faisal Hills Taxila', 'New Metro City'].map((soc, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => onSearchSubmit({ location: soc })}
                      className="hover:text-white transition-colors"
                    >
                      {soc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Plot Categories */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
                Plot Sizes & Types
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => onSearchSubmit({ size: '5 Marla' })} className="hover:text-white transition-colors">5 Marla Residential</button></li>
                <li><button onClick={() => onSearchSubmit({ size: '10 Marla' })} className="hover:text-white transition-colors">10 Marla Executive</button></li>
                <li><button onClick={() => onSearchSubmit({ size: '1 Kanal' })} className="hover:text-white transition-colors">1 Kanal Luxury Estate</button></li>
                <li><button onClick={() => onSearchSubmit({ category: 'Commercial' })} className="hover:text-white transition-colors">Commercial Broadway</button></li>
                <li><button onClick={() => onSearchSubmit({ category: 'Farmhouses' })} className="hover:text-white transition-colors">Agro Farmhouses</button></li>
                <li><button onClick={() => onSearchSubmit({ tag: 'Hot Deal' })} className="hover:text-white transition-colors">Hot Deal Inquiries</button></li>
              </ul>
            </div>

            {/* Col 4: Corporate Office */}
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-gold-500 pl-2">
                Office & Contact
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>Executive Heights, Main Boulevard, Gulberg Greens, Islamabad.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>+92 (51) 843-9000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>info@chishtiproperties.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Mon - Sat: 9:30 AM to 7:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Compliance */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2026 Chishti Properties. All rights reserved. Registered Real Estate Consultant.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">CDA • RDA • TMA Certified Brokerage</span>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terms of Registry</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
