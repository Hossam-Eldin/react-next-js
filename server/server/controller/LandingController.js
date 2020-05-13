const Posts = require('../models').Posts;
const Sections = require('../models').Sections;
const Users = require('../models').Users;
const Tags = require('../models').tags;
const TagsMap = require('../models').TagMaps;
const sequelize = require('sequelize');
const moment = require('moment');
const Op = sequelize.Op
const Landing = require('../models').Landing;









SliderTransformer = (data) => {
    let response = [];
    data.forEach(el => {
        response.push({
            id: el.id,
            uid: el.uid,
            title: el.title,
            ext_link: el.ext_link ? el.ext_link : null,
            image_link: el.image_link ? el.image_link : null,
            video_link: el.video_link ? el.video_link : null,
            thumbnail: el.thumbnail ? 'http://localhost:3000/media-post/' + el.thumbnail : null,
            type:el.type,
            createdAt: moment(el.createdAt, "YYYYMMDD").fromNow(),
            updatedAt: moment(el.updatedAt, "YYYYMMDD").fromNow(),
        })
    });
    return response;
}

/**
 * 
 * to get the last posts submited
 */

exports.getSlider = async (req, res, next) => {

    try {

        let response = await Posts.findAll({
            where: {
                status: 'published',
                type:['image_link','Video_Link','external_Link','post']
            },
            include: [{
                model: Sections
            }, {
                model: TagsMap
            }],
            limit: (30),
            order: [
                ['id', 'DESC']
            ]
        })

        let data = SliderTransformer(response)


        res.send({
            data: data
        })
    } catch (error) {
      //  next(error)
    }


}

/**
 * get all featured 
 */

exports.getFeatured = async (req, res, next) => {
    try {

        let response = await Landing.findAll({
            where: {
                landing_tag: 'featured'
            },
            include:[{model: Sections},{model:Posts}]
        })

        //posts transformer
        let posts = [];
        response.forEach(el=>{
            posts.push({
                id: el.Post.id,
                uid: el.Post.uid,
                title: el.Post.title,
                ext_link: el.Post.ext_link ? el.Post.ext_link : null,
                image_link: el.Post.image_link ? el.Post.image_link : null,
                video_link: el.Post.video_link ? el.Post.video_link : null,
                thumbnail: el.Post.thumbnail ? 'http://localhost:3000/media-art/' + el.Post.thumbnail : null,
                type:el.Post.type,
                createdAt: moment(el.Post.createdAt, "YYYYMMDD").fromNow(),
                updatedAt: moment(el.Post.updatedAt, "YYYYMMDD").fromNow(),
            })
 
        });
        
        res.send({
            data: posts
        })
    } catch (error) {
        next(error)
    }
}


/**
 * Search
 */

exports.search = async (req, res, next) => {
    let query = req.query.search;
    try {
        let response = await Posts.findAll({
           where:{ [Op.or]: [
                {
                  title: {
                    [Op.like]: '%'+ query+'%'
                  }
                },
              ]}
        })
        res.send({
            data: response
        })
    } catch (error) {
        next(error)
    }
}


exports.create = async (req,res,next) => {
    let data = req.body;
    console.log(data);
    try {
          let newData = await  Landing.create({
              landing_tag: data.tag,
              PostId : data.post_id ? data.post_id : null,
              SectionId: data.section_id ? data.section_id : null
          })

          res.send({data:newData, message : 'success'})
        

    } catch (error) {
            console.log(error)
    }
}
/**
 *  get number of all main data for dash board
 * */

exports.getNumbers = async  (req,res,next) =>{
    //get sections
    let section =  await  Sections.findAndCountAll();
    //articles
    let articles = await  Posts.findAndCountAll({
         where:{type:"Article"}
    });
    //posts
    let posts = await  Posts.findAndCountAll({
         where:{type:['image_link','Video_Link','external_Link','post']}
    });
    //users
    let user = await  Users.findAndCountAll();
    //tags
    let tags  = await Tags.findAndCountAll();

    res.json({data:[
            {name:"section", count: section.count ,bg:'#3abef0'},
            {name:"Articles", count: articles.count, bg:'#9052ad'},
            {name:"Posts", count: posts.count, bg:'#ef912d'},
            {name:"Users", count: user.count,bg:'#a3d122'},
            {name:"Tags", count: tags.count,bg:'#6ecbce'},
        ]})

};


/**
 * get badges
 */



 exports.getBadges = (req,res,next)=>{

    let badges = [
        {name: 'WTF', icon:'/static/emoji/wtf.svg'},
        {name: 'OMG', icon:'/static/emoji/omg.svg'},
        {name: 'Geeky', icon:'/static/emoji/geek_original.svg'},
        {name: 'Cute', icon:'/static/emoji/cute_original.svg'},
        {name: 'Sad', icon:'/static/emoji/sad.svg'},
        {name: 'Lovely', icon:'/static/emoji/love.svg'},
    ]

    res.json({data:  badges});

 }

