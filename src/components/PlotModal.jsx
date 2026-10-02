import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Ruler, FileText, Calendar, DollarSign, Send, ShieldCheck, Phone, MessageSquare } from 'lucide-react';

export function PlotModal({ plot, isOpen, onClose, onBookNow }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  if (!isOpen || !plot) return null;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-100">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-brand-900 via-brand-800 to-brand-700 text-white p-6">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-300 border border-gold-400/30">
              {plot.tag}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              plot.status === 'Available' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
              plot.status === 'Reserved' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
              'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {plot.status}
            </span>
            <span className="text-xs text-brand-200">Plot ID: {plot.id}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-display">{plot.title}</h2>
          <p className="flex items-center gap-1.5 text-brand-100 text-sm mt-1">
            <MapPin className="w-4 h-4 text-gold-400" />
            {plot.block}, {plot.society}
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white font-display">
              {plot.priceFormatted}
            </span>
            <span className="text-brand-200 text-sm">
              ({plot.size} • {plot.sizeSqFt})
            </span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'overview' 
                ? 'border-brand-700 text-brand-700 bg-white' 
                : 'border-transparent text-slate-600 hover:text-brand-700'
            }`}
          >
            Plot Overview & Specs
          </button>
          <button 
            onClick={() => setActiveTab('installments')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'installments' 
                ? 'border-brand-700 text-brand-700 bg-white' 
                : 'border-transparent text-slate-600 hover:text-brand-700'
            }`}
          >
            Installment Schedule
          </button>
          <button 
            onClick={() => setActiveTab('inquire')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'inquire' 
                ? 'border-brand-700 text-brand-700 bg-white' 
                : 'border-transparent text-slate-600 hover:text-brand-700'
            }`}
          >
            Inquire & Site Visit
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="rounded-xl overflow-hidden shadow-md aspect-video relative group">
                  <img 
                    src={plot.image} 
                    alt={plot.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-brand-900/90 text-white text-xs px-3 py-1 rounded-md">
                    {plot.dimension}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-brand-900">Key Specifications</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-400 block">Plot Number</span>
                      <span className="font-semibold text-slate-800">{plot.plotNo}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-400 block">Category</span>
                      <span className="font-semibold text-slate-800">{plot.category}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-400 block">Land Area</span>
                      <span className="font-semibold text-slate-800">{plot.size} ({plot.sizeSqFt})</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-400 block">Dimensions</span>
                      <span className="font-semibold text-slate-800">{plot.dimension}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {plot.description}
                  </p>
                </div>
              </div>

              {/* Verified Features */}
              <div>
                <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-3">
                  Verified Society Amenities & Legal Status
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {plot.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-brand-50/60 rounded-lg border border-brand-100/60 text-xs text-brand-900 font-medium">
                      <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Verification Banner */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-gold-50 border border-gold-200 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-gold-500 text-white rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-900">100% NOC & Legal Guarantee by Chishti Properties</h4>
                  <p className="text-xs text-amber-800/90 mt-1">
                    This property has been physically surveyed and legally vetted against society masterplans. Direct transfer through respective housing authority registrar.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'installments' && (
            <div className="space-y-6">
              <div className="bg-brand-50 p-5 rounded-xl border border-brand-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-brand-900">Customized Installment Plan</h4>
                    <p className="text-xs text-brand-700">Zero hidden markups with quarterly flexible breakdowns</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-brand-600 uppercase font-semibold">Total Plot Price</span>
                    <p className="text-xl font-bold text-brand-900">{plot.priceFormatted}</p>
                  </div>
                </div>
              </div>

              {plot.installmentAvailable ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold block mb-1">Down Payment (Booking)</span>
                    <span className="text-xl font-bold text-brand-700">{plot.downPayment}</span>
                    <span className="text-xs text-emerald-600 block mt-1">Immediate File Allocation</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold block mb-1">Monthly / Quarterly</span>
                    <span className="text-xl font-bold text-brand-700">{plot.monthlyInstallment}</span>
                    <span className="text-xs text-slate-500 block mt-1">Direct Bank Deposit / Pay Order</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-xs text-slate-500 font-semibold block mb-1">Possession Transfer</span>
                    <span className="text-xl font-bold text-brand-700">Upon 60% Clearance</span>
                    <span className="text-xs text-slate-500 block mt-1">Begin Villa Construction</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-slate-700 font-medium">This is a developed, ready-to-construct plot available on lump-sum transfer payment.</p>
                  <p className="text-xs text-slate-500 mt-1">Bank financing available via Meezan Bank, Bank Alfalah, and HBL Islamic Banking.</p>
                </div>
              )}

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold">
                    <tr>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Schedule</th>
                      <th className="p-3">Percentage</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-medium">Token Confirmation</td>
                      <td className="p-3">At Booking</td>
                      <td className="p-3">10%</td>
                      <td className="p-3 text-emerald-600 font-semibold">Open</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Down Payment & File Issuance</td>
                      <td className="p-3">Within 30 Days</td>
                      <td className="p-3">15%</td>
                      <td className="p-3 text-slate-500">Upcoming</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Quarterly Installments</td>
                      <td className="p-3">12 Equal Quarters</td>
                      <td className="p-3">60%</td>
                      <td className="p-3 text-slate-500">Upcoming</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">On Final Possession & Registry</td>
                      <td className="p-3">At Handover</td>
                      <td className="p-3">15%</td>
                      <td className="p-3 text-slate-500">Upon Handover</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'inquire' && (
            <div>
              {inquirySent ? (
                <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 animate-fadeIn">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Inquiry Dispatched Successfully!</h4>
                  <p className="text-sm text-emerald-700 mt-1">
                    Senior Broker Muhammad Chishti will contact you on your provided WhatsApp number within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Malik Zeeshan" 
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+92 300 1234567" 
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="name@example.com" 
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700" 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Action</label>
                      <select className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 bg-white">
                        <option>Schedule In-Person Site Visit</option>
                        <option>Request WhatsApp Payment Schedule</option>
                        <option>Video Call Plot Inspection (Overseas)</option>
                        <option>Make Token Advance Offer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Message or Specific Questions</label>
                    <textarea 
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="I am interested in this plot. Please share legal verification and next transfer dates."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <a 
                        href={`https://wa.me/923001234567?text=Hello%20Chishti%20Properties,%20I%20am%20interested%20in%20${encodeURIComponent(plot.title)}%20(${plot.id})`}
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat on WhatsApp
                      </a>
                      <a 
                        href="tel:+92518439000"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                    </div>

                    <button 
                      type="submit"
                      className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      Submit Official Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Head Office: Executive Heights, Gulberg Greens, Islamabad.
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
            >
              Close
            </button>
            <button 
              onClick={() => {
                onClose();
                if (onBookNow) onBookNow(plot);
              }}
              className="px-5 py-2 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Book / Token Advance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
