const{DataTypes}=require('sequelize')
const sequelize=require('../util/database')

const password=sequelize.define('password',{
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isActive: {
        type:DataTypes.BOOLEAN,
        allowNull: false,
      },
    })
    
  
  module.exports = password
