import React, { useState } from 'react';
import { X, Send, CheckCircle, ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react';

export function InquiryModal({ isOpen, onClose, plot, onLeadCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    notes: 'I am interested in booking this plot or scheduling an on-site visit.'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLeadCreated && plot) {
      const newLead = {
        id: `LEAD-${Math.floor(800 + Math.random() * 200)}`,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email || 'customer@inquiry.pk',
        propertyId: plot.id,
        propertyTitle: `${plot.size} (${plot.society})`,
        dateTime: 'Just now',
        priority: 'Hot',
        status: 'New',
        budget: formData.budget || plot.priceFormatted,
        notes: formData.notes,
        history: [{ timestamp: 'Just now', text: `Submitted booking request via web portal for ${plot.id}.` }]
      };
      onLeadCreated(newLead);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100">
        <div className="bg-brand-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-300 border border-gold-400/30">
              Verified Booking Portal
            </span>
          </div>

          <h3 className="text-xl font-bold font-display">Inquire & Book Plot</h3>
          {plot ? (
            <p className="text-brand-100 text-xs mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {plot.title} • {plot.block}, {plot.society} ({plot.priceFormatted})
            </p>
          ) : (
            <p className="text-brand-100 text-xs mt-1">
              Chishti Properties - Islamabad & Rawalpindi
            </p>
          )}
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Booking Request Registered!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                Lead dispatched to Principal Broker Muhammad Chishti. Check the Admin Leads dashboard to see your new inquiry pipeline entry!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sardar Tariq Mehmood"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="investor@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Expected Budget / Payment Mode</label>
                <input 
                  type="text" 
                  placeholder={plot ? plot.priceFormatted : "PKR 50 Lacs to 2 Crore"}
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Notes / Instructions</label>
                <textarea 
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                ></textarea>
              </div>

              <div className="p-3 bg-brand-50/70 border border-brand-100 rounded-lg flex items-center gap-2 text-xs text-brand-900">
                <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
                <span>Zero brokerage commission for registered online buyers. 100% verified files.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Booking Lead
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
