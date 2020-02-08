// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {
        'Content-Type': 'application/json',
    });
    response.write(JSON.stringify(object));
    response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, {
        'Content-Type': 'application/json',
    });
    response.end();
};

// functions for the required requests
const getSuccess = (request, response, status) => {
    return respondJSON(request, response, status, {
        id: status,
        message: 'This is a successful response',
    });
};

const getSuccessMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};

const getBadRequest = (request, response, status) => {
    if (status === 400) {
        return respondJSON(request, response, status, {
            id: status,
            message: 'Missing valid query parameter set to false',
        });
    } else if (status === 200) {
        return respondJSON(request, response, status, {
            id: status,
            message: 'Missing valid query parameter set to true',
        });
    }
};

const getBadRequestMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};

const getUnauthorized = (request, response, status) => {
    return respondJSON(request, response, status, {
        id: status,
        message: 'Missing loggedIn query parameter set to yes',
    });
};

const getUnauthorizedMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};

const getForbidden = (request, response, status) => {
    return respondJSON(request, response, status, {
        id: status,
        message: 'You do not have access to this content',
    });
};

const getForbiddenMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};


const getInternal = (request, response, status) => {
    return respondJSON(request, response, status, {
        id: status,
        message: 'Internal Server Error. Something went wrong',
    });
};

const getInternalMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};


const getNotImplemented = (request, response, status) => {
    return respondJSON(request, response, status, {
        id: status,
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    });
};

const getNotImplementedMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};

const getNotFound = (request, response, status) => {
    return respondJSON(request, response, status, {
        id: status,
        message: 'The page you were looking for was not found',
    });
};

const getNotFoundMeta = (request, response, status) => {
    return respondJSONMeta(request, response, status);
};

// public exports
module.exports = {
    getSuccess,
    getSuccessMeta,
    getBadRequest,
    getBadRequestMeta,
    getUnauthorized,
    getUnauthorizedMeta,
    getForbidden,
    getForbiddenMeta,
    getInternal,
    getInternalMeta,
    getNotImplemented,
    getNotImplementedMeta,
    getNotFound,
    getNotFoundMeta,
};
