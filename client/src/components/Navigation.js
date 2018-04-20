import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Simple GraphQL Example</Link></li>
                <li className="right"><Link to='/orders/list'>Order</Link></li>
                <li className="right"><Link to='/products/list'>Product</Link></li>
                <li className="right"><Link to='/customers/list'>Customer</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
