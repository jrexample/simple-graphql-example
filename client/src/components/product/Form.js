import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        let product;

        if (props.product) {
            product = {
                name: props.product.name,
                quantity: props.product.quantity,
                price: props.product.price,
                description: props.product.description,
            };
        }
        else {
            product = {
                name: '',
                quantity: 0,
                price: 0,
                description: '',
            };
        }

        this.state = { product };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(propName, e) {
        let change = { product: this.state.product };
        change.product[propName] = e.target.value;
        this.setState(change);
    }

    render() {
        const { product } = this.state;

        return (
            <div>
                <form id="product-form" onSubmit={this.props.handleSubmit.bind(null, product)}>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange.bind(null, 'name')} value={product.name} required />
                    </div>

                    <div className="form-field">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" onChange={this.handleChange.bind(null, 'quantity')} value={product.quantity} min="1" required />
                    </div>

                    <div className="form-field">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" onChange={this.handleChange.bind(null, 'price')} value={product.price} min="1" required />
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" onChange={this.handleChange.bind(null, 'description')} value={product.description} rows="4" />
                    </div>

                    <div className="text-right">
                        <button type="button" className="button" onClick={this.props.handleBackClick}>Back</button>
                        <button className="button">Submit</button>
                    </div>
                </form>
                {this.props.loading && (<div className="spinner" />)}
            </div>
        );
    }
};

export default Form;
