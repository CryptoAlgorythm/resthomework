'use strict'

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        count: {
            type: DataTypes.STRING,
            require: true
        },
        address: {
            type: DataTypes.STRING,
            require: true
        },
    },
        {
            paranoid: true,
            underscored: true
        }
    )

    return Order
}