import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOrderByIdQuery, deleteOrderMutation } from '../../queries/order';
import { getCurrentUrl as url } from '../../utils/url-helper';

const Detail = (props) => {
    return (
        <tr>
            <td>{props.product.name}</td>
            <td className="text-center">{props.quantity}</td>
        </tr>
    );
};

class View extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    deleteOrder(id) {
        let confirm = window.confirm("Are you sure you want to delete this data?");

        if (confirm) {
            this.setState({ loading: true });

            this.props.deleteOrderMutation({
                variables: { id },
            }).then(response => this.props.history.push(`${url(this.props.match)}/list`));
        }
    }

    displayDetails(details) {
        return details.map(detail => {
            return (
                <Detail key={detail.id} {...detail} />
            );
        });
    }

    displayForm() {
        let data = this.props.getOrderByIdQuery;

        if (data.loading || this.state.loading) {
            return (<div className="spinner" />);
        }
        else {
            const order = data.order;

            return (
                <div>
                    <center>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Ordered Date</td>
                                    <td>:</td>
                                    <td>{moment(order.dateOrdered).format('dddd, MMMM Do YYYY')}</td>
                                </tr>
                                <tr>
                                    <td>Ordered By</td>
                                    <td>:</td>
                                    <td>{order.customer.name}</td>
                                </tr>
                            </tbody>
                        </table>

                        <br /><br />

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.displayDetails(order.details)}
                            </tbody>
                        </table>
                    </center>

                    <div className="text-right">
                        <Link to={`${url(this.props.match)}/list`} className="button">Back</Link>
                        <Link to={`${url(this.props.match)}/edit/${order.id}`} className="button">Edit</Link>
                        <a onClick={this.deleteOrder.bind(null, order.id)} className="button">Delete</a>
                    </div>
                </div>
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
    graphql(getOrderByIdQuery, {
        options: (props) => ({ variables: { id: props.match.params.id }, fetchPolicy: 'network-only' }),
        name: 'getOrderByIdQuery',
    }),
    graphql(deleteOrderMutation, { name: 'deleteOrderMutation' })
)(View);
