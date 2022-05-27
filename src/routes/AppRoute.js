import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loader from '../common/Loader'
import Header from '../components/Header'
import Feed from '../pages/Feed'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Users from '../pages/User'

const AppRoute = () => {
    const isVisible = useSelector(state => state.loader.isVisible)
    return (
        <>
            <BrowserRouter>
                <Header />
                {isVisible && <Loader />}
                <Routes>
                    <Route path='/' />
                        <Route index element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='feed' element={<Feed />} />
                        <Route path='users' element={<Users />} />
                        <Route path='profile' element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRoute