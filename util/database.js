const Sequelize=require('sequelize').Sequelize


const sequelize=new Sequelize('nodejs-','root','loading123',{
    dialect:'mysql',
    host:'localhost',
    
});

module.exports=sequelize