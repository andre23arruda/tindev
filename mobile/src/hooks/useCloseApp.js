import { useEffect } from 'react'

// elementos visuais do react native
import { BackHandler, Alert } from 'react-native'


export default function useCloseApp() {
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Ei, pera aí!", "Tem certeza que quer sair do app?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => BackHandler.exitApp()
                }
            ])
            return true
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )
        return () => backHandler.remove()
    }, [])
}