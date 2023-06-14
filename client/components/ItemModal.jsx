import React,{useState} from 'react'
import {FaList} from 'react-icons/fa'
import {useMutation, useQuery} from '@apollo/client'
import { GET_ITEMS } from './queries/itemQueries'
import { GET_CLIENTS } from './queries/clientQuery'
import { ADD_ITEM } from './mutations/itemMutations'
const ItemModal = () => {
  const [name,setName]=useState('');
  const [description,setDescrition]=useState('');
  const [clientID,setClientID]=useState('');
  const [status,setStatus]=useState('new')

  const [addItem]=useMutation(ADD_ITEM,{
    variables:{name,description,clientID,status},
    update(cache,{data:{addItem}}){
        const {items}=cache.readQuery({query:GET_ITEMS});
        cache.writeQuery({
            query:GET_ITEMS,
            data:{items:[...items,addItem]}
        })
    }
  })
  //GET CLIENT

  const {loading,error,data}=useQuery(GET_CLIENTS)

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(name===""||description===""||status===""){
      return alert("Please fill in all the fields")
    }
    addItem(name,description,clientID,status);
    setName('')
    setDescrition('')
    setStatus('Available')
    setClientID('');
  }
  if(loading) return null;
  if(error) return 'Something Went Wrong';


  return (
    <>
    {!loading&&!error&&(
        <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
        <div className='d-flex align-items-center'>
          <FaList className='icon'/>
          <div>New Item</div>
        </div>
      </button>

      <div className="modal fade" id="addProjectModal" tabindex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">New Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
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
                  <div className='mb-3'>
                    <label className='form-label'>Client</label>
                    <select className='form-select' id="clientID" value={clientID} onChange={(e)=>setClientID(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map((client)=>(
                            <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                    </select>
                  </div>

                <button className='btn btn-primary' type="submit" data-bs-dismiss="modal">Submit</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
    )}

    </>
  )
}

export default ItemModal;
