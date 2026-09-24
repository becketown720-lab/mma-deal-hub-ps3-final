import React, { useState } from 'react';
import { Header } from './components/Header';
import { GymDiscoveryScreen } from './components/GymDiscoveryScreen';
import { OrderConfirmationScreen } from './components/OrderConfirmationScreen';
import { DisqusComments } from './components/DisqusComments';
import { INVENTED_GYM_CONTRACTS } from './data';
import { GymContract, PlacedOrder } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'discovery' | 'confirmation'>('discovery');
  const [selectedContract, setSelectedContract] = useState<GymContract | null>(null);

  const handleSelectContract = (contract: GymContract) => {
    setSelectedContract(contract);
    setCurrentScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDiscovery = () => {
    setCurrentScreen('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-200">
      {/* Fixed/Sticky Top Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onBackToDiscovery={currentScreen === 'confirmation' ? handleBackToDiscovery : undefined}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 sm:py-7">
        {currentScreen === 'discovery' && (
          <GymDiscoveryScreen
            contracts={INVENTED_GYM_CONTRACTS}
            onSelectContract={handleSelectContract}
          />
        )}

        {currentScreen === 'discovery' && <DisqusComments />}

        {currentScreen === 'confirmation' && selectedContract && (
          <OrderConfirmationScreen
            selectedContract={selectedContract}
            onBackToDiscovery={handleBackToDiscovery}
          />
        )}
      </main>

      {/* Simple Footer for SMU Problem Set Context */}
      <footer className="border-t border-slate-200/80 bg-slate-50 py-4 px-4 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-600">MMA Deal Hub (Singapore CBD & South)</p>
        <p className="text-[11px] text-slate-500">
          Live weather data by{' '}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-amber-600 hover:text-amber-700 underline font-medium"
          >
            Open-Meteo
          </a>
          .
        </p>
        <p className="text-[11px] text-slate-500">
          This page uses Microsoft Clarity and Disqus, which use cookies to record how visitors use the site and to host comments. By using this page you agree that we and Microsoft may collect and use this data. See the{' '}
          <a
            href="https://www.microsoft.com/privacy/privacystatement"
            target="_blank"
            rel="noreferrer"
            className="text-amber-600 hover:text-amber-700 underline font-medium"
          >
            Microsoft Privacy Statement
          </a>
          , the{' '}
          <a
            href="https://disqus.com/privacy-policy/"
            target="_blank"
            rel="noreferrer"
            className="text-amber-600 hover:text-amber-700 underline font-medium"
          >
            Disqus privacy policy
          </a>{' '}
          and the{' '}
          <a
            href="https://disqus.com/data-sharing-settings/"
            target="_blank"
            rel="noreferrer"
            className="text-amber-600 hover:text-amber-700 underline font-medium"
          >
            Disqus data sharing settings
          </a>
          .
        </p>
        <p className="text-[11px] text-slate-400">
          Gym contracts and the reservation flow are illustrative prototype data. No real order is submitted.
        </p>
        <p className="text-[11px] text-slate-400">
          Prototype created for MGMT 6110 Human-AI Collaboration.
        </p>
      </footer>
    </div>
  );
}
