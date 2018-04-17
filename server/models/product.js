const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    quantity: Number,
    price: Number,
    description: String,
});

module.exports = mongoose.model('products', productSchema);
