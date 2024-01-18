const display_famille =[
  {
    field: "article",
    headerName: "DESIGNATION",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "designation d'article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "qte stock",
    headerName: "EN STOCK",
    flex: 1,
    minWidth: 150,
    maxWidth: 2500,
    headerAlign: 'left'
  },
  {
    field: "prix unitaire",
    headerName: "PRIX",
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
];


const columns_article =[
  {
    field: "famille",
    headerName: "FAMILLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "designation d'article",
    headerName: "ARTICLE",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "article",
    headerName: "DESIGNATION",
    flex: 1,
    cellClassName: "name-column--cell",
    minWidth: 250,
    maxWidth: 350,
    headerAlign: 'left'
  },
  {
    field: "fournisseur",
    headerName: "FOURNISSEUR",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "prix unitaire",
    headerName: "PRIX",
    flex: 1,
    minWidth: 150,
    maxWidth: 250,
    headerAlign: 'left'
  },
  {
    field: "qte stock",
    headerName: "EN STOCK",
    flex: 1,
    minWidth: 150,
    maxWidth: 2500,
    headerAlign: 'left'
  },
  {
    field: "valeur de stock",
    headerName: "VALEUR DE STOCK",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "stock min",
    headerName: "STOCK MIN",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left'
  },
  {
    field: "alert",
    headerName: "",
    flex: 1,
    minWidth: 200,
    maxWidth: 300,
    headerAlign: 'left',
  },
];

export {
  display_famille,
  columns_article
}