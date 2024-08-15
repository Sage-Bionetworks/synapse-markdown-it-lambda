import markdownIt from 'markdown-it';
import synapsePlugin from 'markdown-it-synapse';
import { htmlToText } from 'html-to-text';
import juice from 'juice';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import markdownItCenterText from 'markdown-it-center-text';
import markdownItSynapseHeading from 'markdown-it-synapse-heading';
import markdownItSynapseTable from 'markdown-it-synapse-table';
import markdownItStrikethroughAlt from 'markdown-it-strikethrough-alt';
import markdownItContainer from 'markdown-it-container';
import markdownItEmphasisAlt from 'markdown-it-emphasis-alt';
import markdownItInlineComments from 'markdown-it-inline-comments';
import markdownItBr from 'markdown-it-br';
import markdownItSynapseMath from 'markdown-it-synapse-math';
import markdownItSubAlt from 'markdown-it-sub-alt';
import markdownItSupAlt from 'markdown-it-sup-alt';


export function genResponse(status, result) {
  const responseHeaders = {
    "X-Powered-By": "Sage Bionetworks Synapse",
    "Content-Type": "application/json",
  };
  const errorResponse = {
    statusCode: status,
    headers: responseHeaders,
    body: JSON.stringify({
      result: result,
    }),
  };
  return errorResponse;
}

export function processMarkdown(markdown, outputType) {
  const md = markdownIt()
  md.use(synapsePlugin, '', markdown.baseURL)     
    .use(markdownItSub)
    .use(markdownItSup)
    .use(markdownItCenterText)
    .use(markdownItSynapseHeading)
    .use(markdownItSynapseTable)
    .use(markdownItStrikethroughAlt)
    .use(markdownItContainer)
    .use(markdownItEmphasisAlt)
    .use(markdownItInlineComments)
    .use(markdownItBr)
    .use(markdownItSynapseMath);

  const resultHtml = md.render(markdown);
  console.log("resultHtml:" + resultHtml);
  let endResult = "";

  if (outputType == 'html') {
    endResult = resultHtml;
  } else if (outputType == 'plain') {
      endResult = htmlToText(resultHtml, { wordwrap: 130 });
  }/* else {
        endResult = juice.inlineContent(resultHtml, css);
        // console.log("CSS: " + endResult);
        callback(null, genSuccessResponse(endResult));
  }*/

  return endResult;
}