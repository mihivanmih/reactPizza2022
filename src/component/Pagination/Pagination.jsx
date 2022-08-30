import React from 'react'
import style from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

const Pagination = ({setCurrentPage, currentPage}) => {
    return (
        <>
            <ReactPaginate
                className={style.pagination}
                breakLabel="..."
                nextLabel=">"
                onPageChange={e => setCurrentPage(e.selected+1)}
                pageRangeDisplayed={8}
                pageCount={3}
                forcePage={currentPage-1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination