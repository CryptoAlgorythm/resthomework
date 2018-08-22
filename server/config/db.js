'use strict'

const Sequelize = require('sequelize')
const env = require('./.env')
const sequelize = new Sequelize(
    env.DATABASE_NAME,
    env.DATABASE_USERNAME,
    env.DATABASE_PASSWORD,
    {
        host: env.DATABASE_HOST,
        port: env.DATABASE_PORT,
        dialect: env.DATABASE_DIALECT,
        define: {
            underscored: true
        }
    }
)

// Connect the models/tables in the database to a db object,
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Models/tables
db.products = require('../models/products')(sequelize, Sequelize)
db.orders = require('../models/orders')(sequelize, Sequelize)
db.inventory = require('../models/inventory')(sequelize, Sequelize)

// Relations
db.products.hasMany(db.inventory)
db.products.hasMany(db.orders)
db.inventory.belongsTo(db.products)
db.orders.belongsTo(db.products)



module.exports = db