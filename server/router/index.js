'use strict'

const routes = [
    require('./routes/products'),
    require('./routes/orders'),
    require('./routes/inventory'),
    require('./routes/login')
]

// Add access to the app and db objects to each route
module.exports = function router(app, db) {
    return routes.forEach((route) => {
        route(app, db)
    })
}