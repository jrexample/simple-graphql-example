const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => {
        const Customer = require('../models/customer');
        const OrderDetail = require('../models/order-detail');
        const CustomerType = require('./customer');
        const OrderDetailType = require('./order-detail');

        return {
            id: { type: GraphQLID },
            dateOrdered: { type: GraphQLDate },
            customerId: { type: GraphQLID },
            customer: {
                type: CustomerType,
                resolve(parent, args) {
                    return Customer.findById(parent.customerId);
                },
            },
            details: {
                type: new GraphQLList(OrderDetailType),
                resolve(parent, args) {
                    return OrderDetail.find({ orderId: parent.id });
                },
            },
        };
    },
});

module.exports = OrderType;
