import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PropertyListings } from './components/PropertyListings';
import { AdminDashboard } from './components/AdminDashboard';
import { LeadManagement } from './components/LeadManagement';
import { PlotModal } from './components/PlotModal';
import { InquiryModal } from './components/InquiryModal';
import { INITIAL_PLOTS, INITIAL_LEADS } from './data/mockData';

export function App() {
  // Navigation State: 'landing' | 'listings' | 'admin' | 'leads'
  const [activeView, setActiveView] = useState('landing');
  
  // Data State
  const [plots, setPlots] = useState(INITIAL_PLOTS);
  const [leads, setLeads] = useState(INITIAL_LEADS);

  // Active Modals State
  const [selectedPlotForDetails, setSelectedPlotForDetails] = useState(null);
  const [selectedPlotForInquiry, setSelectedPlotForInquiry] = useState(null);

  // Filter state passed from Landing Hero Search to Listings
  const [listingsSearchFilter, setListingsSearchFilter] = useState(null);

  // ================= ACTION HANDLERS =================

  // View Plot Details Modal
  const handleViewPlotDetails = (plot) => {
    setSelectedPlotForDetails(plot);
  };

  // Open Book/Inquiry Modal
  const handleOpenBookModal = (plot) => {
    setSelectedPlotForInquiry(plot);
  };

  // Create new lead from inquiry / booking
  const handleLeadCreated = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  // Handle Hero Search submission from Landing Page
  const handleHeroSearchSubmit = (filter) => {
    setListingsSearchFilter(filter);
    setActiveView('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add plot in Admin
  const handleAddPlot = (newPlot) => {
    setPlots(prev => [newPlot, ...prev]);
  };

  // Edit plot in Admin
  const handleEditPlot = (updatedPlot) => {
    setPlots(prev => prev.map(p => p.id === updatedPlot.id ? updatedPlot : p));
  };

  // Delete plot in Admin
  const handleDeletePlot = (plotId) => {
    setPlots(prev => prev.filter(p => p.id !== plotId));
  };

  // Update lead pipeline status (New, Contacted, Pending, Closed)
  const handleUpdateLeadStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: newStatus,
          history: [
            ...(lead.history || []),
            { timestamp: 'Just now', text: `Status updated to ${newStatus}` }
          ]
        };
      }
      return lead;
    }));
  };

  // Add note to lead
  const handleAddLeadNote = (leadId, noteText) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          notes: `${lead.notes ? lead.notes + ' • ' : ''}${noteText}`
        };
      }
      return lead;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-700 selection:text-white">
      
      {/* Public Navbar shown on Landing & Listings views */}
      {(activeView === 'landing' || activeView === 'listings') && (
        <Navbar 
          activeView={activeView} 
          setActiveView={setActiveView}
          onCategorySelect={(category) => {
            setListingsSearchFilter({ category });
            setActiveView('listings');
          }}
        />
      )}

      {/* Public View 1: Landing Page */}
      {activeView === 'landing' && (
        <LandingPage 
          plots={plots}
          onViewPlotDetails={handleViewPlotDetails}
          onBookPlot={handleOpenBookModal}
          onSearchSubmit={handleHeroSearchSubmit}
          onNavigateToListings={() => {
            setListingsSearchFilter(null);
            setActiveView('listings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Public View 2: Property Listings & Search Results */}
      {activeView === 'listings' && (
        <PropertyListings 
          plots={plots}
          initialFilter={listingsSearchFilter}
          onViewPlotDetails={handleViewPlotDetails}
          onBookPlot={handleOpenBookModal}
        />
      )}

      {/* Admin View 1: Admin Dashboard */}
      {activeView === 'admin' && (
        <AdminDashboard 
          plots={plots}
          leads={leads}
          onAddPlot={handleAddPlot}
          onEditPlot={handleEditPlot}
          onDeletePlot={handleDeletePlot}
          onViewPlotDetails={handleViewPlotDetails}
          onNavigateToLeads={() => setActiveView('leads')}
          onSwitchToPublic={() => setActiveView('landing')}
        />
      )}

      {/* Admin View 2: Customer Leads & Pipeline Management */}
      {activeView === 'leads' && (
        <LeadManagement 
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onAddLeadNote={handleAddLeadNote}
          onNavigateToDashboard={() => setActiveView('admin')}
          onSwitchToPublic={() => setActiveView('landing')}
        />
      )}

      {/* Shared Modals */}
      <PlotModal 
        plot={selectedPlotForDetails}
        isOpen={Boolean(selectedPlotForDetails)}
        onClose={() => setSelectedPlotForDetails(null)}
        onBookNow={(plot) => {
          setSelectedPlotForDetails(null);
          setSelectedPlotForInquiry(plot);
        }}
      />

      <InquiryModal 
        plot={selectedPlotForInquiry}
        isOpen={Boolean(selectedPlotForInquiry)}
        onClose={() => setSelectedPlotForInquiry(null)}
        onLeadCreated={handleLeadCreated}
      />

    </div>
  );
}

export default App;
