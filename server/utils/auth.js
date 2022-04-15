const jwt = require('jsonwebtoken');

const secret = 'mysecretshhhhh';

const expiration = '1h';

module.exports = {

    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    },

    authMiddleware: function({ req }) {
        // this allows to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization

        // separate "Bearer" from the "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim();
        }

        // if no token, return request object as is
        if (!token) {
            return req;
        }

        // return updated request object
        return req;
    }

};

