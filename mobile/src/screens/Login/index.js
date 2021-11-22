import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    View, Image, Text, TextInput,
    TouchableOpacity, Alert
} from 'react-native'

// utils
import { postRequest }  from '../../services/api'

// custom hooks
import useCloseApp from '../../hooks/useCloseApp'


// styles and images
import styles from './styles'
import logo from '../../assets/logo.png'


function Login({ navigation }) {
    const [user, setUser] = useState('')

    useCloseApp()

    useEffect(() =>{
        AsyncStorage.getItem('user')
        .then(user => {
            if (user){
                navigation.navigate('Main', { user })
            }
        })
    })

    // Login
    async function handleLogin() {
        const response = await postRequest('devs/', { user })
        try {
            const { id } = response
            await AsyncStorage.setItem('user', id)
            navigation.navigate('Main')
        }
        catch(e) {
            Alert.alert('Usuário não encontrado')
        }
    }

    return (
        <View style={ styles.container }>
            <Image source={ logo } />

            <TextInput
                autoCapitalize='none'
                autoCorrect={ false }
                placeholder="Digite seu usuário do Github"
                style={ styles.input }
                value={ user }
                onChangeText={ setUser }
            />

            <TouchableOpacity style={ styles.button } onPress={ handleLogin }>
                <Text style={ styles.buttonText }>
                    Enviar
                </Text>
            </TouchableOpacity>

        </View>
    )
}



export default Login