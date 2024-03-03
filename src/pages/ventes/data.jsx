const columns_ventes = [
  { 
      field: "vente total n=°", 
      headerName: "VENTE TOTAL N=°", 
      flex: 0.5,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
  },
  {
    field: "date total vente",
    headerName: "DATE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "piece_vente",
    headerName: "NOMBRE DES ARTICLES",
    flex: 1,
    minWidth: 250,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "ancien_solde_vente",
    headerName: "ANCIEN SOLDE",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "total_vente",
    headerName: "TOTAL",
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "nouveau_solde_vente",
    headerName: "NOUVEAU SOLDE",
    flex: 1,
    minWidth: 250,
    maxWidth: 300,
    headerAlign: 'left'
  },
];


const columns_vente_article = [
  { 
      field: "vente n=°", 
      headerName: "VENTE N=°", 
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
    field: "quantite_vente",
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

  const columns_add_vente = [
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
  
    
  const add_vente = {
    id_article: '',
    nom_article: '',
    id_famille: '',
    nom_famille: '',
    id_client: '',
    nom: '',
    quantite: 0,
    prix_unitaire: 0,
    total: 0,
  }
  
  export {
    columns_ventes,
    add_vente,
    columns_add_vente,
    columns_vente_article
  }