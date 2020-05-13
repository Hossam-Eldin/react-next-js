const Comments = require('../models').Comments;
const Reapplies = require('../models').Reapplies;
const Users = require('../models').Users;
const moment = require('moment');

/**
 *  Create Comment 
 *  @requires PostId
 * @requires UserId
 * @requires Comment
 * 
 */
exports.createComment = (req, res, next) => {

    let data = req.body;
    console.log(data)
    //res.send({data: data})

    Comments.create({
            PostId: data.post_id,
            UserId: data.user_id,
            comment: data.comment,
            upVote: 0,
            downVote: 0
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
 * update comment 
 */

exports.updateComment = async (req, res, next) => {
    let data = req.body;
    try {
        let comment = await Comments.findOne({
            where: data.comment_id
        });

        data.comment_text ? comment.comment = data.comment_text : null;
        data.upVote ? comment.upVote = comment.upVote + 1 : null;
        data.downVote ? comment.downVote = comment.downVote + 1 : null;

        let newComment = comment.save();

        res.send({
            data: newComment
        });


    } catch (error) {

        res.send({
            error: error
        })
    }
}


/**
 *  Delete Comment 
 * @param id 
 */
exports.deleteComment = (req, res, next) => {
    let comment_id = req.params.id;
    Comments.destroy({
            where: {
                id: comment_id
            }
        })
        .then(response => {
            res.send({
                data: response
            })
        }).catch(error => {
            res.send({
                error: error
            })
        })
}


/** ####### Reply functions ######## */

/**
 * create new reply
 */
exports.createReply = (req, res, next) => {

    let data = req.body;

    Reapplies.create({
            CommentId: data.comment_id,
            PostId: data.post_id,
            UserId: data.user_id,
            comment: data.comment,
            upVote: 0,
            downVote: 0
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
 * update reply
 */
exports.updateReply = async (req, res, next) => {
    let data = req.body;
    try {
        let reply = await Reapplies.findOne({
            where: data.reply
        });

        data.comment_text ? reply.comment = data.comment_text : null;
        data.upVote ? reply.upVote = reply.upVote + 1 : null;
        data.downVote ? reply.downVote = reply.downVote + 1 : null;

        let newReply = reply.save();

        res.send({
            data: newReply
        });


    } catch (error) {

        res.send({
            error: error
        })
    }
}

/**
 * delete reply
 */
exports.deleteReply = (req, res, next) => {
    let reply_id = req.params.id;
    Reapplies.destroy({
            where: {
                id: reply_id
            }
        })
        .then(response => {
            res.send({
                data: response
            })
        }).catch(error => {
            res.send({
                error: error
            })
        })
}

/**##################     get comments for post id    ################## */

reappliesTrans= (data)=>{

    let response = [];
    data.forEach(el=>{
        response.push({
            id:el.id,
            reply : el.comment,
            user_id:el.User.id,
            avatar: el.User.avatar,
            username: el.User.username,
            created_at: moment(el.createdAt, "YYYYMMDD").fromNow(),

        })
    })
    return  response;
} 



exports.getComments = (req, res, next) => {
    let post_id = req.params.id;

    Comments.findAll({
            where: {
                PostId: post_id
            },
            include: [
            {
                model: Users,
                attributes:['username','id','avatar']
            },
             {
                model: Reapplies,
                include:[{
                    model: Users,
                    attributes:['username','id','avatar']
                }]
            }]
        })
        .then(response => {

              

             let comments = [];

            response.forEach(el => {
                comments.push({
                    id:el.id,
                    comment: el.comment,
                    created_at: moment(el.createdAt, "YYYYMMDD").fromNow(),
                    username : el.User.username,
                    avatar:el.User.avatar,
                    user_id: el.User.id,
                    upVote: el.upVote,
                    downVote:el.downVote,
                   reapplies: el.Reapplies ? reappliesTrans(el.Reapplies) : null
                })
            }); 

            res.send({
                data: comments
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}