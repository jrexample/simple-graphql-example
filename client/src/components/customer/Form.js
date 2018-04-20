import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        let customer;

        if (props.customer) {
            customer = {
                name: props.customer.name,
                age: props.customer.age,
            };
        }
        else {
            customer = {
                name: '',
                age: 0,
            };
        }

        this.state = { customer };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(propName, e) {
        let change = { customer: this.state.customer };
        change.customer[propName] = e.target.value;
        this.setState(change);
    }

    render() {
        const { customer } = this.state;

        return (
            <div>
                <form id="customer-form" onSubmit={this.props.handleSubmit.bind(null, this.state.customer)}>
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange.bind(null, 'name')} value={customer.name} required />
                    </div>

                    <div className="form-field">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" onChange={this.handleChange.bind(null, 'age')} value={customer.age} min="1" required />
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
}

export default Form;
