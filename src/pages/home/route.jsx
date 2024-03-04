import { achat, articles, bourse, clients, fournisseurs, gestion_utilisateurs, vente, versement, retours, magasin, command, importation, trash, charge, } from "../../assets/icons";
import Achat from "../achats/Achat"
import Articles from "../articles/Articles"
import Caisse from "../caisse/caisse"
import Casse from "../casse/Casse"
import Charge from "../charge/Charge"
import Clients from "../clients/Clients"
import Command from "../command/Command"
import Fournisseurs from "../fournisseurs/Fournisseurs"
import Importation from "../importation/Importation"
import Magasin from "../magasin/Magasin"
import Retour from "../retours/Retour"
import Utilisateurs from "../utilisateurs/Users"
import Ventes from "../ventes/Ventes"
import Versement from "../versements/Versement"

const routes = [
    {
        icon: 'user-tie',
        to: '/clients',
        name: 'les clients',
        key: 'clients',
        component: <Clients />,
        image: clients
    },
    {
        icon: 'people-carry-box',
        to: '/fournisseurs',
        name: 'les fournisseurs',
        key: 'fournisseurs',
        component: <Fournisseurs />,
        image: fournisseurs
    },
    {
        icon: 'box-open',
        to: '/produits',
        name: 'les produits',
        key: 'produits',
        component: <Articles />,
        image: articles
    },
    {
        icon: 'cart-arrow-down',
        to: '/achats',
        name: 'les achats',
        key: 'achats',
        component: <Achat />,
        image: achat
    },
    {
        icon: 'hand-holding-dollar',
        to: '/ventes',
        name: 'les ventes',
        key: 'vente',
        component: <Ventes />,
        image: vente
    },
    {
        icon: 'truck-field',
        to: '/commands',
        name: 'les commandes',
        key: 'commands',
        component: <Command />,
        image: command
    },
    {
        icon: 'money-bill-transfer',
        to: '/versements',
        name: 'les versements',
        key: 'versement',
        component: <Versement />,
        image: versement
    },
    {
        icon: 'plane',
        to: '/importations',
        name: 'les importations',
        key: 'importation',
        component: <Importation />,
        image: importation
    },
    {
        icon: 'arrow-rotate-right',
        to: '/retours',
        name: 'les retours',
        key: 'retour',
        component: <Retour />,
        image: retours
    },
    {
        icon: 'shop',
        to: '/magasins',
        name: 'les magasins',
        key: 'magasin',
        component: <Magasin />,
        image: magasin
    },
    // {
    //     icon: 'link-slash',
    //     to: '/casse',
    //     name: 'casses',
    //     key: 'casse',
    //     component: <Casse />,
    //     image: vente
    // },
    {
        icon: 'question',
        to: '/charges',
        name: 'les charges',
        key: 'charge',
        component: <Charge />,
        image: charge
    },
    {
        icon: 'dollar-sign',
        to: '/caisse',
        name: 'caisse',
        key: 'caisse',
        component: <Caisse />,
        image: bourse
    },
    {
        icon: 'user-group',
        to: '/utilisateurs',
        name: 'gestion des utilisateurs',
        key: 'utilisateur',
        component: <Utilisateurs />,
        image: gestion_utilisateurs
    },
    {
        icon: 'trash',
        to: 'trash',
        name: 'trash',
        key: 'trash',
        image: trash
    },
]


export default routes