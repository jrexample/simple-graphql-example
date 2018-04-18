import React from 'react';
import { Redirect } from 'react-router';

const CustomerForm = (props) => {
    const { customer, match, redirect, handleChange, handleBackClick, handleSubmit, loading } = props;
    const listUrl = `${match.path.substring(0, match.path.replace('/:', '').lastIndexOf('/'))}/list`;

    return (
        <div>
            <form id="customer-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Name :</label>
                    <input type="text" id="name" onChange={handleChange.bind(null, 'name')} value={customer.name} />
                </div>

                <div className="form-field">
                    <label htmlFor="age">Age :</label>
                    <input type="number" id="age" onChange={handleChange.bind(null, 'age')} value={customer.age} />
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

export default CustomerForm;
