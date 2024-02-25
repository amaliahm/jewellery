import UpdateClient from "../clients/UpdateClient"
import UpdateFournisseur from "../fournisseurs/UpdateFournisseur"
import UpdateAchat from "../achats/UpdateAchat"
import UpdateVente from "../ventes/UpdateVente"
import UpdateVersement from "../versements/UpdateVersement"
import UpdateImportation from "../importation/UpdateImportation"
import UpdateAchatImportation from "../achat_importation/UpdateAchatImportation"
import UpdateVersementImportation from "../versement_importation/UpdateVersementImportation"
import UpdateArticle from "../articles/UpdateArticle"
import UpdateRetour from "../retours/UpdateRetour"
import Reparation from "../reparation/Reparation"
import UpdateReparation from "../reparation/UpdateReparation"
import UpdateAchatDetail from "../achats/UpdateAchatDetail"
import UpdateVenteDetail from "../ventes/UpdateVenteDetail"
import UpdateTitre from "../titre/DataTitre"
import Type from "../charge/Type"
import UpdateType from "../charge/UpdateType"
import UpdateCharge from "../charge/UpdateCharge"
import UpdateCommand from "../command/UpdateCommand"
import UpdateCasse from "../casse/UpdateCasse"
import UpdateReception from "../reception/UpdateReception"

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
        to: '/achats/:id/:id',
        component: <UpdateAchatDetail />
    },
    {
        to: '/ventes/:id/:id',
        component: <UpdateVenteDetail />
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
        to: '/magasins/:id',
        component: <Reparation />
    },
    {
        to: '/magasins/:id/:id',
        component: <UpdateReparation />
    },
    {
        to: '/retours/:id',
        component: <UpdateRetour />
    },
    {
        to: '/importations/:id',
        component: <UpdateImportation />
    },
    {
        to: '/titres/:id',
        component: <UpdateTitre />
    },
    {
        to: '/importations/achat_importation/:id',
        component: <UpdateAchatImportation />
    },
    {
        to: '/importations/versement_importation/:id',
        component: <UpdateVersementImportation />
    },
    {
        to: '/produits/:id/:id',
        component: <UpdateArticle />
    },
    {
        to: '/charges/types',
        component: <Type />
    },
    {
        to: '/charges/types/:id',
        component: <UpdateType />
    },
    {
        to: '/charges/:id',
        component: <UpdateCharge />
    },
    {
        to: '/commands/:id',
        component: <UpdateCommand />
    },
    {
        to: '/casse/:id',
        component: <UpdateCasse />
    },
    {
        to: '/receptions/:id',
        component: <UpdateReception />
    },
]

export default update_routes