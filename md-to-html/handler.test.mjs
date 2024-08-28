import { handler } from './index.mjs';
import { processMarkdown, genResponse } from './core.mjs';

describe('Handler tests', () => {

  test('missing event', async () => {
    const response = await handler(null, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ result: "Missing event or body" }));
  });

  test('missing body', async () => {
    const event = { 'notBody': '{ "notMarkdown": "someValue" }' };
    const response = await handler(event, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ result: "Missing event or body" }));
  });

  test('missing markdown - json', async () => {
    const event = { 'body': '{ "notMarkdown": "someValue" }' };
    const response = await handler(event, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ result:"Missing markdown in body" }));
  });

  test('invalid output type', async () => {
    const event = { body: JSON.stringify({ markdown: '# Test', output: 'xml' }) };
    const response = await handler(event, {});
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ result: "Invalid output type" }));
  });

  test('valid', async () => {
    const event = { body: JSON.stringify({ markdown: '# Test', output: 'plain' }) };
    const response = await handler(event, {});
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify({ result: "TEST" }));
  });

});