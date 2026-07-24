import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
    return res.status(200).end();
  }

  const file = req.query.file as string;
  if (!file) {
    return res.status(400).send('Missing file parameter');
  }

  const targetUrl = file.startsWith('http://') || file.startsWith('https://')
    ? file
    : `https://github.com/huuanh20/toeic-practice-sets/releases/download/v1.0.0/${file}`;

  const fetchHeaders: Record<string, string> = {};
  if (req.headers.range) {
    fetchHeaders['Range'] = req.headers.range as string;
  }

  try {
    const upstreamRes = await fetch(targetUrl, { headers: fetchHeaders, redirect: 'follow' });
    if (!upstreamRes.ok && upstreamRes.status !== 206) {
      return res.status(upstreamRes.status).send(`Failed to fetch PDF: ${upstreamRes.statusText}`);
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');

    const contentRange = upstreamRes.headers.get('content-range');
    const contentLength = upstreamRes.headers.get('content-length');

    if (contentRange) res.setHeader('Content-Range', contentRange);
    if (contentLength) res.setHeader('Content-Length', contentLength);

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.status(upstreamRes.status).send(buffer);
  } catch (error: any) {
    return res.status(500).send(`Proxy error: ${error.message}`);
  }
}
