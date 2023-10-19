const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const userRoute=require('./routes/user')
const expenseRoute=require('./routes/expense')
const  purchaseRoute=require('./routes/purchase')
const premiumRoute=require('./routes/premium')
const passwordRoute=require('./routes/password')

const sequelize=require('./util/database')

const user=require('./model/user')
const expense=require('./model/expense')
const order=require('./model/order')


const app=express()
app.use(bodyParser.json())
app.use(cors())

 app.use('/user',userRoute)
 app.use('/expense',expenseRoute)
 app.use('/purchase',purchaseRoute)
 app.use('/premium',premiumRoute)
 app.use('/password',passwordRoute)


user.hasMany(expense)
expense.belongsTo(user)

user.hasMany(order)
order.belongsTo(user)


sequelize.sync({force:false}).then(()=>{
    app.listen(3000)

})


 
 
