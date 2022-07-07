const express = require('express')
const UseStrictPlugin = require('webpack/lib/UseStrictPlugin')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name, email, password, confirmpassword
      })
    } else {
      return User.create({
        name, email, password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    }
  })
    .catch(err => console.log(err))

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
