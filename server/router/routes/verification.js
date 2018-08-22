'use strict'

module.exports = (req, res, next) => {
    // Get auth header value
    // We we send our token we want to send it in the header as the authorization value
    const bearerHeader = req.headers['authorization']
    // Check if Bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(" ")
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }
}