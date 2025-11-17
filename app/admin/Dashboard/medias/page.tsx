"use client"
import React, { useState } from 'react'
import ComponenteFormulaire from '../newsletters/components/ComponenteFormulaire';
import Affichage, { AffichageType, Article, Media } from '../newsletters/components/Affichage';
import { IFilter } from '@/app/components/filter';
const now = Date.now().toString()
export default function Page() {
  const [filters] = useState<IFilter[]>([])
const [medias, setMedias] = useState<Media[]>([
  {
    id: 1,
    publicationDate: now,
    title: "L'Avenir du Développement Front-end",
    type: "Photo",
    category: "Technologie" 
  },
  {
    id: 2,
    publicationDate: now,
    title: "Les Avantages Mécano-Quantiques des Puces M3",
    type: "Video",
    category: "Matériel"
  },
  {
    id: 3,
    publicationDate: now,
    title: "Le Design System : Un Investissement Essentiel",
    type: "Photo",
    category: "UX/UI Design"
  },
])
  const container: React.CSSProperties = {
      //backgroundColor: '#6B94AD',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      gap: '30px'
      
    };
    const leftSection: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    
      };
    
      const rightSection: React.CSSProperties = {
        width: '350px',
        height: 'fit-content',
        alignItems:'flex-start',
        padding:"27px"
      };
      const title: React.CSSProperties = {
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '30px'
        };
  return (
    <div style={container}>
      <div style={leftSection}>
        <h1 style={title}>Gestion des Medias</h1>
        <Affichage 
          type = {AffichageType.MEDIAS}
          items={medias}
          hasFilter={true}
          filters={filters}
        />
      </div>
      <div style={rightSection}>
        <ComponenteFormulaire isArticle={true}/>
      </div>
    </div>
  )
}
