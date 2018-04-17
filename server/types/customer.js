const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql;

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => {
        const Order = require('../models/order');
        const OrderType = require('./order');

        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            orders: {
                type: new GraphQLList(OrderType),
                resolve(parent, args) {
                    return Order.find({ customerId: parent.id });
                },
            },
        }
    },
});

module.exports = CustomerType;
