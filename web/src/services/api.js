const API_URL = `192.168.0.18:8000`
const baseUrl = `http://${ API_URL }/api/tindev/`


async function getRequest(route, headers) {
    return fetch(
        baseUrl + route,
        {
            method: 'GET',
            headers: new Headers(headers)
        }
    )
    .then(response => response.json())
    .catch(error => console.log(error))
}


async function postRequest(route, data, auth='') {
    return fetch(
        baseUrl + route,
        {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Authorization': auth,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            })
        }
    )
    .then(response => response.json())
}


export { API_URL, getRequest, postRequest }