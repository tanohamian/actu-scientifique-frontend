import React from 'react'
import SwitchSection from './components/Section';
//à ne pas supprimer
  const container: React.CSSProperties = {
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      };

  const entete : React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  }

  const title: React.CSSProperties = {
            color: 'white',
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '1px'
          };

  const soustitre: React.CSSProperties = {
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '30px'
          };

export default function page() {
  return (
    <div style={container}>
      <div style={entete}>
        <h1 style={title}> Gestion de contenu </h1>
        <h2 style={soustitre}> Gérer les bourses, les formations et les Reportages </h2>
      </div>
      <SwitchSection/>
    </div>
  )
}