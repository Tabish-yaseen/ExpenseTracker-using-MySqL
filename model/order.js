const{DataTypes}=require('sequelize')
const sequelize=require('../util/database')

const Order=sequelize.define('order',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true, 

    },
    paymentid:DataTypes.STRING,
    orderid:DataTypes.STRING,
    status:DataTypes.STRING

})
module.exports=Order