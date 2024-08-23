import React from 'react'
import './loginsignup.css'

const LoginSignup = () => {

   

  return (
    <div className='login-Popup'>
            <form className="login-popup-container">
            <div className="login-popup-input">
                  <input type="text" placeholder='Enter your name' required/>
                <input type="text" placeholder='Enter your Email' required/>
                <input type="password" placeholder='Password' required/>
            </div>
            <button>Login</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the tearms of use & privacy policy.</p>
            </div>
            <p>Create a nrw account <span>Click here</span></p>
            <p>Already have an account <span >Login here</span></p>
            
        </form>
    </div>
  )
}

export default LoginSignup