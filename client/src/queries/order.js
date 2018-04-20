import { gql } from 'apollo-boost';

const getOrdersQuery = gql`
    {
        orders {
            id
            dateOrdered
            customer {
                name
            }
        }
    }
`;

const getOrderByIdQuery = gql`
    query($id: ID){
        order(id: $id) {
            id
            dateOrdered
            customerId
            customer {
                name
            }
            details {
                id
                quantity
                orderId
                productId
                product {
                    name
                }
            }
        }
    }
`;

const createOrderMutation = gql`
    mutation($data: OrderInput) {
        createOrder(data: $data) {
            id
        }
    }
`;

const updateOrderMutation = gql`
    mutation($id: ID, $data: OrderInput) {
        updateOrder(id: $id, data: $data)
    }
`;  

const deleteOrderMutation = gql`
    mutation($id: ID) {
        deleteOrder(id: $id)
    }
`;

export {
    getOrdersQuery,
    getOrderByIdQuery,
    createOrderMutation,
    updateOrderMutation,
    deleteOrderMutation,
};
