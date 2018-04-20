import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Navigation from './components/Navigation';
import Customer from './components/customer/Customer';
import Product from './components/product/Product';
import Order from './components/order/Order';

const client = new ApolloClient({
    // uri: 'https://simple-graphql-example-server.herokuapp.com/graphql',
    uri: 'http://localhost:4000/graphql',
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <Navigation />
                    
                    <div id="content">
                        <Switch>
                            <Route path='/customers' component={Customer} />
                            <Route path='/products' component={Product} />
                            <Route path='/orders' component={Order} />
                        </Switch>
                    </div>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
