import { handler } from './index.mjs';
import { processMarkdown } from './core.mjs';

describe('Handler tests', () => {

  test('missing event', async () => {
    await expect(handler(null, {})).rejects.toThrow('Missing event or markdown');
  });

  test('missing markdown - json', async () => {
    await expect(handler({"notMarkdown": "someValue" }, {})).rejects.toThrow('Missing event or markdown');
  });

  test('invalid output type', async () => {
    await expect(handler({ markdown: "# Test", "output": "xml" }, {})).rejects.toThrow('Invalid output type');
  });

  test('valid', async () => {
    const event = { markdown: "# Test", output: "plain" };
    const response = await handler(event, {});
    expect(response.result).toBe("TEST");
  });

});