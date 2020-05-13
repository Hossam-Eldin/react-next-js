const Posts = require('../models').Posts;
const Random = require('../models').Random;
const sequelize = require('sequelize');
const moment = require('moment');
const Op = sequelize.Op

let PostTransformer = (data, req) => {
    let PostData = {
        title: data.Post.title,
        thumbnail: data.Post.thumbnail ? req.protocol + '://' + req.headers.host + '/media-post/' + data.Post.thumbnail : null,
        image_link: data.Post.image_link,
        summery: data.Post.summery
    }

    return PostData;
}

exports.getAll = (req, res, next) => {
    Random.findAll({
            include: [{
                model: Posts
            }]
        })
        .then(response => {
            let posts = [];
            response.forEach(el => {
                posts.push({
                    id: el.Post.id,
                    title: el.Post.title,
                    image: req.protocol + '://' + req.headers.host + '/media-post/' + el.Post.thumbnail,
                    summery: el.Post.summery
                })
            });
            res.send({
                data: posts
            })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.random = (req, res, next) => {
    let type = req.query.tag;
    console.log('this type from random ' + type);
    Random.findOne({
            order: [
                [sequelize.literal('RAND()')]
            ],
            limit: 1,
            include: [{
                model: Posts
            }],
            where: {
                Random_tag: type
            },
        })
        .then(result => {
            let data = PostTransformer(result, req);

            res.send({
                data: data
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}
/**create random  */
exports.create = async (req, res, next) => {
    let data = req.body;
    try {

        for (let i = 0; i < data.posts.length; i++) {
            //console.log(data.posts[i]);
            let post = await Posts.findOne({
                where: {
                    id: data.posts[i]
                }
            });

            let random = await Random.create({
                Random_tag: data.tag,
                PostId: data.posts[i]
            });

            res.send({
                message: 'success'
            });

            console.log(random)

        }
    } catch (error) {
            res.send({message:error.message});
    }

}





/**search on posts type post */
exports.postList = async (req, res, next) => {
    let query = req.query.search;
    try {
        let response = await Posts.findAll({
            where: {
                type: 'Post',
                [Op.or]: [{
                    title: {
                        [Op.like]: '%' + query + '%'
                    }
                }],

            }
        })
        res.send({
            data: response
        })
    } catch (error) {
        next(error)
    }
}
/**export all post  list of type post to be used by creating random  */
exports.listTypePost = async (req, res, next) => {
    try {
        let response = await Posts.findAll({
            where: {
                type: 'Post'
            }
        })

        let data = []
        response.forEach(el => {
            data.push({
                title: el.title,
                id: el.id
            })
        })
        res.send({
            data: data
        })

    } catch (error) {
        res.send({
            data: error.message
        })
    }
}




exports.delete = (req, res, next) => {
    let post_id = req.params.id;
    Random.destroy({
            where: {
                PostId: post_id
            }
        })
        .then(response => {
            res.send({
                data: 'rand was deleted'
            })
        })
        .catch(error => {
            console.log(error)
        })
}