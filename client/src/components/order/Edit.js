import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import moment from 'moment';
import OrderForm from './Form';
import { getOrderByIdQuery, updateOrderMutation } from '../../queries/order';
import { getCurrentUrl } from '../../utils/url-helper';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getOrderByIdQuery.loading === false) {
            let { order } = props.getOrderByIdQuery;

            this.setState({
                order: {
                    dateOrdered: order.dateOrdered,
                    customerId: order.customerId,
                    details: order.details,
                },
            });
        }
    }

    handleBackClick() {
        const id = this.props.getOrderByIdQuery.order.id;
        this.props.history.push(`${getCurrentUrl(this.props.match)}/view/${id}`);
    }

    handleSubmit(order, e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = order;
        const id = this.props.getOrderByIdQuery.order.id;
        data.dateOrdered = moment(data.dateOrdered).format('YYYY-MM-DD');

        this.props.updateOrderMutation({
            variables: { id, data },
        }).then(response => this.handleBackClick());
    }

    displayForm() {
        let data = this.props.getOrderByIdQuery;

        if (data.loading) {
            return (<div className="spinner" />);
        }
        else {
            return (
                <OrderForm
                    handleBackClick={this.handleBackClick}
                    handleSubmit={this.handleSubmit}
                    order={this.state.order}
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
    graphql(getOrderByIdQuery, {
        options: (props) => ({ variables: { id: props.match.params.id }, fetchPolicy: 'network-only' }),
        name: 'getOrderByIdQuery',
    }),
    graphql(updateOrderMutation, { name: 'updateOrderMutation' }),
)(Edit);
