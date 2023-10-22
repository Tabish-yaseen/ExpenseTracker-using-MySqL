const{DataTypes}=require('sequelize')
const sequelize=require('../util/database')

const filesDownloaded=sequelize.define('filesdownload',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true, 

    },
    URL:DataTypes.STRING,
    date:DataTypes.DATE
    

})
module.exports=filesDownloaded