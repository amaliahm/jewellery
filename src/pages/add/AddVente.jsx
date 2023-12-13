import React, {useState, useEffect} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook } from "react-icons/fi";
import axios from "axios";
import { api } from "../../backend";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { result } from "../../backend";



function SimpleListMenu({options}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <List
          aria-label="Device settings"
          sx={{
            borderRadius: '15px',
            padding: '0',
            margin: '0 0 0 -10px',
          }}
        >
          <ListItem
            button
            onClick={handleClickListItem}
          >
            <ListItemText
              primary={options.length == 1 ? 'Clients' : options[selectedIndex]}
              sx={{
                fontSize: '20px'
              }}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  const AddVente = ({ isOpen, setIsOpen }) => {
      const [clients,setClients] = useState([])
      const [artcile, setArticle] = useState([])
      
      useEffect(() => {
          const fetchAllData = async () => {
              const clients = result.data.clients
              let options = ['Clients',]
              Object.keys(clients).map((e, i) => {
                options = [...options, clients[e].nom]
              })
              setClients(options)
        }
        fetchAllData()
      }, [2000])

    const currentDate = new Date();
    const [vente, setVente] = useState({
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois: String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee: String(currentDate.getFullYear()),
        client: '',
        article: '',
        "designation d'article": '',
        qte: 0,
        pu: 0,
    })
    let total = vente.qte * vente.pu;

    const handleChange = (e) => {
        setVente(c => ({...c, [e.target.name] : e.target.value}))
        total = vente.qte * vente.pu;
    }
    
    const handleClick = async e => {
        console.log(vente)
        // e.preventDefault();
        // const between = vente.nom != '' && vente.ville != '' && vente.wilaya != '' && vente.telephone != '' && vente.telephone.length <= 10
        // if (between) {
        //     const addVente = {
        //         table: 'ventes',
        //         data: vente
        //     }
        //     try {
        //         const result = await axios.post(api, addVente)
        //         if(result.status === 200) {
        //             setIsOpen(false)
        //             setVente({
        //                 article: '',
        //                 "designation d'article": '',
        //                 qte: 0,
        //                 pu: 0,
        //                 client: ''
        //             })
        //         }
        //     } catch (e) {
        //         console.log(e)
        //         return
        //     }
        // }
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="modal">
                    <motion.div
                        initial={{ scale: 0, rotate: "14.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="modal-box-article modal-box-article-u-s">
                        <FiBook className="modal-bg-icon" />
                        <form action="#">
                        <h2>ajouter vente</h2>
                        <div className="modal-content modal-u-s">
                            {Object.keys(vente).slice(2).map((value, index) => (
                                <div className="modal-content__row" key={index} >
                                    {(index < 1 )
                                    ? <>
                                        <h1 className="model-content__titre"> la date </h1>
                                        <div className="input">
                                             <input type='text'  
                                                name='Date'
                                                value={`${vente.annee}-${vente.mois}-${vente.jour}`} onChange={() => {}}/>
                                        </div>
                                    </>
                                    : (index <= 3) 
                                    ? <>
                                        <h1 className="model-content__titre"> {value}</h1>
                                        <div className="input">
                                             <SimpleListMenu options={clients} />
                                        </div>
                                    </> 
                                    : <>
                                        <h1 className="model-content__titre"> {value}</h1>
                                        <div className="input">
                                             <input type='text'  
                                                placeholder={value}
                                                name={value}
                                                value={vente.value} onChange={handleChange}/>
                                        </div>
                                    </>}
                                </div>
                            ))}
                            <div className="modal-content__row" >
                                <h1 className="model-content__titre"> la date </h1>
                                <div className="input">
                                     <input type='text'  
                                        name='Date'
                                        value={total} onChange={() => {}}/>
                                </div>
                            </div>

                            <div className="modal-content__btns">
                            <button type="button" onClick={() => {
                                    setIsOpen(false)
                                    setVente({
                                        jour: String(currentDate.getDate()).padStart(2, '0'),
                                        mois: String(currentDate.getMonth() + 1).padStart(2, '0'),
                                        annee: String(currentDate.getFullYear()),
                                        client: '',
                                        article: '',
                                        "designation d'article": '',
                                        qte: 0,
                                        pu: 0,
                                    })
                                }}
                                    className="btn-secondary">
                                    annuler
                                </button>
                            <button type="button" onClick={handleClick}
                                    className="btn-primary">
                                    ajouter
                                </button>
                            </div>
                        </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AddVente