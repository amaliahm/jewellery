import AddClient from "../clients/AddClient"
import AddAchat from "../achats/AddAchat"
import AddFournissuer from "../fournisseurs/AddFournisseur"
import AddVente from "../ventes/AddVente"
import AddVersement from "../versements/AddVersement"
import AddAchatImportation from "../achat_importation/AddAchatImportation"
import AddVersementImportation from "../versement_importation/AddVersementImportation"

const add_routes = [
    {
        to: '/clients/add-client',
        component: <AddClient />
    },
    {
        to: '/achats/add-achat',
        component: <AddAchat />
    },
    {
        to: '/fournisseurs/add-fournisseur',
        component: <AddFournissuer />
    },
    {
        to: '/ventes/add-vente',
        component: <AddVente />
    },
    {
        to: '/versements/add-versement',
        component: <AddVersement />
    },
    {
        to: '/importations/achat_importation/add',
        component: <AddAchatImportation />
    },
    {
        to: '/importations/versement_importation/add',
        component: <AddVersementImportation />
    },
]

export default add_routes