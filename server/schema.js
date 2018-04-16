const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLInputObjectType,
} = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const Customer = require('./models/customer');
const Order = require('./models/order');
const OrderDetail = require('./models/order-detail');
const Product = require('./models/product');

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return Order.find({ customerId: parent.id });
            },
        },
    }),
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        dateOrdered: { type: GraphQLDate },
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
    }),
});

const OrderDetailType = new GraphQLObjectType({
    name: 'OrderDetail',
    fields: () => ({
        id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        order: {
            type: OrderType,
            resolve(parent, args) {
                return Order.findById(parent.orderId);
            },
        },
        product: {
            type: ProductType,
            resolve(parent, args) {
                return Product.findById(parent.productId);
            },
        },
    }),
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        customer: {
            type: CustomerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Customer.findById(args.id);
            }
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Order.findById(args.id);
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                return Customer.find({});
            }
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return Order.find({});
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({});
            }
        },
    }),
});

const OrderDetailInputType = new GraphQLInputObjectType({
    name: 'OrderDetailInput',
    fields: () => ({
        quantity: { type: GraphQLInt },
        productId: { type: GraphQLID }
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                let customer = new Customer({
                    name: args.name,
                    age: args.age
                });

                return customer.save();
            },
        },
        addOrder: {
            type: OrderType,
            args: {
                customerId: { type: GraphQLID },
                dateOrdered: { type: GraphQLDate },
                details: { type: new GraphQLList(OrderDetailInputType) },
            },
            resolve(parent, args) {
                let order = new Order({
                    dateOrdered: args.dateOrdered,
                    customerId: args.customerId,
                });

                order.save();

                for(let detail of args.details) {
                    detail.orderId = order._id;
                }

                OrderDetail.insertMany(args.details);

                return order;
            },
        },
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                quantity: { type: GraphQLInt },
                price: { type: GraphQLFloat },
                description: { type: GraphQLString },
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    quantity: args.quantity,
                    price: args.price,
                    description: args.description,
                });

                return product.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
