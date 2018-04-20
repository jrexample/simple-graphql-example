const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
} = graphql;

const OrderDetailType = new GraphQLObjectType({
    name: 'OrderDetail',
    fields: () => {
        const Order = require('../models/order');
        const Product = require('../models/product');
        const OrderType = require('./order');
        const ProductType = require('./product');

        return {
            id: { type: GraphQLID },
            quantity: { type: GraphQLInt },
            orderId: { type: GraphQLID },
            order: {
                type: OrderType,
                resolve(parent, args) {
                    return Order.findById(parent.orderId);
                },
            },
            productId: { type: GraphQLID },
            product: {
                type: ProductType,
                resolve(parent, args) {
                    return Product.findById(parent.productId);
                },
            },
        };
    },
});

module.exports = OrderDetailType;
