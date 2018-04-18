import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import CustomerForm from './Form';
import { createCustomerMutation } from '../../queries/customer';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                name: '',
                age: 0,
            },
            loading: false,
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleChange(propName, e) {
        let change = { customer: this.state.customer };
        change.customer[propName] = e.target.value;
        this.setState(change);
    }

    handleBackClick() {
        this.setState({ redirect: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = this.state.customer;
        
        /*
            this.props.createCustomerMutation({
                variables: { data },
                refetchQueries: [{ query: getCustomersQuery }],
            }).then(response => this.setState({ redirect: true }));
        */

        this.props.createCustomerMutation({
            variables: { data },
        }).then(response => this.setState({ redirect: true }));
    }

    render() {
        return (
            <CustomerForm
                handleChange={this.handleChange}
                handleBackClick={this.handleBackClick}
                handleSubmit={this.handleSubmit}
                match={this.props.match}
                redirect={this.state.redirect}
                customer={this.state.customer}
                loading={this.state.loading} />
        );
    }
}

export default compose(
    graphql(createCustomerMutation, { name: 'createCustomerMutation' }),
)(Create);
