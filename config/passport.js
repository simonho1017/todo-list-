const passport = require('passport')
const user = require('../models/user')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app=>{
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({usernameField:'email'},(email,password,done)=>{
    user.findOne({email})
    .then(user =>{
      if(!user){
        return done(null,false,{message:'That email is not registered'})
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Email or Password incorrect' })
      }
      return done(null,user)
    })
    .catch(err =>done(err,false))

  }))
  passport.serializeUser((user,done)=>{ 
    done(null,user.id)
  })

  passport.deserializeUser((id,done)=>{
    User.findById(id)
    .lean()
    .then(user => done(null,user))
    .catch(err =>done(err,false))
  })


}