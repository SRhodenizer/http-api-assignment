// pulls in the http module
const http = require('http');
// get the url module
const url = require('url');
// querystring module for parsing querystrings in the url
const query = require('querystring');
// pull in the response finals
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// sets up the port for the server
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handle GET requests
const handleGet = (request, response, parsedUrl, contentType, queryParam) => {
  // route to correct method based on url
  switch (parsedUrl.pathname) {
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;

    case '/':
      htmlHandler.getIndex(request, response);
      break;

    case '/success':
      if (contentType === 'application/json') {
        jsonHandler.getSuccess(request, response, 200);
      } else {
        jsonHandler.getSuccessXML(request, response, 200);
      }
      break;

    case '/badRequest':
      if (contentType === 'application/json') {
        jsonHandler.getBadRequest(request, response, 400, queryParam);
      } else {
        jsonHandler.getBadRequestXML(request, response, 400, queryParam);
      }

      break;

    case '/unauthorized':

      if (contentType === 'application/json') {
        jsonHandler.getUnauthorized(request, response, 401, queryParam);
      } else {
        jsonHandler.getUnauthorizedXML(request, response, 401, queryParam);
      }

      break;

    case '/forbidden':
      if (contentType === 'application/json') {
        jsonHandler.getForbidden(request, response, 403);
      } else {
        jsonHandler.getForbiddenXML(request, response, 403);
      }

      break;

    case '/internal':

      if (contentType === 'application/json') {
        jsonHandler.getInternal(request, response, 500);
      } else {
        jsonHandler.getInternalXML(request, response, 500);
      }
      break;

    case '/notImplemented':

      if (contentType === 'application/json') {
        jsonHandler.getNotImplemented(request, response, 501);
      } else {
        jsonHandler.getNotImplementedXML(request, response, 501);
      }
      break;

    default:
      if (contentType === 'text/xml') {
        jsonHandler.getNotFoundXML(request, response, 404);
      } else {
        jsonHandler.getNotFound(request, response, 404);
      }
      break;
  }
};

const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);

  // grab the 'accept' header for content type
  const dataType = request.headers.accept;

  // gets the query information from the parsed URL
  const params = query.parse(parsedUrl.query);

  // handles the get request with the prefered data type
  handleGet(request, response, parsedUrl, dataType, params);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
