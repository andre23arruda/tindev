import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    matchContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '100%',
        padding: '10%',
    },

    match: {
        width: '90%',
        resizeMode: 'contain'
    },

    avatar: {
        width: 200,
        height: 200,
        borderRadius: 150,
        borderWidth: 4,
        borderColor: "#fff"
    },

    name: {
        fontSize: 38,
        color: '#fff',
        textAlign: 'center',
        marginBottom: -5,
    },

    user: {
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
    },

    bioContainer: {
        width: '90%'
    },

    bio: {
        fontSize: 18,
        color: '#fff',
        lineHeight: 28,
        textAlign: 'center',
        width: '100%'
    },

    buttonClose: {
        backgroundColor: '#c9c9c9',
        padding: 15,
        borderRadius: 20

    }





})
