import React, {useState} from "react";
import { add_client, suivi_client, add_fournisseur, suivi_fournissuer } from "../../assets/icons";
import { espace_clients, espace_fournisseurs } from "../..";
import Header from "../sidebar/Header";
import AddClient from "../components/AddClient";

const Elements = () => {
  const [addClient, setAddClient] = useState(false)
 
    return (
        <div className="elements">
          <div className="icon-btns">
            <Header title='espace clients'/>
            <div className="person">
              {espace_clients.map((c, index) => (
                <div key={index}>
                  <button 
                  className={`icon-btn icon-btn--${c['color']}`}
                  type="button"
                  onClick={() => setAddClient(index == 0 ? true : false)}
                  >
                    <span className="icon-btn__back"></span>
                    <span className="icon-btn__front">
                      <img src={c['icon']} className="icon-btn__icon" />
                    </span>
                    <span className="icon-btn__label">{c['nom']}</span>
                  </button>
                  <AddClient isOpen={addClient} setIsOpen={setAddClient}/>
                </div>
              ))}
            </div>
            <Header title='espace fournisseur'/>
            <div className="person">
              {espace_fournisseurs.map((f, index) => (
                <div key={index}>
                  <button className={`icon-btn icon-btn--${f['color']}`}type="button">
                    <span className="icon-btn__back"></span>
                    <span className="icon-btn__front">
                      <img src={f['icon']} className="icon-btn__icon" />
                    </span>
                    <span className="icon-btn__label">{f['nom']}</span>
                  </button>
                </div>
              ))}
              </div>
          </div>
        </div>
    )
}

export default Elements