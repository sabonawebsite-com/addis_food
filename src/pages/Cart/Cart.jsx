import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import {Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItem, removeFromcart, food_list, getTotalCartAmount } = useContext(StoreContext)
  const navigate = useNavigate()

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
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
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
              <p>Birr:{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Fee</p>
              <p>Birr:{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>Birr:{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <div className='delevery-option'>
            {/* <button
              onClick={() => navigate("/myorders")}
              className='button1'
              disabled={getTotalCartAmount() === 0}
            >
              PROCEED TO CHECKOUT
            </button> */}
            <Link title='check your cart' to='/myorders'><button>Checkout</button></Link>
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