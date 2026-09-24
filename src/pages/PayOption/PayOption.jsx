import React from 'react'
import './PayOption.css'

import { assets } from '../../assets/assets'  


import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'


const PayOption = () => {
    const{getTotalCartAmount}=useContext(StoreContext)
 

  return (
    <>
    <h1 id='main-text'>Payment Option</h1>
    <div className='main-banks'>
      
       {banks.map((item,index)=>{
        return(
<div key={index} className="display">
    <img src={item.image} alt="" className='image' />
    <div className="info">
    <p className='name-reg'>{item.name}</p>
    
   <h2 className='account'>Pay:<span>{getTotalCartAmount()+200}<br></br> </span> birr On this account:
   <br /><b>👉{item.account}</b> .✔</h2>
  
    </div>
    {/* <button><a href={item.link}>Click to pay</a></button> */}

</div>

        )
            
       })}
   
     <hr />
     <div>
          <h1>Scan and upload your payment photo here.👇🏾</h1>
           <a href="https://forms.gle/xNWfZ148hfyByD4S7"><img className='respo' src={assets.respo} alt="" /></a>
     </div>
    
        {/* <button className='button3' onClick={()=>navigate('/pay')}>Pay</button> */}
    </div>
    <hr />
    </>
  )
}

export default PayOption
