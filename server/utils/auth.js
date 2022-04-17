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

        // if no token return empty object
        if (!token) {
            return {};
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            return {
                user: data
            };
        } catch {
            console.log('Invalid token');
            return res.status(400).json({ message: 'invalid token!' });
        }
    }

};

