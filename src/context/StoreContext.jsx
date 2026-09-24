import { createContext, useEffect, useState } from "react";
import { food_list as localLiveStockList } from "../assets/assets";

export const StoreContext = createContext(null);

// Cart state now lives in src/store/useCartStore.js (Zustand),
// and auth state in src/store/useAuthStore.js.
// This context only provides the food list.
const StoreContextProvider = (props) => {
    const [food_list, setFoodList] = useState([]);

    // Load food list locally instead of from an API
    useEffect(() => {
        setFoodList(localLiveStockList);
    }, []);

    const contextValue = {
        food_list,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;