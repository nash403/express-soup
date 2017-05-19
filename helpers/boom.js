/**
 * @param {*} req the request object
 * @param {number} statusCode
 * @param {string} errorType String
 * @param {string} message additionnal message to send with the response
 * @param {*} data the response payload
 * @return a formatted object that represent an HTTP response code
 */
function createResponse(req, statusCode, responseType, message, data) {
    return {
      statusCode,
      responseType,
      message,
      payload: data || {}
    }
}

// 2xx
exports.ok = (req, message, data) => createResponse(req, 200, 'OK', message, data);
exports.created = (req, message, data) => createResponse(req, 201, 'Created', message, data);
exports.noContent = (req, message, data) => createResponse(req, 204, 'No content', message, data);
// 3xx
exports.movedPermanently = (req, message, data) => createResponse(req, 301, 'Moved permanently', message, data);
exports.movedTemporarily = (req, message, data) => createResponse(req, 302, 'Moved Temporarily', message, data);
exports.useCached = (req, message, data) => createResponse(req, 302, 'Not modified', message, data);
// 4xx
exports.badRequest = (req, message, data) => createResponse(req, 400, 'Bad Request', message, data);
exports.unauthorized = (req, message, data) => createResponse(req, 401, 'Unauthorized', message, data);
exports.paymentRequired = (req, message, data) => createResponse(req, 402, 'Payment Required', message, data);
exports.forbidden = (req, message, data) => createResponse(req, 403, 'Forbidden', message, data);
exports.notFound = (req, message, data) => createResponse(req, 404, 'Not Found', message, data);
exports.methodNotAllowed = (req, message, data) => createResponse(req, 405, 'Method Not Allowed', message, data);
exports.notAcceptable = (req, message, data) => createResponse(req, 406, 'Not Acceptable', message, data);
exports.proxyAuthRequired = (req, message, data) => createResponse(req, 407, 'Proxy Authentication Required', message, data);
exports.clientTimeout = (req, message, data) => createResponse(req, 408, 'Request Time-out', message, data);
exports.conflict = (req, message, data) => createResponse(req, 409, 'Conflict', message, data);
exports.resourceGone = (req, message, data) => createResponse(req, 410, 'Gone', message, data);
exports.lengthRequired = (req, message, data) => createResponse(req, 411, 'Length Required', message, data);
exports.preconditionFailed = (req, message, data) => createResponse(req, 412, 'Precondition Failed', message, data);
exports.entityTooLarge = (req, message, data) => createResponse(req, 413, 'Request Entity Too Large', message, data);
exports.uriTooLong = (req, message, data) => createResponse(req, 414, 'Request-URI Too Large', message, data);
exports.unsupportedMediaType = (req, message, data) => createResponse(req, 415, 'Unsupported Media Type', message, data);
exports.rangeNotSatisfiable = (req, message, data) => createResponse(req, 416, 'Requested Range Not Satisfiable', message, data);
exports.expectationFailed = (req, message, data) => createResponse(req, 417, 'Expectation Failed', message, data);
exports.badData = (req, message, data) => createResponse(req, 422, 'Unprocessable Entity', message, data);
exports.locked = (req, message, data) => createResponse(req, 423, 'Locked', message, data);
exports.preconditionRequired = (req, message, data) => createResponse(req, 428, 'Precondition Required', message, data);
exports.tooManyRequests = (req, message, data) => createResponse(req, 429, 'Too Many Requests', message, data);
exports.illegal = (req, message, data) => createResponse(req, 451, 'Unavailable For Legal Reasons', message, data);
// 5xx
exports.badImplementation = (req, message, data) => createResponse(req, 500, 'Internal Server Error', message, data);
exports.notImplemented = (req, message, data) => createResponse(req, 501, 'Not Implemented', message, data);
exports.badGateway = (req, message, data) => createResponse(req, 502, 'Bad Gateway', message, data);
exports.serverUnavailable = (req, message, data) => createResponse(req, 503, 'Service Unavailable', message, data);
exports.gatewayTimeout = (req, message, data) => createResponse(req, 504, 'Gateway Time-out', message, data);

module.exports = exports;
