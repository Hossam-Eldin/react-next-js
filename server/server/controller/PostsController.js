const Posts = require('../models').Posts;
const Tags = require('../models').tags;
const TagsMap = require('../models').TagMaps;
const Sections = require('../models').Sections;
const Reactions = require('../models').Reactions;
const Pagination = require('../helpers/pagination');
const uid = require('uid')
const moment = require('moment')
const fs = require('fs')

exports.getAll = (req, res, next) => {

    Posts.findAndCountAll().then(data => {
        const pag = Pagination(req, data, 10);
        Posts.findAll({
            limit: pag.limit,
            offset: pag.offset,
            where: {
                type: ['Post', 'image_link', 'Video_link', 'external_Link'],
                status: 'published',
            },
            order: [
                ['id', 'DESC']
            ]
        }).then(posts => {

            const tagsTrans = (tags_data) => {
                let tags = [];
                tags_data.forEach(el => {
                    tags.push({
                        map_id: el.id,
                        tag_id: el.tag.id,
                        tag_name: el.tag.name
                    })
                })
                return tags;
            }
            let posts_data = [];
            posts.forEach(el => {
                posts_data.push({
                    id: el.id,
                    uid: el.uid,
                    title: el.title,
                    SectionId: el.SectionId,
                    Section_name: el.Section ? el.Section.name : null,
                    status: el.status,
                    type: el.type,
                    summery: el.summery ? el.summery : null,
                    ext_link: el.ext_link ? el.ext_link : null,
                    image_link: el.image_link ? el.image_link : null,
                    video_link: el.video_link ? el.video_link : null,
                    thumbnail: el.thumbnail ? req.protocol + '://' + req.headers.host + '/media-post/' + el.thumbnail : null,
                    createdAt: moment(el.createdAt, "YYYYMMDD").fromNow(),
                    updatedAt: moment(el.updatedAt, "YYYYMMDD").fromNow(),
                    tags: el.TagMaps ? tagsTrans(el.TagMaps) : null
                })
            })


            res.send({
                'result': posts_data,
                'count': data.count,
                'pagination': pag
            });
        })
    }).catch(err => {
        res.send({
            error: err
        })
    })

};


exports.list = (req, res, next) => {
    Posts.findAll({
            order: [
                ['id', 'DESC']
            ],
            where: {
                type: ['Video_Link', 'Image_Link', 'external_Link', 'Post']
            },
            attributes: [
                'id',
                'uid',
                'title',
                'type'
            ]
        }).then(response => {
            res.send({
                data: response
            })
        })
        .catch(error => {
            res.send({
                data: error
            })
        })
}

/**create for admins */
exports.create = (req, res, next) => {
    let data = req.body;
    console.log(data);
    Posts.create({
            uid: uid(),
            title: data.title,
            SectionId: data.section_id,
            status: data.status,
            type: data.type,
            summery: data.description ? data.description : null,
            ext_link: data.ext_link ? data.ext_link : null,
            image_link: data.image_link ? data.image_link : null,
            video_link: data.video_link ? data.video_link : null,
            thumbnail: req.file ? req.file.filename : null,


        })
        .then(response => {
            //create reactions
            Reactions.create({
                    'PostId': response.get('id'),
                })
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err.message)
                })
            //handle tags  in case it's string one tag
            if (typeof data.tags === 'string' || data.tags instanceof String) {
                Tags.findOrCreate({
                    where: {
                        name: data.tags
                    }
                }).then(([tags, created]) => {
                    TagsMap.create({
                        tagId: tags.dataValues.id,
                        SectionId: data.section_id,
                        PostId: response.get('id'),
                    })
                })
            }
            //handel the tags if it array more than one tag
            if (Array.isArray(data.tags)) {
                for (let i = 0; i < data.tags.length; i++) {
                    Tags.findOrCreate({
                        where: {
                            name: data.tags[i]
                        }
                    }).then(([tags, created]) => {
                        //   console.log('this tag'+tags.dataValues.id)
                        // tagsId.push(tags.dataValues.id);
                        TagsMap.create({
                            tagId: tags.dataValues.id,
                            SectionId: data.section_id,
                            PostId: response.get('id')
                        }).then(response => {
                            // console.log(response)
                        })
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
            //finish handling the tag 
            //response with data 
            res.send({
                data: "success"
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}



/** upload multi posts */

exports.creatMulti = (req,res,next) =>{
    let data = req.body;
    console.log(data);
    /* for (let i = 0; i < data.length; i++) {
        
    } */

}




/**create post  by user */

exports.userCreatePost = (req, res, next) => {
    let data = req.body;
    console.log(data);
    Posts.create({
            uid: uid(),
            UserId: data.user_id,
            title: data.title,
            UserId: data.user_id,
            SectionId: data.section_id,
            status: 'published',
            type: data.type,
            summery: data.description ? data.description : null,
            ext_link: data.ext_link ? data.ext_link : null,
            image_link: data.image_link ? data.image_link : null,
            video_link: data.video_link ? data.video_link : null,
            thumbnail: req.file ? req.file.filename : null,


        })
        .then(response => {
            //create reactions
            Reactions.create({
                    'PostId': response.get('id'),
                })
                .then(response => {
                    console.log(response);
                })
                .catch(err => {
                    console.log(err.message)
                })



            //handle tags  in case it's string one tag
            if (typeof data.tags === 'string' || data.tags instanceof String) {
                Tags.findOrCreate({
                    where: {
                        name: data.tags
                    }
                }).then(([tags, created]) => {
                    TagsMap.create({
                        tagId: tags.dataValues.id,
                        SectionId: data.section_id,
                        PostId: response.get('id'),
                    })
                })
            }
            //handel the tags if it array more than one tag
            if (Array.isArray(data.tags)) {
                for (let i = 0; i < data.tags.length; i++) {
                    Tags.findOrCreate({
                        where: {
                            name: data.tags[i]
                        }
                    }).then(([tags, created]) => {
                        //   console.log('this tag'+tags.dataValues.id)
                        // tagsId.push(tags.dataValues.id);
                        TagsMap.create({
                            tagId: tags.dataValues.id,
                            SectionId: data.section_id,
                            PostId: response.get('id')
                        }).then(response => {
                            // console.log(response)
                        })
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }




            //finish handling the tag 
            //response with data 
            res.send({
                message: "success"
            })
        })
        .catch(error => {
            res.send({
                error: error.message
            })
        })
}

/**show one posts by id */

exports.showOne = (req, res, next) => {
    let postId = req.query.post_id;
    Posts.findOne({
            where: {
                id: postId
            },
            include: [{
                model: TagsMap,
                include: [{
                    model: Tags
                }],
            }, {
                model: Sections
            }],
        })
        .then(response => {


            let tags = [];
            response.TagMaps.forEach(el => {
                tags.push({
                    map_id: el.id,
                    tag_id: el.tag.id,
                    tag_name: el.tag.name
                })
            })

            let post = {

                uid: response.uid,
                title: response.title,
                SectionId: response.SectionId,
                Section_name: response.Section ? response.Section.name : null,
                status: response.status,
                type: response.type,
                summery: response.summery ? response.summery : null,
                ext_link: response.ext_link ? response.ext_link : null,
                image_link: response.image_link ? response.image_link : null,
                video_link: response.video_link ? response.video_link : null,
                thumbnail: response.thumbnail ? req.protocol + '://' + req.headers.host + '/media-post/' + response.thumbnail : null,
                createdAt: moment(response.createdAt, "YYYYMMDD").fromNow(),
                updatedAt: moment(response.updatedAt, "YYYYMMDD").fromNow(),
                tags: tags
            };
            res.send({
                data: post
            })
        }).catch(error => {
            console.log(error)
        })
};




exports.editAdmin = async (req, res, next) => {
    let post_id = req.params.id;
    let data = req.body;
    console.log(data)

    try {
        let post = await Posts.findOne({
            where: {
                id: post_id
            }
        })
        if (data.title) {
            post.title = data.title;
        }
        if (data.summery) {
            post.summery = data.summery;
        }
        if (data.section_id) {
            post.SectionId = data.section_id
        }
        if (data.image_link) {
            post.image_link = data.image_link
        }

        if (data.video_link) {
            post.video_link = data.video_link
        }

        if (data.ext_link) {
            post.ext_link = data.ext_link
        }

        if (req.file) {
            post.thumbnail = req.file.filename
        }



        let newPost = await post.save();

        res.send({
            data: 'success',
            result: newPost
        })

    } catch (error) {
        res.send({
            data: error
        })
    }
}




exports.deleteAdmin = async (req, res, next) => {
    let post_id = req.params.id;
    try {
        let post = await Posts.findOne({
            where: {
                id: post_id
            }
        });
        if (post.get('thumbnail')) {
            fs.unlink('server/media/posts' + post.get('thumbnail'), (err) => {
                if (err) {
                    console.log(err)
                }
            })

        }
        let deleted = await Posts.destroy({
            where: {
                id: post_id
            }
        })
        if (deleted) {
            res.send({
                data: 'Post Deleted'
            })
        }

    } catch (error) {
        res.send({
            data: error
        })
    }
}