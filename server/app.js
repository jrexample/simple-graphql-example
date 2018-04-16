const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

mongoose.connect('mongodb://jr:jrpassword@ds153494.mlab.com:53494/jr')
mongoose.connection.once('open', () => {
    console.log('connected to mLab');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
