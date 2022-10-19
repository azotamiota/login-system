import React from 'react'
import { Route, Routes } from "react-router-dom"

import Home from './pages/Home'
import AuthorizedHome from './pages/AuthorizedHome'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import './App.css'
import NavBar from './components/NavBar'
import AuthorizedNavBar from './components/AuthorizedNavBar'


class App extends React.Component{
  render(){
    return(
      <Routes>
        <Route path="/" element={<><NavBar /><Home /></>}></Route>
        <Route path="/login" element={<><NavBar /><LoginPage /></>}></Route>
        <Route path="/register" element={<><NavBar /><RegisterPage /></>}></Route>
        <Route path="/dashboard" element={<><AuthorizedNavBar /><AuthorizedHome /></>}></Route>
        <Route path="*" element={<><NavBar /><Home /></>}></Route>
      </Routes>
      
    )
  }
}

export default App
