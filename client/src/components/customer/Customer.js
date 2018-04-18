import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomerList from './List';
import CreateForm from './Create';
import EditForm from './Edit';

class Customer extends Component {
    render() {
        const { match } = this.props;

        return (
            <div>
                <Switch>
                    <Route path={`${match.url}/list`} component={CustomerList} />
                    <Route path={`${match.url}/create`} component={CreateForm} />
                    <Route path={`${match.url}/edit/:id`} component={EditForm} />
                </Switch>
            </div>
        );
    }
}

export default Customer;
