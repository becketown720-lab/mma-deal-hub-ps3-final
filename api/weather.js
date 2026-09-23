const OPEN_METEO_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&current=temperature_2m,precipitation&daily=temperature_2m_max&timezone=Asia%2FSingapore';

const CACHE_CONTROL_HEADER = 's-maxage=900, stale-while-revalidate=1800';

const isMissing = (value) => value === null || value === undefined;

function sendJson(res, statusCode, body, headers = {}) {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value);
  }

  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(body);
  }

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  // 1. Accept GET requests only
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, {
      error: 'Method Not Allowed',
    });
  }

  // 2 & 3. Built-in fetch with AbortController 8-second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 8000);

  let upstream;
  try {
    upstream = await fetch(OPEN_METEO_URL, {
      signal: controller.signal,
    });
  } catch {
    // 5. Upstream throws or times out -> HTTP 502
    return sendJson(res, 502, {
      error: 'The weather service could not be reached.',
      kind: 'unreachable',
    });
  } finally {
    clearTimeout(timeoutId);
  }

  // 4 & 6. Check upstream.ok before parsing response body. Return upstream status if non-2xx.
  if (!upstream.ok) {
    return sendJson(res, upstream.status, {
      error: 'The weather provider refused the request.',
      kind: 'refused',
      upstreamStatus: upstream.status,
    });
  }

  let payload;
  try {
    payload = await upstream.json();
  } catch {
    return sendJson(res, 502, {
      error: 'The weather service could not be reached.',
      kind: 'unreachable',
    });
  }

  // 7 & 8. Read required fields; 0 is valid, check for null/undefined
  const current = payload && typeof payload === 'object' ? payload.current : null;
  const currentUnits = payload && typeof payload === 'object' ? payload.current_units : null;

  const isReadingMissing =
    !current ||
    !currentUnits ||
    isMissing(current.time) ||
    isMissing(current.temperature_2m) ||
    isMissing(current.precipitation) ||
    isMissing(currentUnits.temperature_2m) ||
    isMissing(currentUnits.precipitation);

  // 11. Cache-Control header for successful and empty responses
  const cacheHeaders = {
    'Cache-Control': CACHE_CONTROL_HEADER,
  };

  // 9. Required current reading missing -> HTTP 200 with data: null
  if (isReadingMissing) {
    return sendJson(
      res,
      200,
      {
        data: null,
        source: 'Open-Meteo',
      },
      cacheHeaders,
    );
  }

  // 10. Valid response -> HTTP 200 with formatted data
  return sendJson(
    res,
    200,
    {
      data: {
        temperature: current.temperature_2m,
        temperatureUnit: currentUnits.temperature_2m,
        precipitation: current.precipitation,
        precipitationUnit: currentUnits.precipitation,
        observedAt: current.time,
      },
      source: 'Open-Meteo',
    },
    cacheHeaders,
  );
}
