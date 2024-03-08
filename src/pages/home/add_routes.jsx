import AddClient from "../clients/AddClient"
import AddAchat from "../achats/AddAchat"
import AddFournissuer from "../fournisseurs/AddFournisseur"
import AddVente from "../ventes/AddVente"
import AddVersementClient from "../versements/AddVersementClient"
import AddAchatImportation from "../achat_importation/AddAchatImportation"
import AddVersementImportation from "../versement_importation/AddVersementImportation"
import AddArticle from "../articles/AddArticle"
import AddCaisse from "../caisse/AddCaisse"
import AddVersementFournisseur from "../versements/AddVersementFournisseur"
import AddRetour from "../retours/AddRetour"
import AddReparation from "../reparation/AddReparation"
import AddCharge from "../charge/AddCharge"
import AddCommand from "../command/AddCommand"
import AddCasse from "../casse/AddCasse"

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
        to: '/versements/add-versement-client',
        component: <AddVersementClient />
    },
    {
        to: '/versements/add-versement-fournisseur',
        component: <AddVersementFournisseur />
    },
    {
        to: '/importations/achat_importation/add',
        component: <AddAchatImportation />
    },
    {
        to: '/importations/versement_importation/add',
        component: <AddVersementImportation />
    },
    {
        to: '/retours/add-retour',
        component: <AddRetour />
    },
    {
        to: '/magasins/:id/add-reparation',
        component: <AddReparation />
    },
    {
        to: '/produits/:id/add',
        component: <AddArticle />
    },
    {
        to: '/charges/add-charge',
        component: <AddCharge />
    },
    {
        to: '/commands/add-command',
        component: <AddCommand />
    },
    {
        to: '/casse/add-casse',
        component: <AddCasse />
    },
    {
        to: '/caisse/add',
        component: <AddCaisse />
    },
]

export default add_routes