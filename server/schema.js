const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType } = graphql;

const Queries = require('./queries');
const Mutations = require('./mutations');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: Queries,
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: Mutations,
    }),
});
