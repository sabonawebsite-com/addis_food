import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import Searchle from '../Searchble/Searchle';
import Comm_spo from '../Comm_spo/Comm_spo';
import PopupAd from '../PopupAd/PopupAd';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ setShowlogin }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [comm_spo, setComm_spo] = useState(false);
  const [userData, setUserData] = useState(false);
  const [menu, setMenu] = useState("home");
  const [showAd, setShowAd] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // food_list still comes from StoreContext
  const { food_list } = useContext(StoreContext);

  // Cart and auth now come from Zustand
  const getTotalCartAmount = useCartStore((state) => state.getTotalCartAmount);
  const clearCart = useCartStore((state) => state.clearCart);
  const token = useAuthStore((state) => state.token);
  const logoutUser = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('hasSeenAd');
    if (!hasSeenAd) {
      const timer = setTimeout(() => {
        setShowAd(true);
        sessionStorage.setItem('hasSeenAd', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const comm_advert = () => {
    setComm_spo(!comm_spo);
  };

  const userDataHandeler = () => {
    setUserData(!userData);
  };

  const logout = () => {
    logoutUser();   // clears token and user from the auth store
    clearCart();    // optional: remove this line if you want the cart kept after logout
    navigate("/");
  };

  const handleHamburgerClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuClick = (menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
  };

  return (
    <div className='navbar'>

      {/* {showAd && <PopupAd onClose={() => setShowAd(false)} />} */}

      <Link to='/'>
        <img title='logo' src={assets.stocklogo} alt="" className='logo' />
      </Link>

      <div className="hamburger" onClick={handleHamburgerClick}>
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      <ul className={`navbar-menu${mobileMenuOpen ? ' open' : ''}`}>
        <Link title='home' to='/' className={menu === "home" ? "active" : ""} onClick={() => handleMenuClick("home")}>home</Link>
        <a title='product list ' href='#explore-menu' className={menu === "menu" ? "active" : ""} onClick={() => handleMenuClick("menu")}>Product-List</a>
        <a title='contact us ' href='#footer' className={menu === "contact-us" ? "active" : ""} onClick={() => handleMenuClick("contact-us")}>contact-us</a>
        <a title='for more information ' href='#contact' className={menu === "Add-info" ? "active" : ""} onClick={() => handleMenuClick("Add-info")}>Add-info</a>

      </ul>
      {comm_spo && <Comm_spo />}
      <div className="navbar-right">
        {/* <img title='search product' onClick={toggleSearch} className='search-icon1' src={assets.search_icon} alt="" />
        {showSearch && <Searchle />} */}
        <div className="navbar-search-icon">
          <Link title='check your cart' to='/cart'><img src={assets.carticon} alt="" /></Link>
          <div className={getTotalCartAmount(food_list) === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button title='sign in to our web app' onClick={() => setShowlogin(true)} className='sigin-in'>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;