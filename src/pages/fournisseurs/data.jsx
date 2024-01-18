const columns_fournisseurs = [
    {
      field: "nom",
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
      field: "email",
      headerName: "EMAIL",
      flex: 1,
      minWidth: 300,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "titre",
      headerName: "TITRE",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      headerAlign: 'left'
    },
    {
      field: "chiffre d'affaire",
      headerName: "CHIFFRE D'AFFAIRE",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "total or",
      headerName: "TOTAL",
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "total vo",
      headerName: "TOTAL VERSEMENT OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "total va",
      headerName: "TOTAL VERSEMENT ARGENT",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "total perte",
      headerName: "TOTAL PERTE",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "total ro",
      headerName: "TOTAL RETOUR OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "total ra",
      headerName: "TOTAL RETOUR ARGENT",
      flex: 1,
      minWidth: 250,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "reste o",
      headerName: "REST OR",
      flex: 1,
      minWidth: 130,
      maxWidth: 200,
      headerAlign: 'left'
    },
    {
      field: "reste a",
      headerName: "REST ARGENT",
      flex: 1,
      minWidth: 150,
      maxWidth: 200,
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
    nom: '',
    wilaya: '',
    ville: '',
    telephone: '',
    titre: '',
    email: '',
  }
  
  
  
  export {
    columns_fournisseurs,
    info_fournisseur,
    add_fournisseur,
  }