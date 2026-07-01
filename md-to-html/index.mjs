import { processMarkdown } from './core.mjs';

function genResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  let parsed;
  try {
    parsed = JSON.parse(event?.body ?? '');
  } catch {
    return genResponse(400, { error: 'Invalid JSON body' });
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return genResponse(400, { error: 'JSON body must be an object' });
  }
  const { markdown, output = 'html' } = parsed;
  if (!markdown) return genResponse(400, { error: 'Missing markdown' });
  if (output !== 'html' && output !== 'plain') {
    return genResponse(400, { error: 'Invalid output type' });
  }
  try {
    const result = processMarkdown(markdown, output);
    return genResponse(200, { result });
  } catch (err) {
    console.error('Markdown processing failed', err);
    return genResponse(500, { error: 'Internal server error' });
  }
}
