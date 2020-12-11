const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://jr:jr@cluster0.ztzu7.mongodb.net/jr?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to mLab');
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`App now listening on port ${port}`);
});
