const Posts = require('../models').Posts;
const Sections = require('../models').Sections;
const Users = require('../models').Users;
const Tags = require('../models').tags;
const TagsMap = require('../models').TagMaps;
const Pagination = require('../helpers/pagination');
const uid = require('uid');
const sequelize = require('sequelize');
const moment = require('moment');
const Comments = require('../models').Comments;
const path = require('path')
const fs = require('fs')
const Reactions = require('../models').Reactions;


exports.getAll = (req, res, next) => {

    Posts.findAndCountAll({
        where: {
            type: 'Article',
            status: 'published',

        }
    }).then(data => {
        const pag = Pagination(req, data, 3);

        Posts.findAll({
            order: [
                ['id', 'DESC']
            ],
            where: {
                type: 'Article',
                status: 'published',
            },
            include: [{
                    model: Sections,
                    attributes: ['id', 'icon', 'name']
                },
                {
                    model: TagsMap,
                    include: [Tags],
                    attributes: ['id']
                },
                {
                    model: Users
                }
            ],
            limit: pag.limit,
            offset: pag.offset,
        }).then(articles => {


            tag = (tags) => {
                let tags_data = [];

                tags.forEach(el => {
                    tags_data.push({
                        id: el.id,
                        tag_id: el.tag.id,
                        tag_name: el.tag.name
                    })
                })

                return tags_data;

            }

            let data = [];
            articles.forEach(object => {
                data.push({
                    id: object.id,
                    uid: object.uid,
                    title: object.title,
                    summery: object.summery,
                    thumbnail: req.protocol + '://' + req.headers.host + '/media-art/' + object.thumbnail,
                    created_at: moment(object.createdAt, "YYYYMMDD").fromNow(),
                    section_id: object.Section ? object.Section.id : null,
                    section_name: object.Section ? object.Section.name : null,
                    tags: object.TagMaps ? tag(object.TagMaps) : null,
                    author: object.User ? object.User.username : null,
                    author_id: object.User ? object.User.id : null,
                    author_avatar : object.User? object.User.avatar: null

                })
            })
            //console.log('tags ==========   '+articles.TagsMap)
            res.send({
                'result': data,
                'count': data.count,
                'pagination': pag
            })
        })
    }).catch(err => {
        res.send({
            error: err
        })
    })
}

/**
 * display article by id 
 *  @param id
 */

exports.showOne = (req, res, next) => {
    let articleId = req.query.id;
    Posts.findOne({
            where: {
                id: articleId,
                type: 'Article'
            },
            attributes: [
                'id',
                'uid',
                'title',
                'summery',
                'thumbnail',
                'content',
                'status',
                'keywords',
                'UserId',
                'updatedAt',
                'UserId'
            ],
            include: [{
                    model: Sections,
                    attributes: ['id', 'icon', 'name']
                },
                {
                    model: Reactions
                },
                {
                    model: TagsMap,
                    include: [Tags],
                    attributes: ['id']
                },
                {
                    model: Users
                }

            ]
        })
        .then(response => {
            let tags = [];
            if (response.TagMaps) {
                response.TagMaps.forEach(el => {
                    tags.push({
                        map_id: el.id,
                        tag_id: el.tag.id,
                        tag_name: el.tag.name
                    })
                })
            }

            let data = {
                'id': response.id,
                'uid': response.uid,
                'title': response.title,
                'SectionId': response.SectionId ? response.SectionId : null,
                'Section_name': response.Section ? response.Section.name : null,
                'summery': response.summery,
                'image': req.protocol + '://' + req.headers.host + '/media-art/' + response.thumbnail,
                'content': response.content,
                'status': response.status,
                'createdAt': moment(response.createdAt, "YYYYMMDD").fromNow(),
                'updatedAt': moment(response.updatedAt, "YYYYMMDD").fromNow(),
                'keywords': response.keywords,
                'tags': tags,
                'reactions': response.Reaction,
                'author': response.User ? response.User.username : null,
                'author_id': response.User ? response.User.id : null,
                'author_avatar' : response.User? response.User.avatar: null

            }

            // console.log(response);
            res.send({
                data: data
            })
        })
        .catch(error => {
            res.send({
                error: error.message
            })
        })
}
/**
 * article list 
 */
exports.list = (req, res, next) => {
    Posts.findAll({
            where: {
                type: 'Article'
            },
            order: [
                ['id', 'DESC']
            ],
            attributes: [
                'id',
                'uid',
                'title',
                'summery',
                'thumbnail',
                [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt']
            ]
        })
        .then(response => {
            let data = [];
            response.forEach(object => {
                data.push({
                    id: object.id,
                    uid: object.uid,
                    title: object.title,
                    summery: object.summery,
                    image: req.protocol + '://' + req.headers.host + '/media-art/' + object.thumbnail,
                    create_at: object.createdAt
                })
            });

            res.send({
                data
            })

        }).catch(error => {

            res.send({
                error: error
            })
        })
}

/**
 * create article 
 * @requires [title,content,summery,thumbnail,status,tags,keywords,author_id]
 */
exports.Create = (req, res, next) => {
    // console.log('this from express ' ,req.file);
    let data = req.body;
    console.log(data);
 

    Posts.create({
        title: data.title,
        uid: uid(10),
        summery: data.summery,
        thumbnail: req.file.filename,
        content: data.content,
        status: data.status,
        SectionId: data.section_id,
        keywords: data.seo,
        lang: data.lang,
        type: 'Article',
        badge: data.badge
    }).then(response => {

        //create reactions
        Reactions.create({
            'PostId': response.get('id'),
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.message)
        })

        //handle tags and tag map
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

        res.send({data: 'success' })
    }).catch(error => {
        res.send({error: error.message })
    }) 

}


/**
 * update article by id 
 * @param id
 */
exports.update = async (req, res, next) => {
    let article_id = req.params.id
    let data = req.body;
    // console.log(req.body)
    // console.log(req.params.id)
    try {

        let article = await Posts.findOne({
            where: {
                id: article_id
            }
        });
        //title
        if (data.title) {
            article.title = data.title;
        }
        //summery
        if (data.summery) {
            article.summery = data.summery;
        }

        //status
        if (data.status) {
            article.status = data.status;
        }

        //content
        if (data.content) {
            article.content = data.content;
        }
        if (data.seo) {
            article.keywords = data.seo;
        }

        if (data.lang) {
            article.lang = data.lang;
        }
        //thumbnail
        if (req.file) {
            fs.unlink('server/media/articles/' + article.get('thumbnail'), (err) => {
                if (err) {
                    res.send({
                        data: err
                    })
                }
            })
            article.thumbnail = req.file.filename;
        }


        let response = await article.save()

        res.send({
            data: 'updated'
        })


    } catch (error) {
        next(error)
    }


}





/**
 *  delete  articles by id
 */

exports.delete = async (req, res, next) => {

    let article_id = req.params.id

    try {
        let response = await Posts.findOne({
            where: {
                id: article_id
            }
        });

        image = response.get('thumbnail')

        fs.unlink('server/media/articles' + image, (err) => {
            if (err) {
                console.log(err)
            }
        })

        try {
            let tagMap  = await TagsMap.destroy({
                where:{PostId: article_id}
            })
            let reactions = await Reactions.destroy({
               where:{PostId : article_id}
            })
            let deleted = await Posts.destroy({
                where: {id: article_id }
            })
            if (deleted ) {
                res.send({
                    data: 'post was successfully deleted'
                })
            }
        } catch (error) {
            res.send({
                data: error
            })
        }



    } catch (error) {
        next(error)
    }


}

/**get by badges */
exports.getByBadge = async (req, res, next) => {
    try {
        let badge = req.params.badge;
        let articles = await Posts.findAll({
            order: [
                ['id', 'DESC']
            ],
            where: {
                badge: badge
            },
            include: [{
                    model: TagsMap,
                    include: [Tags],
                    attributes: ['id']
                },
                {
                    model: Users
                }
            ],
        });

        tag = (tags) => {
            let tags_data = [];

            tags.forEach(el => {
                tags_data.push({
                    id: el.id,
                    tag_id: el.tag.id,
                    tag_name: el.tag.name
                })
            })

            return tags_data;

        }

        let data = [];
        articles.forEach(object => {
            data.push({
                id: object.id,
                uid: object.uid,
                title: object.title,
                summery: object.summery,
                thumbnail: req.protocol + '://' + req.headers.host + '/media-art/' + object.thumbnail,
                created_at: moment(object.createdAt, "YYYYMMDD").fromNow(),
                section_id: object.Section ? object.Section.id : null,
                section_name: object.Section ? object.Section.name : null,
                tags: object.TagMaps ? tag(object.TagMaps) : null,
                author: object.User ? object.User.username : null,
                author_id: object.User ? object.User.id : null,
            })
        })
        res.json({
            data: data
        })

    } catch (error) {
        res.json({
            data: error.message
        })
    }

}