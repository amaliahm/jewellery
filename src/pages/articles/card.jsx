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

const Famille = ({nom ,famille}) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const navigate= useNavigate()

  function handleClick () {
    navigate(`/produits/${nom}`, { state : { nom: nom, articles: famille } })
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
          les produits : {famille.length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          sx={{
              color: 'var(--brand-1)',
              border: '1px solid var(--brand-1)',
              marginBottom: '10px',
              marginRight: '10px',
          }} 
          onClick={handleClick}
        >plus d'information</Button>
      </CardActions>
    </Card>
    </>
  );
}

export default Famille