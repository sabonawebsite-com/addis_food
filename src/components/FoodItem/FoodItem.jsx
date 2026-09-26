import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useCartStore } from '../../store/useCartStore'

const FoodItem = ({ id, name, price, description, image }) => {

  // Select only this item's quantity, so the card re-renders only when its own count changes
  const quantity = useCartStore((state) => state.cartItem[id])
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromcart = useCartStore((state) => state.removeFromcart)

  return (
    <div className='food-item'>
      <div className="food-item-container">
        <img src={image} alt={name} className="food-item-image" />
        {!quantity ? (
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add" />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromcart(id)} src={assets.remove_icon_red} alt="remove" />
            <p>{quantity}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">Price : {price} Birr</p>
      </div>
    </div>
  )
}

export default FoodItem