import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    SafeAreaView, View, Image,
    Text, TouchableOpacity,
    BackHandler
} from 'react-native'

// icons
import { Feather } from '@expo/vector-icons'

// utils
import { API_URL, getRequest, postRequest } from '../../services/api'

// styles and images
import styles from './styles'
import logo from '../../assets/logo.png'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'

// custom components
import Match from '../../components/Match'


function Main({ navigation }) {
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)
    const [devLogged, setDevLogged] = useState(null)

    async function toLoginScreen() {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    async function toUserScreen() {
        navigation.navigate('User')
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            toLoginScreen
        )
        return () => backHandler.remove()
    }, [])

    async function handleLike(){
        const [user, ...rest] = users // retirar um elemento da primeira posição do array
        await postRequest(`devs/${ devLogged }/like/`, { user_id: user.id })
        setUsers(rest)
    }

    async function handleDislike(){
        const [user, ...rest] = users // retirar um elemento da primeira posição do array
        await postRequest(`devs/${ devLogged }/dislike/`, { user_id: user.id })
        setUsers(rest)
    }

    function connect(user) {
        const connectionString = 'ws://' + API_URL + '/ws/users/' + user
        const socket = new WebSocket(connectionString)

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
            console.log(data)
            if (data.payload) {
                setMatchDev(data.payload.detail)
            }
        }

        if (socket.readyState == WebSocket.OPEN) {
            socket.onopen()
        }
    }

    useEffect(() => {
        async function loadUsers(user) {
            const response = await getRequest('devs', { 'UserID': user })
            setUsers(response)
        }
        AsyncStorage.getItem('user')
        .then(user => {
            if (user) {
                setDevLogged(user)
                loadUsers(user)
                connect(user)
            }
        })
    }, [])


    return (
        <>
        <SafeAreaView style={ styles.container }>
            <View style={ styles.iconsContainer }>
                <TouchableOpacity onPress={ toLoginScreen }>
                    <Feather name="chevron-left" size={ 30 } color="#df4723"/>
                </TouchableOpacity>

                <Image source={ logo } style={ styles.logo }/>

                <TouchableOpacity onPress={ toUserScreen }>
                    <Feather name="user" size={ 30 } color="#df4723"/>
                </TouchableOpacity>
            </View>

            <View style = {styles.cardsContainer}>
                { users.length === 0 ? (
                    <Text style={ styles.empty }>
                        Acabou :/
                    </Text>
                ) : (
                    users.map((user, index) => (
                        <View
                            key={ user.id }
                            style={[styles.card, { zIndex: users.length - index }]}
                        >
                            <Image style={ styles.avatar } source={{ uri: user.avatar }}/>

                            <View style={ styles.footer }>
                                <Text style={ styles.name }>
                                    {user.name}
                                </Text>

                                <Text style={ styles.bio } numberOfLines={ 3 }>
                                    { user.bio }
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </View>

            { users.length > 0 && (
                <View style={ styles.buttonsContainer }>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ handleDislike }
                    >
                        <Image source={ dislike }/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ handleLike }
                    >
                        <Image source={ like }/>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>

        { matchDev && (
            <Match setMatchDev={ setMatchDev } dev={ matchDev }/>
        )}

        </>
    )
}

export default Main