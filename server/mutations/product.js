const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
} = graphql;

const Product = require('../models/product');
const ProductType = require('../types/product');
const ProductInputType = require('../types/product-input');

const mutation = {
    createProduct: {
        type: ProductType,
        args: { data: { type: ProductInputType } },
        resolve(parent, args) {
            let product = new Product(args.data);
            return product.save();
        },
    },
    updateProduct: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID }, data: { type: ProductInputType } },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                Product.update({ _id: args.id }, args.data, (error) => {
                    if (error)
                        resolve(false);

                    resolve(true);
                });
            });
        },
    },
    deleteProduct: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return new Promise((resolve, reject) => {
                Product.remove({ _id: args.id }, (error) => {
                    if (error)
                        resolve(false);

                    resolve(true);
                });
            });
        },
    },
};

module.exports = mutation;
