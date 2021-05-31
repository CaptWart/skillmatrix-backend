const db = require("../models");

const createuser = function(userinfo) {
    const userData = { 
        employeeid: userinfo.uid, 
        phone:  userinfo.telephoneNumber.replace(/\D/g,''), 
        manager: userinfo.manager.split(', ')[0].replace(/\D/g,''),
        name: userinfo.displayName,
        email: userinfo.mail,
        mphone: userinfo.mobile.replace(/\D/g,''),
        roles: userinfo.FxRole
    }
    
    console.log(userData)
    console.log('hit create user')
    db.user.findOne({
        raw: true,
        where: {employeeid: userData.employeeid}
    }).then(function(dbusers){
        if (!dbusers){
            console.log('create')
            db.user.create(
                {
                    raw: true,
                    userData
                }
                
                ).then(function(newuser){
                console.log(newuser);
            })
        }
        else{
            console.log('foundone')
        }
    })
}

module.exports = createuser;