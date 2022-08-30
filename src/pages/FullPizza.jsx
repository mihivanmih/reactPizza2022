import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const FullPizza = () => {
    const [data, setData] = useState([])
    
    const {id} = useParams()
    const navigate = useNavigate()
    
    
    useEffect(() => {
        async function fetchPizza() {
            try {
                const res = await axios.get(`https://6307db3f46372013f572ed88.mockapi.io/pizzes/${ id }`)
                setData(res.data)
            } catch (error) {
                console.log("Ошибка при 1 пиццы")
                navigate('/')
            }
        }
        
        fetchPizza()
    }, [])
    
   if (data.length<=0) {
       return "Загрузка..."
   }
    
    return (
        <>
            <div style={{textAlign: 'center'}}>
                <img src={data.imageUrl} alt=""/>
                <h2>{ data.name }</h2>
                <h4>{data.price} руб.</h4>
            </div>
        </>
    )
}

export default FullPizza