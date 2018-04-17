const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLInt,
} = graphql;

const OrderDetailInputType = new GraphQLInputObjectType({
    name: 'OrderDetailInput',
    fields: {
        quantity: { type: GraphQLInt },
        productId: { type: GraphQLID }
    },
});

module.exports = OrderDetailInputType;
