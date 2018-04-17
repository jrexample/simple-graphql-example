const graphql = require('graphql');

const {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const Customer = require('../models/customer');
const CustomerType = require('../types/customer');
const CustomerInputType = require('../types/customer-input');

const mutation = {
    createCustomer: {
        type: CustomerType,
        args: { data: { type: CustomerInputType } },
        resolve(parent, args) {
            let customer = new Customer(args.data);
            return customer.save();
        },
    },
    updateCustomer: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID }, data: { type: CustomerInputType } },
        resolve(parent, args) {
            return Customer.update({ _id: args.id }, args.data);
        },
    },
    deleteCustomer: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Customer.remove({ _id: args.id }, (error) => {
                if (error)
                    return false;

                return true;
            });
        },
    },
};

module.exports = mutation;
