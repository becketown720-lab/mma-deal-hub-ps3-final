export interface GymContract {
  id: string;
  name: string;
  monthlyFee: number;
  originalFee: number;
  location: string;
  subRegion: 'Central' | 'South';
  mrtStation: string;
  remainingMonths: number;
  disciplines: string[];
  notes: string;
}

export interface PlacedOrder {
  referenceNumber: string;
  queuePosition: number;
  customerName: string;
  customerPhone: string;
  contract: GymContract;
  placedAt: string;
}

export type SortOption = 'default' | 'price-asc' | 'duration-desc';
export type DurationFilterOption = 'all' | 'short' | 'medium' | 'long';
