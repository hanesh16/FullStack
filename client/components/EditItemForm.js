import React,{useState} from 'react'
import { useMutation } from '@apollo/client'
import { GET_ITEM } from './queries/itemQueries'
import { UPDATE_ITEM } from './mutations/itemMutations'
const EditItemForm = ({item}) => {
    const [name,setName]=useState(item.name);
    const [description,setDescrition]=useState(item.description);
    const [status,setStatus]=useState('');
    const [updateItem]=useMutation(UPDATE_ITEM,{
        variables:{id:item.id,name,description,status},
        refetchQueries:[{query:GET_ITEM,variables:{id:item.id}}]
    })
    const onSubmit=(e)=>{
        e.preventDefault();
        if(!name||!description||!status){
            return alert('Please fill in all the fields')
        }
        updateItem(name,description,status);
    }

  return (
    <div className='mt-5'>
      <h3> Update Item Details</h3>
      <form onSubmit={onSubmit}>
      <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input type="text" className='form-control' id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Description</label>
                  <textarea type="text" className='form-control' id='email' value={description} onChange={(e)=>setDescrition(e.target.value)}/>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Status</label>
                  <select id="status" className='form-select' value={status} onChange={(e)=>setStatus(e.target.value)}>
                      <option value="na">Not Available</option>
                      <option value="sold">Sold Out</option>
                      <option value="available">Available</option>
                  </select>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default EditItemForm
