import React, {useState} from "react";
import { useMode } from "../../theme";
import SideBarComponent from "./sidebar";
import AddVente from "../add/AddVente";
import AddAchat from "../add/AddAchat";

function FirstPage() {
  const [theme, colorMode] = useMode();
  const [showButton, setShowButton] = useState(true);
  const [achat, setAchat] = useState(false);
  const [vente, setVente] = useState(false);
  const [versement, setVersement] = useState(false);

  const toggleButton = () => {
    console.log("hey")
    if (showButton) {
      document.getElementById('b1').style.opacity= 1;
      document.getElementById('b1').style.translate = ('0px' , '0px'),
      document.getElementById('b1').style.transition = '0.5s',
      document.getElementById('b2').style.opacity= 1;
      document.getElementById('b2').style.translate = ('0px' , '0px'),
      document.getElementById('b2').style.transition = '0.4s',
      document.getElementById('b3').style.opacity= 1
      document.getElementById('b3').style.translate = ('0px' , '0px'),
      document.getElementById('b3').style.transition = '0.3s';
    } else {
      document.getElementById('b1').style.opacity= 0;
      document.getElementById('b1').style.translate = ('0px' , '250px'),
      document.getElementById('b2').style.opacity= 0;
      document.getElementById('b2').style.translate = ('0px' , '140px'),
      document.getElementById('b3').style.opacity= 0,
      document.getElementById('b3').style.translate = ('0px' , '40px');
    }

    setShowButton(!showButton);
  };
    return (
                <>
                    <SideBarComponent />
                    <div className="bon">
                      <button 
                        id="b1"
                        onClick = {() => {
                          setAchat(true)
                        }}
                      >achat</button>
                      <button 
                        id="b2"
                        onClick= {() => {
                          setVente(true)
                        }}
                      >vente</button>
                      <button id="b3">versement</button>
                      <div className="bon-button">
                        <button id="b-1" onClick={toggleButton}>+</button>
                      </div>
                    </div>
                    <AddVente isOpen={vente} setIsOpen={setVente}/>
                    <AddAchat isOpen={achat} setIsOpen={setAchat}/>
                </>
    )
}

export default FirstPage