const Reactions = require('../models').Reactions;
const Posts = require('../models').Posts;

exports.getAll = (req, res, next) => {

    Reaction.findAll()
        .then(response => {
            res.send({
                data: response
            })

        })
        .catch(error => {
            next(error)
        })
}



exports.getOne = (req, res, next) => {
    let post_id = req.query.id;

    Reaction.findOne({
            where: {
                PostId: post_id
            }
        })
        .then(response => {
            res.send({
                data: response
            })
        })
        .catch(error => {
            next(error)
        })
}


exports.create = async (req, res, next) => {
    const data = req.body;
    res.send({
        data: data
    })
    try {

        let reaction1 = await Reactions.findOrCreate({
            where: {
                PostId: data.post_id
            }
        })

        /*    console.log('happy  '+reaction1) */

        let reaction = await Reactions.findOne({
            where: {
                PostId: data.post_id
            },
        });

        /*         console.log(reaction) 
         */
        data.happy ? reaction.happy = reaction.happy + 1 : null;
        data.fail ? reaction.fail = reaction.fail + 1 : null;
        data.omg ? reaction.omg = reaction.omg + 1 : null;
        data.cool ? reaction.cool = reaction.cool + 1 : null;
        data.eww ? reaction.eww = reaction.eww + 1 : null;
        data.cute ? reaction.cute = reaction.cute + 1 : null;
        data.wtf ? reaction.wtf = reaction.wtf + 1 : null;
        data.geeky ? reaction.geeky = reaction.geeky + 1 : null;
        data.angry ? reaction.angry = reaction.angry + 1 : null;
        data.sad ? reaction.sad = reaction.sad + 1 : null;
        data.down ? reaction.down = reaction.down + 1 : null;
        data.up ? reaction.up = reaction.up + 1 : null;
        data.confused ? reaction.confused = reaction.confused + 1 : null;
        data.scary ? reaction.scary = reaction.scary + 1 : null;


        let saving = await reaction.save()
        res.send({
            data: saving
        })

    } catch (error) {
        next(error)
    }
}

exports.upVote = async (req, res, next) => {
    let data = req.body;
    try {

        let reaction = await Reactions.findOne({
            where: {
                PostId: data.post_id
            }
        })

        reaction.up = reaction.up + 1;
        reaction.down = reaction.down - 1;
        let result = await reaction.save();

        res.send({
            data: result,
            message: 'success'
        })

    } catch (err) {
        res.send({
            error: err.message
        })

    }
}

exports.downVote = async (req, res, next) => {

    let data = req.body;
    try {

        let reaction = await Reactions.findOne({
            where: {
                PostId: data.post_id
            }
        })
        reaction.up = reaction.up - 1;
        reaction.down = reaction.down + 1;
        let result = await reaction.save();

        res.send({
            data: result,
            message: 'success'
        })

    } catch (err) {
        res.send({
            error: err.message
        })

    }

}