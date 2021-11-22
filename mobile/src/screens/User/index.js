import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// icons
import { Feather } from '@expo/vector-icons'

import { SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native'

// utils
import { getRequest } from '../../services/api'

// styles and images
import styles from './styles'
import logo from '../../assets/logo.png'


function User({ navigation }) {
    const [loggedUser, setloggedUser] = useState({})

    async function toMainScreen() {
        navigation.navigate('Main')
    }

    useEffect(() => {
        async function loadUser() {
            const id = await AsyncStorage.getItem('user')
            const response = await getRequest(`devs/${ id }`)
            setloggedUser(response)
        }
        loadUser()
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.iconsContainer }>
                <TouchableOpacity onPress={ toMainScreen }>
                    <Feather name="chevron-left" size={ 30 } color="#df4723"/>
                </TouchableOpacity>

                <Image source={ logo } style={ styles.logo }/>

                <Feather style={ styles.insisible } name="user" size={ 30 } color="#df4723"/>
            </View>

            <View style={ styles.cardsContainer }>
                <View style={ styles.card } >
                    <Image style={ styles.avatar } source={{ uri: loggedUser.avatar }}/>

                    <View style={ styles.footer }>
                        <Text style={ styles.name }>
                            { loggedUser.name }
                        </Text>

                        <Text  style={ styles.bio } numberOfLines={3}>
                            { loggedUser.bio }
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default User