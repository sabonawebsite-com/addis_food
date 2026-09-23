import React, { useState } from 'react'
import './Searchle.css'
import { food_list } from '../../assets1/assets1.js';  
const Searchle = () => {  
    const [searchTerm, setSearchTerm] = useState("");  
    const [cartCount, setCartCount] = useState({}); 
  
    const addToCar = (id) => {  
      setCartCount(prevCounts => ({...prevCounts, [id]: (prevCounts[id] || 0) + 1,   
      }));  
    };  
  
    const removeFromCart = (id) => {  
      setCartCount(prevCounts => ({ ...prevCounts, [id]: Math.max((prevCounts[id] || 0) - 1, 0),      
      }));  
  
    };
    return (  
      <div className='search'>  
        <div className='search-here'>  
          <input  
            type="text"  
            placeholder='Search..'  
            id='search-card'  
            onChange={(event) => {  
              setSearchTerm(event.target.value);
            }}  
          />  
        </div>  
        <div className="templeate-contener">  
          {food_list.filter((val) => {  
            if (searchTerm === "") {  
              return false;  
            } else if (val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {  
              return val;  
            }  
            return false;  
          }).map((val) => {  
            const count = cartCount[val._id] || 0;
            return (  
              <div key={val._id} className='template-searched'>  
                <img src={val.image} alt={val.name} className="img-pro" />
                <div className="info">
                   
                <h1 className="img-name">{val.name}</h1>  
                <p className="img-price">Price: {val.price} Birr</p>  
                <p className="img-description">{val.description}</p>  
                <p className="img-category">{val.category}</p>  
                <button onClick={() => addToCar(val._id)} className='button-1'>  
                 ➕: {count}  
                </button>  
                <button onClick={() => removeFromCart(val._id)} className='button-2'>  
                 ➖:{count}  
                </button>  
                </div>  
              </div>  
            );  
          })}  
        </div>  
    
      </div>  
    );  
  };  
  

export default Searchle
