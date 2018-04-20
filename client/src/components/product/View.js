import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { getProductByIdQuery, deleteProductMutation } from '../../queries/product';
import { getCurrentUrl as url } from '../../utils/url-helper';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(id) {
        let confirm = window.confirm("Are you sure you want to delete this data?");

        if (confirm) {
            this.setState({ loading: true });

            this.props.deleteProductMutation({
                variables: { id },
            }).then(response => this.props.history.push(`${url(this.props.match)}/list`));
        }
    }

    displayForm() {
        let data = this.props.getProductByIdQuery;

        if (data.loading || this.state.loading) {
            return (<div className="spinner" />);
        }
        else {
            const product = data.product;

            return (
                <div>
                    <center>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>:</td>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td>:</td>
                                    <td>{product.quantity}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>:</td>
                                    <td>{product.price}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>:</td>
                                    <td>{product.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </center>

                    <div className="text-right">
                        <Link to={`${url(this.props.match)}/list`} className="button">Back</Link>
                        <Link to={`${url(this.props.match)}/edit/${product.id}`} className="button">Edit</Link>
                        <a onClick={this.deleteProduct.bind(null, product.id)} className="button">Delete</a>
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
    graphql(getProductByIdQuery, {
        options: (props) => ({ variables: { id: props.match.params.id }, fetchPolicy: 'network-only' }),
        name: 'getProductByIdQuery',
    }),
    graphql(deleteProductMutation, { name: 'deleteProductMutation' })
)(View);
