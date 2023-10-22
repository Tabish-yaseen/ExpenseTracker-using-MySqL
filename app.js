const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

//routes imported
const userRoute=require('./routes/user')
const expenseRoute=require('./routes/expense')
const  purchaseRoute=require('./routes/purchase')
const premiumRoute=require('./routes/premium')
const passwordRoute=require('./routes/password')

const sequelize=require('./util/database')

// modals imported
const user=require('./model/user')
const expense=require('./model/expense')
const order=require('./model/order')
const forgotPasswordRequest=require('./model/forgotPasswordRequest')
const  filesDownloaded=require('./model/filesDownloaded')


const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

 app.use('/user',userRoute)
 app.use('/expense',expenseRoute)
 app.use('/purchase',purchaseRoute)
 app.use('/premium',premiumRoute)
 app.use('/password',passwordRoute)

//relations
user.hasMany(expense)
expense.belongsTo(user)

user.hasMany(order)
order.belongsTo(user)

user.hasMany(forgotPasswordRequest)
forgotPasswordRequest.belongsTo(user)

user.hasMany(filesDownloaded)
filesDownloaded.belongsTo(user)


sequelize.sync({force:false}).then(()=>{
    app.listen(3000)

})


 
 
