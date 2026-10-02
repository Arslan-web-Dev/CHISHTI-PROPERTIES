import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Phone, 
  LayoutDashboard, 
  ShieldCheck, 
  MapPin, 
  Compass, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export function Navbar({ activeView, setActiveView, onCategorySelect }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, category = null) => {
    setActiveView(view);
    if (category && onCategorySelect) {
      onCategorySelect(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      {/* Top Bar with Trust Indicators & Direct Phone */}
      <div className="bg-brand-950 text-slate-200 py-1.5 px-4 sm:px-6 text-xs border-b border-brand-900/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% RDA, CDA & TMA Approved Real Estate Portfolios
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              Main Boulevard, Gulberg Greens, Islamabad
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href="tel:+92518439000" 
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-semibold text-white">+92 (51) 843-9000</span>
            </a>
            <span className="text-slate-500">|</span>
            <button 
              onClick={() => handleNavClick('admin')}
              className="text-gold-300 hover:text-gold-200 font-medium flex items-center gap-1 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center text-white shadow-md group-hover:shadow-brand-700/20 group-hover:scale-105 transition-all">
              <Building2 className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-brand-900">
                  CHISHTI
                </span>
                <span className="text-xl sm:text-2xl font-light tracking-wide text-brand-700">
                  PROPERTIES
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-gold-600 -mt-1">
                Premier Plots & Society Investments
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('landing')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'landing'
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('listings', 'Residential')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeView === 'listings'
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:text-brand-700 hover:bg-slate-50'
              }`}
            >
              Residential Plots
            </button>

            <button
              onClick={() => handleNavClick('listings', 'Commercial')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-700 hover:bg-slate-50 transition-all"
            >
              Commercial
            </button>

            <button
              onClick={() => {
                if (activeView !== 'landing') setActiveView('landing');
                setTimeout(() => {
                  const el = document.getElementById('projects-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-700 hover:bg-slate-50 transition-all"
            >
              Projects
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('contact-footer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-brand-700 hover:bg-slate-50 transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('listings')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-brand-700" />
              Explore Plots
            </button>

            {/* Portal / Admin Switch Button */}
            <button
              onClick={() => handleNavClick(activeView === 'admin' || activeView === 'leads' ? 'landing' : 'admin')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-700 hover:bg-brand-800 text-white shadow-md shadow-brand-700/20 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-gold-400" />
              <span>
                {activeView === 'admin' || activeView === 'leads' ? 'Public Portal' : 'Login / Portal'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick(activeView === 'admin' || activeView === 'leads' ? 'landing' : 'admin')}
              className="p-2 rounded-lg bg-brand-700 text-white text-xs font-semibold"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <button
            onClick={() => handleNavClick('landing')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-700"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('listings', 'Residential')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-700"
          >
            Residential Plots
          </button>
          <button
            onClick={() => handleNavClick('listings', 'Commercial')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-700"
          >
            Commercial Plots
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-brand-700 text-white flex items-center justify-between"
          >
            <span>Admin Portal Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavClick('leads')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-brand-900 text-gold-300 flex items-center justify-between"
          >
            <span>Leads & Inquiries Pipeline</span>
            <ChevronRight className="w-4 h-4 text-gold-400" />
          </button>
        </div>
      )}
    </header>
  );
}
