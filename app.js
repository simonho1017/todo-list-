const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session =require('express-session')

const routes = require('./routes')

const usePassport=require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret:'ThisIsMysecret',
  resave:false,
  saveUninitialized:true
}))

usePassport(app)

app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.isAuthenticated() 
  res.locals.user =req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
