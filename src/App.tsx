import React from 'react'
import Loadable from 'react-loadable'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import './scss/app.scss'

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart"*/ './pages/Cart'),
    loading: () => <div>Загружаемся епты ХЫЫЫ</div>,
})

// const Cart = React.lazy(
//     () =>
// )
const FullPizza = React.lazy(
    () => import(/* webpackChunkName: "Full"*/ './pages/FullPizza')
)
const LayoutPrime = React.lazy(
    () => import(/* webpackChunkName: "Layout"*/ './layouts/LayoutPrime')
)
const NotFound = React.lazy(
    () => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound')
)

function App() {
    return (
        <Routes>
            <Route path="/" element={<LayoutPrime />}>
                <Route path="" element={<Home />} />
                <Route
                    path=""
                    element={
                        <React.Suspense
                            fallback={<div>Загружаемся епты ХЫЫЫ</div>}
                        >
                            <NotFound />
                        </React.Suspense>
                    }
                />
                <Route path="cart" element={<Cart />} />
                <Route
                    path="pizza/:id"
                    element={
                        <React.Suspense
                            fallback={<div>Загружаемся епты ХЫЫЫ</div>}
                        >
                            <FullPizza />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
