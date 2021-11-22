import { StyleSheet } from 'react-native'

export const colors = {
    black: '#000',
    gray: '#ccc',
    lightGray: '#E6E6F0',
    white: '#FFF',
    whiteAlpha: 'rgba(255, 255, 255, 0.8)',
    purple: '#8257E5',
    darkPurple: '#6A6180',
    anotherPurple: '#9871F5',
    lightPurple: '#D4C2FF',
    green: '#04D361',
    darkGreen: '#11A252',
    red: '#E33D3D',
    text: '#6A6180',
    darkYellow: '#F6BB22',
}

export default StyleSheet.create({
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: '100%',
        width: '100%',
    },

    tabFocused: {
        backgroundColor: colors.lightGray
    },

    tabLabel: {
        marginLeft: 10,
        fontFamily: 'Ubuntu_500Medium',
        fontSize: 15,
    },
})
