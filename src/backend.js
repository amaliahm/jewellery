import axios from "axios"

const api = 'http://localhost:8800/home'
let result
async function getData() {
    try {
        result = await axios.get(api)
    } catch (e) {
        console.log(e)
    }
}

setInterval(getData, 2000)

export {api, result}