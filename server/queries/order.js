const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const Order = require('../models/order');
const OrderType = require('../types/order');

const query = {
    order: {
        type: OrderType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Order.findById(args.id);
        },
    },
    orders: {
        type: new GraphQLList(OrderType),
        resolve(parent, args) {
            return Order.find({});
        },
    },
};

module.exports = query;
