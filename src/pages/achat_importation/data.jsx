const columns_add_achat_importation = [
    {
      field: "poid 18k",
      headerName: "POID 18K",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "poid 24k",
      headerName: "POID 24K",
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
  ];

const add_achat_importation = {
    jour: '',
    mois: '',
    annee: '',
    id_importation: '',
    'poid 18k': 0,
    'poid 24k': 0,
    'prix unitaire': 0,
    total: 0,
}

export {
    add_achat_importation,
    columns_add_achat_importation,
}