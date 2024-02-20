const columns_achats = [
  { 
      field: "achat total n=°", 
      headerName: "ACHAT TOTAL N=°", 
      flex: 0.5,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
  },
  {
    field: "date total achat",
    headerName: "DATE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "piece_achat",
    headerName: "nombre de piece",
    flex: 1,
    minWidth: 250,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "ancien_solde_achat",
    headerName: "ANCIEN SOLDE",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "valeur_achats",
    headerName: "total",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "nouveau_solde_achat",
    headerName: "NOUVEAU SOLDE",
    flex: 1,
    minWidth: 250,
    maxWidth: 300,
    headerAlign: 'left'
  },
];

const columns_achat_article = [
  { 
      field: "achat n=°", 
      headerName: "ACHAT N=°", 
      flex: 0.5,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
  },
  {
    field: "date",
    headerName: "DATE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "prix_unitaire",
    headerName: "PRIX UNITAIRE",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "quantite_achat",
    headerName: "QUANTITE",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "total",
    headerName: "total",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
];

const columns_add_achat = [
  {
    field: "nom_article",
    headerName: "L'ARTICLE",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "quantite",
    headerName: "QUANTITE",
    flex: 1,
    minWidth: 150,
    maxWidth: 2500,
    headerAlign: 'left'
  },
  {
    field: "prix_unitaire",
    headerName: "PRIX UNITAIRE",
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "total",
    headerName: "TOTAL",
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    headerAlign: 'left'
  },
];

  
const add_achat = {
  id_article: '',
  nom_article: '',
  id_fournisseur: '',
  nom: '',
  quantite: 0,
  prix_unitaire: 0,
  total: 0,
}

export {
  columns_achats,
  add_achat,
  columns_add_achat,
  columns_achat_article
}