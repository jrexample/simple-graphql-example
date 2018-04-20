import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import DatePicker from 'react-date-picker'
import { getCustomersQuery } from '../../queries/customer';
import { getProductsQuery } from '../../queries/product';

const showCustomers = (customers) => {
    if (customers) {
        return customers.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>);
    }
};

const showProducts = (products) => {
    if (products) {
        return products.map(product => <option key={product.id} value={product.id}>{product.name}</option>);
    }
};

const displayDetails = (details, products, deleteDetailClick, handleDetailChange) => {
    if (details && details.length > 0) {
        return details.map((detail, index) => {
            return (
                <tr key={index}>
                    <td>
                        <div className="form-field">
                            <select disabled={!products} onChange={handleDetailChange.bind(null, index, 'productId')} value={detail.productId} required>
                                <option value="">-Choose Product-</option>
                                {showProducts(products)}
                            </select>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="form-field">
                            <input type="number" onChange={handleDetailChange.bind(null, index, 'quantity')} value={detail.quantity} min="1" required />
                        </div>
                    </td>
                    <td>
                        <button type="button" className="btn-delete" onClick={deleteDetailClick.bind(null, index)}>x</button>
                    </td>
                </tr>
            );
        });
    }
    else {
        return (
            <tr>
                <td colSpan="3" className="text-center">No data...</td>
            </tr>
        );
    }
};

class Form extends Component {
    constructor(props) {
        super(props);

        let order;

        if (props.order) {
            let details = [];

            for (let detail of props.order.details) {
                details.push({
                    id: detail.id,
                    orderId: detail.orderId,
                    productId: detail.productId,
                    quantity: detail.quantity,
                });
            }
            order = {
                dateOrdered: new Date(props.order.dateOrdered),
                customerId: props.order.customerId,
                details,
            };
        }
        else {
            order = {
                dateOrdered: new Date(),
                customerId: '',
                details: [],
            };
        }

        this.state = { order };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addDetailClick = this.addDetailClick.bind(this);
        this.deleteDetailClick = this.deleteDetailClick.bind(this);
        this.handleDetailChange = this.handleDetailChange.bind(this);
    }

    handleDateChange(date) {
        let change = { order: this.state.order };
        change.order.dateOrdered = date;
        this.setState(change);
    }

    handleChange(propName, e) {
        let change = { order: this.state.order };
        change.order[propName] = e.target.value;
        this.setState(change);
    }

    addDetailClick() {
        this.state.order.details.push({ productId: '', quantity: 0 });
        this.setState({});
    }

    deleteDetailClick(index) {
        this.state.order.details.splice(index, 1);
        this.setState({});
    }

    handleDetailChange(index, propName, e) {
        let change = { order: this.state.order };
        change.order.details[index][propName] = e.target.value;
        this.setState(change);
    }

    render() {
        const { order } = this.state;
        const { customers } = this.props.getCustomersQuery;
        const { products } = this.props.getProductsQuery;

        return (
            <div>
                <form id="order-form" onSubmit={this.props.handleSubmit.bind(null, this.state.order)}>
                    <center>
                        <DatePicker onChange={this.handleDateChange} value={order.dateOrdered} required />
                    </center>

                    <div className="form-field">
                        <label htmlFor="customer">Customer</label>
                        <select disabled={!customers} id="customer" onChange={this.handleChange.bind(null, 'customerId')} value={order.customerId} required>
                            <option value="">-Choose Customer-</option>
                            {showCustomers(customers)}
                        </select>
                    </div>

                    <center>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>
                                        <button type="button" className="btn-add" onClick={this.addDetailClick}>+</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayDetails(order.details, products, this.deleteDetailClick, this.handleDetailChange)}
                            </tbody>
                        </table>
                    </center>

                    <div className="text-right">
                        <button type="button" className="button" onClick={this.props.handleBackClick}>Back</button>
                        <button className="button">Submit</button>
                    </div>
                </form>
                {this.props.loading && (<div className="spinner" />)}
            </div>
        );
    }
};

export default compose(
    graphql(getCustomersQuery, { name: 'getCustomersQuery' }),
    graphql(getProductsQuery, { name: 'getProductsQuery' }),
)(Form);
