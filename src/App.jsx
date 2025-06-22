import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
 const [showPassword, setShowPassword] = useState(false)
const showalter = () => {
    alert("hello")
  }
  return (
    <>
     <div className="div">
        <p>instagram</p>
        <input type="text" placeholder='phone number,username,or email' />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='password'
            
          
          />
        <div> <button  onClick={showalter} >Log in</button>
              </div>
            
<div className="hr-with-text">
  <hr />
  <span>or</span>
  <hr />
</div>

        </div>
      </div>
    </>
  )
}



export default App
