// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {
        'Content-Type': 'application/json',
    });
    response.write(JSON.stringify(object));
    response.end();
};

const respondXML = (request, response, status, object) => {
    response.writeHead(status, {
        'Content-Type': 'text/xml',
    });

    let responseXML = '<response>';
    if (object.id) {
        responseXML = `${responseXML} <id>${object.id}</id>`;
    }
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} </response>`;

    response.write(responseXML);
    response.end();
};

// function to respond without json body
// takes request, response and status code
// const respondJSONMeta = (request, response, status) => {
//  response.writeHead(status, {
//    'Content-Type': 'application/json',
//  });
//  response.end();
// };

// functions for the required requests
const getSuccess = (request, response, status) => respondJSON(request, response, status, {
    message: 'This is a successful response',
});


const getBadRequest = (request, response, status, params) => {
    const responseJSON = {
        id: 1,
        message: 1,
    };
    //
    if (!params.valid || params.valid !== 'true') {
        // set our error message
        responseJSON.message = 'Missing valid query parameter set to true';
        // give the error a consistent id
        responseJSON.id = 'badRequest';
        // return our json with a 400 bad request code
        return respondJSON(request, response, status, responseJSON);
    }

    // if the parameter is here, send json with a success status code
    return respondJSON(request, response, 200, responseJSON);
};


const getUnauthorized = (request, response, status, params) => {
    const responseJSON = {
        id: 1,
        message: 1,
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        // set our error message
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        // give the error a consistent id
        responseJSON.id = 'unauthorized';
        // return our json with a 400 bad request code
        return respondJSON(request, response, status, responseJSON);
    }

    // if the parameter is here, send json with a success status code
    return respondJSON(request, response, 200, responseJSON);
};



const getForbidden = (request, response, status) => respondJSON(request, response, status, {
    id: 'forbidden',
    message: 'You do not have access to this content',
});


const getInternal = (request, response, status) => respondJSON(request, response, status, {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong',
});


const getNotImplemented = (request, response, status) => respondJSON(request, response, status, {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
});


const getNotFound = (request, response, status) => respondJSON(request, response, status, {
    id: 'notFound',
    message: 'The page you were looking for was not found',
});


const getSuccessXML = (request, response, status) => respondXML(request, response, status, {
    message: 'This is a successful response',
});


const getBadRequestXML = (request, response, status, params) => {
    const responseJSON = {
        id: 1,
        message: 1,
    };
    if (!params.valid || params.valid !== 'true') {
        // set our error message
        responseJSON.message = 'Missing valid query parameter set to true';
        // give the error a consistent id
        responseJSON.id = 'badRequest';
        // return our json with a 400 bad request code
        return respondXML(request, response, status, responseJSON);
    }

    // if the parameter is here, send json with a success status code
    return respondJSON(request, response, 200, responseJSON);
};


const getUnauthorizedXML = (request, response, status, params) => {
    const responseJSON = {
        id: 1,
        message: 1,
    };

    if (!params.loggedIn || params.loggedIn !== 'yes') {
        // set our error message
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        // give the error a consistent id
        responseJSON.id = 'unauthorized';
        // return our json with a 400 bad request code
        return respondXML(request, response, status, responseJSON);
    }

    // if the parameter is here, send json with a success status code
    return respondXML(request, response, 200, responseJSON);
};


const getForbiddenXML = (request, response, status) => respondXML(request, response, status, {
    id: 'forbidden',
    message: 'You do not have access to this content',
});


const getInternalXML = (request, response, status) => respondXML(request, response, status, {
    id: 'internalError',
    message: 'Internal Server Error. Something went wrong',
});


const getNotImplementedXML = (request, response, status) => respondXML(request, response, status, {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
});


const getNotFoundXML = (request, response, status) => respondXML(request, response, status, {
    id: 'notFound',
    message: 'The page you were looking for was not found',
});


// public exports
module.exports = {
    getSuccess,
    getSuccessXML,
    getBadRequest,
    getBadRequestXML,
    getUnauthorized,
    getUnauthorizedXML,
    getForbidden,
    getForbiddenXML,
    getInternal,
    getInternalXML,
    getNotImplemented,
    getNotImplementedXML,
    getNotFound,
    getNotFoundXML,
};
