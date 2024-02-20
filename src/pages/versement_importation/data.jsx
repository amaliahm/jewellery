const columns_add_versement_importation = [
    {
      field: "poid",
      headerName: "POID",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "titre",
      headerName: "TITRE",
      flex: 1,
      minWidth: 150,
      maxWidth: 2500,
      headerAlign: 'left'
    },
    {
      field: "poid 24k",
      headerName: "POID 24K",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "versement €",
      headerName: "VERSEMENT €",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "change €/$",
      headerName: "CHANGE €/$",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "versement $",
      headerName: "VERSEMENT $",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "versement",
      headerName: "VERSEMENT",
      flex: 1,
      minWidth: 150,
      maxWidth: 250,
      headerAlign: 'left'
    },
  ];

const add_versement_importation = {
    jour: '',
    mois: '',
    annee: '',
    nom_importateur: '',
    id_importation: '',
    devise: '',
    id_titre: '',
    titre: '',
    'poid 18k': 0,
    'poid 24k': 0,
    'versement €': 0,
    'change €/$': 0,
    'versement $': 0,
    versement: 0,
}

export {
    add_versement_importation,
    columns_add_versement_importation,
}