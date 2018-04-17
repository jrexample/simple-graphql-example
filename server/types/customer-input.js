const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLString,
} = graphql;

const CustomerInputType = new GraphQLInputObjectType({
    name: 'CustomerInput',
    fields: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    },
});

module.exports = CustomerInputType;
