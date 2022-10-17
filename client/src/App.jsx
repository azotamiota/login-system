import React from 'react'
import { Route, Routes } from "react-router-dom"

import Home from './pages/Home'
import NotFound from './pages/NotFound'

import './App.css'


class App extends React.Component{
  render(){
    return(
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      
    )
  }
}

export default App
