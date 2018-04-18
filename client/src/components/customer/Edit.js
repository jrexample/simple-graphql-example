import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import CustomerForm from './Form';
import { getCustomerByIdQuery, updateCustomerMutation } from '../../queries/customer';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                name: '',
                age: 0,
            },
            redirect: false,
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getCustomerByIdQuery.loading === false) {
            let { customer } = props.getCustomerByIdQuery;

            this.setState({
                customer: {
                    name: customer.name,
                    age: customer.age,
                },
            });
        }
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
        const id = this.props.getCustomerByIdQuery.customer.id;

        this.props.updateCustomerMutation({
            variables: { id, data },
        }).then(response => this.setState({ redirect: true }));
    }

    displayForm() {
        let data = this.props.getCustomerByIdQuery;

        if (data.loading) {
            return (<div className="spinner" />);
        }
        else {
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

    render() {
        return (
            <div>
                {this.displayForm()}
            </div>
        );
    }
}

export default compose(
    graphql(getCustomerByIdQuery, {
        options: (props) => ({ variables: { id: props.match.params.id }, fetchPolicy: 'network-only' }),
        name: 'getCustomerByIdQuery',
    }),
    graphql(updateCustomerMutation, { name: 'updateCustomerMutation' }),
)(Edit);
