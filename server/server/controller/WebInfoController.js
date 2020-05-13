const WebInfo = require('../models').WebInfo;
const Contact = require('../models').Contact;




exports.getAll = async (req, res, next) => {
    try {
        let result = await WebInfo.findAll()
        res.send({
            data: result
        })

    } catch (error) {
        res.send({
            error: error
        })
    }
}



/** 
 * create  web info like social media 
 * link or phone or email
 * @requires name
 *@requires  content
 *@requires  tag 
 */

exports.create = (req, res, next) => {
    let data = req.body;
    console.log(data)

    WebInfo.create({
            info_name: data.name,
            info_content: data.content,
            tag: data.tag
        })
        .then(response => {
            res.status(200).send({
                data: response,
                message: 'success'
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}


/**
 * return al web info that belong to name
 * @requires name in the query url
 */

exports.getByName = (req, res, next) => {
    let name = req.query.name;
    WebInfo.findOne({
            where: {
                info_name: name
            }
        })
        .then(response => {
            res.send({
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
 * return all web info that belong to tag 
 * @requires tag in the query url
 */

exports.getByTag = (req, res, next) => {
    let tag = req.query.tag

    WebInfo.findAll({
            where: {
                tag: tag
            },
        })
        .then(response => {
            res.send({
                data: response
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}





exports.edit = async (req, res, next) => {
    let web_info_id = req.params.id
    let data = req.body;
    console.log(data)
    try {
        let info = await WebInfo.findOne({
            where: {
                id: web_info_id
            }
        })
        if (data.name) {
            info.info_name = data.name
        }

        if (data.content) {
            info.info_content = data.content
        }
        if (data.tag) {
            info.tag = data.tag
        }
        let newInfo = await info.save()

        res.send({
            data: newInfo,
            message: 'success'
        })

    } catch (error) {
        res.send({
            error: error
        })
    }
}
/** * 
 * show one info
 * @requires id
 */

exports.showOne = (req, res, next) => {
    let webInfoId = req.params.id;
    WebInfo.findOne({
        where: {
            id: webInfoId
        }
    }).then(response => {
        res.send({
            data: response
        })
    }).catch(error => {
        res.send({
            error: error.message
        });
    })
}


exports.delete = (req, res, next) => {
    let webInfoId = req.params.id;
    console.log(webInfoId);
    WebInfo.destroy({
            where: {
                id: webInfoId
            }
        })
        .then(response => {
            res.send({
                data: response
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })

}



/***Contact us */

exports.createMessage = (req, res, next) => {
    let data = req.body;
    Contact.create({
            subject: data.subject,
            email: data.email,
            about: data.about,
            message: data.message,
            name: data.name
        })
        .then(response => {
            res.send({
                data: response,
                message: 'success'
            })
        })
        .catch(error => {

        })
}


exports.staticPages = (req, res, next) => {
    let page = req.params.title;

    WebInfo.findOne({
            where: {
                info_name: page,
                tag: 'pages'
            }
        })
        .then(response => {
            res.send({
                data: response
            });
        })
        .catch(error => {

        })
}