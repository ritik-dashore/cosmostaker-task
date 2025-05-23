import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login';
import Admin from './Admin';
import Team from './Team';

function Protected({Component}) {
    const navigate = useNavigate();
    // useEffect(()=>{
    //   const token = localStorage.getItem("token")
    //   const roll_id = localStorage.getItem("roll_id")

    // })
    const token = localStorage.getItem("token")
    const roll_id = localStorage.getItem("roll_id")


    //  if (token == null || roll_id == null) {
    //     return <Navigate to="/login" />;
    // }
    if (token == null) {
        return <Navigate to="/login" />;
    }

  return (
    <>
      <Component/>
    </>
  )
}

export default Protected
