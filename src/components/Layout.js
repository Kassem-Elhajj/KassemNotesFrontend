import React from 'react'
import NavigationBar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
        <NavigationBar />
        <Outlet/>
    </main>
  )
}

export default Layout