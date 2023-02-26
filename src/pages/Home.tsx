import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import qs from 'qs'
//import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { Pagination } from '../components/Pagination'

import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/slices/filter/selectors'
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice'
import { selectPizzaData } from '../redux/slices/pizza/selectors'
import { fetchPizzas } from '../redux/slices/pizza/asyncActions'

const Home = () => {
    //const navigate = useNavigate()
    const dispatch = useAppDispatch()
    //const isMounted = useRef(false)
    const { searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzaData)
    const { categoryId, sort, currentPage } = useSelector(selectFilter)
    import('./../utils/math').then((math) => {
        console.log(math.add(111, 222))
    })

    const onClickCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))
    const pizzasArr = items
        .filter((obj) => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            }
            return false
        })
        .map((item) => (
            <div className="pizza-block-wrapper">
                <PizzaBlock key={item.id} {...item} />
            </div>
        ))

    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ``
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            })
        )

        window.scrollTo(0, 0)
    }

    //// ==БЛЯТЬ ТУТ В ЧЕМ ТО ОШИБКА==
    // ===РАЗБЕРЕМСЯ===

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(
    //             window.location.search.substring(1)
    //         ) as unknown as TSearchPizzaParams
    //         const sort = sortList.find(
    //             (obj) => obj.sortProperty === params.sortBy
    //         )

    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort ? sort : sortList[0],
    //             })
    //         )
    //     }
    //     isMounted.current = true
    // }, [])

    useEffect(() => {
        getPizzas()
    }, [])

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const params = {
    //             categoryId: categoryId > 0 ? categoryId : null,
    //             sortProperty: sort.sortProperty,
    //             currentPage,
    //         }
    //         const queryString = qs.stringify(params, { skipNulls: true })
    //         navigate(`/?${queryString}`)
    //     }

    //     if (!window.location.search) {
    //         dispatch(fetchPizzas({} as TSearchPizzaParams))
    //     }

    //     isMounted.current = true
    // }, [categoryId, sort.sortProperty, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошбка</h2>
                    <p>не удалось получить питсы</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzasArr}
                </div>
            )}

            <Pagination value={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
