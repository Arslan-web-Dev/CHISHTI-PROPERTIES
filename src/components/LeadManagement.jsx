import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Kanban, 
  Table as TableIcon, 
  Phone, 
  MessageSquare, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Plus, 
  X, 
  ExternalLink,
  Flame,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Mail,
  MoreVertical,
  Edit2
} from 'lucide-react';

export function LeadManagement({ 
  leads, 
  onUpdateLeadStatus, 
  onAddLeadNote, 
  onNavigateToDashboard, 
  onSwitchToPublic 
}) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Note Modal State
  const [noteModalLead, setNoteModalLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Pipeline columns
  const PIPELINE_COLUMNS = [
    { id: 'New', title: 'New Inquiries', color: 'border-blue-500 text-blue-700 bg-blue-50' },
    { id: 'Contacted', title: 'Contacted / Pitch Sent', color: 'border-amber-500 text-amber-700 bg-amber-50' },
    { id: 'Pending', title: 'In Discussion / Site Visit', color: 'border-purple-500 text-purple-700 bg-purple-50' },
    { id: 'Closed', title: 'Closed / Deal Finalized', color: 'border-emerald-500 text-emerald-700 bg-emerald-50' }
  ];

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || lead.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, searchQuery, statusFilter, priorityFilter]);

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (noteModalLead && newNoteText.trim()) {
      onAddLeadNote(noteModalLead.id, newNoteText.trim());
      setNewNoteText('');
      setNoteModalLead(null);
    }
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'Hot') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
          <Flame className="w-3 h-3 text-rose-600 fill-rose-600" />
          Hot Lead
        </span>
      );
    }
    if (priority === 'Warm') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Warm
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
        Cold
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      
      {/* Top Header */}
      <header className="bg-navy-900 text-white border-b border-navy-950 px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow">
              <Users className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-display">Customer Leads & Inquiry Pipeline</h1>
                <span className="bg-brand-800 text-gold-300 border border-gold-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {leads.length} Active Leads
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time CRM for Pakistani real estate investors and plot booking inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToDashboard}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-gold-400" />
              <span>Admin Dashboard</span>
            </button>
            <button
              onClick={onSwitchToPublic}
              className="px-4 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-xs font-bold text-white shadow-sm transition-colors"
            >
              Public Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col space-y-6">
        
        {/* ================= SEARCH & FILTER CONTROLS BAR ================= */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, phone, plot ID..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:bg-white transition-all"
            />
          </div>

          {/* Filters & View Switcher */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            
            {/* Filter by Status */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-700 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Filter by Priority */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-700 cursor-pointer"
              >
                <option value="All">All Priorities</option>
                <option value="Hot">🔥 Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
              </select>
            </div>

            {/* Kanban vs Table View Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Kanban Board</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'table'
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table View</span>
              </button>
            </div>

          </div>

        </div>

        {/* ================= VIEW 1: KANBAN BOARD PIPELINE ================= */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {PIPELINE_COLUMNS.map((col) => {
              const columnLeads = filteredLeads.filter(l => l.status === col.id);

              return (
                <div 
                  key={col.id} 
                  className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 flex flex-col max-h-[820px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        col.id === 'New' ? 'bg-blue-500' :
                        col.id === 'Contacted' ? 'bg-amber-500' :
                        col.id === 'Pending' ? 'bg-purple-500' :
                        'bg-emerald-500'
                      }`}></span>
                      <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                        {col.title}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200">
                      {columnLeads.length}
                    </span>
                  </div>

                  {/* Cards List in Column */}
                  <div className="space-y-3.5 overflow-y-auto pr-1 flex-1">
                    {columnLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3 group"
                      >
                        {/* Top: Priority & Timestamp */}
                        <div className="flex items-center justify-between">
                          {getPriorityBadge(lead.priority)}
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lead.dateTime}
                          </span>
                        </div>

                        {/* Customer Name & Contacts */}
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-700 transition-colors">
                            {lead.customerName}
                          </h4>
                          <div className="mt-1 space-y-0.5 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span className="font-mono">{lead.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Inquired Plot */}
                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Inquired Plot</span>
                          <span className="font-bold text-brand-900 block truncate">{lead.propertyTitle}</span>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                            <span>ID: {lead.propertyId}</span>
                            <span className="font-bold text-slate-700">{lead.budget}</span>
                          </div>
                        </div>

                        {/* Notes Preview */}
                        {lead.notes && (
                          <p className="text-[11px] text-slate-600 bg-amber-50/60 p-2 rounded border border-amber-100/60 line-clamp-2 italic">
                            "{lead.notes}"
                          </p>
                        )}

                        {/* Action Buttons Row */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                          
                          <div className="flex items-center gap-1">
                            {/* Direct Call CTA */}
                            <a
                              href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                              title={`Direct Call: ${lead.phone}`}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            {/* WhatsApp CTA */}
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(lead.customerName)},%20greetings%20from%20Chishti%20Properties%20regarding%20${encodeURIComponent(lead.propertyTitle)}.`}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>

                            {/* Add Notes */}
                            <button
                              onClick={() => setNoteModalLead(lead)}
                              title="Add / View Notes"
                              className="p-2 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Stage Shift Dropdown */}
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                            className="text-[11px] font-bold px-2 py-1 rounded border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                          >
                            <option value="New">Stage: New</option>
                            <option value="Contacted">Stage: Contacted</option>
                            <option value="Pending">Stage: Pending</option>
                            <option value="Closed">Stage: Closed</option>
                          </select>

                        </div>

                      </div>
                    ))}

                    {columnLeads.length === 0 && (
                      <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-300 rounded-xl">
                        No leads in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= VIEW 2: TABLE VIEW ================= */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Inquired Property</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Priority</th>
                    <th className="py-3.5 px-4">Pipeline Status</th>
                    <th className="py-3.5 px-4">Latest Notes</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{lead.customerName}</span>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{lead.phone}</div>
                        <div className="text-[10px] text-slate-400">{lead.email}</div>
                      </td>

                      {/* Property */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-brand-900 block">{lead.propertyTitle}</span>
                        <span className="text-[11px] text-slate-400">ID: {lead.propertyId} • Budget: {lead.budget}</span>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {lead.dateTime}
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4">
                        {getPriorityBadge(lead.priority)}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                            lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            lead.status === 'Contacted' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            lead.status === 'Pending' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Pending">Pending</option>
                          <option value="Closed">Closed / Won</option>
                        </select>
                      </td>

                      {/* Notes */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-[11px] text-slate-600 line-clamp-2">
                          {lead.notes || 'No remarks recorded.'}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${lead.phone}`}
                            title="Direct Call"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            title="WhatsApp Chat"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => setNoteModalLead(lead)}
                            title="Add Note"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ================= ADD NOTE MODAL ================= */}
      {noteModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
            <div className="bg-brand-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base font-display">Investor Notes & Remarks</h3>
                <p className="text-xs text-brand-200">{noteModalLead.customerName} ({noteModalLead.phone})</p>
              </div>
              <button 
                onClick={() => setNoteModalLead(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="font-semibold text-slate-400 block mb-0.5">Inquired Property</span>
                <span className="font-bold text-brand-900 block">{noteModalLead.propertyTitle}</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Current Notes / History</label>
                <p className="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mb-3 italic">
                  {noteModalLead.notes || 'No previous remarks.'}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Append New Remark</label>
                <textarea
                  rows="3"
                  required
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g. Spoke with client. Confirmed token advance of PKR 5 Lacs on DHA-2 plot."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNoteModalLead(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
