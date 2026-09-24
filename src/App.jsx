import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import About from './components/About/About'
import Myorder from './pages/Myorder/Myorder'
import PayOption from './pages/PayOption/PayOption'
const App = () => {
  const [showlogin, setShowlogin] = useState(false)
  return (
    <div>
      {showlogin ? <LoginPopUp setShowlogin={setShowlogin} /> : <></>}
      <div className='app'>
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          
          <Route path='myorders' element={<Myorder />} />
          {/* <Route path='/distro' element={<MainDistro />} /> */}
          <Route path='/pay' element={<PayOption />} />
        </Routes>
      </div>
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}
export default App
