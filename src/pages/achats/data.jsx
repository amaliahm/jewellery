const columns_achats = [
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
    field: "designation d'article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "qte",
    headerName: "QUANTITE",
    flex: 1,
    minWidth: 150,
    maxWidth: 2500,
    headerAlign: 'left'
  },
  {
    field: "pu",
    headerName: "PU",
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
  {
    field: "fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
];

const columns_add_achat = [
  {
    field: "famille",
    headerName: "FAMILLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
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
    field: "prix unitaire",
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
  {
    field: "fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
];

  
const add_achat = {
  jour: '',
  mois: '',
  annee: '',
  famille: '',
  article: '',
  fournisseur: '',
  quantite: 0,
  'prix unitaire': 0,
  total: 0,
}

export {
  columns_achats,
  add_achat,
  columns_add_achat
}