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

    insisible: {
        opacity: 0
    },

    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 50,
    },

    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        justifyContent: 'center',
        overflow: 'hidden',
    },

    avatar:{
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

})
