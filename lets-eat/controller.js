const Restaurant = require('./models').Restaurant;
const Review = require('./models').Review;

module.exports = {
    restaurant:{
        create: (req,res) => {
        Restaurant.find({name:req.body.name})
            .then(result => {
                if(result.length > 0){
                    return res.json({name:{message:"Restaurant already exists in database."}});
                }
                else{
                    Restaurant.create(req.body)
                    .then(() => res.json({success:"Success!"}))
                    .catch(err => res.json(err.errors))
                }
            })
            .catch(err => res.json(err.errors));
        },
        get: (req,res) => {
            Restaurant.find()
                .then(all => res.json(all))
                .catch(err => res.json(err.errors))
        },
        getOne: (req,res) => {
            Restaurant.findOne({_id:req.params.id})
                .then(one => res.json(one))
                .catch(err => res.json(err.errors))
        },
        update: (req,res) => {
            Restaurant.findOne({_id:req.params.id})
                .then(one => {
                    one.name = req.body.name;
                    one.cuisine = req.body.cuisine;
                    return one.save();
                })
                .then(() => res.json({success:"Success!"}))
                .catch(err => res.json(err.errors));
        },
        delete: (req,res) => {
            Restaurant.remove({_id:req.params.id})
                .then(() => res.json({success:"Success!"}))
                .catch(err => res.json(err.errors))
        }
    },
    review:{
        create: (req,res) => {
            Review.create(req.body)
                .then(review => {
                    Restaurant.findOneAndUpdate({_id:req.params.id},{$push:{reviews:{$each:[review],$sort:{stars: -1}}}})
                        .then(() => res.json({success:"Success!"}))
                        .catch(err => res.json(err.errors));
                })
                .catch(err => res.json(err.errors));
        }
    }
}