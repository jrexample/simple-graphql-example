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

const getProductByIdQuery = gql`
    query($id: ID){
        product(id: $id) {
            id
            name
            quantity
            price
            description
        }
    }
`;

const createProductMutation = gql`
    mutation($data: ProductInput) {
        createProduct(data: $data) {
            id
            name
        }
    }
`;

const updateProductMutation = gql`
    mutation($id: ID, $data: ProductInput) {
        updateProduct(id: $id, data: $data)
    }
`;  

const deleteProductMutation = gql`
    mutation($id: ID) {
        deleteProduct(id: $id)
    }
`;

export {
    getProductsQuery,
    getProductByIdQuery,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
};
