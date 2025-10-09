const xss = require('xss');

function sanitizeQuery (req, res, next) {
    if (req.query && Object.keys(req.query).length > 0) {
       const original = JSON.parse(JSON.stringify(req.query));
       const sanitized = {};
       for (const key of Object.keys(original)) {
           sanitized[key] = xss(original[key]);
       }
       req.query = sanitized;
    }
    next();
} 

module.exports =  sanitizeQuery;   
        