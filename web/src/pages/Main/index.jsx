import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

// components
import Header from '../../components/Header/Header'

// utils
import { API_URL, getRequest, postRequest } from '../../services/api'

// styles and images
import './Main.css'
import logo from '../../assets/logo.svg'
import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import itsamatch from '../../assets/itsamatch.png'
import user from '../../assets/user.svg'
import logout from '../../assets/logout.svg'


function Main({ match }){
    const devLogged = match.params.id

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

    async function handleLike(user_id){
        await postRequest(`devs/${ devLogged }/like/`, { user_id })
        setUsers(users.filter(user => user.id !== user_id))
    }

    async function handleDislike(user_id){
        await postRequest(`devs/${ devLogged }/dislike/`,  { user_id })
        setUsers(users.filter(user => user.id !== user_id))
    }

    const connectionString = 'ws://' + API_URL + '/ws/users/' + devLogged
    const socket = new WebSocket(connectionString)

    function connect() {
        socket.onopen = function open() {
            console.log('WebSockets connection created.')
        }

        socket.onclose = function (e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
            setTimeout(function () {
                connect()
            }, 1000)
        }

        socket.onmessage = function(e) {
            const data = JSON.parse(e.data)
            if (data.payload) {
                setMatchDev(data.payload.detail)
            }
        }

        if (socket.readyState == WebSocket.OPEN) {
            socket.onopen()
        }
    }

    // conectar ao websocket
    useEffect(() => {
        connect()
    }, [])

    useEffect(() => {
        async function loadUsers() {
            const response = await getRequest('devs', { 'UserID': devLogged })
            // console.log(response)
            setUsers(shuffle(response))
        }
        loadUsers()
    }, [match.params.id])

    return (
        <>
        <Header>
            <div className="icon">
                <Link to= {`/user/${ devLogged }`}>
                    <img className="icon" src={ user } alt="User" />
                </Link>
            </div>

            <img className="logo" src={ logo } alt="Tindev" />

            <div className="icon">
                <Link to='/'>
                    <img className="icon" src={ logout } alt="Logout" />
                </Link>
            </div>
        </Header>

        <div className="main-container">
            { users.length > 0 ? (
                <ul>
                    { users.map(user => (
                        <li key={ user.id }>
                            <img src={ user.avatar } alt="User avatar"/>

                            <footer>
                                <h3 align="center">
                                    { user.name }
                                </h3>

                                <p>{ user.bio }</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user.id)}>
                                    <img src={ dislike } alt="Dislike"/>
                                </button>

                                <button type="button" onClick={() => handleLike(user.id)}>
                                    <img src={ like } alt="Like"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    Acabou :(
                </div>
            )}

            { matchDev && (
                <div className="match-container">
                    <img src={ itsamatch } alt="It's a match"/>

                    <img className="avatar" src={ matchDev.avatar } alt="Match Dev"/>

                    <strong>{ matchDev.name }</strong>

                    <div className="match-dev-bio-container">
                        <p>{ matchDev.bio }</p>
                    </div>

                    <button className="button-close" onClick={() => setMatchDev(null)}>
                        VAMOS LÁ
                    </button>
                </div>
            )}

        </div>
        </>
    )
}

export default Main
