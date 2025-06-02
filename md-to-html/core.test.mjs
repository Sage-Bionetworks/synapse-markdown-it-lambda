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

  test('invalid markdown - html', () => {
    const result = processMarkdown("some bad *markdown#", "html");
    expect(result).toBe('<p>some bad *markdown#</p>\n');
  });

  test('invalid outputType', () => {
    const result = processMarkdown("some text", "invalid");
    expect(result).toBe('');
  });

  test('synapse id', () => {
    const result = processMarkdown("testing Synapse link [Research Communities](#!Synapse:syn3722562/wiki/219258)", "html");
    expect(result).toBe('<p>testing Synapse link <a href="/Synapse:syn3722562/wiki/219258">Research Communities</a></p>\n');
  })

  test('synapse id', () => {
    const result = processMarkdown("syn12345", "html");
    expect(result).toBe('<p><a href="/Synapse:syn12345">syn12345</a></p>\n');
  })

  test('link', () => {
    const result = processMarkdown("a simple link https://google.com", "html");
    expect(result).toBe('<p>a simple link <a href="https://google.com" target="_blank" ref="noopener noreferrer">https://google.com</a></p>\n');
  })

  test('widget', () => {
    const result = processMarkdown("a ${widget}", "html");
    expect(result).toBe('<p>a <span data-widgetparams="widget" class="widgetContainer" id="widget-0" data-widget-type="">&lt;Synapse widget&gt;</span></p>\n');
  })

  test('table', () => {
    const result = processMarkdown("c1|c2|c3\n---|---|---\nv1|v2|v3", "html");
    expect(result).toBe('<table class="markdowntable">\n<thead>\n<tr>\n<th>c1</th>\n<th>c2</th>\n<th>c3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>v1</td>\n<td>v2</td>\n<td>v3</td>\n</tr>\n</tbody>\n</table>\n');
  })

  test('email', () => {
    const result = processMarkdown("An email@address.com is not a mention", "html");
    expect(result).toBe('<p>An <a href="mailto:email@address.com" target="_blank" ref="noopener noreferrer">email@address.com</a> is not a mention</p>\n');
  })

  test('style', () => {
    const result = processMarkdown("*italic* and ** bold ** or _italic_ and __bold__", "html");
    expect(result).toBe('<p><em>italic</em> and <strong> bold </strong> or <em>italic</em> and <strong>bold</strong></p>\n');
  })


});
