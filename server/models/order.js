const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    dateOrdered: Date,
    customerId: String,
});

module.exports = mongoose.model('orders', orderSchema);
