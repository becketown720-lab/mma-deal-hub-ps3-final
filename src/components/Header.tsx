import React, { useEffect, useState } from 'react';
import { ArrowLeft, CloudSun, AlertCircle, Loader2 } from 'lucide-react';

interface HeaderProps {
  currentScreen: 'discovery' | 'confirmation';
  onBackToDiscovery?: () => void;
}

interface WeatherData {
  temperature: number;
  temperatureUnit: string;
  precipitation: number;
  precipitationUnit: string;
  observedAt: string;
}

interface WeatherSuccessResponse {
  data: WeatherData | null;
  source?: string;
}

interface WeatherErrorResponse {
  error?: string;
  kind?: string;
  upstreamStatus?: number | string;
}

type WeatherStatus = 'loading' | 'success' | 'empty' | 'refused' | 'unreachable';

export const Header: React.FC<HeaderProps> = ({ currentScreen, onBackToDiscovery }) => {
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>('loading');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        const response = await fetch('/api/weather', {
          signal: controller.signal,
        });

        let json: WeatherSuccessResponse | WeatherErrorResponse | null = null;
        try {
          json = await response.json();
        } catch {
          // If response body parsing fails
          if (controller.signal.aborted) return;
          if (response.status === 502) {
            setWeatherStatus('unreachable');
          } else if (response.ok) {
            setWeatherStatus('empty');
          } else {
            setWeatherStatus('refused');
          }
          return;
        }

        if (controller.signal.aborted) return;

        // Check for unreachable state (HTTP 502 or kind === 'unreachable')
        if (response.status === 502 || (json && typeof json === 'object' && 'kind' in json && json.kind === 'unreachable')) {
          setWeatherStatus('unreachable');
          return;
        }

        // Check for other non-2xx responses (including kind: 'refused')
        if (!response.ok) {
          setWeatherStatus('refused');
          return;
        }

        // HTTP 200 responses
        if (json && typeof json === 'object' && 'data' in json) {
          const rawData = json.data;

          // HTTP 200 with data: null
          if (rawData === null) {
            setWeatherStatus('empty');
            return;
          }

          // Validate weather data shape (zero is valid, check for null/undefined)
          const isValidShape =
            rawData &&
            typeof rawData === 'object' &&
            rawData.temperature !== null &&
            rawData.temperature !== undefined &&
            typeof rawData.temperature === 'number' &&
            rawData.temperatureUnit !== null &&
            rawData.temperatureUnit !== undefined &&
            typeof rawData.temperatureUnit === 'string' &&
            rawData.precipitation !== null &&
            rawData.precipitation !== undefined &&
            typeof rawData.precipitation === 'number' &&
            rawData.precipitationUnit !== null &&
            rawData.precipitationUnit !== undefined &&
            typeof rawData.precipitationUnit === 'string' &&
            rawData.observedAt !== null &&
            rawData.observedAt !== undefined &&
            typeof rawData.observedAt === 'string';

          if (isValidShape) {
            setWeatherData(rawData);
            setWeatherStatus('success');
          } else {
            // Unexpected or invalid response shape treated as empty
            setWeatherStatus('empty');
          }
        } else {
          // Unexpected response shape treated as empty
          setWeatherStatus('empty');
        }
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return;
        }
        // Browser network error calling /api/weather -> unreachable
        setWeatherStatus('unreachable');
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, []);

  const formatObservedAt = (rawTime: string) => {
    return rawTime.replace('T', ' ');
  };

  return (
    <header id="app-header" className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 shrink-0">
          {currentScreen === 'confirmation' && onBackToDiscovery && (
            <button
              id="back-nav-button"
              onClick={onBackToDiscovery}
              className="p-2 -ml-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 active:bg-slate-700 transition flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Back to Gym Contracts"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm tracking-tight">
                MMA
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Deal Hub
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              Central & South SG • CBD Second-Hand Contracts
            </p>
          </div>
        </div>

        {/* Live Weather Status Area */}
        <div
          id="header-weather-status"
          aria-live="polite"
          className="flex items-start sm:items-center sm:justify-end min-w-0"
        >
          {weatherStatus === 'loading' && (
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-medium">
              <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
              <span className="truncate">Getting the latest Singapore CBD weather…</span>
            </div>
          )}

          {weatherStatus === 'success' && weatherData && (
            <div className="flex flex-col sm:items-end bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  CBD {weatherData.temperature}{weatherData.temperatureUnit} · Rain {weatherData.precipitation} {weatherData.precipitationUnit}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                Observed {formatObservedAt(weatherData.observedAt)} SGT
              </div>
            </div>
          )}

          {weatherStatus === 'empty' && (
            <div className="flex items-start gap-1.5 bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 leading-snug">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>The weather service responded, but no current reading is available.</span>
            </div>
          )}

          {weatherStatus === 'refused' && (
            <div className="flex items-start gap-1.5 bg-rose-950/40 border border-rose-800/60 rounded-xl px-3 py-1.5 text-xs text-rose-300 leading-snug">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>The weather provider refused the request. Please try again later.</span>
            </div>
          )}

          {weatherStatus === 'unreachable' && (
            <div className="flex items-start gap-1.5 bg-amber-950/40 border border-amber-800/60 rounded-xl px-3 py-1.5 text-xs text-amber-300 leading-snug">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>The weather service cannot be reached right now. Please try again later.</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
