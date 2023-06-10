import {gql} from '@apollo/client'

export const ADD_CLIENT=gql`
    mutation addClient($name:String!,$email:String!,$phone:String!,$uname:String!){
        addClient(name:$name,email:$email,phone:$phone,uname:$uname){
            id
            name
            email
            phone
            uname
        }
    } `;


export const DELETE_CLIENT=gql`
    mutation deleteClient($id:ID!){
        deleteClient(id:$id){
            id
            name
            email
            phone
            uname
        }
    }
`;

