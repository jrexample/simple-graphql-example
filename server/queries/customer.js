const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const Customer = require('../models/customer');
const CustomerType = require('../types/customer');

const query = {
    customer: {
        type: CustomerType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Customer.findById(args.id);
        },
    },
    customers: {
        type: new GraphQLList(CustomerType),
        resolve(parent, args) {
            return Customer.find({});
        },
    },
};

module.exports = query;