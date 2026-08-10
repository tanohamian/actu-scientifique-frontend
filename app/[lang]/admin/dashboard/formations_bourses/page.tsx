import React from 'react'
import SwitchSection from './components/Section';
//à ne pas supprimer
  const container: React.CSSProperties = {
        minHeight: '100vh',
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
            fontWeight: 'bold',
            marginBottom: '1px'
          };

  const soustitre: React.CSSProperties = {
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '30px'
          };

export default function page() {
  return (
    <div className="p-5 md:p-10" style={container}>
      <div style={entete}>
        <h1 className="text-2xl md:text-4xl" style={title}> Gestion de contenu </h1>
        <h2 className="text-base md:text-xl" style={soustitre}> Gérer les bourses, les formations et les Reportages </h2>
      </div>
      <SwitchSection/>
    </div>
  )
}