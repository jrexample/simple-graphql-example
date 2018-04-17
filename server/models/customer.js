const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String,
    age: Number,
});

module.exports = mongoose.model('customers', customerSchema);
