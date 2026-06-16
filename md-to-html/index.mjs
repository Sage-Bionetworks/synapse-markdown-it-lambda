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
    parsed = JSON.parse(event.body);
    if (!parsed || typeof parsed !== 'object') throw new Error();
  } catch {
    return genResponse(400, { error: 'Invalid JSON body' });
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
    return genResponse(500, { error: err.message });
  }
}
