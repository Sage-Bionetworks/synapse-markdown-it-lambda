import { processMarkdown, genResponse } from './core.mjs';

export async function handler(event, context) {
  if (!event || !event.markdown) {
    return genResponse(400, 'Missing event or markdown');
  }
  const markdown = event.markdown;
  const outputType = event.output || 'html';
  if (outputType !== 'html' && outputType !== 'plain') {
    return genResponse(400, 'Invalid output type');
  } else {
    const result = processMarkdown(markdown, outputType);
    return genResponse(200, result);
  }
  
}