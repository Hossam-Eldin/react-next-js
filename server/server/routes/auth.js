

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
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashedPassword
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
/*
exports.login = async (req, res, next) => {
    const data = req.body;

    console.log(data.email, data.password)

    try {

        let admin = await Admins.findOne({
            where: {
                email: data.email
            }
        })

        if (!admin) {
            res.json({
                message: 'Admin Not Found'
            });

        }
        let doMatch = await bcrypt.compare(data.password, admin.password);
        if (doMatch) {
            res.json({
                admin_id: admin.id,

            })
        } else {
            res.json({
                message: 'invalid email or password'
            });
        }
    } catch (error) {
        res.json({
            err: error
        })
    }


}*/