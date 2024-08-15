import { processMarkdown, genResponse } from './core.mjs';

export async function handler(event, context) {
  if (!event || !event.body) {
    return genResponse(400, 'Missing body in event');
  }

  const jsonBody = JSON.parse(event.body);
  if (!jsonBody.markdown) {
    return genResponse(400, 'Missing markdown in body');
  }

  const outputType = jsonBody.output || 'html';
  const result = processMarkdown(jsonBody.markdown, outputType);

  return genResponse(200, result);
}