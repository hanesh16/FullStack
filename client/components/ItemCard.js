import React from 'react'

const ItemCard = (props) => {
  return (
    <div className='col-md-4'>
        <div className='card mb-3'>
            <div className='card-body'>
                <div className='d-flex justify-content-between'>
                    <h5 className='card-title'>{props.item.name}</h5>
                    <a className='btn btn-light' href={`/item/${props.item.id}`}>View</a>
                </div>
                <p className='small'>Status: <strong>{props.item.status}</strong></p>
            </div>
        </div>

    </div>
  )
}

export default ItemCard
