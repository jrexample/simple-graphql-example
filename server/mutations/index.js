const CustomerMutation = require('./customer');
const OrderMutation = require('./order');
const ProductMutation = require('./product');

module.exports = {
    ...CustomerMutation,
    ...OrderMutation,
    ...ProductMutation,
};
