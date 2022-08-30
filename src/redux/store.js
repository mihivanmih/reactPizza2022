import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlise'

export const store = configureStore({
    reducer: {
        filterSlice: filterSlice,
        cartSlice: cartSlice,
        pizzasSlice
    },
})

