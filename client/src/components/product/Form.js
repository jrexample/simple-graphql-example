import React from 'react';
import { Redirect } from 'react-router';

const ProductForm = (props) => {
    const { product, match, redirect, handleChange, handleBackClick, handleSubmit, loading } = props;
    const listUrl = `${match.path.substring(0, match.path.replace('/:', '').lastIndexOf('/'))}/list`;

    return (
        <div>
            <form id="product-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={handleChange.bind(null, 'name')} value={product.name} />
                </div>

                <div className="form-field">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" id="quantity" onChange={handleChange.bind(null, 'quantity')} value={product.quantity} />
                </div>

                <div className="form-field">
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" onChange={handleChange.bind(null, 'price')} value={product.price} />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" onChange={handleChange.bind(null, 'description')} value={product.description} rows="4" />
                </div>

                <div className="text-right">
                    <button type="button" className="button" onClick={handleBackClick}>Back</button>
                    <button className="button">Submit</button>
                </div>
            </form>
            {redirect && (<Redirect to={listUrl} />)}
            {loading && (<div className="spinner" />)}
        </div>
    );
};

export default ProductForm;
