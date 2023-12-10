import React, {useState} from 'react'
import SignupComponent from './signup';
import SigninComponent from './signin';

function Auth() {

  const [right, setRight] = useState(false)

  const addRight = () => {
    setRight(!right);
  }

  return (
    <div className='auth'>
      <div className="box">
        <div className={`${right ? 'container right-panel-active' : 'container'}`}>
          <SigninComponent />
          <SignupComponent />
          <div className='overlay-container'>
            <div className="overlay">
              <div className='overlay-panel overlay-left'>
                <h1 className='m-0'>Heyy, Friend!</h1>
                <button className='ghost' onClick={addRight}>sign in</button>
              </div>
              <div className='overlay-panel overlay-right'>
                <h1 className='m-0'>Welcome Back!</h1>
                <button className='ghost' onClick={addRight}>sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
