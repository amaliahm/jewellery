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



function SimpleListMenu({options, onSet}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
      onSet(options[index])
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
              key={index}
              value={option}
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
      const [article, setArticle] = useState([])
      function setOptions (name, object, setValeur) {
        let x = [name,]
        Object.keys(object).map((e, i) => {
          x = [...x, object[e].nom]
        })
        setValeur(x)
      }
      useEffect(() => {
          const fetchAllData = async () => {
            let x = ['Clients',]
            let c = result.data.clients
            Object.keys(c).map((e, i) => {
              x = [...x, c[e].nom]
            })
            setClients(x)
            x = ['Articles',]
            c = result.data.articles
            Object.keys(c).map((e, i) => {
              x = [...x, c[e]["designation d'article"]]
            })
            setArticle(x)
        }
        fetchAllData()
      }, [2000])

    const currentDate = new Date();
    const jour = String(currentDate.getDate()).padStart(2, '0')
    const mois = String(currentDate.getMonth() + 1).padStart(2, '0')
    const annee = String(currentDate.getFullYear())
    const [vente, setVente] = useState({
        jour: jour,
        mois: mois,
        annee: annee,
        client: '',
        "designation d'article": '',
        qte: 1,
        pu: 0,
    })
    let total = 0;
    const handleSetClient = (valeur) => {
      setVente(c => ({...c, client: valeur}))
    }
    const handleSetArticle = (valeur) => {
      setVente(c => ({...c, "designation d'article" : valeur}))
    }
    const handleClick = async e => {
        e.preventDefault();
        const between = vente.client != '' && vente['designation d\'article'] != '' && vente['prix unitaire'] != 0 
        if (between) {
          console.log('doooo')
            const addVente = {
                table: 'ventes',
                data: vente
            }
            try {
                const result = await axios.post(api, addVente)
                if(result.status === 200) {
                    setIsOpen(false)
                    setVente({
                      jour: jour,
                      mois: mois,
                      annee: annee,
                      client: '',
                      "designation d'article": '',
                      qte: 1,
                      pu: 0,
                    })
                }
            } catch (e) {
                console.log(e)
                return
            }
        }
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
                        <div className="modal-content__row" >
                          <h1 className="model-content__titre"> la date </h1>
                          <div className="input">
                               <input type='text'  
                                  name='Date'
                                  value={`${annee}-${mois}-${jour}`} onChange={() => {}}/>
                          </div>
                        </div>
                        <div className="modal-content__row" >
                          <h1 className="model-content__titre"> clients </h1>
                          <div className="input">
                            <SimpleListMenu options={clients} onSet={handleSetClient}/>
                          </div>
                        </div>
                        <div className="modal-content__row" >
                          <h1 className="model-content__titre"> designation d'article </h1>
                          <div className="input">
                            <SimpleListMenu options={article} onSet={handleSetArticle}/>
                          </div>
                        </div>
                                <div className="modal-content__row">
                                        <h1 className="model-content__titre"> prix unitaire </h1>
                                        <div className="input">
                                             <input type='text'  
                                                placeholder='0'
                                                name='prix unitaire'
                                                value={vente['prix unitaire']} onChange={(e) => {
                                                  setVente(c => ({...c, 'prix unitaire' : e.target.value}))
                                                }}/>
                                        </div>
                                </div>

                            <div className="modal-content__btns">
                            <button type="button" onClick={() => {
                                    setIsOpen(false)
                                    setVente({
                                        jour: jour,
                                        mois: mois,
                                        annee: annee,
                                        client: '',
                                        "designation d'article": '',
                                        qte: 1,
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