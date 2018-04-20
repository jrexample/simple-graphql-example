import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOrdersQuery } from '../../queries/order';
import { getCurrentUrl } from '../../utils/url-helper';

const OrderCard = (props) => {
    const { order, url } = props;
    const customer = order.customer;

    return (
        <div className="card">
            <div className="card-content">
                <h4><b>{moment(order.dateOrdered).format('dddd, MMMM Do YYYY')}</b></h4>
                <p>Ordered by {customer.name}</p>
            </div>
            <div className="card-action">
                <Link to={`${url}/view/${order.id}`}>View</Link>
            </div>
        </div>
    );
};

class List extends Component {
    displayOrders() {
        let data = this.props.getOrdersQuery;
        
        if (data.loading) {
            return (<div className="spinner"></div>);
        }
        else {
            const url = getCurrentUrl(this.props.match);

            return data.orders.map(order => {
                return (
                    <OrderCard key={order.id} order={order} url={url} />
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div className="action-container">
                    <Link to={`${getCurrentUrl(this.props.match)}/create`} className="button">Add Order</Link>
                </div>
                <div className="list">
                    {this.displayOrders()}
                </div>
            </div>
        );
    }
}

export default graphql(getOrdersQuery, {
    options: (props) => ({ fetchPolicy: 'network-only' }),
    name: 'getOrdersQuery'
})(List);
