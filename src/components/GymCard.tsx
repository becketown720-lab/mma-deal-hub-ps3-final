import React from 'react';
import { MapPin, Calendar, CheckCircle2, Train, ArrowRight, Tag } from 'lucide-react';
import { GymContract } from '../types';

interface GymCardProps {
  contract: GymContract;
  onSelect: (contract: GymContract) => void;
}

export const GymCard: React.FC<GymCardProps> = ({ contract, onSelect }) => {
  const discountPercent = Math.round(
    ((contract.originalFee - contract.monthlyFee) / contract.originalFee) * 100
  );

  return (
    <div
      id={`gym-card-${contract.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between gap-4 relative overflow-hidden"
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {contract.subRegion} Region Deal
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1.5 leading-snug">
              {contract.name}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
            <Tag className="w-3 h-3" />
            {discountPercent}% OFF
          </span>
        </div>

        {/* Location & Transit */}
        <div className="space-y-1 text-sm text-slate-600 mt-2">
          <div className="flex items-center gap-1.5 text-slate-800 font-medium">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{contract.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-0.5">
            <Train className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{contract.mrtStation}</span>
          </div>
        </div>

        {/* Disciplines Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {contract.disciplines.map((d, index) => (
            <span
              key={index}
              className="text-[12px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Price & Duration Section */}
      <div className="pt-3 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Monthly Fee
            </p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-950">
                ${contract.monthlyFee}
              </span>
              <span className="text-xs text-slate-500">/mo</span>
            </div>
            <p className="text-[11px] text-slate-400 line-through">
              Usual ${contract.originalFee}/mo
            </p>
          </div>

          <div className="border-l border-slate-200 pl-3">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Remaining Duration
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-amber-600">
                {contract.remainingMonths}
              </span>
              <span className="text-xs font-semibold text-slate-700">months</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 inline" /> Illustrative listing
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          id={`select-contract-btn-${contract.id}`}
          onClick={() => onSelect(contract)}
          className="w-full min-h-[48px] bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <span>Select Contract</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
