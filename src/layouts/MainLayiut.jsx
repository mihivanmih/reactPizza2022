import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'

const MainLayiut = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayiut