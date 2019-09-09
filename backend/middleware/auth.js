let jwt = require('jsonwebtoken');

const SECRET = 'secret';

const isAuthenticated = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            status: 403,
            message: 'FORBIDDEN'
        })
    } else {
        const token = parseAuthorization(authHeader);
        if (token) {

            try {
                console.log('validate', token);
                jwt.verify(token, SECRET);
                next();
            } catch (e) {
                console.log(e);
                return res.status('401')
                .json({success: false, message: 'UNAUTHORIZED'});
            }
        } else {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN'
            })
        }
    }
    next();
};


const parseAuthorization = (authHeader) => {

    const splitAuth = authHeader.split('Bearer');
    if (splitAuth[1]) {
        return splitAuth[1].trim();
    }
};

module.exports = isAuthenticated;