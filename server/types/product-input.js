const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
} = graphql;

const ProductInputType = new GraphQLInputObjectType({
    name: 'ProductInput',
    fields: {
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
    },
});

module.exports = ProductInputType;
