const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLList,
} = graphql;

const { GraphQLDate } = require('graphql-iso-date');
const OrderDetailInputType = require('./order-detail-input');

const OrderInputType = new GraphQLInputObjectType({
    name: 'OrderInput',
    fields: {
        customerId: { type: GraphQLID },
        dateOrdered: { type: GraphQLDate },
        details: { type: new GraphQLList(OrderDetailInputType) },
    },
});

module.exports = OrderInputType;
