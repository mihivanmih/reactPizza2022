import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/slices/cartSlice'
import { countPizzaOne } from '../../redux/slices/pizzasSlise'


const typesName = ['тонкое', 'традиционное'] //название типов пиццы


const PizzaBlock = ({title, price = 699, img, sizes, types, id, itemsCount}) => {
    
    const [pizzaCount, setPizzaCount] = useState(0)
    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    
    const dispatch = useDispatch()
    
    const onClickAdd = () => {
        setPizzaCount(pizzaCount + 1)
        dispatch(countPizzaOne(id))
        const item = {
            id,
            title,
            price,
            type: typesName[activeType],
            size: sizes[activeSize],
            count: 1
        }
        dispatch(addProduct(item))
    }
    
    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={ img }
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{ title }</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        types.map((item, index) =>
                            <li
                                key={ index }
                                onClick={ setActiveType.bind(this, index) }
                                className={ index == activeType ? "active" : "" }
                            >
                                { typesName[item] }
                            </li>
                        )
                    }
                </ul>
                <ul>
                    {
                        sizes.map((item, index) =>
                            <li
                                key={ index }
                                onClick={ setActiveSize.bind(this, index) }
                                className={ index == activeSize ? "active" : "" }
                            >
                                { item } см.
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от { price } ₽</div>
                <button onClick={ onClickAdd } className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    { itemsCount > 0 && <i>{ itemsCount }</i> }
                </button>
            </div>
        </div>
    )
}

export default PizzaBlock