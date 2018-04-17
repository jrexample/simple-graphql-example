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
            return Product.update({ _id: args.id }, args.data);
        },
    },
    deleteProduct: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Product.remove({ _id: args.id }, (error) => {
                if (error)
                    return false;

                return true;
            });
        },
    },
};

module.exports = mutation;
