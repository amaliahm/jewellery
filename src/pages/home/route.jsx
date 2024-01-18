import Clients from "../clients/Clients"
import Achat from "../achats/Achat"
import Articles from "../articles/Articles"
import Fournisseurs from "../fournisseurs/Fournisseurs"
import Ventes from "../ventes/Ventes"
import Versement from "../versements/Versement"
import Importation from "../importation/Importation"

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
        to: 'commands',
        name: 'les commandes',
        key: 'commands',
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
        to: 'receptions',
        name: 'les réceptions',
        key: 'receptions',
    },
    {
        icon: 'plane',
        to: '/importations',
        name: 'les importations',
        key: 'importation',
        component: <Importation />
    },
    {
        icon: 'link-slash',
        to: 'casse',
        name: 'la casse',
        key: 'casse',
    },
    {
        icon: 'arrow-rotate-right',
        to: 'reparation',
        name: 'les réparations',
        key: 'reparation',
    },
    {
        icon: 'dollar-sign',
        to: 'bourse',
        name: 'la bourse d\'or',
        key: 'bourse',
    },
    {
        icon: 'user-group',
        to: 'gestion',
        name: 'gestion des utilisateurs',
        key: 'gestion',
    },
    {
        icon: 'arrow-right-from-bracket',
        to: 'logout',
        name: 'quitter site',
        key: 'home',
    },
]


export default routes