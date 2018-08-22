'use strict'

const verifyToken = require('../routes/verification')
const jwt = require('jsonwebtoken')

module.exports = (app, db) => {
    const options = {}
    // GET
    app.get('/inventory', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                // Included this one time to show how joins work
                options.include = [
                    {
                        model: db.products
                    }
                ]
                db.inventory.findAll(options)
                    .then(products => {
                        res.json(products)
                    })
            }
        })
    })

    // GET one inventory record
    app.get('/inventory/:id', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)

                db.inventory.find({
                    where: {
                        id: id
                    }
                })
                    .then(products => {
                        res.json(products)
                    })
            }
        })
    })

    // POST
    app.post('/inventory', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {

            } else {
                const product_id = parseInt(req.body.product_id)
                const count = parseInt(req.body.count)

                db.inventory.create({
                    product_id: product_id,
                    count: count,
                })
                    .then(newInventory => {
                        res.json(newInventory)
                    })
            }
        })
    })

    // PATCH
    app.patch('/inventory/:id', verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)
                const updates = req.body

                db.inventory.find({
                    where: {
                        id: id
                    }
                })
                    .then(inventoryItem => {
                        return inventoryItem.updateAttributes(updates)
                    })
                    .then(updatedItem => {
                        res.json(updatedItem)
                    })
            }
        })
    })

    // DELETE
    app.delete('/inventory/:id', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)

                db.inventory.destroy({
                    where: {
                        id: id
                    }
                })
                    .then(deletedItem => {
                        res.json(deletedItem)
                    })
            }
        })
    })
}