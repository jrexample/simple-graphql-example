import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navigation from './components/Navigation';
import Customer from './components/customer/Customer';
import Product from './components/product/Product';

const client = new ApolloClient({
    uri: 'https://simple-graphql-example-server.herokuapp.com/graphql',
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <Navigation />

                    <div id="content">
                        <center><h1>Simple GraphQL Example</h1></center>
                        <Switch>
                            <Route path='/customers' component={Customer} />
                            <Route path='/products' component={Product} />
                        </Switch>
                    </div>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
