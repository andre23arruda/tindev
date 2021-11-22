import React from 'react'
import { BrowserRouter,  Route } from 'react-router-dom'

// pages
import Login from './pages/Login'
import Main from './pages/Main'
import User from './pages/User'


function Routes(){
    return (
        <BrowserRouter>
            <Route path='/' exact component={ Login } />

            <Route path='/devs/:id' component={ Main } />

            <Route path='/user/:id' component={ User } />
        </BrowserRouter>
    )
}

export default Routes
