import React from 'react'

// styles and images
import './Header.css'


function Header({ children }){
    return (
        <div className="header">
            <div className="icons-container">
                { children }
            </div>
        </div>
    )
}

export default Header