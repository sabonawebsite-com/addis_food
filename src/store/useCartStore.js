import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Same shape as before: cartItem = { [itemId]: quantity }
export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItem: {},

      addToCart: (itemId) =>
        set((state) => ({
          cartItem: {
            ...state.cartItem,
            [itemId]: (state.cartItem[itemId] || 0) + 1,
          },
        })),

      removeFromcart: (itemId) =>
        set((state) => {
          const qty = state.cartItem[itemId] || 0
          if (qty <= 1) {
            // drop the key entirely when it reaches 0
            const { [itemId]: _removed, ...rest } = state.cartItem
            return { cartItem: rest }
          }
          return { cartItem: { ...state.cartItem, [itemId]: qty - 1 } }
        }),

      clearCart: () => set({ cartItem: {} }),

      // food_list is passed in, so the store doesn't depend on where the menu comes from
      getTotalCartAmount: (food_list) => {
        const { cartItem } = get()
        return food_list.reduce(
          (total, item) => total + item.price * (cartItem[item._id] || 0),
          0
        )
      },
    }),
    { name: 'cart-storage' }
  )
)