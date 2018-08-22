'use strict'

module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('inventory', {
        count: {
            type: DataTypes.STRING,
            require: true
        },
    },
        {
            paranoid: true,
            underscored: true
        }
    )

    return Inventory
}