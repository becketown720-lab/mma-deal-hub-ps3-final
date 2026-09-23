import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Filter, Sparkles, Building2 } from 'lucide-react';
import { GymContract, SortOption, DurationFilterOption } from '../types';
import { GymCard } from './GymCard';

interface GymDiscoveryScreenProps {
  contracts: GymContract[];
  onSelectContract: (contract: GymContract) => void;
}

export const GymDiscoveryScreen: React.FC<GymDiscoveryScreenProps> = ({
  contracts,
  onSelectContract,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [durationFilter, setDurationFilter] = useState<DurationFilterOption>('all');

  // Filter & sort logic
  const processedContracts = useMemo(() => {
    let list = [...contracts];

    // Filter by remaining duration
    if (durationFilter === 'short') {
      list = list.filter((c) => c.remainingMonths <= 6);
    } else if (durationFilter === 'long') {
      list = list.filter((c) => c.remainingMonths > 6);
    }

    // Sort by price (low to high) or duration (long to short)
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.monthlyFee - b.monthlyFee);
    } else if (sortOption === 'duration-desc') {
      list.sort((a, b) => b.remainingMonths - a.remainingMonths);
    }

    return list;
  }, [contracts, sortOption, durationFilter]);

  return (
    <div id="gym-discovery-screen" className="space-y-5">
      {/* Intro Banner for CBD office workers */}
      <section
        id="cbd-intro-banner"
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-5 rounded-2xl shadow-sm border border-slate-700/60"
      >
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4" />
          <span>Central & South Singapore Examples</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
          Second-Hand MMA Gym Contract Examples
        </h2>
        <p className="text-sm text-slate-300 mt-1.5 leading-relaxed max-w-xl">
          Explore illustrative contract-transfer scenarios designed for CBD office workers. Gym names, prices, locations and availability shown below are fictional prototype data.
        </p>
      </section>

      {/* Control Bar: Sort and Filter */}
      <section
        id="discovery-controls"
        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          {/* Sort Control */}
          <div className="flex items-center gap-2 flex-1">
            <label
              htmlFor="sort-select"
              className="text-xs font-bold text-slate-700 flex items-center gap-1 shrink-0 uppercase tracking-wider"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[44px]"
            >
              <option value="default">Featured Examples</option>
              <option value="price-asc">Price: Low to High ($)</option>
              <option value="duration-desc">Duration: Long to Short (Months)</option>
            </select>
          </div>

          {/* Filter by Duration */}
          <div className="flex items-center gap-2 flex-1">
            <label
              htmlFor="duration-filter"
              className="text-xs font-bold text-slate-700 flex items-center gap-1 shrink-0 uppercase tracking-wider"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              Filter Duration:
            </label>
            <select
              id="duration-filter"
              value={durationFilter}
              onChange={(e) =>
                setDurationFilter(e.target.value as DurationFilterOption)
              }
              className="w-full text-sm font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[44px]"
            >
              <option value="all">All Durations (3 - 14 mos)</option>
              <option value="short">Short Term (≤ 6 months)</option>
              <option value="long">Long Term (&gt; 6 months)</option>
            </select>
          </div>
        </div>

        {/* Quick Summary Pill Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            Showing {processedContracts.length} illustrative contract examples
          </span>
          {(sortOption !== 'default' || durationFilter !== 'all') && (
            <button
              id="reset-filters-btn"
              onClick={() => {
                setSortOption('default');
                setDurationFilter('all');
              }}
              className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2 min-h-[36px] flex items-center"
            >
              Reset filters
            </button>
          )}
        </div>
      </section>

      {/* Cards List */}
      <section id="gym-cards-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {processedContracts.map((contract) => (
          <GymCard
            key={contract.id}
            contract={contract}
            onSelect={onSelectContract}
          />
        ))}

        {processedContracts.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-slate-600 font-medium">
              No contract examples match your current filter.
            </p>
            <button
              onClick={() => {
                setSortOption('default');
                setDurationFilter('all');
              }}
              className="mt-3 text-sm font-bold text-amber-600 underline"
            >
              Show all contract examples
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
