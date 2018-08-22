'use strict'

const verifyToken = require('../routes/verification')
const jwt = require('jsonwebtoken')

module.exports = (app, db) => {
    // GET all products
    app.get('/product', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                db.products.findAll()
                    .then(products => {
                        res.json(products)
                    })
            }
        })
    })

    // GET one product by id
    app.get('/product/:id', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)

                db.products.find({
                    where: {
                        id: id
                    }
                })
                    .then(product => {
                        res.json(product)
                    })
            }
        })
    })

    // POST
    app.post('/product', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                // price product type
                const price = req.body.price
                const name = req.body.name
                const type = req.body.type

                db.products.create({
                    price: price,
                    name: name,
                    type: type
                })
                    .then(newProduct => {
                        res.json(newProduct)
                    })
            }
        })
    })

    // PATCH
    app.patch('/product/:id', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)
                const updates = req.body

                db.products.find({
                    where: {
                        id: id
                    }
                })
                    .then(product => {
                        return product.updateAttributes(updates)
                    })
                    .then(updatedProduct => {
                        res.json(updatedProduct)
                    })
            }
        })
    })

    // DELETE
    app.delete('/product/:id', verifyToken, (req, res) => {

        jwt.verify(req.token, 'secretKey', (err, authData) => {

            if (err) {
                res.sendStatus(403)
            } else {
                const id = parseInt(req.params.id)
                db.products.destroy({
                    where: {
                        id: id
                    }
                })
                    .then(deletedProduct => {
                        res.json(deletedProduct)
                    })
            }
        })
    })
}