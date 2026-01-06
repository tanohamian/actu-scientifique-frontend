"use client"
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Dashboard.module.scss'
import DashboardCardContainer from '@/app/components/dashboardCardsContainer'
import { DashboardCardProps } from '@/app/components/dashboardCards'
import PublicationCard, { ListItem } from '@/app/components/publicationCard'
import {FetchProducts} from '@/app/actions/ProductsManager'
import {FetchEvents} from '@/app/actions/EventsManager'
import {FetchReports} from '@/app/actions/ReportsManager'
import { FetchArticles } from '@/app/actions/ArticleManager'
import { FetchFormations } from '@/app/actions/FormationsManager'
import { FetchBourses } from '@/app/actions/BoursesManager'
import { EventInterface } from '@/app/components/eventDataTable'

export default function Page() {
    const today = new Date().toISOString();
        
    const [articles, setArticles] = useState<DashboardCardProps>({ label: "Articles", value: 15 })
    const [visitors] = useState<DashboardCardProps>({ label: "Visiteurs", value: 36 })
    const [products, setProducts] = useState<DashboardCardProps>({ label: "Produits", value: 41 })
    const [subscribers] = useState<DashboardCardProps>({ label: "Abonnés", value: 15 })



    const [publishedContent, setPublishedContent] = useState<ListItem[]>([
        { title: "Comment utiliser l'IA dans le journalisme", createdAt: today },
        { title: "Ethique et sources numériques", createdAt: today },
        { title: "Rapport annuel 2024 des médias", createdAt: today },
        { title: "Démocratiser l'accès à l'information", createdAt: today }
    ])
    const [realizedEvents, setRealizedEvents] = useState<EventInterface[]>([
        { title: "Conférence sur le futur du journalisme", date: today },
        { title: "Atelier de fact-checking avancé", date: today },
        { title: "Webinaire : Sécurité des données", date: today },
        { title: "Rencontre des professionnels IT", date: today },
    ])
    const [scholarshipsAndTraining, setScholarshipsAndTraining] = useState<ListItem[]>([
        { text: "Bourse journalisme d'investigation 2025", date: today },
        { text: "Formation : Analyse de données", date: today },
        { text: "Stage rédaction internationale", date: today },
        { text: "Programme accéléré éditorial", date: today },
    ])
    const [reportages, setReportages] = useState<ListItem[]>([
        { text: "Quiz du meilleur éditeur - Juillet", date: today },
        { text: "Défi mensuel : Rédiger en 1h", date: today },
        { text: "Compétition de vérification des faits", date: today },
        { text: "Concours de couverture locale", date: today },
    ])

    const [tendance] = useState<string>("Vous verrez ici un aperçu de tout ce qui se passe sur l'app")

    useEffect(()=>{
    async function update(){
        setArticles({label: articles.label, value: (await FetchArticles()).length})
        setProducts({label: products.label, value: (await FetchProducts()).length})
        setRealizedEvents((await FetchEvents()))
        setPublishedContent((await FetchArticles()).slice(0,4))
        setReportages((await FetchReports()).slice(0,4))
        const formations = await FetchFormations()
        const bourses = await FetchBourses()
        setScholarshipsAndTraining([...formations.slice(0,2), ...bourses.slice(0,2)])
    }
    update()
    }, [])
    const textClasses = `
        m-0 
        text-2xl 
        md:text-3xl 
        lg:text-4xl 
       font-light
        text-white
    `;
    const subTextClasses = `
        text-white 
        text-sm 
        md:text-base 
        font-light
    `;
    return (
        <main style={{ padding: '20px' }}>
            <h1 className={textClasses}>Dashboard</h1>
            <h3 className={subTextClasses}>Avoir une vision globale de l'application</h3>
            
            <DashboardCardContainer 

                subscribers={subscribers}
                articles={articles}
                visitors={visitors}
                products={products}
            />
            
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
                    cardTitle="Bourses et formations"
                    items={scholarshipsAndTraining}
                />
                <PublicationCard 
                    cardTitle="Reportages"
                    items={reportages}
                />
            </section>
        </main>
    )
}

