const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} = graphql;

const Order = require('../models/order');
const OrderDetail = require('../models/order-detail');
const OrderType = require('../types/order');
const OrderInputType = require('../types/order-input');

const mutation = {
    createOrder: {
        type: OrderType,
        args: { data: { type: OrderInputType } },
        resolve(parent, args) {
            let order = new Order({
                dateOrdered: args.data.dateOrdered,
                customerId: args.data.customerId,
            });

            return order.save((error, doc) => {
                for (let detail of args.data.details) {
                    detail.orderId = order._id;
                }

                return OrderDetail.insertMany(args.data.details, (error, docs) => {
                    return order;
                });
            });
        },
    },
    updateOrder: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID }, data: { type: OrderInputType } },
        resolve(parent, args) {
            let data = {
                dateOrdered: args.data.dateOrdered,
                customerId: args.data.customerId,
            };

            return Order.update({ _id: args.id }, data);
        },
    },
    deleteOrder: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return Order.remove({ _id: args.id }, (error) => {
                if (error)
                    return false;

                return OrderDetail.remove({ orderId: args.id }, (errorDetails) => {
                    if (errorDetails)
                        return false;

                    return true;
                });
            });
        },
    },
};

module.exports = mutation;
