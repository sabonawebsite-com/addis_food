import React, { useRef, useState } from 'react';  
import emailjs from '@emailjs/browser';  
import { useNavigate } from 'react-router-dom';
import './Myorder.css';

export const Myorder = () => {  
  const navigate = useNavigate();
  const form = useRef();  
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e) => {  
    e.preventDefault();  
    setIsLoading(true);
    setStatusMessage('');

    try {
      const result = await emailjs.sendForm(
        'service_9fppvat', 
        'template_0zj5qg8', 
        form.current, 
        '20qWbrkh59HP-CEKF'
      );
      setStatusMessage('Sent successfully!');
      form.current.reset();
    } catch (error) {
      console.error('Email send error:', error);
      setStatusMessage(`Failed to send email: ${error.text || 'Please try again later'}`);
    } finally {
      setIsLoading(false);
    }
  };  

  return (  
    <div>
      <form ref={form} className='place-order' onSubmit={sendEmail}>  
        <div className="place-order-left">  
          <p className="title">Delevery Informations</p>  
          <div className="multi-fields">  
            <input required name='firstName' type="text" placeholder='First Name' />  
            <input required name='lastName' type="text" placeholder='Last Name' />  
          </div>  
          <input required name='email' type="email" placeholder='Your Email' />  
          <input required name='code' type="text" placeholder='code ...' />  
          <div className="multi-fields">  
            <input required name='distro' type="text" placeholder='Your area of distribution' />  
            <input required name='state' type="text" placeholder='State' />  
          </div>  
          <div className="multi-fields">  
            <input required name='fan' type="text" placeholder='FAN' />  
            <input required name='country' type="text" placeholder='Country' />  
          </div>  
          <input required name='phone' type="tel" placeholder='Phone' />  
          <button 
            type='submit' 
            className='least-button' 
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'send➡'}
          </button>  
        </div>  

        <div className="cart-total-modif">  
          {/* Your cart total content */}  
        </div>  

        {statusMessage && (
          <p className={`status-message ${statusMessage.includes('Failed') ? 'error' : 'success'}`}>
            {statusMessage}
          </p>
        )}
      </form> 
    </div>
  );  
};  

export default Myorder;