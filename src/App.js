import './scss/app.scss'
import Header from './component/Header'
import React, { createContext, useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Page404 from './pages/page404'
import FullPizza from './pages/FullPizza'
import MainLayiut from './layouts/MainLayiut'

function App() {
    return (
        <Routes>
            <Route path={ "/" } element={ <MainLayiut/> }>
                <Route path={ "/" } element={ <Home/> }/>
                <Route path={ "/cart" } element={ <Cart/> }/>
                <Route path={ "/pizza/:id" } element={ <FullPizza/> }/>
                <Route path="*" element={ <Page404/> }/>
            </Route>
        </Routes>
    )
}

export default App
