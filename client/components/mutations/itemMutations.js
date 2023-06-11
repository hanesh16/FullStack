import {gql} from '@apollo/client'

export const ADD_ITEM=gql`
mutation addItem($name:String!,$description:String!,$clientID:ID!,$status:ItemStatus!){
    addItem(name:$name,description:$description,clientId:$clientID,status:$status){
        id
        name
        description
        status
        client{
            id
            name
            email
            phone
            uname
        }
    }
}
`;

export const DELETE_ITEM=gql`
mutation DeleteItem($id:ID!){
    deleteItem(id:$id){
        id
    }
}`;


export const UPDATE_ITEM=gql`
mutation updateItem($id:ID!,$name:String!,$description:String!,$status:ItemStatusUpdate!){
    updateItem(id:$id,name:$name,description:$description,status:$status){
        id
        name
        description
        status
        client{
            id
            name
            email
            phone
            uname
        }
    }
}
`;
