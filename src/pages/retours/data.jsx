const columns_retours_fournisseur = [
    {
      field: "retour fournisseur n=°",
      headerName: "RETOUR FOURNISSEUR N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 350,
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
      field: "ancien_solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour_or",
      headerName: "RETOUR OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "retour_argent",
      headerName: "RETOUR ARGENT",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
  ];

  const columns_retours_client = [
    {
      field: "retour client n=°",
      headerName: "RETOUR CLIENT N=°",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 300,
      maxWidth: 350,
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
      field: "ancien_solde",
      headerName: "ANCIEN SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "retour_or",
      headerName: "RETOUR OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "retour_argent",
      headerName: "RETOUR ARGENT",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
    {
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
  ];


const add_retour = {
  jour: '',
  mois: '',
  annee: '',
  solde: '',
  id_client: '',
  id_fournisseur: '',
  person: 'client',
  nom: '',
  "retour or" : 0,
  "retour argent": 0,
}


export {
    columns_retours_fournisseur,
    columns_retours_client,
    add_retour,
}