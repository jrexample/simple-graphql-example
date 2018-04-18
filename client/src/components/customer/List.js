import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getCustomersQuery, deleteCustomerMutation } from '../../queries/customer';

const CustomerCard = (props) => {
    const { customer, deleteCustomer, url } = props;

    return (
        <div className="card">
            <div className="card-content">
                <h4><b>{customer.name}</b></h4>
                <p>{customer.age} years old</p>
            </div>
            <div className="card-action">
                <Link to={`${url}/edit/${customer.id}`}>Edit</Link>
                <a onClick={deleteCustomer.bind(null, customer.id)}>Delete</a>
            </div>
        </div>
    );
};

class List extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getCustomersQuery.loading === false)
            this.setState({ loading: false });
    }

    deleteCustomer(id) {
        let confirm = window.confirm("Are you sure you want to delete this data?");

        if (confirm) {
            this.setState({ loading: true });

            this.props.deleteCustomerMutation({
                variables: { id },
                refetchQueries: [{ query: getCustomersQuery }],
            });
        }
    }

    displayCustomers(url) {
        let data = this.props.getCustomersQuery;

        if (data.loading || this.state.loading) {
            return (<div className="spinner"></div>);
        }
        else {
            return data.customers.map(customer => {
                return (
                    <CustomerCard key={customer.id} customer={customer} deleteCustomer={this.deleteCustomer} url={url} />
                );
            });
        }
    }

    render() {
        const { match } = this.props;
        const url = `${match.url.substring(0, match.url.lastIndexOf('/'))}`;

        return (
            <div>
                <div className="action-container">
                    <Link to={`${url}/create`} className="button">Add Customer</Link>
                </div>
                <div className="list">
                    {this.displayCustomers(url)}
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getCustomersQuery, {
        options: (props) => ({ fetchPolicy: 'network-only' }),
        name: 'getCustomersQuery'
    }),
    graphql(deleteCustomerMutation, { name: 'deleteCustomerMutation' })
)(List);
