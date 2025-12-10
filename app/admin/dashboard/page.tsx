"use client"
import React, { useState } from 'react'
import styles from '../../styles/Dashboard.module.scss'
import DashboardCard, { DashboardCardProps } from '@/app/components/dashboardCards'
import PublicationCard, { ListItem } from '@/app/components/publicationCard'

export default function Page() {
    const today = new Date().toISOString();
    
    const [cards] = useState<DashboardCardProps[]>([
        { label: "Articles", value: 15 },
        { label: "Visiteurs", value: 36 },
        { label: "Produits", value: 41 },
        { label: "Abonnés", value: 15 }
    ])

    const [publishedContent] = useState<ListItem[]>([
        { text: "Comment utiliser l'IA dans le journalisme", date: today },
        { text: "Ethique et sources numériques", date: today },
        { text: "Rapport annuel 2024 des médias", date: today },
        { text: "Démocratiser l'accès à l'information", date: today }
    ])
    const [realizedEvents] = useState<ListItem[]>([
        { text: "Conférence sur le futur du journalisme", date: today },
        { text: "Atelier de fact-checking avancé", date: today },
        { text: "Webinaire : Sécurité des données", date: today },
        { text: "Rencontre des professionnels IT", date: today },
    ])
    const [scholarshipsAndTraining] = useState<ListItem[]>([
        { text: "Bourse journalisme d'investigation 2025", date: today },
        { text: "Formation : Analyse de données", date: today },
        { text: "Stage rédaction internationale", date: today },
        { text: "Programme accéléré éditorial", date: today },
    ])
    const [games] = useState<ListItem[]>([
        { text: "Quiz du meilleur éditeur - Juillet", date: today },
        { text: "Défi mensuel : Rédiger en 1h", date: today },
        { text: "Compétition de vérification des faits", date: today },
        { text: "Concours de couverture locale", date: today },
    ])

    const [tendance] = useState<string>("Vous verrez ici un aperçu de tout ce qui se passe sur l'app")

    return (
        <main style={{ padding: '20px' }}>
            <h1 className='text-white text-xl'>Tableau de bord</h1>
            
            <section className={styles.firstline}>
                {cards.map((card) => (
                    <DashboardCard 
                        key  ={card.label}
                        label={card.label}
                        value={card.value} 
                    />
                ))}
            </section>
            
            {/* Section aperçu (Tendance) */}
            <section className={styles.tendance}>
                <p>{tendance}</p>
            </section>
            
            {/* Grille 2x2 des Publications Cards */}
            <section className={styles['publication-grid']}>
                <PublicationCard 
                    cardTitle="Derniers contenus publiés"
                    items={publishedContent}
                />
                <PublicationCard 
                    cardTitle="Derniers évènements réalisés"
                    items={realizedEvents}
                />
                <PublicationCard 
                    cardTitle="Dernières Opportunités"
                    items={scholarshipsAndTraining}
                />
                <PublicationCard 
                    cardTitle="Reportages"
                    items={games}
                />
            </section>
        </main>
    )
}