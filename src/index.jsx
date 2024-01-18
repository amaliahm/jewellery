import { achat, add_client, add_fournisseur, articles, bourse, clients, fournisseurs, gestion_utilisateurs, home, suivi_client, suivi_fournissuer, vente, ventes, versement } from "./assets/icons";
import Clients from "./pages/clients/Clients";
import Elements from "./pages/home__/elements";
import Achat from "./pages/sidebar/Achat";
import Articles from "./pages/sidebar/Articles";
import Fournisseurs from "./pages/sidebar/Fournisseurs";
import Ventes from "./pages/sidebar/Ventes";
import VersementC from "./pages/sidebar/VersementC";
import VersementF from "./pages/sidebar/VersementF";
import Vide from "./pages/sidebar/Vide";

const espace_clients = [
    {
        nom: 'ajouter client',
        icon: add_client,
        color: 'blue'
    },
    {
        nom: 'suivi les clients',
        icon: suivi_client,
        color: 'red'
    },
]

const espace_fournisseurs =  [
    {
        nom: 'ajouter fournisseur',
        icon: add_fournisseur,
        color: 'purple'
    },
    {
        nom: 'suivi les fournisseurs',
        icon: suivi_fournissuer,
        color: 'indigo'
    }
]

const sidebar = [
    {
        nom: "home",
        icon: home,
    },
    {
        nom: "les articles",
        icon: articles,
    },
    {
        nom: "les clients",
        icon: clients,
    },
    {
        nom: "les fournisseurs",
        icon: fournisseurs,
    },
    {
        nom: "les achat",
        icon: achat,
    },
    {
        nom: "les ventes",
        icon: vente,
    },
    {
        nom: "bource d'or",
        icon: bourse,
    },
    {
        nom: "versement fr",
        icon: versement,
    },
    {
        nom: "versement clients",
        icon: versement,
    },
    {
        nom: "les ventes2",
        icon: ventes,
    },
    {
        nom: "les utilisateurs",
        icon: gestion_utilisateurs,
    },
]

const links = [
    {
        nom: "home",
        to: Elements
    },
    {
        nom: "les articles",
        to: Articles
    },
    {
        nom: "les clients",
        to: Clients
    },
    {
        nom: "les fournisseurs",
        to: Fournisseurs
    },
    {
        nom: "les achat",
        to: Achat
    },
    {
        nom: "les ventes",
        to: Ventes
    },
    {
        nom: "bource d'or",
        to: Vide
    },
    {
        nom: "versement fournisseurs",
        to: VersementF
    },
    {
        nom: "versement clients",
        to: VersementC
    },
    {
        nom: "les ventes2",
        to: Vide
    },
    {
        nom: "les utilisateurs",
        to: Vide 
    },
]

export { espace_clients, espace_fournisseurs, links, sidebar };

