const OPEN_METEO_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=1.29&longitude=103.85&current=temperature_2m,precipitation&daily=temperature_2m_max&timezone=Asia%2FSingapore';

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
  // 9. Cache-Control: no-store on every health response
  const responseHeaders = {
    'Cache-Control': 'no-store',
  };

  // 1 & 2. Accept GET requests only
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(
      res,
      405,
      {
        error: 'Method Not Allowed',
      },
      responseHeaders,
    );
  }

  // 3 & 4. Use built-in fetch with AbortController 8-second timeout
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
    // 8. Fetch throws or times out -> HTTP 200 with degraded / unreachable
    return sendJson(
      res,
      200,
      {
        status: 'degraded',
        service: 'Open-Meteo',
        credentialRequired: false,
        upstreamStatus: 'unreachable',
        checkedAt: new Date().toISOString(),
      },
      responseHeaders,
    );
  } finally {
    clearTimeout(timeoutId);
  }

  // 6 & 7. Inspect upstream status without parsing or returning the response body
  if (upstream.ok) {
    return sendJson(
      res,
      200,
      {
        status: 'ok',
        service: 'Open-Meteo',
        credentialRequired: false,
        upstreamStatus: upstream.status,
        checkedAt: new Date().toISOString(),
      },
      responseHeaders,
    );
  }

  return sendJson(
    res,
    200,
    {
      status: 'degraded',
      service: 'Open-Meteo',
      credentialRequired: false,
      upstreamStatus: upstream.status,
      checkedAt: new Date().toISOString(),
    },
    responseHeaders,
  );
}
