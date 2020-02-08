// pulls in the http module
const http = require('http');
// get the url module
const url = require('url');
// querystring module for parsing querystrings in the url
// const query = require('querystring');
// pull in the response finals
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// sets up the port for the server
const port = process.env.port || process.env.NODE_PORT || 3000;

// handle GET requests
const handleGet = (request, response, parsedUrl) => {
    // route to correct method based on url
    if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    } else if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
    } else if (parsedUrl.pathname === '/success') {
        jsonHandler.getSuccess(request, response, 200);
    } else if (parsedUrl.pathname === '/badRequest') {
        jsonHandler.getBadRequest(request, response, 400);
    } else if (parsedUrl.pathname === '/badRequest?valid=true') {
        jsonHandler.getBadRequest(request, response, 200);
    } else if (parsedUrl.pathname === '/unauthorized') {
        jsonHandler.getUnauthorized(request, response, 401);
    } else if (parsedUrl.pathname === '/unauthorized?loggedIn=yes') {
        jsonHandler.getUnauthorized(request, response, 200);
    } else if (parsedUrl.pathname === '/forbidden') {
        jsonHandler.getForbidden(request, response, 403);
    } else if (parsedUrl.pathname === '/internal') {
        jsonHandler.getInternal(request, response, 500);
    } else if (parsedUrl.pathname === '/notImplemented') {
        jsonHandler.getNotImplemented(request, response, 501);
    } else {
        jsonHandler.getNotFound(request, response, 404);
    }
};

const onRequest = (request, response) => {
    // parse url into individual parts
    // returns an object of url parts by name
    const parsedUrl = url.parse(request.url);
    handleGet(request, response, parsedUrl);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
