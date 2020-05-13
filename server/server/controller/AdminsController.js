const Admins = require('../models').Users;
const uid = require('uid');
const bcrypt = require('bcrypt');
const passport = require('passport')

/**
 * return list of all existing admins 
 */

exports.getAll = (req, res, next) => {
    Admins.findAll()
        .then(response => {
            res.status(200).send({
                data: response
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}





/**
 * to create new admins
 *  @requires firstName
 *  @requires lastName
 *  @requires email
 *  @requires password
 */

exports.create =async (req, res, next) => {
  
    let data = req.body;
    console.log(data)
    try {
        let response = await Admins.findOne({
            where: {
                email: data.email
            }
        })

        if (response) {
            res.send({
                message: ' This Email Already Exist'
            })
        } else {
            let hashedPassword = await bcrypt.hash(data.password, 12);

            let admin = await Admins.create({
                uid: uid(),
                username: data.userName,
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                password: hashedPassword,
                type: data.type
            })
            if (admin) {
                res.status(200).send({
                    message: 'success',
                    admin_id: admin.id,
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}



/**
 * 
 */
exports.singUp = async (req, res, next) => {

    let data = req.body;
    console.log(data)
    try {
        let response = await Admins.findOne({
            where: {
                email: data.email
            }
        })

        if (response) {
            res.send({
                message: ' This Email Already Exist'
            })
        } else {
            let hashedPassword = await bcrypt.hash(data.password, 12);

            let admin = await Admins.create({
                uid: uid(),
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: hashedPassword,
                type: 'Super-Admin'
            })
            if (admin) {
                res.status(200).send({
                    message: 'Account Created Successfully',
                    admin_id: admin.id,
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

/**
 * 
 * Login Admin
 */

exports.login = (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err)
            res.send({
                error: info
            })
        }
        if (!user) {
            res.send({
                //url: '/cpl',
                err: info
            })
        }
        req.logIn(user, (err) => {
            if (err) {
                res.send({
                    error: err
                })
            }
            let url = req.protocol + '://' + req.headers.host + '/dashboard';
            //  return  res.redirect(url)
            Admins.findOne({
                where: {
                    id: user.id
                }
            }).then(response => {
                if (response.type == 'Admin') {
                    res.send({
                        url: '/dashboard',
                        type: response.type
                    })
                } else {
                    res.send({
                        url: '/'
                    })
                }
            }).catch(err => {
                console.log(err.message)
            })


        })
    })(req, res, next)
}