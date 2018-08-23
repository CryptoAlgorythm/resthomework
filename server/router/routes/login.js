'use strict'

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const verifyToken = require('./verification')
const env = require('../../config/.env')

module.exports = (app, db) => {
    app.post("/login", (req, res) => {
        const token = ''
        const EMAIL_PASSWORD = env.EMAIL_PASSWORD
        const { user_name, email } = req.body
        const user = {
            user_name: user_name,
            email: email
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'spencer.lateema@gmail.com',
                pass: EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
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