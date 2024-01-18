import AddClient from "../clients/AddClient"
import AddAchat from "../achats/AddAchat"
import AddFournissuer from "../fournisseurs/AddFournisseur"
import AddVente from "../ventes/AddVente"
import AddVersement from "../versements/AddVersement"

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
]

export default add_routes