import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import ProductForm from './Form';
import { getProductByIdQuery, updateProductMutation } from '../../queries/product';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: '',
                quantity: 0,
                price: 0,
                description: '',
            },
            redirect: false,
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
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
        const id = this.props.getProductByIdQuery.product.id;

        this.props.updateProductMutation({
            variables: { id, data },
        }).then(response => this.setState({ redirect: true }));
    }

    displayForm() {
        let data = this.props.getProductByIdQuery;

        if (data.loading) {
            return (<div className="spinner" />);
        }
        else {
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
