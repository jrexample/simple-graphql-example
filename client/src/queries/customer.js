import { gql } from 'apollo-boost';

const getCustomersQuery = gql`
    {
        customers {
            id
            name
            age
        }
    }
`;

const getCustomerByIdQuery = gql`
    query($id: ID){
        customer(id: $id) {
            id
            name
            age
        }
    }
`;

const createCustomerMutation = gql`
    mutation($data: CustomerInput) {
        createCustomer(data: $data) {
            id
            name
        }
    }
`;

const updateCustomerMutation = gql`
    mutation($id: ID, $data: CustomerInput) {
        updateCustomer(id: $id, data: $data)
    }
`;  

const deleteCustomerMutation = gql`
    mutation($id: ID) {
        deleteCustomer(id: $id)
    }
`;

export {
    getCustomersQuery,
    getCustomerByIdQuery,
    createCustomerMutation,
    updateCustomerMutation,
    deleteCustomerMutation,
};
