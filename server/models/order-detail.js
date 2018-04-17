const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
    orderId: String,
    productId: String,
    quantity: Number,
});

module.exports = mongoose.model('order-details', orderDetailSchema);
