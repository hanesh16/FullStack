import {gql} from '@apollo/client'

export const GET_ITEMS=gql`
query getItems{
    items{
        id
        name
        status
    }
}`

export const GET_ITEM=gql`
query getItems($id:ID!){
    item(id:$id){
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
}`
