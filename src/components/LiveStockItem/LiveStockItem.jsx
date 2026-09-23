import React, { useContext } from 'react'
import './LiveStockItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const LiveStockItem = ({ id, name, price, description, image }) => {

  const { cartItem, addToCart, removeFromcart } = useContext(StoreContext)

  return (
    <div className='live-stock-itme'>
      <div className="live-stock-item-contener">
        <img src={image} alt={name} className="live-stock-item-image" />
        {!cartItem[id] ? (
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add" />
        ) : (
          <div className='live-stock-item-counter'>
            <img onClick={() => removeFromcart(id)} src={assets.remove_icon_red} alt="remove" />
            <p>{cartItem[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
          </div>
        )}
      </div>
      <div className="live-stock-item-ifo">
        <div className="live-stock-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="live-stock-item-description">{description}</p>
        <p className="live-stock-item-price">Price : {price} Birr</p>
      </div>
    </div>
  )
}

export default LiveStockItem