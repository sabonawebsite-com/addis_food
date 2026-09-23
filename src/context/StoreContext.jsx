import { createContext, useEffect, useState } from "react";
import { food_list as localLiveStockList } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [food_list, setFoodList] = useState([]);

    const addToCart = (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeFromcart = (itemId) => {
        setCartItem((prev) => {
            if (!prev[itemId]) return prev;
            const updated = { ...prev, [itemId]: prev[itemId] - 1 };
            if (updated[itemId] <= 0) {
                delete updated[itemId];
            }
            return updated;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    };

    // Load food list locally instead of from an API
    useEffect(() => {
        setFoodList(localLiveStockList);

        const savedCart = localStorage.getItem("cartItem");
        if (savedCart) {
            setCartItem(JSON.parse(savedCart));
        }
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }, [cartItem]);

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromcart,
        getTotalCartAmount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;