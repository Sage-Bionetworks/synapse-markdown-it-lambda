import { processMarkdown, genResponse } from './core.mjs';

describe('core tests', () => {

  test('genResponse - success', () => {
    const response = genResponse(200, 'Test Success');
    expect(response).toEqual({
      statusCode: 200,
      headers: {
        "X-Powered-By": "Sage Bionetworks Synapse",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result: 'Test Success',
      }),
    });
  });

  test('header - plain', () => {
    const result = processMarkdown("# Hello Markdown!", "plain");
    expect(result).toBe('HELLO MARKDOWN!');
  });

  test('superscript - html', () => {
    const result = processMarkdown("29^th^", "html");
    expect(result).toContain('<sup>th</sup>');
  });

});
