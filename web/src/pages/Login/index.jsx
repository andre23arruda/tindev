import React, { useState } from 'react'
import { useHistory } from 'react-router'


// utils
import { postRequest } from '../../services/api'

// styles and images
import './Login.css'
import logo from '../../assets/logo.svg'


function Login({ history }) {
    const [user, setUser] = useState('')

    function validateForm() {
        return user.length > 0
    }

    async function handleSubmit(e){
        e.preventDefault()

        const response = await postRequest('devs/', { user })
        console.log(response)

        try {
            const devLogged = response.id
            console.log(devLogged)
            history.push(`/devs/${ devLogged }`)
        } catch(e) {
            alert('Usuário não encontrado')
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={ handleSubmit }>
                <img src={ logo } alt="Tindev" className="logo"/>

                <input
                    placeholder="Digite seu usuário do GitHub"
                    value={ user }
                    onChange={ e => setUser(e.target.value) }
                />

                <button type="submit" disabled={ !validateForm() }>Entrar</button>
            </form>
        </div>
    )
}

export default Login
