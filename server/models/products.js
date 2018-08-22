'use strict'

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        price: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            require: true
        },
        type: {
            type: DataTypes.STRING,
            require: true
        },
    },
        {
            paranoid: true,
            underscored: true
        }
    )

    return Product
}