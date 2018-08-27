'use strict'

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    db = require('./server/config/db.js'),
    env = require('./server/config/.env'),
    favicon = require('serve-favicon'),
    router = require('./server/router/index'),
    path = require('path'),
    fs = require('fs')

const app = express()
const PORT = env.PORT

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

router(app, db);

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*") // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    // set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type, Accept, X-Access-Token,X-Key")
    if (req.method == 'OPTIONS') {
        res.status(200).end()
    } else {
        next()
    }
})

app.listen(PORT, (error) => {
    if (error) {
        console.error(error)
        return process.exit(1)
    } else {
        console.log(`Listening on port: ${PORT}.`)
    }
})
