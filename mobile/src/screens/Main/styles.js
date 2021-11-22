import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    iconsContainer:{
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginHorizontal: 5,
        marginTop: 40,
    },

    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },

    card:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

    avatar:{
        flex: 1,
        height: 300
    },

    footer:{
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio:{
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },

    buttonsContainer:{
        flexDirection: 'row',
        marginBottom: 50,
    },

    button:{
        width: 75,
        height: 75,
        borderRadius: 37,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        elevation: 2
    },

    empty:{
        color: '#999',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})