const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const userRoute=require('./routes/user')
const expenseRoute=require('./routes/expense')
const sequelize=require('./util/database')
const user=require('./model/user')
const expense=require('./model/expense')

const app=express()
app.use(bodyParser.json())
app.use(cors())

 app.use('/user',userRoute)
 app.use('/expense',expenseRoute)


user.hasMany(expense)
expense.belongsTo(user)


sequelize.sync({force:false}).then(()=>{
    app.listen(3000)

})


 
 
