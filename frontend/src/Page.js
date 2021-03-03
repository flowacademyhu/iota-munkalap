import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Header from './Header'
import HeaderForMobile from './HeaderForMobile'
import Menu from './Menu'
import './style.css'
import Routing from './Routing'

export default function Page() {
  const isMobile = useMediaQuery({ query: `(max-width: 576px)` })
  return (
    <Router>
      <header>
        <div className="col-12">
          {isMobile ? <HeaderForMobile /> : <Header />}
          <Menu />
        </div>
      </header>
      <main>
        <Routing />
      </main>
    </Router>
  )
}
