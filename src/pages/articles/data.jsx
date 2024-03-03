const columns_article =[
  {
    field: "nom_famille",
    headerName: "FAMILLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "nom_article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "prix_vente",
    headerName: "PRIX DE VENTE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "quantite_stock",
    headerName: "QUANTITE DE STOCK",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
];


const display_famille =[
  {
    field: "article",
    headerName: "DESIGNATION",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "designation d'article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "qte stock",
    headerName: "EN STOCK",
    flex: 1,
    minWidth: 150,
    maxWidth: 2500,
    headerAlign: 'left'
  },
  {
    field: "prix unitaire",
    headerName: "PRIX",
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
];


const add_article = {
  id_fournisseur: '',
  id_famille: '',
  article: '',
  "prix achat": 0,
  "prix vente": 0,
  quantite: 0,
  "valeur de stock": 0,
  "stock min": 0,
  "mode de gestion": '',
}

export {
  display_famille,
  columns_article,
  add_article
}