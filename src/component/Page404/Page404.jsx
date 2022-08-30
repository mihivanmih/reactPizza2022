import React from 'react'
import styles from './Page404.module.css'

const NotFoundBlock = () => {
    return (
        <>
            <div className={styles.root}>
                <h1>
                    <span>=(</span>
                    <br/>
                    Ничего не найдено
                </h1>
                Страница отсутствует
            </div>
        </>
    )
}

export default NotFoundBlock