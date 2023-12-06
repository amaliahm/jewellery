import { useState } from "react";
import { achat, add_client, add_fournisseur, articles, bourse, clients, fournisseurs, gestion_utilisateurs, home, suivi_client, suivi_fournissuer, vente, ventes, versement } from "./assets/icons";
import Elements from "./pages/home/elements";
import Articles from "./pages/sidebar/Articles";
import Clients from "./pages/sidebar/Clients";
import Users from "./pages/sidebar/Users";

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
        nom: "versement",
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
        to: Clients
    },
    {
        nom: "les achat",
        to: Clients
    },
    {
        nom: "les ventes",
        to: Clients
    },
    {
        nom: "bource d'or",
        to: Clients
    },
    {
        nom: "versement",
        to: Clients
    },
    {
        nom: "les ventes2",
        to: Clients
    },
    {
        nom: "les utilisateurs",
        to: Users 
    },
]

export { espace_clients, espace_fournisseurs, links, sidebar};
