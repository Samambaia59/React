import { useState } from 'react';
import './App.css';

 function Saudacao({nome}){
  return<h1>Olá, {nome}</h1>
}


function myApp(){
  return (<Saudacao nome = "Israelzitto"/>)
}
export default myApp