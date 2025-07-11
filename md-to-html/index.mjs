import { processMarkdown } from './core.mjs';

export async function handler(event, context) {
  if (!event || !event.markdown) {
    throw new Error('Missing event or markdown');
  }
  const markdown = event.markdown;
  const outputType = event.output || 'html';
  if (outputType !== 'html' && outputType !== 'plain') {
    throw new Error('Invalid output type');
  } else {
    const result = processMarkdown(markdown, outputType);
    return {result: result };
  }
  
}