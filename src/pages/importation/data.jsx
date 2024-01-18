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
    importateur: '',
    'total poid 18': '0.000',
    'total poid 24': '0.000',
    'total facon': '0.000',
    'total versement or 24k': '0.000',
    'total versement $': '0.000',
    'reste poid 24k': '0.000',
    'reste $': '0.000',
}

export {
    columns_importation,
    add_importation,
}