import React from 'react'
import './Contact.css'
// import emailPc from '../../assets/msg-icon.png'
// import emailPc1 from '../../assets/phone-icon.png'
// import emailPc2 from '../../assets/mail-icon.png'
// import emailPc3 from '../../assets/location-icon.png'
import { assets } from '../../assets/assets'
const Contact = () => {
  const [result, setResult] = React.useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
  formData.append("access_key", "fb157278-c020-42dd-bd36-1f503b4fd21b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='contact' id='contact'>
    
      <div className='contact-col'>
        <h3>Send us message <img src={assets.mail_icon} alt="" /></h3>
        <p>Revolutionizing Food trading. Our system provides a transparent and efficient way to buy and sell Food.  Features include detailed Food profiles, secure payment options, and direct communication with buyers for more info👇🏿</p><br />

      
        <ul>
          <li> <img src={assets.mail_icon} alt="" />Stockifygmail.com</li>
          <li> <img src={assets.phone_icon} alt="" />0945671967</li>
          <li> <img src={assets.location_icon} alt="" />Addis Ababa, Ethiopia</li>

        </ul>
      </div>
      <div className='contact-col'>
        <form onSubmit={onSubmit}>
          <h2>Have an app idea you'd like to share?</h2>
     
          <label > Enter Your Name👇🏻</label>
          <input type="text" name='name' placeholder='Enter your name..' required />
          <label >Phone Number 👇🏻</label>
          <input type="tel" name='phone' placeholder='phone..' required />
          <label >Write message Here 👇🏻</label>
          <textarea name='message' rows="6" placeholder='message ..' required></textarea>
        
          <button type='submit' className='dark-btn'>SEND NOW➡</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact