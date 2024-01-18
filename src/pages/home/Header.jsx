import { Box, useTheme, Typography} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()
    return (
      <>
        <i className='fa-solid fa-gem fa-2x' onClick={() => {
          navigate('/home')
        }}></i>
        <h2> {title} </h2>
      </>
    );
  };

export default Header