import React from 'react'
import "./App.css"
import { BrowserRouter,Routes,Route } from 'react-router-dom' 



import Login from './views/Login'
import Signup from './views/Signup'
import Dasboard from './views/Dasboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dasboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App