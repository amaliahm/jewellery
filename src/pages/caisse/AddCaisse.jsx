import { Button, FormControl, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_add_mouvement} from "../../backend";
import NavigationBar from "../home/NavigationBar";
import SelectedMenu from "../home/SelectedMenu";
import Notification from "../home/notification";
import { add_movment } from "./data";
import { useLocation } from "react-router-dom";
import { caisse } from "../../backend";


const useStyle = makeStyles({
    root: {
        "& label.Mui-focused": {
          color: "white"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#12f7d6",
          }
        }
      }
})

const style = {
  borderColor: "transparent",
  margin: '10px'
}

const AddCaisse = () => {
    const colors = useStyle()
    const [data, setData] = useState(add_movment)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()
    const currentDate = new Date();
    const mouvement = ['ENTRER', 'SORTIE']
    console.log(caisse)
    
    useEffect(() => {
      setData(v => ({
        ...v,
        jour: String(currentDate.getDate()).padStart(2, '0'),
        mois : String(currentDate.getMonth() + 1).padStart(2, '0'),
        annee : String(currentDate.getFullYear()),
        ancien_quantite: caisse.length === 0 ? 0 : parseFloat(caisse[0].quantite_restant),
        ancien_valeur: caisse.length === 0 ? 0 : parseFloat(caisse[0].valeur_restant),
      }))
    }, [2000])
    
    const handleClick = async e => {
        e.preventDefault();
        console.log(data)
        setData(v => ({
          ...v,
          quantite_restant: caisse.mouvement === 'ENTRER' ? caisse.ancien_quantite + caisse.quantite : caisse.ancien_quantite - caisse.quantite,
        }))

        console.log(data)
        
        setDone(true)
        setTimeout(() => {
            setDone(false)
            navigate('/caisse')
        }, 2000)
        try {
            const result = await axios.post(api_add_mouvement, data)
            if(result.status === 200) {
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    console.log(data)
    
    return (
        <>
            <NavigationBar name="ajouter mouvement" />
            <div className="add">
                {done && <Notification name={'le mouvement a été ajoutée'} />}
                <TextField 
                    disabled
                    id="outlined"
                    label={`${data.jour}-${data.mois}-${data.annee}`} variant="outlined"
                    type='text'
                    sx={{
                      borderColor: "transparent",
                      margin: '10px'
                    }}
                    name='date'
                    className={colors.root}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <SelectedMenu name='mouvement' options={mouvement} setValue={setData} valeur={data} />
                </FormControl>
                <TextField 
                        id={"outlined-controlled"}
                        label='quantite' variant="outlined"
                        type='number'
                        sx={style}
                        name='quantite'
                        className={colors.root}
                        onChange={(e) => {
                            setData(c => ({
                                ...c,
                                quantite : parseFloat(e.target.value),
                                total : parseFloat(e.target.value) * data['prix unitaire'],
                                quantite_restant: data.mouvement === "ENTRER" ? data.ancien_quantite + parseFloat(e.target.value) : data.ancien_quantite - parseFloat(e.target.value),
                            }))
                        }}
                        value={data.quantite}
                    />
                <TextField 
                        id={"outlined-controlled"}
                        label='prix unitaire' variant="outlined"
                        type='number'
                        sx={style}
                        name='prix unitaire'
                        className={colors.root}
                        onChange={(e) => {
                            setData(c => ({
                                ...c,
                                'prix unitaire' : parseFloat(e.target.value),
                                total : parseFloat(e.target.value) * data.quantite,
                            }))
                        }}
                        value={data['prix unitaire']}
                    />
                <TextField
                        id={"outlined-controlled"}
                        label='total' variant="outlined"
                        type='number'
                        sx={style}
                        name='total'
                        className={colors.root}
                        value={data.total}
                        disabled
                    />
                <Button 
                sx={{
                    color: 'var(--brand-1)',
                    border: '1px solid var(--brand-1)',
                    marginBottom: '10px',
                    marginRight: '10px',
                    position: 'absolute',
                    right: '0',
                    bottom: '0',
                }}
                onClick={handleClick}
                disabled={data.mouvement === '' || data.total === 0}
                >ajouter mouvement</Button>
            </div>
        </>
    )
}

export default AddCaisse





/*
DELIMITER ||
CREATE TRIGGER quantite_restant_bourse_insert
BEFORE INSERT ON bourse
FOR EACH ROW
BEGIN
    DECLARE previous_result DECIMAL(50, 3);
    SELECT COALESCE(`quantite restant`, 0) INTO previous_result
    FROM bourse
    ORDER BY id DESC
    LIMIT 1;
    IF NEW.mouvement = 'ENTRER' THEN
        SET NEW.`quantite restant` = previous_result + NEW.quantite;
    END IF;
    IF NEW.mouvement = 'SORTIE' THEN
        SET NEW.`quantite restant` = previous_result -NEW.quantite;
    END IF;
END;


DELIMITER ||
CREATE TRIGGER cump_bourse_insert
BEFORE INSERT ON bourse
FOR EACH ROW
BEGIN
    DECLARE previous_result DECIMAL(50, 3);
    SELECT COALESCE(`valeur restant`, 0) INTO previous_result
    FROM bourse
    ORDER BY id DESC
    LIMIT 1;
    IF NEW.mouvement = 'ENTRER' THEN
        SET NEW.`valeur restant` = previous_result + NEW.valeur;
        SET NEW.CUMP = (previous_result + NEW.valeur) / NEW.`quantite restant`;
    END IF;
    IF NEW.mouvement = 'SORTIE' THEN
        SET NEW.`valeur restant` = previous_result - NEW.valeur;
        SET NEW.CUMP = (previous_result - NEW.valeur) / NEW.`quantite restant`;
    END IF;
END;


DROP TRIGGER quantite_restant_bourse_insert;



INSERT INTO bourse (
    date, mouvement, quantite, `prix unitaire`
) VALUES (
    '3-12-2018', 'ENTRER', 199.6, 5550
);


ALTER TABLE bourse AUTO_INCREMENT = 1

 */