const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
} = graphql;

const OrderDetailInputType = new GraphQLInputObjectType({
    name: 'OrderDetailInput',
    fields: {
        id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        orderId: { type: GraphQLID },
        productId: { type: GraphQLID },
    },
});

module.exports = OrderDetailInputType;
