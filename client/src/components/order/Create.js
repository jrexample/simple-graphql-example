import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import OrderForm from './Form';
import { createOrderMutation } from '../../queries/order';
import { getCurrentUrl } from '../../utils/url-helper';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick() {
        this.props.history.push(`${getCurrentUrl(this.props.match)}/list`);
    }

    handleSubmit(order, e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = order;
        data.dateOrdered = moment(data.dateOrdered).format('YYYY-MM-DD');

        this.props.createOrderMutation({
            variables: { data },
        }).then(response => this.handleBackClick());
    }

    render() {
        return (
            <OrderForm
                handleBackClick={this.handleBackClick}
                handleSubmit={this.handleSubmit}
                loading={this.state.loading} />
        );
    }
}

export default graphql(createOrderMutation, { name: 'createOrderMutation' })(Create);
