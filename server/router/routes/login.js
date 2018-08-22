'use strict'

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const verifyToken = require('./verification')

module.exports = (app, db) => {
    app.post("/login", (req, res) => {
        const token = ''
        const { user_name, email } = req.body
        const user = {
            user_name: user_name,
            email: email
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'spencer.lateema@gmail.com',
                pass: ''
            }
        })
        const mailOptions = {
            from: 'spencer.lateema@gmail.com',
            to: email,
            subject: 'API Token',
        }


        jwt.sign({ user }, 'secretKey', (err, token) => {
            mailOptions.text = token
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json({
                        error
                    })
                } else {
                    res.json({
                        token
                    })
                }
            })
        })
    })
}