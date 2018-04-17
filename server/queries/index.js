const CustomerQuery = require('./customer');
const OrderQuery = require('./order');
const ProductQuery = require('./product');

module.exports = {
    ...CustomerQuery,
    ...OrderQuery,
    ...ProductQuery
};
