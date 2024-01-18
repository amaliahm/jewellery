import UpdateClient from "../clients/UpdateClient"
import UpdateFournisseur from "../fournisseurs/UpdateFournisseur"
import UpdateAchat from "../achats/UpdateAchat"
import UpdateVente from "../ventes/UpdateVente"
import UpdateVersement from "../versements/UpdateVersement"
import UpdateImportation from "../importation/UpdateImportation"

const update_routes = [
    {
        to: '/clients/:id',
        component: <UpdateClient />
    },
    {
        to: '/fournisseurs/:id',
        component: <UpdateFournisseur />
    },
    {
        to: '/achats/:id',
        component: <UpdateAchat />
    },
    {
        to: '/ventes/:id',
        component: <UpdateVente />
    },
    {
        to: '/versements/:id',
        component: <UpdateVersement />
    },
    {
        to: '/importations/:id',
        component: <UpdateImportation />
    },
]

export default update_routes