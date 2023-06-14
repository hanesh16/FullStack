import Spinner from './Spinner'
import { useQuery } from '@apollo/client'
import { GET_ITEMS } from './queries/itemQueries'
import ItemCard from "./ItemCard"
import React from 'react'

const Items = () => {
    const {loading,error,data}=useQuery(GET_ITEMS)
    if(loading)
        return <Spinner/>
    if(error){
        return <p>Something went wrong</p>;
    }
  return (
    <div>
      {data.items.length>0?(
        <div className='row mt-5'>
            {data.items.map((item)=>(
               <ItemCard key={item.id} item={item}/>
            ))}
        </div>
        ):(<p>No Items</p>)}
    </div>
  )
}

export default Items
