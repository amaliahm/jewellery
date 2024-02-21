import Clients from "../clients/Clients"
import Achat from "../achats/Achat"
import Articles from "../articles/Articles"
import Fournisseurs from "../fournisseurs/Fournisseurs"
import Ventes from "../ventes/Ventes"
import Versement from "../versements/Versement"
import Importation from "../importation/Importation"
import Bourse from "../bourse/bourse"
import Command from "../command/Command"
import Magasin from "../magasin/Magasin"
import Charge from "../charge/Charge"
import Reception from "../reception/Reception"
import Utilisateurs from "../utilisateurs/Users"
import Retour from "../retours/Retour"

const routes = [
    {
        icon: 'user-tie',
        to: '/clients',
        name: 'les clients',
        key: 'clients',
        component: <Clients />
    },
    {
        icon: 'people-carry-box',
        to: '/fournisseurs',
        name: 'les fournisseurs',
        key: 'fournisseurs',
        component: <Fournisseurs />
    },
    {
        icon: 'box-open',
        to: '/produits',
        name: 'les produits',
        key: 'produits',
        component: <Articles />
    },
    {
        icon: 'cart-arrow-down',
        to: '/achats',
        name: 'les achats',
        key: 'achats',
        component: <Achat />
    },
    {
        icon: 'hand-holding-dollar',
        to: '/ventes',
        name: 'les ventes',
        key: 'vente',
        component: <Ventes />
    },
    {
        icon: 'truck-field',
        to: '/commands',
        name: 'les commandes',
        key: 'commands',
        component: <Command />
    },
    {
        icon: 'money-bill-transfer',
        to: '/versements',
        name: 'les versements',
        key: 'versement',
        component: <Versement />
    },
    {
        icon: 'receipt',
        to: '/receptions',
        name: 'les réceptions',
        key: 'receptions',
        component: <Reception />
    },
    {
        icon: 'plane',
        to: '/importations',
        name: 'les importations',
        key: 'importation',
        component: <Importation />
    },
    {
        icon: 'arrow-rotate-right',
        to: '/retours',
        name: 'les retours',
        key: 'retour',
        component: <Retour />
    },
    {
        icon: 'shop',
        to: '/magasins',
        name: 'les magasins',
        key: 'magasin',
        component: <Magasin />
    },
    {
        icon: 'question',
        to: '/charges',
        name: 'les charges',
        key: 'charge',
        component: <Charge />
    },
    {
        icon: 'dollar-sign',
        to: '/bourse',
        name: 'la bourse d\'or',
        key: 'bourse',
        component: <Bourse />
    },
    {
        icon: 'user-group',
        to: '/utilisateurs',
        name: 'gestion des utilisateurs',
        key: 'utilisateur',
        component: <Utilisateurs />
    },
    {
        icon: 'trash',
        to: 'trash',
        name: 'trash',
        key: 'trash',
    },
]


export default routes