const Tags = require('../models').tags;
const TagsMap = require('../models').TagMaps;
const Articles = require('../models').Articles;
const Sections = require('../models').Sections;

/**
 * get section last tags
 * 
 */

exports.sectionTag = (req, res, next) => {
    let section_Id = req.query.section;
    TagsMap.findAll({
            where: {
                SectionId: section_Id
            },
            //  attributes: ['id', 'tagId'],
            order: [
                ['id', 'DESC']
            ],
            group: 'tagId',
            limit: 10,
            include: [{
                model: Tags,
                attributes: ['id', 'name']
            }],
        })
        .then(response => {
            let data = response
            let tags = [];

            data.forEach(item => {
                tags.push({
                    map_id: item.id,
                    tag_id: item.tagId,
                    tag_name: item.tag.name
                })
            })

            res.status('200').json({
                data: tags
            })
        }).catch(error => {
            res.send({
                data: error
            });
        })
}


exports.tagmap = (req, res, next) => {
    TagsMap.findAll({
            include: [{
                    model: Articles
                },
                {
                    model: Tags
                }
            ]
        })
        .then(response => {
            res.send({
                data: response
            })
        })
        .catch(error => {
            console.log(error)
        })
}



exports.getAll = (req, res, next) => {
    Tags.findAll({
            include: [{
                model: TagsMap
            }]
        })
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
 *  @param tag name
 *  
 * @returns tag info with articles 
 * 
 */

exports.showOne = (req, res, next) => {
    let tag_title = req.params.name;

    Tags.findOne({
            where: {
                name: tag_title
            },
            include: [{
                model: TagsMap,
                include: [{
                    model: Articles,
                    include: [Sections]
                }]
            }]
        })
        .then(response => {

            let articles_data = [];

            response.tags_maps.forEach(item => {
                articles_data.push({
                    map_id: item.id,
                    id: item.Article.id,
                    title: item.Article.title,
                    uid: item.Article.uid,
                    summery: item.Article.summery,
                    image: req.protocol + '://' + req.get('host') + '/images/' + item.Article.thumbnail,
                    createdAt: item.Article.createdAt.toISOString().slice(0, 10),
                    section_id: item.Article.Section.id,
                    section_title: item.Article.Section.name,
                    section_description: item.Article.Section.description,
                    section_icon: item.Article.Section.icon,

                })
            });

            let tag = {
                id: response.id,
                name: response.name,
                createdAt: response.createdAt.toISOString().slice(0, 10),
                articles: articles_data
            }


            res.status(200).send({
                data: tag
            });
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
}





//delete tag map with id 
exports.deleteMap = async (req, res, next) => {
    let map_id = req.params.id;
    try {
        let response = await TagsMap.destroy({
            where: {
                id: map_id
            }
        })

        res.send({
            data: 'map was deleted'
        })


    } catch (error) {
        res.send({
            error: error
        })
    }
}

//create tag map 
exports.createMap =(req, res,next) => {
    let data = req.body;
    console.log(data)

           //handle tags  in case it's string one tag
           if (typeof data.tags === 'string' || data.tags instanceof String) {
            Tags.findOrCreate({
                where: {
                    name: data.tags
                }
            })
            .then(([tags, created]) => {
                TagsMap.create({
                    tagId: tags.dataValues.id,
                    SectionId: data.section_id,
                    PostId: data.post_id,
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
                        PostId: data.post_id
                    })
                    .then(response => {
                        // console.log(response)
                    })
                }).catch(error => {
                    console.log(error)
                })
            }
        }
 
    }