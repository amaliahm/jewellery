const columns_importation = [
    { 
        field: "importateur", 
        headerName: "IMPORTATEUR", 
        flex: 0.5,
        minWidth: 250,
        maxWidth: 350,
        headerAlign: 'left'
    },
    { 
        field: "total poid 18", 
        headerName: "IMPORTATEUR", 
        flex: 0.5,
        minWidth: 250,
        maxWidth: 350,
        headerAlign: 'left'
    },
    { 
        field: "total poid 24", 
        headerName: "IMPORTATEUR", 
        flex: 0.5,
        minWidth: 250,
        maxWidth: 350,
        headerAlign: 'left'
    },
    { 
        field: "total facon", 
        headerName: "IMPORTATEUR", 
        flex: 0.5,
        minWidth: 250,
        maxWidth: 350,
        headerAlign: 'left'
    },
    { 
        field: "total versement or 24k", 
        headerName: "IMPORTATEUR", 
        flex: 0.5,
        minWidth: 250,
        maxWidth: 350,
        headerAlign: 'left'
    },
    {
      field: "total versement $",
      headerName: "TOTAL VERSEMENT $",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "reste poid 24k",
      headerName: "RESTE POID 24K",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
    {
      field: "reste $",
      headerName: "RESTE $",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 250,
      maxWidth: 350,
      headerAlign: 'left'
    },
];

const add_importation = {
    nom_importateur: '',
    total_poid_18: '0.000',
    total_poid_24: '0.000',
    total_versement_argent: '0.000',
    total_versement_or_24: '0.000',
}

export {
    columns_importation,
    add_importation,
}