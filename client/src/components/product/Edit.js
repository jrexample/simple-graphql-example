import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import ProductForm from './Form';
import { getProductByIdQuery, updateProductMutation } from '../../queries/product';
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
        if (props.getProductByIdQuery.loading === false) {
            let { product } = props.getProductByIdQuery;

            this.setState({
                product: {
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price,
                    description: product.description,
                },
            });
        }
    }

    handleBackClick() {
        const id = this.props.getProductByIdQuery.product.id;
        this.props.history.push(`${getCurrentUrl(this.props.match)}/view/${id}`);
    }

    handleSubmit(product, e) {
        e.preventDefault();
        this.setState({ loading: true });

        const data = product;
        const id = this.props.getProductByIdQuery.product.id;

        this.props.updateProductMutation({
            variables: { id, data },
        }).then(response => this.handleBackClick());
    }

    displayForm() {
        let data = this.props.getProductByIdQuery;

        if (data.loading) {
            return (<div className="spinner" />);
        }
        else {
            return (
                <ProductForm
                    handleBackClick={this.handleBackClick}
                    handleSubmit={this.handleSubmit}
                    product={this.state.product}
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
    graphql(getProductByIdQuery, {
        options: (props) => ({ variables: { id: props.match.params.id }, fetchPolicy: 'network-only' }),
        name: 'getProductByIdQuery',
    }),
    graphql(updateProductMutation, { name: 'updateProductMutation' }),
)(Edit);
