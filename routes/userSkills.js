const router = require('express').Router();
const auth = require('../middleware/auth');
const db = require("../models");
const users = require('../models/users');

router.get('/getuserskill', (req, res, next) => {
    console.log('req')
    db.userskill.findAll({
        // where: {
        //     id: req.body.user
        //     // skill: req.body.skill[0]
        // }
    }).then(function(dbUserskill){
        
        if ( dbUserskill == '' ){
            // db.userskill.create(data).then(function(dbskill){
            //     console.log(dbskill)
            // })
            
        }
        else {
            res.json(dbUserskill)
        }
    })
})
// Need to loop and add skillID to table to keep them connected
router.post('/adduserskill', auth, async (req, res, next) => {
    console.log('28', req)
    const username = req.id;
    const data = req.body;
    // let info = {name : req.body.skill[0], description : req.body.description}
    // console.log(req.body.skill[0])

    data.forEach(async element => {

        console.log(element)
        // const project = await db.skill.findOne({ where: { ID: element } });
        const data = {userId : req.userid, skillId : element.skillId, areaId : element.areaId, level: element.level }
        console.log(data)
        db.userskill.findAll({
            where: {
                userId : req.userid,
                skillID: element.skillId,
                areaId: element.areaId
            }
        }).then(function(dbUserskill){
            
            if ( dbUserskill == '' ){
                console.log('create')
                db.userskill.create(data).then(function(dbskill){
                    console.log(dbskill)
                })
            }
            else {
                console.log('foundone')
                //console.log(dbUserskill)
            }
        })
        // }


    });
})

router.delete('/deluserskill', async (req, res, next) => {
    console.log(req.body)
    db.userskill.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(result){
        res.json(result)
    })
})

router.get('/getuskill', auth, async (req, res, next) => {
    console.log(req)
    //res.json('done')
    const uskill = await db.userskill.findAll({
        where: {
            userid: req.userid
        },
        raw: true
    })
    console.log(uskill)
    res.json(uskill)
})

router.get('/youremployee', async (req, res, next) => {
    db.user.findAll({
        include: [{
            model: db.userskill
            
        }]
    }).then(skill => {
        res.send(skill)
    })
})

router.get('/skilluserskill', async (req, res, next) => {
    db.skill.findAll({
        include: [{
            model: db.userskill
            
        }]
    }).then(skill => {
        res.send(skill)
    })
})


router.delete('/delskill', async (req, res, next) => {
    console.log(req.body)
    // db.skill.destroy({
    //     where: {
    //         id: req.body.id
    //     }
    // }).then(function(result){
    //     res.json(result)
    // })
})

router.delete('/delarea', async (req, res, next) => {
    console.log(req.body.id)
    db.area.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(result){
        res.json(result)
    })
})

module.exports = router;