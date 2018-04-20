import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import OrderList from './List';
import CreateForm from './Create';
import EditForm from './Edit';
import ViewForm from './View';

class Order extends Component {
    render() {
        const { match } = this.props;

        return (
            <div>
                <center><h1>Order</h1></center>
                <Switch>
                    <Route path={`${match.url}/list`} component={OrderList} />
                    <Route path={`${match.url}/create`} component={CreateForm} />
                    <Route path={`${match.url}/edit/:id`} component={EditForm} />
                    <Route path={`${match.url}/view/:id`} component={ViewForm} />
                </Switch>
            </div>
        );
    }
}

export default Order;
