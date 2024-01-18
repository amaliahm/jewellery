import axios from "axios"

/* update this api *****just this***** */

const api = 'http://localhost:8800/'

/* to store data */

let result

/* to add data */

const api_add_client = api + 'clients/add-client'
const api_add_achat = api + 'achats/add-achat'
const api_add_vente = api + 'ventes/add-vente'
const api_add_fournisseur = api + 'fournisseurs/add-fournisseur'
const api_add_versement = api + 'versements/add-versement'



async function getData() {
    try {
        result = await axios.get(api)
    } catch (e) {
        console.log(e)
    }
}

setInterval(getData, 2000)

export {
    api, 
    api_add_client,
    api_add_achat,
    api_add_vente,
    api_add_fournisseur,
    api_add_versement,
    result,
}