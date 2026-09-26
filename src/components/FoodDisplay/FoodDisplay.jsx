import React, { useContext, useState } from 'react';  
import './FoodDisplay.css';  
import { StoreContext } from '../../context/StoreContext';   
import FoodItem from '../FoodItem/FoodItem';   
import { assets } from '../../assets/assets';  

const FoodDisplay = ({ category }) => {  
  const { food_list, loading, error } = useContext(StoreContext);  
  const [searchTerm, setSearchTerm] = useState(""); 

  if (loading) {  
    return <p>Loading Stock data...</p>;   
  }  


  if (error) {  
    return <p>Error loading Stock data: {error.message}</p>;  
  }  

   
  const filteredFoodList = category === "All"   
    ? food_list   
    : food_list.filter(item => item.category === category);  


  const searchedFoodList = filteredFoodList.filter(item =>   
    item.name.toLowerCase().includes(searchTerm.toLowerCase())  
  );  

 
  if (!searchedFoodList.length) {  
    return(  
      <div className="noproduct">  
         <p>No No food in Stock available for the selected category or search.</p>  
         <p></p>  
         {/* <img src={assets.notfound} alt="No live Food" />   */}
      </div>  
    );  
  }  

  return (  
    <div className='Food-display' id='Food-display'>  
      <h1 className='propogand'>Your Next Favorite Product Awaits</h1>  
        <div className="search-container">  
        
           
              <input   
                type="text"   
                placeholder="search product you need ..."   
                value={searchTerm}   
                onChange={(e) => setSearchTerm(e.target.value)}   
                className="search-input"  
              />  
                <img src={assets.search_icon} alt="Search" className="search-icon" /> 
               
            </div> 
      <div className="Food-display-list">  
        {searchedFoodList.map((item) => (  
          <FoodItem  
            key={item._id} 
            id={item._id}  
            name={item.name}  
            description={item.description}  
            price={item.price}  
            image={item.image}  
          />  
        ))}  
      </div>  
    </div>  
  );  
};  

export default FoodDisplay;  