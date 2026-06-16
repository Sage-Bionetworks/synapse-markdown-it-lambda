import { handler } from './index.mjs';

describe('Handler tests', () => {

  test('missing event body', async () => {
    const response = await handler({ body: null });
    expect(response.statusCode).toBe(400);
  });

  test('malformed JSON body', async () => {
    const response = await handler({ body: 'not-json' });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).error).toBe('Invalid JSON body');
  });

  test('missing markdown field', async () => {
    const response = await handler({ body: JSON.stringify({ notMarkdown: 'someValue' }) });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).error).toBe('Missing markdown');
  });

  test('invalid output type', async () => {
    const response = await handler({ body: JSON.stringify({ markdown: '# Test', output: 'xml' }) });
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).error).toBe('Invalid output type');
  });

  test('valid html output', async () => {
    const response = await handler({ body: JSON.stringify({ markdown: '# Test' }) });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).result).toContain('<h1');
  });

  test('valid plain output', async () => {
    const response = await handler({ body: JSON.stringify({ markdown: '# Test', output: 'plain' }) });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).result).toBe('TEST');
  });

});
