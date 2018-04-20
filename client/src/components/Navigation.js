import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Simple GraphQL Example</Link></li>
                <li className="right"><Link to='/orders/list'>Order</Link></li>
                <li className="right"><Link to='/products/list'>Product</Link></li>
                <li className="right"><Link to='/customers/list'>Customer</Link></li>
            </ul>
            <Redirect from="/" to="/customers/list" />
        </nav>
    );
};

export default Navigation;
