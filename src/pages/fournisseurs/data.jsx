const columns_fournisseurs = [
    {
      field: "nom_fournisseur",
      headerName: "NOM",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left',
    },
    {
      field: "ville",
      headerName: "VILLE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "wilaya",
      headerName: "WILAYA",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "telephone",
      headerName: "TELEPHONE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "solde",
      headerName: "SOLDE",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
  ];
  
  
  const info_fournisseur = {
    nom: '',
    wilaya: '',
    ville: '',
    telephone: '',
    email: '',
    titre: '',
    "chiffre d'affaire": 0,
    "total or": 0,
    "total versement or": 0,
    "total versement argent": 0,
    "total perte": 0,
    "total retour or": 0,
    "total retour argent": 0,
    "reste or": 0,
    "reste argent" : 0,
  }
  
  const add_fournisseur = {
    id_titre: 0,
    nom: '',
    wilaya: '',
    ville: '',
    telephone: '',
    titre: '',
    email: '',
    adresse: '',
    NRC: '',
    NIF: '',
    NIS: '',
    N_art: ''
  }
  
  
  
  export {
    columns_fournisseurs,
    info_fournisseur,
    add_fournisseur,
  }