import React, { useContext, useEffect, useRef, useState } from 'react'
import Categories from '../component/Categories'
import Sort from '../component/Sort'
import Skeleton from '../component/PizzaBlock/Skeleton'
import PizzaBlock from '../component/PizzaBlock/PizzaBlock'
import Pagination from '../component/Pagination/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'
import { fetchPizzas, selectorFilter, selectorPizzas } from '../redux/slices/pizzasSlise'

const Home = () => {
    //const {searchValue} = useContext(SearchContext)
    const navigate = useNavigate()
    
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    
    //Redux Toolkit
    const {pizzasArray, status, list} = useSelector(selectorPizzas)
    const {categoryId, sortSelected, currentPage, searchValue} = useSelector(selectorFilter)
    
    //dispatch
    const dispatch = useDispatch()
    const setActiveCategories = id => dispatch(setCategoryId(id))
    const currentPageFunc = id => {
        dispatch(setCurrentPage(id))
    }
    
    // const test = [{id:7, price:400},{id:7, price:500},{id:4, price:770}]
    //
    // function filterMethod(item) {
    //     console.log("итемы пришли", item.id)
    //     let itemNew = test.find(item.id)
    //     console.log(itemNew)
    // }
    //
    // const sum = test.reduce((count, item) => filterMethod(item)? count + 1 : count, 0)
    
    
    
    
    
    
    const axiosPizzas = async () => {
        //setIsLoading(true)
    
        const category = categoryId ? categoryId : ""
        const sort = list[sortSelected].sort ? list[sortSelected].sort : "desc"
        const search = searchValue ? searchValue : ""
    
        // await axios.get(`https://6307db3f46372013f572ed88.mockapi.io/pizzes?page=${ currentPage }&limit=4&category=${ category }&sortBy=${ list[sortSelected].value }&order=${ sort }&search=${ search }`)
        //     .then(res => {
        //         setPizzasArray(res.data)
        //         setIsLoading(false)
        //     }).catch((err) => {
        //      console.log(err, "AXIOS ERROR")
        //     })
    
    
        dispatch(fetchPizzas({
            category,
            sort,
            search,
            currentPage,
            sortSelected
        }))
    }
        //setIsLoading(false)
     
    
    // Если был первый рендер то проверяет URL-параметры и сохраняем в редаксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            dispatch(setFilters({...params}))
            isSearch.current = true
        }
    }, [])
    
    // если ничего не изменилось он впервые выполнится, что бы это пофиксить используем лайфхак с isMounted
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortSelected,
                categoryId,
                currentPage
            })
            navigate(`?${ queryString }`)
        }
        isMounted.current = true
    }, [categoryId, sortSelected, searchValue, currentPage])
    
    // если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            axiosPizzas()
        }
        
        isSearch.current = false
        
    }, [categoryId, sortSelected, searchValue, currentPage])
    
    
    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={ index }/>) //скелет пицц
    
    // массив пицц из бека с фильтрацией для поиска
    const pizzas = pizzasArray.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase())
    }).map(item =>
        <Link to={"/pizza/"+ item.id} key={ item.id }>
            <PizzaBlock
            itemsCount={ item.countOnePizza }
            id={ item.id }
            title={ item.name }
            price={ item.price }
            sizes={ item.sizes }
            img={ item.imageUrl }
            types={ item.types }
        /></Link>
    )
    
    return (
        <>
            <div className="content__top">
                <Categories activeCategories={ categoryId } setActiveCategories={ setActiveCategories }/>
                <Sort list={ list }/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status==="error"
                    ? <div className={"content__errorInfo"}><h2>Пиццы не загрузились</h2></div>
                    :  status==="loading"
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination currentPage={ currentPage } setCurrentPage={ currentPageFunc }/>
        </>
    )
}

export default Home