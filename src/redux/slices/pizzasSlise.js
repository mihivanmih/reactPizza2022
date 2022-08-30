import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    pizzasArray: [],
    list: [
        {name: 'популярности', value: "rating"},
        {name: 'дешевле', value: "price", sort: "asc"},
        {name: 'подороже', value: "price", sort: "desc"},
        {name: 'алфавиту', value: "name", sort: "asc"},
    ],
    status: 'loading' //loading | succces } error
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', // = name
    async (params, thunkAPI) => {
        const { category, sort, search, currentPage, sortSelected } = params
        const res = await axios.get(`https://6307db3f46372013f572ed88.mockapi.io/pizzes?page=${ currentPage }&limit=4&category=${ category }&sortBy=${ initialState.list[sortSelected].value }&order=${ sort }&search=${ search }`)
        return res.data
    }
)

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItemsPizza(state, action){
            // state.pizzasArray = action.payload
            // // добавляем новое свойство для всех пицц из бека
            // state.pizzasArray.map(item => {
            //     item.countOnePizza = 0
            // })
        },
        countPizzaOne(state, action) {
            const index = state.pizzasArray.findIndex(item => item.id === action.payload)
            state.pizzasArray[index].countOnePizza ++
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            //state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzasArray = action.payload
            // TODO надо сделать сравнение двух массивов
            state.pizzasArray.map(item => {
                item.countOnePizza = 0
            })
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            //state.items = []
        }
    }
})

export const selectorPizzas = state => state.pizzasSlice
export const selectorFilter  = state => state.filterSlice

export const { setItemsPizza, countPizzaOne } = pizzasSlice.actions

export default pizzasSlice.reducer