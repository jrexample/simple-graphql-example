import { gql } from 'apollo-boost';

const getProductsQuery = gql`
    {
        products {
            id
            name
            description
        }
    }
`;

export {
    getProductsQuery,
};
