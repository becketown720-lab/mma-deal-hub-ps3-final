import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  ShieldCheck, 
  Ticket,
  Copy,
  Check,
  Edit3,
  Info
} from 'lucide-react';
import { GymContract, PlacedOrder } from '../types';

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
  // Step 1: 'form', Step 2: 'review', Step 3: 'confirmed'
  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  // Validate phone field according to Repair 1
  const validatePhoneValue = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Please enter a contact number.';
    }
    // Check if alphabetic letters are present
    if (/[a-zA-Z]/.test(trimmed)) {
      return 'Letters are not allowed. Please enter digits, spaces, hyphens, or "+".';
    }
    // Check if sensible phone characters only
    if (!/^[\d\s+\-()]+$/.test(trimmed)) {
      return 'Invalid characters. Please use only digits, spaces, hyphens, or "+".';
    }
    // Check minimum digits required for a realistic contact number (at least 8 digits)
    const digitsOnly = trimmed.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      return 'Phone number must contain at least 8 digits.';
    }
    return '';
  };

  const validateNameValue = (val: string): string => {
    if (!val.trim()) {
      return 'Please enter your full name.';
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (phoneError) {
      setPhoneError(validatePhoneValue(val));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (nameError) {
      setNameError(validateNameValue(val));
    }
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();

    const nErr = validateNameValue(name);
    const pErr = validatePhoneValue(phone);

    setNameError(nErr);
    setPhoneError(pErr);

    if (nErr || pErr) {
      return;
    }

    setStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmReservation = () => {
    // Generate unique reference number like #MMA-2026-889
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const generatedRef = `#MMA-2026-${randomSuffix}`;

    const newOrder: PlacedOrder = {
      referenceNumber: generatedRef,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      contract: selectedContract,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPlacedOrder(newOrder);
    setStep('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

  // State 3: Confirmed / Demo Result Screen (Repair 3)
  if (step === 'confirmed' && placedOrder) {
    return (
      <div id="order-placed-view" className="space-y-5 animate-in fade-in duration-300">
        {/* Banner with clear educational/demo language */}
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
            This is an illustrative demonstration. No real reservation, payment, or gym contact has been made.
          </p>
        </section>

        {/* Demo Reference and Unambiguous Status Highlight */}
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
                  Illustrative Reference
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
                Generated locally in your browser. Not stored on any server.
              </p>
            </div>

            {/* Unambiguous Status — Repair 3 */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
                <Info className="w-3.5 h-3.5" />
                Prototype Status
              </span>
              <div
                id="generated-queue-position"
                className="text-xl sm:text-2xl font-black text-amber-900"
              >
                Demonstration Only
              </div>
              <p className="text-[11px] text-amber-800 mt-1 leading-snug">
                No reservation was placed and no queue was joined. No gym or coordinator will contact you.
              </p>
            </div>
          </div>

          {/* Order Summary Details */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Demonstration Summary
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

  // State 2: Review Screen (Repair 2)
  if (step === 'review') {
    return (
      <div id="order-review-screen" className="space-y-5 animate-in fade-in duration-200">
        <div>
          <button
            id="back-to-form-btn"
            onClick={() => {
              setStep('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 min-h-[44px] px-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Edit Contact Info</span>
          </button>
        </div>

        {/* Review Card */}
        <section
          id="review-details-card"
          className="bg-white rounded-2xl border-2 border-amber-500/80 p-5 shadow-sm space-y-5"
        >
          <div>
            <div className="inline-block bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1.5">
              Step 2 of 2: Review Before Confirming
            </div>
            <h2 className="text-xl font-black text-slate-950">
              Review Demo Reservation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please check your selected contract and contact information before confirming this demonstration.
            </p>
          </div>

          {/* Section: Selected Contract */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Selected Gym Contract
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-base font-bold text-slate-900">
                {selectedContract.name}
              </h3>
              <div className="text-base font-black text-slate-900">
                ${selectedContract.monthlyFee}/month
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {selectedContract.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {selectedContract.remainingMonths} months duration
              </span>
            </div>
          </div>

          {/* Section: Entered Contact Info */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Entered Contact Details
              </span>
              <button
                id="edit-contact-btn"
                type="button"
                onClick={() => {
                  setStep('form');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 underline underline-offset-2"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-800">
              <div>
                <span className="text-xs text-slate-500 block">Name:</span>
                <span className="font-semibold">{name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Phone Number:</span>
                <span className="font-semibold">{phone}</span>
              </div>
            </div>
          </div>

          {/* Unambiguous Demonstration Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Prototype Demonstration Only</p>
              <p className="text-amber-800/90 mt-0.5 leading-relaxed">
                Confirming will not charge payment, submit data to a live database, or contact the gym or seller.
              </p>
            </div>
          </div>

          {/* Actions: Edit / Back and Confirm */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="review-back-btn"
              type="button"
              onClick={() => {
                setStep('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 min-h-[48px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-2 transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit / Back</span>
            </button>
            <button
              id="confirm-demo-reservation-btn"
              type="button"
              onClick={handleConfirmReservation}
              className="flex-1 min-h-[48px] bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-sm"
            >
              <span>Confirm Demo Reservation</span>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // State 1: Form Entry (with Repair 1 Phone Validation)
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
            Enter test details to preview the review and reservation flow. Nothing will be submitted or charged.
          </p>
        </div>

        <form onSubmit={handleProceedToReview} className="space-y-4" noValidate>
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
                autoComplete="name"
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Tan Wei Ming"
                className={`w-full text-base font-medium pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white min-h-[48px] ${
                  nameError ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
            </div>
            {nameError && (
              <p id="name-error-inline" className="text-xs font-medium text-rose-600 mt-1">
                {nameError}
              </p>
            )}
          </div>

          {/* Phone Field — Repair 1 */}
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
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="e.g. 9123 4567 or +65 9123 4567"
                className={`w-full text-base font-medium pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white min-h-[48px] ${
                  phoneError ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/20' : 'border-slate-300'
                }`}
              />
            </div>
            {phoneError ? (
              <p id="phone-error-inline" className="text-xs font-medium text-rose-600 mt-1">
                {phoneError}
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">
                Accepts digits, spaces, hyphens, and "+". Used only for this local browser demonstration.
              </p>
            )}
          </div>

          {/* Proceed to Review Button */}
          <button
            id="proceed-to-review-btn"
            type="submit"
            className="w-full min-h-[50px] bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black text-base rounded-xl flex items-center justify-center gap-2 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 mt-2"
          >
            <span>Review Reservation Details</span>
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
          </button>
        </form>
      </section>
    </div>
  );
};
