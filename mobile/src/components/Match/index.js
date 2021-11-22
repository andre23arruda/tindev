import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

// styles and images
import styles from './styles'
import match from '../../assets/itsamatch.png'


function Match({ dev, setMatchDev }) {
    return (
        <View style={ styles.matchContainer } >
            <Image style={ styles.match } source={ match }/>

            <Image style={ styles.avatar } source={{ uri: dev.avatar }} />

            <View>
                <Text style={ styles.name }>
                    { dev.name }
                </Text>

                { dev.name !== dev.user && (
                    <Text style={ styles.user }>
                        @{ dev.user }
                    </Text>
                )}
            </View>

            <Text style={ styles.bio }>
                { dev.bio }
            </Text>

            <TouchableOpacity
                onPress={ () => setMatchDev(null)
            }
                style={ styles.buttonClose } >
                <Text>
                    VAMOS LÁ
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Match