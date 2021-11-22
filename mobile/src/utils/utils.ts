import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

function showAlert(message: string, title='Algo deu errado') {
    Alert.alert(
        title,
        message,
        [
            {
                text: 'Ok',
                style: 'cancel'
            },
        ],
        {cancelable: false},
    )
}

const weekDays = [
    { label: 'Segunda', value: '1' },
    { label: 'Terça',   value: '2' },
    { label: 'Quarta',  value: '3' },
    { label: 'Quinta',  value: '4' },
    { label: 'Sexta',   value: '5' },
    // { label: 'Sábado',  value: '6' },
    // { label: 'Domingo', value: '7' },
]


async function getFavorites(setFavorites: any) {
    try {
        const value = await AsyncStorage.getItem('proffys')
        const loadedFavorites = value != null ? JSON.parse(value) : []
        // console.log(loadedFavorites)
        setFavorites(loadedFavorites)
    } catch(e) {
        showAlert('Erro ao carregar lista de favoritos')
    }
}


async function addFavoriteProffy(class_id: number, setFavorites: any) {
    try {
        const value = await AsyncStorage.getItem('proffys')
        const loadedFavorites = value != null ? JSON.parse(value) : []
        if (loadedFavorites.indexOf(class_id) === -1) {
            await AsyncStorage.setItem('proffys', JSON.stringify([...loadedFavorites, class_id]))
            setFavorites([...loadedFavorites, class_id])
        }
        showAlert(
            'Professor adicionado aos favoritos!',
            'UHULLLL!!!'
        )
    } catch (e) {
        showAlert('Erro ao adicionar favorito!')
    }
}


async function removeFavoriteProffy(class_id: number, setFavorites: any) {
    try {
        const value = await AsyncStorage.getItem('proffys')
        const loadedFavorites = value != null ? JSON.parse(value) : []
        const index = loadedFavorites.indexOf(class_id)

        if (index > -1) {
            loadedFavorites.splice(index, 1)
            await AsyncStorage.setItem('proffys', JSON.stringify(loadedFavorites))
            setFavorites(loadedFavorites)
        }
        showAlert(
            'Professor removido dos favoritos!',
            'Que pena!'
        )
    } catch (e) {
        showAlert('Erro ao remover favorito!')
    }
}

export {
    showAlert,
    getFavorites,
    weekDays,
    addFavoriteProffy,
    removeFavoriteProffy,
}