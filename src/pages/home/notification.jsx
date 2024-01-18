import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { SnackbarContent } from '@mui/material';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function Notification({name}) {
  const [transition, setTransition] = useState(undefined);

  useEffect(() => {
      setTransition(() => TransitionRight);
  });


  return (
    <Box >
      <Snackbar
        open={true}
        TransitionComponent={transition}
        key={transition ? transition.name : ''}
      > 
            <SnackbarContent style={{
              backgroundColor:'var(--brand-1)',
            }}
            message={<span style={{
                color: 'var(--bg-color-1)',
              }}>{name}</span>}
            />
      </Snackbar>
    </Box>
  );
}