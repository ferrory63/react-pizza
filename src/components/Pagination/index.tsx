import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './pagination.module.scss'

type PaginationProps = {
    onChangePage: (page: number) => void
    value: number
}

export const Pagination: React.FC<PaginationProps> = ({
    onChangePage,
    value,
}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageCount={3}
            forcePage={value - 1}
        ></ReactPaginate>
    )
}
