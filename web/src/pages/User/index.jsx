import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

// components
import Header from '../../components/Header/Header'

// utils
import { getRequest } from '../../services/api'

// styles and images
import './User.css'
import logo from '../../assets/logo.svg'

function User({ match }){
    const dev_id = match.params.id
    const [loggedUser, setloggedUser] = useState({})

    useEffect(() => {
        async function loadUser(){
            const response = await getRequest(`devs/${ dev_id }`)
            console.log(response)
            setloggedUser(response)
        }
        loadUser()
    }, [match.params.id])


    return (
        <>
        <Header>
            <div className="icon" />

            <div>
                <Link to = {`/devs/${ dev_id }`}>
                    <img className="logo" src={ logo } alt="Tindev" />
                </Link>
            </div>

            <div className="icon"/>
        </Header>

        <div className="user-container">


            <div className="user-card">
                <img src={ loggedUser.avatar } alt="User avatar"/>

                <footer>
                    <strong>{ loggedUser.name }</strong>
                    <p>{ loggedUser.bio }</p>
                </footer>
            </div>
        </div>
        </>
    )
}

export default User
