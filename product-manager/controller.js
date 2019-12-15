const Product = require('./models');

module.exports = {
    create: (req,res) => {
        Product.create(req.body)
            .then(() => res.json({success:"Successfully created product."}))
            .catch(err => res.json(err.errors));
    },
    getAll: (req,res) => {
        Product.find()
            .then(products => res.json(products))
            .catch(err => res.json(err.errors));
    },
    getOne: (req,res) => {
        Product.findOne({_id:req.params.id})
            .then(product => res.json(product))
            .catch(err => res.json(err.errors));
    },
    update: (req,res) => {
        Product.findOne({_id:req.params.id})
            .then(product => {
                product.name = req.body.name;
                product.price = req.body.price;
                product.image = req.body.image;
                return product.save();
            })
            .then(() => res.json({success: "Successfully updated product."}))
            .catch(err => res.json(err.errors));
    },
    delete: (req,res) => {
        Product.remove({_id:req.params.id})
            .then(() => res.json({success:"Successfully deleted product."}))
            .catch(err => res.json(err.errors));
    }
}