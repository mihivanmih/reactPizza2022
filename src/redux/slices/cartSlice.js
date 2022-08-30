import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: [],
    allItems: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action){
                state.totalPrice += action.payload.price
                state.allItems++
                let itemNew = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
    
                if (itemNew !== -1) {
                    state.items[itemNew].count++
                } else {
                    state.items.push(action.payload)
                }
        },
        plusItem(state, action){
            let NewItemPizza = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            state.items[NewItemPizza].count++
            state.totalPrice += action.payload.price
            state.allItems++
        },
        minusItem(state, action){
            let NewItemPizza = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            state.items[NewItemPizza].count--
            state.totalPrice -= action.payload.price
            state.allItems--
            if(state.items[NewItemPizza].count===0){
                let NewItemPizza = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
                console.log("NewItemPizza", NewItemPizza)
                state.totalPrice -= state.items[NewItemPizza].count * state.items[NewItemPizza].price
                state.allItems -= state.items[NewItemPizza].count
                state.items.splice(NewItemPizza, 1)
            }
        },
        removeItem(state, action){
            let NewItemPizza = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            console.log("NewItemPizza", NewItemPizza)
            state.totalPrice -= state.items[NewItemPizza].count * state.items[NewItemPizza].price
            state.allItems -= state.items[NewItemPizza].count
            state.items.splice(NewItemPizza, 1)
        },
        clearItems(state){
            state.items = []
            state.totalPrice = 0
            state.allItems = 0
        }
    },
})

export const selectorCart = (state) => state.cartSlice // селектор

export const { addProduct, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer