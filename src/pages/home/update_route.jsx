import UpdateClient from "../clients/UpdateClient"
import UpdateFournisseur from "../fournisseurs/UpdateFournisseur"
import UpdateAchat from "../achats/UpdateAchat"
import UpdateVente from "../ventes/UpdateVente"
import UpdateVersement from "../versements/UpdateVersement"
import UpdateImportation from "../importation/UpdateImportation"
import UpdateAchatImportation from "../achat_importation/UpdateAchatImportation"
import UpdateVersementImportation from "../versement_importation/UpdateVersementImportation"

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
    {
        to: '/importations/achat_importation/:id',
        component: <UpdateAchatImportation />
    },
    {
        to: '/importations/versement_importation/:id',
        component: <UpdateVersementImportation />
    },
]

export default update_routes