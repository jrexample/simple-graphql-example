const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const Product = require('../models/product');
const ProductType = require('../types/product');

const query = {
    product: {
        type: ProductType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Product.findById(args.id);
        },
    },    
    products: {
        type: new GraphQLList(ProductType),
        resolve(parent, args) {
            return Product.find({});
        },
    },
};

module.exports = query;
