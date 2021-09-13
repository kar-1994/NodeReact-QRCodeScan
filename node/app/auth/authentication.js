const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) // Unauthorized

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403) //expired

        req.userId = user.id

        next()
    })
};
module.exports = auth;
