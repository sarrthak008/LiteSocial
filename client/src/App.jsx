import React from 'react'
import "./App.css"
import { BrowserRouter,Routes,Route } from 'react-router-dom' 



import Login from './views/Login'
import Signup from './views/Signup'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App