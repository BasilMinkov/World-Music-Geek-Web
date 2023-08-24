import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

interface ILayout {
    children?: React.ReactNode
}

const Layout: React.FC<ILayout> = (props) => {
    const { children } = props

    return (
        <>
            <Header />
            <div className="container">
                <main className="main">
                    {children}
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Layout