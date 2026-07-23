// Meta Pixel & Conversions API Helper
export const PIXEL_ID = '1221854796540017';

export function initMetaPixel() {
  if (typeof window === 'undefined') return;
  if (window.fbq) return;

  const fbq = function (...args) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      fbq.queue.push(args);
    }
  };

  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');

  // Trigger CAPI Server-Side Dual Dispatch
  sendCapiEvent('PageView');
}

export function trackPixelEvent(eventName, params = {}, eventId = null) {
  const generatedId = eventId || 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, { ...params, eventID: generatedId });
  }

  sendCapiEvent(eventName, { ...params, eventId: generatedId });
}

export async function sendCapiEvent(eventName, payload = {}) {
  try {
    await fetch('/api/meta-conversions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId: payload.eventId || 'evt_' + Date.now(),
        eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        customData: payload,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      }),
    });
  } catch (err) {
    console.warn('CAPI dispatch notice:', err);
  }
}
