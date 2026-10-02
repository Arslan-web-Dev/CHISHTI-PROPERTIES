import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  PlusCircle, 
  Users, 
  DollarSign, 
  CalendarClock, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Building2, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Plus
} from 'lucide-react';
import { ADMIN_STATS } from '../data/mockData';

export function AdminDashboard({ 
  plots, 
  leads, 
  onAddPlot, 
  onEditPlot, 
  onDeletePlot, 
  onViewPlotDetails, 
  onNavigateToLeads, 
  onSwitchToPublic 
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Add / Edit Plot Modal State
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState(null);
  const [plotFormData, setPlotFormData] = useState({
    plotNo: '',
    title: '',
    society: 'Gulberg Islamabad',
    block: 'Block B',
    category: 'Residential',
    size: '5 Marla',
    dimension: '25 x 45 ft',
    pricePKR: 6500000,
    status: 'Available',
    tag: 'Hot Deal'
  });

  // Filtered plots in admin table
  const filteredPlots = useMemo(() => {
    return plots.filter(plot => {
      const matchesSearch = 
        plot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.plotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.society.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plot.block.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || plot.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [plots, searchQuery, statusFilter]);

  // Paginated plots
  const totalPages = Math.ceil(filteredPlots.length / rowsPerPage) || 1;
  const paginatedPlots = filteredPlots.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleOpenAddPlot = () => {
    setEditingPlot(null);
    setPlotFormData({
      plotNo: `Plot # ${Math.floor(100 + Math.random() * 400)}`,
      title: '10 Marla Luxury Executive Plot',
      society: 'DHA Phase 2 Islamabad',
      block: 'Sector J',
      category: 'Residential',
      size: '10 Marla',
      dimension: '35 x 65 ft',
      pricePKR: 19500000,
      status: 'Available',
      tag: 'Prime Location'
    });
    setIsAddPlotModalOpen(true);
  };

  const handleOpenEditPlot = (plot) => {
    setEditingPlot(plot);
    setPlotFormData({
      plotNo: plot.plotNo,
      title: plot.title,
      society: plot.society,
      block: plot.block,
      category: plot.category,
      size: plot.size,
      dimension: plot.dimension,
      pricePKR: plot.pricePKR,
      status: plot.status,
      tag: plot.tag || 'Available'
    });
    setIsAddPlotModalOpen(true);
  };

  const handleSavePlotForm = (e) => {
    e.preventDefault();
    if (editingPlot) {
      onEditPlot({
        ...editingPlot,
        ...plotFormData,
        priceFormatted: `PKR ${(plotFormData.pricePKR / (plotFormData.pricePKR >= 10000000 ? 10000000 : 100000)).toFixed(plotFormData.pricePKR >= 10000000 ? 2 : 0)} ${plotFormData.pricePKR >= 10000000 ? 'Crore' : 'Lacs'}`
      });
    } else {
      const newPlot = {
        id: `PLT-${Math.floor(110 + Math.random() * 90)}`,
        ...plotFormData,
        sizeSqFt: `${plotFormData.size === '5 Marla' ? '1,125' : '2,250'} Sq Ft`,
        priceFormatted: `PKR ${(plotFormData.pricePKR / (plotFormData.pricePKR >= 10000000 ? 10000000 : 100000)).toFixed(plotFormData.pricePKR >= 10000000 ? 2 : 0)} ${plotFormData.pricePKR >= 10000000 ? 'Crore' : 'Lacs'}`,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        features: ['CDA/RDA Approved', 'Underground Utilities', 'Immediate Possession'],
        description: 'Prime plot in vetted masterplan with direct road access.',
        installmentAvailable: true,
        downPayment: '25% Advance',
        monthlyInstallment: 'Flexible quarterly',
        mapCoords: { x: 50, y: 50, label: plotFormData.plotNo }
      };
      onAddPlot(newPlot);
    }
    setIsAddPlotModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800">
      
      {/* ================= 1. SIDEBAR ================= */}
      <aside className={`
        bg-navy-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 z-30
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Brand header */}
        <div className="h-20 flex items-center px-5 border-b border-navy-950/80 justify-between">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-md">
                <Building2 className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <span className="text-white font-black tracking-wider text-base font-display">CHISHTI</span>
                <span className="text-gold-400 text-xs block font-semibold uppercase tracking-wider">Admin Portal</span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-xl bg-brand-700 flex items-center justify-center text-gold-400">
              <Building2 className="w-5 h-5" />
            </div>
          )}

          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1.5 flex-1">
          <button
            onClick={() => setActiveMenu('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMenu === 'dashboard'
                ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && <span>Dashboard Overview</span>}
          </button>

          <button
            onClick={() => setActiveMenu('plots')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMenu === 'plots'
                ? 'bg-brand-700 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>All Plots Inventory</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                  {plots.length}
                </span>
              </div>
            )}
          </button>

          <button
            onClick={handleOpenAddPlot}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && <span>+ Add New Plot</span>}
          </button>

          <button
            onClick={onNavigateToLeads}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all group"
          >
            <Users className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>Customer Leads</span>
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                  {leads.length}
                </span>
              </div>
            )}
          </button>

          <button
            onClick={() => setActiveMenu('prices')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMenu === 'prices'
                ? 'bg-brand-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && <span>Price Management</span>}
          </button>

          <button
            onClick={() => setActiveMenu('installments')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMenu === 'installments'
                ? 'bg-brand-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CalendarClock className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && <span>Installment Plans</span>}
          </button>

          <button
            onClick={() => setActiveMenu('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeMenu === 'settings'
                ? 'bg-brand-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4 text-gold-400 shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>
        </nav>

        {/* Bottom User / Portal Switch */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onSwitchToPublic}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
            {!sidebarCollapsed && <span>Switch to Public Web</span>}
          </button>
        </div>
      </aside>

      {/* ================= 2. MAIN ADMIN WORKSPACE ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between shadow-sm z-20">
          
          {/* Global Search Bar */}
          <div className="relative w-72 sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plot ID, block, society, category..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:bg-white transition-all"
            />
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            
            {/* Quick Add Plot Button */}
            <button
              onClick={handleOpenAddPlot}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-sm shadow-brand-700/20 transition-all"
            >
              <Plus className="w-4 h-4 text-gold-300" />
              <span>+ Add Plot</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-xs text-slate-800">Recent Inquiries Alert</span>
                    <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs py-2">
                    {leads.slice(0, 3).map((ld) => (
                      <div key={ld.id} className="py-2 hover:bg-slate-50 rounded p-1 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800">{ld.customerName}</span>
                          <span className="text-[10px] text-slate-400">{ld.dateTime}</span>
                        </div>
                        <p className="text-[11px] text-brand-700 truncate">{ld.propertyTitle}</p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={onNavigateToLeads}
                    className="w-full mt-2 py-1.5 bg-brand-700 text-white text-[11px] font-bold rounded-lg text-center"
                  >
                    View All Leads Pipeline
                  </button>
                </div>
              )}
            </div>

            {/* Admin Profile Avatar & Menu */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-700 to-brand-900 text-gold-300 font-bold flex items-center justify-center text-xs shadow">
                MC
              </div>
              <div className="hidden md:block">
                <span className="text-xs font-bold text-slate-800 block leading-tight">Muhammad Chishti</span>
                <span className="text-[10px] text-slate-500 block">Principal Real Estate Broker</span>
              </div>
            </div>

          </div>

        </header>

        {/* Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                Executive Real Estate Dashboard
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of society plots, incoming investor leads, revenue milestones, and active payment schedules.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                Society Authority: CDA • RDA • TMA Active
              </span>
            </div>
          </div>

          {/* ================= 3. DASHBOARD WIDGETS GRID (4 STAT CARDS) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 1. Total Plots Listed */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Plots Listed</span>
                <span className="p-2 rounded-xl bg-brand-50 text-brand-700">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {ADMIN_STATS.totalPlots.value}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {ADMIN_STATS.totalPlots.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{ADMIN_STATS.totalPlots.period}</p>
            </div>

            {/* 2. Active Inquiries / Leads */}
            <div 
              onClick={onNavigateToLeads}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-brand-700 transition-colors">
                  Active Inquiries / Leads
                </span>
                <span className="p-2 rounded-xl bg-gold-50 text-gold-600">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {leads.length}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +28%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">12 Hot Leads awaiting callback</p>
            </div>

            {/* 3. Total Sales Value */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales Value</span>
                <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {ADMIN_STATS.totalSalesValue.value}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {ADMIN_STATS.totalSalesValue.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{ADMIN_STATS.totalSalesValue.period}</p>
            </div>

            {/* 4. Pending Installments */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Installments</span>
                <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
                  <CalendarClock className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {ADMIN_STATS.pendingInstallments.value}
                </span>
                <span className="text-xs font-bold text-amber-600 flex items-center">
                  {ADMIN_STATS.pendingInstallments.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{ADMIN_STATS.pendingInstallments.period}</p>
            </div>

          </div>

          {/* ================= 4. MAIN CONTENT AREA: RECENT PLOTS OVERVIEW TABLE ================= */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Table Control Header */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Recent Plots Overview</h3>
                <p className="text-xs text-slate-500">Live inventory status across registered housing societies</p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">Status:</span>
                {['All', 'Available', 'Sold', 'Reserved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      statusFilter === st
                        ? 'bg-brand-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-4">Plot ID</th>
                    <th className="py-3.5 px-4">Plot No</th>
                    <th className="py-3.5 px-4">Block & Society</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Size</th>
                    <th className="py-3.5 px-4">Price (PKR)</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedPlots.map((plot) => (
                    <tr key={plot.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* Plot ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-900">
                        {plot.id}
                      </td>

                      {/* Plot No */}
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {plot.plotNo}
                      </td>

                      {/* Block & Society */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{plot.block}</span>
                        <span className="text-[11px] text-slate-500">{plot.society}</span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {plot.category}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {plot.size}
                      </td>

                      {/* Price PKR */}
                      <td className="py-3.5 px-4 font-bold text-brand-900 font-display">
                        {plot.priceFormatted}
                      </td>

                      {/* Status Pill Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          plot.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          plot.status === 'Reserved' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            plot.status === 'Available' ? 'bg-emerald-500' :
                            plot.status === 'Reserved' ? 'bg-amber-500' :
                            'bg-rose-500'
                          }`}></span>
                          {plot.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Icon */}
                          <button
                            title="View Full Details"
                            onClick={() => onViewPlotDetails(plot)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Icon */}
                          <button
                            title="Edit Plot"
                            onClick={() => handleOpenEditPlot(plot)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete Icon */}
                          <button
                            title="Delete Plot"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove ${plot.id} (${plot.plotNo}) from inventory?`)) {
                                onDeletePlot(plot.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Controls */}
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                Showing <span className="font-bold text-slate-800">
                  {Math.min(filteredPlots.length, (currentPage - 1) * rowsPerPage + 1)}
                </span> to <span className="font-bold text-slate-800">
                  {Math.min(filteredPlots.length, currentPage * rowsPerPage)}
                </span> of <span className="font-bold text-slate-800">{filteredPlots.length}</span> plots
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="font-bold text-slate-800 px-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* ================= 5. ADD / EDIT PLOT MODAL ================= */}
      {isAddPlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100">
            <div className="bg-brand-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display">
                  {editingPlot ? `Edit Plot: ${editingPlot.id}` : '+ Add New Society Plot'}
                </h3>
                <p className="text-xs text-brand-200">
                  Chishti Properties Verified Inventory Management
                </p>
              </div>
              <button 
                onClick={() => setIsAddPlotModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlotForm} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Plot Number *</label>
                  <input
                    type="text"
                    required
                    value={plotFormData.plotNo}
                    onChange={(e) => setPlotFormData({...plotFormData, plotNo: e.target.value})}
                    placeholder="e.g. Plot # 48-A"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Plot Title</label>
                  <input
                    type="text"
                    required
                    value={plotFormData.title}
                    onChange={(e) => setPlotFormData({...plotFormData, title: e.target.value})}
                    placeholder="e.g. 5 Marla Prime Residential Plot"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Society</label>
                  <select
                    value={plotFormData.society}
                    onChange={(e) => setPlotFormData({...plotFormData, society: e.target.value})}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none bg-white"
                  >
                    <option value="Gulberg Islamabad">Gulberg Islamabad</option>
                    <option value="DHA Phase 2 Islamabad">DHA Phase 2 Islamabad</option>
                    <option value="Bahria Town Phase 8">Bahria Town Phase 8</option>
                    <option value="Park View City">Park View City</option>
                    <option value="Faisal Hills Taxila">Faisal Hills Taxila</option>
                    <option value="New Metro City">New Metro City</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Block / Sector</label>
                  <input
                    type="text"
                    value={plotFormData.block}
                    onChange={(e) => setPlotFormData({...plotFormData, block: e.target.value})}
                    placeholder="e.g. Sector C / Executive Block"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={plotFormData.category}
                    onChange={(e) => setPlotFormData({...plotFormData, category: e.target.value})}
                    className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Farmhouses">Farmhouses</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Plot Size</label>
                  <select
                    value={plotFormData.size}
                    onChange={(e) => setPlotFormData({...plotFormData, size: e.target.value})}
                    className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 bg-white"
                  >
                    <option value="3.5 Marla">3.5 Marla</option>
                    <option value="5 Marla">5 Marla</option>
                    <option value="7 Marla">7 Marla</option>
                    <option value="10 Marla">10 Marla</option>
                    <option value="1 Kanal">1 Kanal</option>
                    <option value="2 Kanal">2 Kanal</option>
                    <option value="4 Marla">4 Marla Comm</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={plotFormData.status}
                    onChange={(e) => setPlotFormData({...plotFormData, status: e.target.value})}
                    className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 bg-white font-bold"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    value={plotFormData.pricePKR}
                    onChange={(e) => setPlotFormData({...plotFormData, pricePKR: Number(e.target.value)})}
                    placeholder="e.g. 7500000"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tag / Highlight</label>
                  <select
                    value={plotFormData.tag}
                    onChange={(e) => setPlotFormData({...plotFormData, tag: e.target.value})}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-700 bg-white"
                  >
                    <option value="Hot Deal">Hot Deal</option>
                    <option value="Prime Location">Prime Location</option>
                    <option value="Park Facing">Park Facing</option>
                    <option value="Balloted">Balloted</option>
                    <option value="Corner Plot">Corner Plot</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPlotModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-lg text-xs font-bold shadow-sm transition-colors"
                >
                  {editingPlot ? 'Save Changes' : 'Add Plot to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
