import React, { useCallback, useRef, useState } from 'react'
import style from "./Search.module.css"
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    
    const inputRef = useRef()
    const onClickClear = () => {
        dispatch(setSearchValue(""))
        setValue("")
        inputRef.current.focus()
    }
    
    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 500),
        [])
    
    
    const onChangeInput = e => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    
    return (
        <>
            <input
                ref={ inputRef }
                type="text"
                placeholder={ "Поиск пиццы..." }
                className={ style.root }
                onChange={ onChangeInput }
                value={ value }
            />
            { value && <span onClick={ onClickClear } className={ style.clear }>X</span> }
        </>
    )
}

export default Search