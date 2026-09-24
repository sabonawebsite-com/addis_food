import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { useAuthStore } from '../../store/useAuthStore'

const Cart = () => {
  // food_list still comes from context for now (see note below)
  const { food_list } = useContext(StoreContext)

  // Zustand: select only what this component needs
  const cartItem = useCartStore((state) => state.cartItem)
  const removeFromcart = useCartStore((state) => state.removeFromcart)
  const getTotalCartAmount = useCartStore((state) => state.getTotalCartAmount)
  const token = useAuthStore((state) => state.token)

  const navigate = useNavigate()

  const subtotal = getTotalCartAmount(food_list)
  const fee = subtotal === 0 ? 0 : 2

  const handleCheckout = () => {
    if (!token) {
      navigate('/login') // change to your login route
      return
    }
    navigate('/myorders')
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Title</p>
          <p>Items</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>Birr:{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>Birr:{item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeFromcart(item._id)} className='crows'>❌</p>
                </div>
                <hr />
              </div>
            )
          }
          return null
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2> TOTAL</h2>
          <div>
            <div className="cart-total-detail">
              <p>subtotal</p>
              <p>Birr:{subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Fee</p>
              <p>Birr:{fee}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>Birr:{subtotal + fee}</b>
            </div>
          </div>

          <div className='delevery-option'>
            <button title='check your cart' onClick={handleCheckout}>Checkout</button>
          </div>
        </div>

        <div className="cart-promocode">
          <div>
            <div className='cart-promo-code-input'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart