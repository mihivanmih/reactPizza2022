import React, { useState } from 'react'

const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
]

const Categories = ({activeCategories, setActiveCategories}) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) =>
                        <li
                            key={ item }
                            onClick={ setActiveCategories.bind(this, index) }
                            className={ activeCategories === index ? "active" : "" }
                        >
                            { item }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Categories