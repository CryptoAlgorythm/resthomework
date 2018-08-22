'use strict'

const verifyToken = require('../routes/verification')
const jwt = require('jsonwebtoken')

module.exports = (app, db) => {
    // Get all orders
    app.get('/order', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                db.orders.findAll()
                    .then(orders => {
                        res.json(orders)
                    })
            }
        })
    })

    // GET one order record
    app.get('/order/:id', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)
                db.orders.find({
                    where: {
                        id: id
                    }
                })
                    .then(order => {
                        res.json(order)
                    })
            }
        })
    })

    // POST
    app.post('/order', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                // price product type
                const { product_id, count, address } = req.body
                db.orders.create({
                    product_id: product_id,
                    count: count,
                    address: address,
                })
                    .then(newOrder => {

                        const product_id = newOrder.product_id
                        const newCount = newOrder.count
                        db.inventory.find({
                            where: {
                                product_id: product_id
                            }
                        }).then(product => {
                            return product.increment('count', { by: newCount })
                        }).then(updatedInventory => {
                            // reload to get instance in sync
                            updatedInventory.reload().then(() => {
                                res.json(updatedInventory)
                            })
                        })
                    })
            }
        })
    })

    // PATCH
    app.patch('/order/:id', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)
                const updates = req.body

                db.orders.find({
                    where: {
                        id: id
                    }
                })
                    .then(orderItem => {
                        return orderItem.updateAttributes(updates)
                    })
                    .then(updatedOrder => {
                        res.json(updatedOrder)
                    })
            }
        })
    })

    // DELETE
    app.delete('/order/:id', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)

                db.orders.find({
                    where: {
                        id: id
                    }
                }).then(order => {
                    const product_id = order.product_id
                    const oldCount = order.count
                    db.inventory.find({
                        where: {
                            product_id: product_id
                        }
                    }).then(product => {
                        return product.decrement('count', { by: oldCount })
                    }).then(updatedInventory => {
                        // reload to get instance in sync

                        updatedInventory.reload().then(() => {
                            res.json(updatedInventory)
                        })
                    }
                    )
                    db.orders.destroy({
                        where: {
                            id: order.id
                        }
                    })
                })
            }
        })
    })
}