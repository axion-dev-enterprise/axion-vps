import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || '1221854796540017';
const ACCESS_TOKEN = process.env.META_FACEBOOK_ACCESS_TOKEN || 'EAAdUMBI1kEMBSMnZBXCbZBKDZAbAyJSpjZAfjZC5rVLf9bogOVkvaOFLjuwL8wZA8t9xB6vUolXLvGJ6CS7zrRdTsYjjEKn631SZBrnN8YvysLJodE36wteF7v90XYEaXh3oZAiQhUSmELmrXX4wu9OEDdCZCjLCrZAxyZC8uSEdTMnARYeFOMh8IgKDFvsE3T0JgZDZD';

function hashSHA256(value) {
  if (!value) return undefined;
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventName, eventId, eventSourceUrl, email, phone, customData, userAgent } = req.body || {};

    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

    const payload = {
      data: [
        {
          event_name: eventName || 'PageView',
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || 'evt_' + Date.now(),
          event_source_url: eventSourceUrl || 'https://axionenterprise.cloud',
          action_source: 'website',
          user_data: {
            em: email ? [hashSHA256(email)] : undefined,
            ph: phone ? [hashSHA256(phone)] : undefined,
            client_ip_address: typeof clientIp === 'string' ? clientIp.split(',')[0] : '',
            client_user_agent: userAgent || req.headers['user-agent'] || '',
          },
          custom_data: customData || {},
        },
      ],
    };

    const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const metaRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await metaRes.json();
    return res.status(200).json({ success: true, metaResponse: result });
  } catch (error) {
    return res.status(500).json({ error: 'CAPI Error', details: error.message });
  }
}
