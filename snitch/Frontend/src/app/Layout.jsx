import React from 'react'
import Navbar from '../features/shared/components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../features/shared/components/Footer'

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout