import React, {useState} from "react";
import routes from './route'
import { useNavigate } from "react-router-dom";


const div_style = {
  height: '100px',
  width: '100px',
  margin: 25,
}

const Elements = () => {
  const navigate = useNavigate()
 
    return (
      <div className="add" style={{
        background: 'rgba(255,255,255,0)'
      }}>
        {routes.map((e, index) => (
          <div style={div_style} key={index}>
            <button 
              className={`icon-btn icon-btn--${index % 3 === 0 ? 'red' : index % 3 === 1 ? 'purple' : 'indigo'}`}
              type="button"
              onClick={() => navigate(e.to)}
            >
              <span className="icon-btn__back"></span>
              <span className="icon-btn__front">
                <img src={e['image']} className="icon-btn__icon" />
              </span>
              <span className="icon-btn__label">{e['name']}</span>
            </button>    
          </div>
        ))}
        </div>
    )
}

export default Elements