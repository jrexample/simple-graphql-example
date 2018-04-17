const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
} = graphql;
const _ = require('lodash');

const Order = require('../models/order');
const OrderDetail = require('../models/order-detail');
const OrderType = require('../types/order');
const OrderInputType = require('../types/order-input');

const mutation = {
    createOrder: {
        type: OrderType,
        args: { data: { type: OrderInputType } },
        async resolve(parent, args) {
            let order = new Order({
                dateOrdered: args.data.dateOrdered,
                customerId: args.data.customerId,
            });

            await order.save();

            _.forEach(args.data.details, (detail) => {
                detail.orderId = order._id;
            });

            await OrderDetail.insertMany(args.data.details);
            return order;
        },
    },
    updateOrder: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID }, data: { type: OrderInputType } },
        async resolve(parent, args) {
            let data = {
                dateOrdered: args.data.dateOrdered,
                customerId: args.data.customerId,
            };

            try {
                await Order.update({ _id: args.id }, data);
                let docs = await OrderDetail.find({ orderId: args.id }, { _id: 1 });

                const tasks = [];

                _.forEach(docs, (doc) => {
                    let orderDetail = _.find(args.data.details, { id: doc.id.toString() });

                    if (orderDetail) {
                        orderDetail.orderId = args.id;
                        tasks.push(OrderDetail.update({ _id: doc.id }, orderDetail));
                    }
                    else {
                        tasks.push(OrderDetail.remove({ _id: doc.id }));
                    }
                });

                _.forEach(_.filter(args.data.details, (n) => !n.id), (newData) => {
                    newData.orderId = args.id;
                    tasks.push(OrderDetail.create(newData));
                });

                await Promise.all(tasks);

                return true;
            }
            catch (e) {
                return false;
            }
        },
    },
    deleteOrder: {
        type: GraphQLBoolean,
        args: { id: { type: GraphQLID } },
        async resolve(parent, args) {
            try {
                await Order.remove({ _id: args.id });
                await OrderDetail.remove({ orderId: args.id });

                return true;
            }
            catch (e) {
                return false;
            }
        },
    },
};

module.exports = mutation;
