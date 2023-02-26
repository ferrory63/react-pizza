import React from 'react'
import Header from '../components/Header'

import { Outlet } from 'react-router-dom'

type LayoutProps = {}

const LayoutPrime: React.FC<LayoutProps> = () => {
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutPrime
