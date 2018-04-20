import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import ProductForm from './Form';
import { createProductMutation } from '../../queries/product';

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
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
    }

    handleChange(propName, e) {
        let change = { product: this.state.product };
        change.product[propName] = e.target.value;
        this.setState(change);
    }

    handleBackClick() {
        this.setState({ redirect: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = this.state.product;

        this.props.createProductMutation({
            variables: { data },
        }).then(response => this.setState({ redirect: true }));
    }

    render() {
        return (
            <ProductForm
                handleChange={this.handleChange}
                handleBackClick={this.handleBackClick}
                handleSubmit={this.handleSubmit}
                match={this.props.match}
                redirect={this.state.redirect}
                product={this.state.product}
                loading={this.state.loading} />
        );
    }
}

export default compose(
    graphql(createProductMutation, { name: 'createProductMutation' }),
)(Create);
