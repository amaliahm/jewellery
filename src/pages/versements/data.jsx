const columns_versement_f = [
    {
      field: "versement fournisseur n=°",
      headerName: "VERSEMENT FOURNISSEUR N=°",
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
      field: "versement_or",
      headerName: "VERSEMENT OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "versement_argent",
      headerName: "VERSEMENT ARGENT",
      flex: 1,
      minWidth: 250,
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
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
  ];

  const columns_versement_c = [
    {
      field: "versement client n=°",
      headerName: "VERSEMENT CLIENT N=°",
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
      field: "versement_or",
      headerName: "VERSEMENT OR",
      flex: 1,
      minWidth: 200,
      maxWidth: 250,
      headerAlign: 'left'
    },
    {
      field: "versement_argent",
      headerName: "VERSEMENT ARGENT",
      flex: 1,
      minWidth: 250,
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
      field: "nouveau_solde",
      headerName: "NOUVEAU SOLDE",
      flex: 1,
      minWidth: 250,
      maxWidth: 300,
      headerAlign: 'left'
    },
  ];


const add_versement = {
  jour: '',
  mois: '',
  annee: '',
  id_client: '',
  solde: 0,
  id_titre: 0,
  titre: 0,
  "versement or" : 0,
  "versement argent": 0,
  "or v": 0,
  fonte: 0,
  'net 750': 0,
  ecart: 0,
}


const columns_ajouter_versement_fournisseur = [
  { 
      field: "achat total n=°", 
      headerName: "ACHAT total N=°", 
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
    field: "nom_fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "total_quantite_achats",
    headerName: "VERSEMENT OR",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "valeur_achats",
    headerName: "VERSEMENT ARGENT",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
];

export {
    columns_versement_f,
    columns_versement_c,
    add_versement,
    columns_ajouter_versement_fournisseur
}