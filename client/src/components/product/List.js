import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { getProductsQuery } from '../../queries/product';

const ProductCard = (props) => {
    const { product } = props;

    return (
        <div className="card">
            <div className="card-content">
                <h4><b>{product.name}</b></h4>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

class List extends Component {
    displayProducts(url) {
        let data = this.props.getProductsQuery;

        if (data.loading) {
            return (<div className="spinner"></div>);
        }
        else {
            return data.products.map(product => {
                return (
                    <ProductCard key={product.id} product={product} />
                );
            });
        }
    }

    render() {
        return (
            <div className="list">
                {this.displayProducts()}
            </div>
        );
    }
}

export default compose(
    graphql(getProductsQuery, {
        options: (props) => ({ fetchPolicy: 'network-only' }),
        name: 'getProductsQuery'
    }),
)(List);
