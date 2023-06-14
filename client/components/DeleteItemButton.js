import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { GET_ITEMS} from './queries/itemQueries'
import { useMutation } from '@apollo/client'
import { DELETE_ITEM } from './mutations/itemMutations'

const DeleteItemButton = ({itemId}) => {
    const navigate=useNavigate();
    const [deleteItem]=useMutation(DELETE_ITEM,{
        variables:{id:itemId},
        onCompleted:()=>navigate("/"),
        refetchQueries:[{query:GET_ITEMS}]

    })
  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2' onClick={deleteItem}>
        <FaTrash className='icon'/>Delete Item
      </button>
    </div>
  )
}

export default DeleteItemButton
