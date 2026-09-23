import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  User, 
  ShieldCheck, 
  Users, 
  Ticket,
  Copy,
  Check
} from 'lucide-react';
import { GymContract, PlacedOrder } from '../types';
import { INITIAL_QUEUE_BASE } from '../data';

interface OrderConfirmationScreenProps {
  selectedContract: GymContract;
  onBackToDiscovery: () => void;
  onOrderCompleted?: (order: PlacedOrder) => void;
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  selectedContract,
  onBackToDiscovery,
  onOrderCompleted,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid Singapore contact number.');
      return;
    }

    setErrorMsg('');

    // Generate unique reference number like #MMA-2026-889
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedRef = `#MMA-2026-${randomSuffix}`;
    const generatedQueue = INITIAL_QUEUE_BASE;

    const newOrder: PlacedOrder = {
      referenceNumber: generatedRef,
      queuePosition: generatedQueue,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      contract: selectedContract,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPlacedOrder(newOrder);
    if (onOrderCompleted) {
      onOrderCompleted(newOrder);
    }
  };

  const handleCopyRef = () => {
    if (!placedOrder) return;
    navigator.clipboard.writeText(placedOrder.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // State B: Demo Reservation Created
  if (placedOrder) {
    return (
      <div id="order-placed-view" className="space-y-5 animate-in fade-in duration-300">
        {/* Success Header Card */}
        <section
          id="order-placed-banner"
          className="bg-emerald-600 text-white p-6 rounded-2xl shadow-sm text-center space-y-2 border border-emerald-500"
        >
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Demo Reservation Created
          </h2>
          <p className="text-emerald-100 text-sm max-w-md mx-auto">
            This browser-only prototype has not submitted a real reservation. No one will contact you.
          </p>
        </section>

        {/* Generated Reference and Queue Position Highlight */}
        <section
          id="order-reference-box"
          className="bg-white rounded-2xl border-2 border-slate-900 p-5 shadow-sm space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Reference Number */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Ticket className="w-3.5 h-3.5" />
                  Demo Reference
                </span>
                <button
                  id="copy-ref-btn"
                  onClick={handleCopyRef}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium p-1"
                  aria-label="Copy reference number"
                >
                  {copied ? (
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Copy className="w-3 h-3" /> Copy
                    </span>
                  )}
                </button>
              </div>
              <div
                id="generated-ref-number"
                className="text-2xl sm:text-3xl font-black tracking-wider text-slate-900 font-mono"
              >
                {placedOrder.referenceNumber}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Generated locally for this demonstration only.
              </p>
            </div>

            {/* Queue Position */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
                <Users className="w-3.5 h-3.5" />
                Demo Status
              </span>
              <div
                id="generated-queue-position"
                className="text-2xl sm:text-3xl font-black text-amber-700"
              >
                Illustrative position: #{placedOrder.queuePosition}
              </div>
              <p className="text-[11px] text-amber-800/80 mt-1">
                No coordinator response will occur.
              </p>
            </div>
          </div>

          {/* Order Summary Details */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Demo Summary
            </h3>

            <div className="bg-slate-50 p-3.5 rounded-xl text-sm space-y-2 border border-slate-100">
              <div className="flex justify-between items-center text-slate-800">
                <span className="font-semibold text-slate-900">{placedOrder.contract.name}</span>
                <span className="font-bold text-slate-900">${placedOrder.contract.monthlyFee}/month</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 text-xs">
                <span>Location: {placedOrder.contract.location}</span>
                <span className="font-semibold text-amber-700">{placedOrder.contract.remainingMonths} months left</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 text-xs pt-1 border-t border-slate-200/60">
                <span>Entered name: <strong className="text-slate-800">{placedOrder.customerName}</strong></span>
                <span>Test phone: <strong className="text-slate-800">{placedOrder.customerPhone}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Button to Browse Other Deals */}
          <button
            id="browse-more-deals-btn"
            onClick={onBackToDiscovery}
            className="w-full min-h-[48px] bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse More Examples</span>
          </button>
        </section>
      </div>
    );
  }

  // State A: Confirmation Form
  return (
    <div id="order-confirmation-screen" className="space-y-5">
      {/* Back Button */}
      <div>
        <button
          id="back-to-gyms-btn"
          onClick={onBackToDiscovery}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 min-h-[44px] px-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Examples</span>
        </button>
      </div>

      {/* Selected Contract Card Recap */}
      <section
        id="selected-contract-recap"
        className="bg-white rounded-2xl border-2 border-amber-500/60 p-5 shadow-sm space-y-3 relative overflow-hidden"
      >
        <div className="inline-block bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
          Selected Example Contract
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {selectedContract.name}
            </h2>
            <div className="flex items-center gap-1.5 text-sm text-slate-600 mt-1">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{selectedContract.location}</span>
            </div>
          </div>

          <div className="text-left sm:text-right bg-slate-50 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
            <div className="text-2xl font-black text-slate-950">
              ${selectedContract.monthlyFee}
              <span className="text-xs font-normal text-slate-500">/mo</span>
            </div>
            <div className="text-xs font-bold text-amber-700 flex items-center gap-1 sm:justify-end">
              <Clock className="w-3.5 h-3.5" />
              {selectedContract.remainingMonths} months contract duration
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Illustrative contract-transfer scenario. Example original fee: ${selectedContract.originalFee}/mo.</span>
        </div>
      </section>

      {/* Confirmation Form */}
      <section
        id="confirmation-form-card"
        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
      >
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Demo Reservation
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter test details to preview the illustrative confirmation screen. Nothing will be submitted.
          </p>
        </div>

        {errorMsg && (
          <div
            id="form-error-alert"
            className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleConfirmOrder} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="customer-name-input"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Test Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="customer-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tan Wei Ming"
                required
                className="w-full text-base font-medium pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white min-h-[48px]"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="customer-phone-input"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Test Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="customer-phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9123 4567 or +65 9123 4567"
                required
                className="w-full text-base font-medium pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white min-h-[48px]"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Used only in this browser demo and not sent anywhere.
            </p>
          </div>

          {/* Confirm Order Button */}
          <button
            id="confirm-order-btn"
            type="submit"
            className="w-full min-h-[50px] bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-base rounded-xl flex items-center justify-center gap-2 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 mt-2"
          >
            <span>Preview Demo Result</span>
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
          </button>
        </form>
      </section>
    </div>
  );
};
