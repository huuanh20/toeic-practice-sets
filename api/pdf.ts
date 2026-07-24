import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(200).end();
  }

  const file = req.query.file as string;
  if (!file) {
    return res.status(400).send('Missing file parameter');
  }

  const targetUrl = file.startsWith('http://') || file.startsWith('https://')
    ? file
    : `https://github.com/huuanh20/toeic-practice-sets/releases/download/v1.0.0/${file}`;

  try {
    const upstreamRes = await fetch(targetUrl, { redirect: 'follow' });
    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send(`Failed to fetch PDF: ${upstreamRes.statusText}`);
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.status(200).send(buffer);
  } catch (error: any) {
    return res.status(500).send(`Proxy error: ${error.message}`);
  }
}
