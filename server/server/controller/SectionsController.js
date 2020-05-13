const Sections = require('../models').Sections;
const Posts = require('../models').Posts;
const TagsMap = require('../models').TagMaps;
const Tags = require('../models').tags;
const Pagination = require('../helpers/pagination');
const uid = require('uid');
const Sequelize = require('sequelize');
const moment = require('moment')
const fs = require('fs');

exports.getAll = (req, res, next) => {

    Sections.findAndCountAll()
        .then(data => {
            Sections.findAll({
                order: [['id', 'DESC']],
            })
                .then(Sections => {
                    let sections = [];
                 
                    Sections.forEach(el=>{
                            sections.push({
                                id: el.id,
                                name:el.name,
                                description:el.description,
                                icon: req.protocol + '://' + req.headers.host + '/media-sec/' + el.icon
                            })
                    })
                    
                    res.send({
                        'result': sections
                    })
                })
        })
        .catch(err => {
            res.send({
                error: err
            })
        })
}


/**
 * create section 
 * @requires name
 * @requires description
 * @requires icon 
 */
exports.create = (req, res, next) => {
    let data = req.body;
    //  console.log('section icon', req.file);

    Sections.create({
            name: data.title,
            description: data.description,
            icon: req.file.filename,
        })
        .then(response => {
            res.status(200).send({
                data: 'success'
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}


/**
 * to get all posts for on section by id
 * 
 */
exports.getPosts = (req, res, next) => {
    let section_id = req.params.section_id;

    Posts.findAndCountAll().then(data => {
        const pag = Pagination(req, data, 25);

        Posts.findAll({
                where: {
                    SectionId: section_id,
                    status: 'published'
                },
                attributes: {
                    exclude: ['content']
                },
                include: [{
                    model: TagsMap,

                    include: [{
                        model: Tags
                    }]
                }],
                limit: pag.limit,
                offset: pag.offset,
            })
            .then(response => {

                let posts = [];
                response.forEach(el => {
                    posts.push({
                        id: el.id,
                        uid: el.uid,
                        title: el.title,
                        thumbnail: el.thumbnail ? 'http://localhost:3000/media-post/' + el.thumbnail : null,
                        summery: el.summery,
                        ex_link: el.ext_link,
                        image_link: el.image_link,
                        video_link: el.video_link,
                        type: el.type,
                        createdAt: moment(el.createdAt, "YYYYMMDD").fromNow(),
                        updatedAt: moment(el.updatedAt, "YYYYMMDD").fromNow(),
                        Tags: el.TagMaps ? el.TagMaps : null

                    })
                });

                res.send({
                    data: posts,
                    'count': data.count,
                    'pagination': pag
                })
            })
            .catch(error => {
                res.send({
                    error: error
                })
            })
    })


}


/**
 * return section info by title 
 * @param title
 */
exports.showByTitle = (req,res,next)=>{
    let sectionTitle = req.params.title;
    //console.log(section_name);
    Sections.findOne({  where:{name: sectionTitle}  })
        .then(sections => {
            let section = {
                id: sections.id,
                name: sections.name,
                icon: req.protocol + '://' + req.headers.host + '/media-sec/' + sections.icon,
                description: sections.description,
                createdAt: sections.createdAt,
                updatedAt: sections.updatedAt,
            }
            res.send({ data: section })
        })
        .catch(error => {
            res.send({
                error: error.message
            })
        })
}

/**
 * return section info  by id
 * @param id
 * 
 */
exports.showOne = (req, res, next) => {

    let section_id = req.params.id;
    //console.log(section_name);
    Sections.findOne({
            where: {
            id: section_id
            }
        })
        .then(sections => {

            let section = {
                id: sections.id,
                name: sections.name,
                icon: req.protocol + '://' + req.headers.host + '/media-sec/' + sections.icon,
                description: sections.description,
                createdAt: sections.createdAt,
                updatedAt: sections.updatedAt,
            }
            res.send({
                data: section
            })
        })
        .catch(error => {
            res.send({
                error: error.message
            })
        })
}

/* 
             let posts_data = [];

            sections.Posts.forEach(art => {
                posts_data.push({
                    id: art.id,
                    uid: art.uid,
                    title: art.title,
                    image:art.thumbnail? req.protocol + '://' + req.get('host') + '/images/' + art.thumbnail : null,
                    summery: art.summery,
                    date:moment(art.createdAt, "YYYYMMDD").fromNow(),
                 tags_map: art.TagMaps

                })
            }); */
/*           include:[{model: Posts ,where:{status:'published'},  attributes: {
              exclude: ['content']
            },
            include:[{model:TagsMap ,attributes:['id'] , include:[{model:Tags , attributes:['id', 'name']}] } ]
          }], */






exports.edit = (req, res, next) => {
    let section_id = req.params.id;
    let data = req.body;
    console.log(data);


    Sections.findOne({
            where: {
                id: section_id
            }
        })

        .then(section => {

            if (data.title) {
                section.name = data.title;
            }
            if (data.description) {
                section.description = data.description;
            }
            if (req.file) {
                fs.unlink('server/media/sections/' + section.get('icon'), (err) => {
                    if (err) {
                        res.send({
                            data: err
                        })
                    }
                })
                section.icon = req.file.filename;
            }

            return section.save();
        })
        .then(response => {
            res.send({
                data: 'success'
            })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}


exports.delete = (req, res, next) => {
    let section_id = req.body.id;
    Sections.findById(section_id)
        .then(section => {
            return section.destroy();
        })
        .then(response => {
            res.send({
                data: response
            })
            //res.redirect('/')
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}