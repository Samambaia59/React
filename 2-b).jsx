import { useState } from 'react';
import './App.css';



function BoasVindas({usuario}){
  return<h1>Bem-vindo de volta, {usuario}!</h1>
}


export default function myApp(){
  return (<BoasVindas usuario = "Israelzitto"/>)
}
