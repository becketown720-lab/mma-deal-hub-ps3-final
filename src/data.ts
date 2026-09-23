import { GymContract } from './types';

/**
 * Invented data for MMA Deal Hub.
 * All gym names, prices, contract durations, and locations are fictitious representations
 * designed for price-sensitive office workers around Central and South Singapore.
 */
export const INVENTED_GYM_CONTRACTS: GymContract[] = [
  {
    id: 'contract-apex-01',
    name: 'Apex Combat Studio',
    monthlyFee: 135,
    originalFee: 210,
    location: 'Tanjong Pagar (Central)',
    subRegion: 'Central',
    mrtStation: 'Tanjong Pagar MRT (2 min walk)',
    remainingMonths: 8,
    disciplines: ['Muay Thai', 'BJJ', 'Boxing'],
    notes: 'No transfer fee. Full access during lunch & evening peaks.'
  },
  {
    id: 'contract-metro-02',
    name: 'Metropolis Strike & Grapple',
    monthlyFee: 118,
    originalFee: 195,
    location: 'Raffles Place (Central)',
    subRegion: 'Central',
    mrtStation: 'Raffles Place MRT (Exit B, 3 min walk)',
    remainingMonths: 4,
    disciplines: ['No-Gi BJJ', 'Kickboxing', 'Conditioning'],
    notes: 'Short commitment. Shower and locker facilities included.'
  },
  {
    id: 'contract-harbour-03',
    name: 'Harbour Martial Arts Collective',
    monthlyFee: 149,
    originalFee: 230,
    location: 'HarbourFront / Keppel (South)',
    subRegion: 'South',
    mrtStation: 'HarbourFront MRT (5 min walk)',
    remainingMonths: 11,
    disciplines: ['MMA', 'Brazilian Jiu-Jitsu', 'Wrestling'],
    notes: 'Transfer processing confirmed with club manager.'
  },
  {
    id: 'contract-lioncity-04',
    name: 'Lion City Fight Lab',
    monthlyFee: 109,
    originalFee: 180,
    location: 'Chinatown / South Bridge (Central)',
    subRegion: 'Central',
    mrtStation: 'Chinatown MRT (4 min walk)',
    remainingMonths: 3,
    disciplines: ['Muay Thai', 'Boxing'],
    notes: 'Lowest monthly rate. Great trial run for beginners.'
  },
  {
    id: 'contract-southbridge-05',
    name: 'South Bridge BJJ & Striking',
    monthlyFee: 128,
    originalFee: 205,
    location: 'Clarke Quay (Central)',
    subRegion: 'Central',
    mrtStation: 'Clarke Quay MRT (3 min walk)',
    remainingMonths: 6,
    disciplines: ['Gi & No-Gi BJJ', 'Dutch Kickboxing'],
    notes: 'Half-year duration. Flexible evening class schedule.'
  },
  {
    id: 'contract-marina-06',
    name: 'Marina Combat Academy',
    monthlyFee: 165,
    originalFee: 250,
    location: 'Downtown / Marina Bay (Central)',
    subRegion: 'Central',
    mrtStation: 'Downtown MRT (Underground link, 2 min walk)',
    remainingMonths: 14,
    disciplines: ['MMA Cage Work', 'Muay Thai', 'Wrestling'],
    notes: 'Premium facilities with sauna and towel service.'
  }
];

export const INITIAL_QUEUE_BASE = 3;
