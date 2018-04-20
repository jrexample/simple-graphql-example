import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import ProductForm from './Form';
import { createProductMutation } from '../../queries/product';
import { getCurrentUrl } from '../../utils/url-helper';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: '',
                quantity: 0,
                price: 0,
                description: '',
            },
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleBackClick() {
        this.props.history.push(`${getCurrentUrl(this.props.match)}/list`);
    }

    handleSubmit(product, e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = product;

        this.props.createProductMutation({
            variables: { data },
        }).then(response => this.handleBackClick());
    }

    render() {
        return (
            <ProductForm
                handleBackClick={this.handleBackClick}
                handleSubmit={this.handleSubmit}
                loading={this.state.loading} />
        );
    }
}

export default compose(
    graphql(createProductMutation, { name: 'createProductMutation' }),
)(Create);
