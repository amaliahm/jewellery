import axios from "axios"

/* update this api *****just this***** */

const api = 'http://localhost:8800/'

/* to store data */

let result
let fournisseur
let client
let view_achat_articles_fournisseur
let view_vente_articles_client
let view_versement_client
let view_versement_fournisseur
let view_importation
let view_retour_client
let view_retour_fournisseur
let view_reparation
let view_charge
let magasin
let titres
let view_produits
let view_command
let casse
let caisse

/* to add data */

const api_add_client = api + 'clients/add-client'
const api_add_achat = api + 'achats/add-achat'
const api_add_vente = api + 'ventes/add-vente'
const api_add_fournisseur = api + 'fournisseurs/add-fournisseur'
const api_add_versement_client = api + 'versements/add-versement-client'
const api_add_versement_fournisseur = api + 'versements/add-versement-fournisseur'
const api_add_retour = api + 'retours/add-retour'
const api_add_casse = api + 'casse/add-casse'
const api_add_achat_importation = api + 'importations/achat_importation/add'
const api_add_versement_importation = api + 'importations/versement_importation/add'
const api_add_article = api + 'produits/:id/add'
const api_add_mouvement = api + 'caisse/add'
const api_add_reparation = api + 'magasins/:id/add-reparation'
const api_add_charge = api + 'charges/add-charge'
const api_add_command = api + 'commands/add-command'




async function getData() {
    try {
        result = await axios.get(api)
        fournisseur = result.data.fournisseur
        client = result.data.client
        view_achat_articles_fournisseur = result.data.view_achat_articles_fournisseur
        view_vente_articles_client = result.data.view_vente_articles_client
        view_versement_client = result.data.view_versement_client
        view_versement_fournisseur = result.data.view_versement_fournisseur
        view_importation = result.data.view_importation
        view_retour_client = result.data.view_retour_client
        view_retour_fournisseur = result.data.view_retour_fournisseur
        view_reparation = result.data.view_reparation
        view_charge = result.data.view_charge
        titres = result.data.titres
        magasin = result.data.magasin
        view_produits = result.data.view_produits
        view_command = result.data.view_command
        casse = result.data.casse
        caisse = result.data.caisse
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
    api_add_versement_client,
    api_add_versement_fournisseur,
    api_add_achat_importation,
    api_add_versement_importation,
    api_add_article,
    api_add_mouvement,
    api_add_reparation,
    api_add_charge,
    api_add_command,
    api_add_casse,
    magasin,
    result,
    fournisseur,
    client,
    view_achat_articles_fournisseur,
    view_vente_articles_client,
    view_versement_client,
    view_versement_fournisseur,
    api_add_retour,
    view_importation,
    view_retour_client,
    view_retour_fournisseur,
    view_reparation,
    view_charge,
    view_produits,
    view_command,
    casse,
    caisse,
    titres,
}