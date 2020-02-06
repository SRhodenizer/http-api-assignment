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
const port = process.env.port || process.env.NODE_PORT || 3000;

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
    
    if (parsedUrl.pathname === '/success') {
        const res = response;

        // uploads come in as a byte stream that we need
        // to reassemble once it's all arrived
        const body = [];

        // if the upload stream errors out, just throw a
        // a bad request and send it back
        request.on('error', (err) => {
            console.dir(err);
            res.statusCode = 400;
            res.end();
        });

        // on 'data' is for each byte of data that comes in
        // from the upload. We will add it to our byte array.
        request.on('data', (chunk) => {
            body.push(chunk);
        });

        // on end of upload stream.
        request.on('end', () => {
            // combine our byte array (using Buffer.concat)
            // and convert it to a string value (in this instance)
            const bodyString = Buffer.concat(body).toString();
            // since we are getting x-www-form-urlencoded data
            // the format will be the same as querystrings
            // Parse the string into an object by field name
            const bodyParams = query.parse(bodyString);

            // pass to our addUser function
            //jsonHandler.addUser(request, res, bodyParams);
        });
    }
};

// handle GET requests
const handleGet = (request, response, parsedUrl) => {
    // route to correct method based on url
    if (parsedUrl.pathname === '/style.css') {
        htmlHandler.getCSS(request, response);
    }else if (parsedUrl.pathname === '/') {
        htmlHandler.getIndex(request, response);
    } else if (parsedUrl.pathname === '/success') {
        jsonHandler.respondJSON(request,response,200,{id:200,message:"This is a successful response"});
    } else if (parsedUrl.pathname === '/badRequest') {
        jsonHandler.respondJSON(request,response,400,{id:400,message:"Missing valid query parameter set to true"});
    } else if (parsedUrl.pathname === '/badRequest?valid=true') {
        jsonHandler.respondJSON(request,response,200,{id:200,message:"Missing valid query parameter set to true"});
    } else if (parsedUrl.pathname === '/unauthorized') {
        jsonHandler.respondJSON(request,response,401,{id:401,message:"Missing loggedIn query parameter set to yes"});
    }else if (parsedUrl.pathname === '/unauthorized?loggedIn=yes') {
        jsonHandler.respondJSON(request,response,200,{id:200,message:"Missing loggedIn query parameter set to yes"});
    } else if (parsedUrl.pathname === '/forbidden') {
        jsonHandler.respondJSON(request,response,403,{id:403,message:"You do not have access to this content"});
    } else if (parsedUrl.pathname === '/internal') {
        jsonHandler.respondJSON(request,response,500,{id:500,message:"Internal Server Error. Something went wrong"});
    } else if (parsedUrl.pathname === '/notImplemented') {
        jsonHandler.respondJSON(request,response,501,{id:501,message:"A get request for this page has not been implemented yet. Check again later for updated content"});
    } else {
        jsonHandler.respondJSON(request,response,404,{id:404,message:"The page you were looking for was not found"});
    }
};

const onRequest = (request, response) => {
    // parse url into individual parts
    // returns an object of url parts by name
    const parsedUrl = url.parse(request.url);

    // check if method was POST, otherwise assume GET
    // for the sake of this example
    if (request.method === 'POST') {
        handlePost(request, response, parsedUrl);
    } else {
        handleGet(request, response, parsedUrl);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
