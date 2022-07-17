const express = require('express')
const path = require('path')
const connectionDB = require('./DB/connection')
require('dotenv').config()
const app = express()
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const port = process.env.PORT
const indexRouter = require('./module/index.router')
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static(path.join(__dirname ,'./uploads/')))
var store = new MongoDBStore({
    uri: process.env.DBURL,
    collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
}))

app.use(flash())
app.use(indexRouter.authRouter)
app.use(indexRouter.postRouter)
app.set('views', 'views')
app.set('view engine', 'ejs')

connectionDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


