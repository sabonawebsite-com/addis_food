import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './PopupAd.css';

const PopupAd = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    },80); // Auto-close after 8 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="popup-ad-overlay">
      <div className="popup-ad-container">
        <button className="close-btn" onClick={() => {
          setVisible(false);
          onClose();
        }}>×</button>
        
        <h3>Take Exam!</h3>
        <p>60%  Successful </p>
        <img src={assets.advert} alt="Special Offer" className="ad-image" />
        <a href="https://sabonawebsite-com.github.io/exithome/" className="shop-now-btn">
         Click Here
        </a>
      </div>
    </div>
  );
};

export default PopupAd;