function goToPage(navigation, pageName, content=null) {
    navigation.navigate(pageName, { content })
}


export { goToPage }