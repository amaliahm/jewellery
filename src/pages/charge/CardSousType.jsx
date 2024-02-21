import React, { useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import {makeStyles} from "@mui/styles"
import { useNavigate } from 'react-router-dom';
import ModalUpdate from './ModalUpdate';
import ModalDelete from './ModalDelete';


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
  colors: {
    "& label.Mui-focused": {
      color: "white"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#12f7d6",
      }
    }
  }
});

const CardSousType = ({nom , id, id_type, deleted}) => {
  const classes = useStyles();
  const [data, setData] = useState({
    nom: nom,
    deleted: deleted,
    id: id,
  })
  const bull = <span className={classes.bullet}>•</span>;
  const navigate= useNavigate()
  const [update, setUpdate] = useState(false)
  const [delete_, setDelete] = useState(false)
  
  const style = {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'left',
    margin:' 10px',
    padding: '10px',
  }

  return (
    <>
      {update && <ModalUpdate
              setShowModal={setUpdate}
              showModal={update}
              type='sous type'
              detail={data}
              id={id_type}
              colors={classes.colors}
              setDetail={setData}
            />}
      {delete_ && <ModalDelete
              setDelete={setDelete}
              _delete={delete_}
              detail={data}
              setDetail={setData}
              colors={classes.colors}
              id={id_type}
              type='sous type'
            />}
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h2' color="textPrimary" gutterBottom>
          {bull} {data.nom}
        </Typography>
          <br />
      </CardContent>
      <CardActions style={style}>
        {!data.deleted && <>
          <i className="fa-solid fa-pen fa-xl" style={{color: 'var(--brand-1)'}} onClick={() => setUpdate(true)}></i>
          <i className="fa-solid fa-trash fa-xl" style={{color: 'red'}} onClick={() => setDelete(true)}></i>
        </>}
      </CardActions>
    </Card>
    </>
  );
}

export default CardSousType