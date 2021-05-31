const router = require('express').Router();
const passport = require('passport');
require('../middleware/ldap')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const createuser = require('../middleware/createuser')
const db = require('../models')

router.post('/login', passport.authenticate('ldapauth', {session: false} ), function(req, res, done) {

  db.user.findOne({
    raw: true,
    where:{ employeeid: req.user.uid }
  }).then(function(userInfo){
    console.log(req.user)
    if ( !userInfo ){

      const userData = { 
        employeeid: req.user.uid, 
        phone:  req.user.telephoneNumber.replace(/\D/g,''), 
        manager: req.user.manager.split(', ')[0].replace(/\D/g,''),
        name: req.user.displayName,
        email: req.user.mail,
        mphone: req.user.mobile.replace(/\D/g,''),
        roles: req.user.FxRole
    }

    db.user.create(userData).then(function(newuser){
      

      console.log('line45: ',newuser.toJSON());
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 60);
      const token = jwt.sign({userid: newuser.id, id: newuser.employeeid, email: newuser.email}, process.env.jwtsecret, {
        expiresIn: '3600s'
      });
      return res.cookie('token', token, { httpOnly: true, secure: false }).sendStatus(200);

  })


      //const newUser = createuser(req.user);


    }
    else{
      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + 60);
      const token = jwt.sign({userid: userInfo.id, id: userInfo.employeeid, email: userInfo.email}, process.env.jwtsecret, {
        expiresIn: '3600s'
      });
      return res.cookie('token', token, { httpOnly: true, secure: false }).sendStatus(200);
    }
  })

});

router.post('/test', function(req, res){
  console.log('test')
})
router.get('/user', auth, (req, res, next) => {
  db.user.findOne({
    raw: true,
    where:{ employeeid: req.id }
  }).then(function(userInfo){
    const user = {userid: userInfo.id, id: req.id, email: req.email}
    console.log(user)
    return res.send(user)
  })

});

router.get('/allusers', (req, res, next) => {
  db.user.findAll().then(function(allUsers){
    return res.send(allUsers)
  })

});

module.exports = router;