"use client"
import React, { useState } from 'react'
import ComponenteFormulaire from '../newsletters/components/ComponenteFormulaire';
import Affichage, { AffichageType, Article } from '../newsletters/components/Affichage';
import { IFilter } from '@/app/components/filter';

export default function Page() {
  const [filters] = useState<IFilter[]>([])
  const [artilces, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "L'Avenir du Développement Front-end",
      content: "L'écosystème JavaScript continue d'évoluer rapidement. React, Vue et Angular se disputent la couronne, mais l'émergence de frameworks comme Svelte et la montée en puissance du concept de 'Server Components' (comme dans Next.js) redéfinissent la façon dont nous construisons des interfaces utilisateur performantes et modulaires. La tendance est à la simplification du bundle et à l'amélioration de l'expérience développeur.",
      rubrique: "Technologie"
    },
    {
      id: 2,
      title: "Les Avantages Mécano-Quantiques des Puces M3",
      content: "Avec l'introduction des puces de série M3, Apple a franchi une nouvelle étape dans l'optimisation énergétique. Ces architectures intègrent des cœurs de calcul optimisés pour les tâches de machine learning (Neural Engine) et une gravure plus fine, réduisant la consommation tout en maximisant la performance. Cet article explore comment l'intégration verticale du matériel et du logiciel permet ces gains spectaculaires.",
      rubrique: "Matériel"
    },
    {
      id: 3,
      title: "Le Design System : Un Investissement Essentiel",
      content: "Un Design System n'est pas seulement une bibliothèque de composants, c'est une source unique de vérité qui aligne le design et le développement. Il garantit la cohérence, accélère la production et facilite la maintenance à long terme des produits numériques. L'adoption d'outils comme Figma et Storybook est devenue la norme pour gérer efficacement ces systèmes.",
      rubrique: "UX/UI Design"
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
        <h1 style={title}>Gestion des Articles</h1>
        <Affichage 
          type = {AffichageType.ARTICLE}
          items={artilces}
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
