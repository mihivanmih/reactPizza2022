import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: "",
    categoryId: 0,
    sortSelected: 0,
    currentPage: 1,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.categoryId = action.payload
        },
        setSearchValue(state, action){
            state.searchValue = action.payload
        },
        selectedId(state, action){
            state.sortSelected = action.payload
        },
        setCurrentPage(state, action){
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = +action.payload.currentPage
            state.sortSelected = +action.payload.sortProperty
            state.categoryId = +action.payload.categoryId
        }
    },
})

export const selectedSort = state => state.filterSlice

export const { setCategoryId, selectedId, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer