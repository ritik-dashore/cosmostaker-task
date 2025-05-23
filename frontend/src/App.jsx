import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login';
import Admin from './Admin';
import Protected from './Protected';
import Team from './Team';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Protected Component={Admin} />} />
          <Route path="/team" element={<Protected Component={Team} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
