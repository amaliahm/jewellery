const columns_bourse = [
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
      field: "mouvement",
      headerName: "MOUVMENT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },{
      field: "quantite",
      headerName: "QUANTITE",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "prix unitaire",
      headerName: "PRIX UNITAIRE",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "valeur",
      headerName: "VALEUR",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "quantite restant",
      headerName: "QUANTITE DE STOCK RESTANT",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 450,
      headerAlign: 'left',
    },
    {
      field: "CUMP",
      headerName: "CUMP",
      flex: 1,
      minWidth: 200,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "valeur",
      headerName: "VALEUR DE STOCK RESTANT",
      flex: 1,
      minWidth: 300,
      maxWidth: 400,
      headerAlign: 'left'
    },
  ];

const add_movment = {
  jour: '',
  mois: '',
  annee: '',
  mouvement: '',
  quantite: 0,
  'prix unitaire': 0,
}


export {
    columns_bourse,
    add_movment,
}