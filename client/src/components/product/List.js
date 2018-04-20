import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getProductsQuery, deleteProductMutation } from '../../queries/product';

const ProductCard = (props) => {
    const { product, deleteProduct, url } = props;

    return (
        <div className="card">
            <div className="card-content">
                <h4><b>{product.name}</b></h4>
                <p>{product.description}</p>
            </div>
            <div className="card-action">
                <Link to={`${url}/edit/${product.id}`}>Edit</Link>
                <a onClick={deleteProduct.bind(null, product.id)}>Delete</a>
            </div>
        </div>
    );
};

class List extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.getProductsQuery.loading === false)
            this.setState({ loading: false });
    }

    deleteProduct(id) {
        let confirm = window.confirm("Are you sure you want to delete this data?");

        if (confirm) {
            this.setState({ loading: true });

            this.props.deleteProductMutation({
                variables: { id },
                refetchQueries: [{ query: getProductsQuery }],
            });
        }
    }

    displayProducts(url) {
        let data = this.props.getProductsQuery;

        if (data.loading || this.state.loading) {
            return (<div className="spinner"></div>);
        }
        else {
            return data.products.map(product => {
                return (
                    <ProductCard key={product.id} product={product} deleteProduct={this.deleteProduct} url={url} />
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
                    <Link to={`${url}/create`} className="button">Add Product</Link>
                </div>
                <div className="list">
                    {this.displayProducts(url)}
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getProductsQuery, {
        options: (props) => ({ fetchPolicy: 'network-only' }),
        name: 'getProductsQuery'
    }),
    graphql(deleteProductMutation, { name: 'deleteProductMutation' })
)(List);
