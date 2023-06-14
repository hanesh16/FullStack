import React from 'react'
import {FaTrash} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import { DELETE_CLIENT } from './mutations/clientMutations'
import { GET_CLIENTS } from './queries/clientQuery'
import { GET_ITEMS } from './queries/itemQueries'
const ClientRow = (props) => {
    const [deleteClient]=useMutation(DELETE_CLIENT,{
        variables:{id:props.client.id},
        refetchQueries:[{query:GET_CLIENTS},{query:GET_ITEMS}]
        // update(cache,{data:{deleteClient}}){
        //     const {clients}=cache.readQuery({query:GET_CLIENTS});
        //     cache.writeQuery({
        //         query:GET_CLIENTS,
        //         data:{clients:clients.filter(client=>client.id!==deleteClient.id)}
        //     })
        // }
    })
    const {name,email,phone,uname}=props.client
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{uname}</td>
            <td>
                <button className='btn btn-danger btn-sm'>
                    <FaTrash onClick={deleteClient}/>
                </button>
            </td>
        </tr>
  )
}

export default ClientRow
