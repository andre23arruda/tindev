// elementos visuais do react native
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button:{
        height: 46,
        width: '100%',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#DF4723',
        borderWidth: 0,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: 5,
        paddingHorizontal: 20
    },

    buttonText:{
        color:"#FFF",
        fontWeight:"bold",
        textAlign:'center',
    }
})