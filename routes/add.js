const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require("../models");

router.get('/getskill', (req, res, next) => {
    db.skill.findAll().then(function(dbSkill) {
        res.json(dbSkill);
      });
  });

router.post('/addskill', (req, res, next) => {
    let data = {name : req.body.name, description : req.body.description}
    console.log(data)

    db.skill.create(data).then(function(dbSkill){
        res.json(dbSkill)
    })

})

router.get('/getarea', (req, res, next) => {
    db.area.findAll().then(function(dbArea) {
        res.json(dbArea);
      });
  });

router.post('/addarea', (req, res, next) => {
    let data = {name : req.body.name, description : req.body.description}
    console.log(data)
    db.area.create(data).then(function(dbArea){
        res.json(dbArea)
    })

})

module.exports = router;