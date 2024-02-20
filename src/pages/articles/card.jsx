import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import {makeStyles} from "@mui/styles"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    margin: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
});

const Famille = ({nom , piece, id, deleted}) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const navigate= useNavigate()

  function handleClick () {
    navigate(`/produits/${id}`, { state : {id_famille: id, nom_famille: nom} })
  }
  return (
    <>
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h2' color="textPrimary" gutterBottom>
          {bull} {nom}
        </Typography>
          <br />
        <Typography color="textSecondary">
          les produits : {piece}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          sx={{
              color: 'var(--brand-1)',
              border: deleted ? 'gray' : '1px solid var(--brand-1)',
              marginBottom: '10px',
              marginRight: '10px',
          }} 
          onClick={handleClick}
          disabled={deleted}
        >plus d'information</Button>
      </CardActions>
    </Card>
    </>
  );
}

export default Famille