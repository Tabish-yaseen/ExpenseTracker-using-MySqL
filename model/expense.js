const { DataTypes } = require('sequelize')
const sequelize = require('../util/database')

const expense=sequelize.define('expense',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false

    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=expense