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
import LoadingComponent from '@/app/components/loadingComponent'
import IndexLineChart from '@/app/components/IndexLineChart'

export default function Page() {
        
    const [isLoading, setIsLoading] = useState(true)
    
    const [articles, setArticles] = useState<DashboardCardProps>({ label: "Articles", value: 0, route: "/gestion_article" })
    const [visitors] = useState<DashboardCardProps>({ label: "Visites par jour", value: 36 })
    const [products, setProducts] = useState<DashboardCardProps>({ label: "Produits", value: 0 })
    const [subscribers] = useState<DashboardCardProps>({ label: "Abonnés", value: 15, route: "/users" })

    const [publishedContent, setPublishedContent] = useState<ListItem[]>([])
    const [realizedEvents, setRealizedEvents] = useState<EventInterface[]>([])
    const [scholarshipsAndTraining, setScholarshipsAndTraining] = useState<ListItem[]>([])
    const [reportages, setReportages] = useState<ListItem[]>([])

    useEffect(()=>{
    async function update(){
        console.log("1. articles.route = " , articles.route)
        setArticles({label: "Articles", route: "/gestion_article", value: (await FetchArticles()).length})
        setProducts({label: "Produits", route: "/products", value: (await FetchProducts()).length})
        setRealizedEvents((await FetchEvents()))
        setPublishedContent((await FetchArticles()).slice(0,4))
        setReportages((await FetchReports()).slice(0,4))
        const formations = await FetchFormations()
        const bourses = await FetchBourses()
        setScholarshipsAndTraining([...formations.slice(0,2), ...bourses.slice(0,2)])
        setIsLoading(false)
        console.log("2. articles.route = " , articles.route)
    }
    update()
    }, [articles.route])
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
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
            <h1 className={textClasses}>Dashboard</h1>
            <h3 className={subTextClasses}>{"Avoir une vision globale de l'application"}</h3>
            
            <DashboardCardContainer 
                subscribers={subscribers}
                articles={articles}
                visitors={visitors}
                products={products}
            />
            
            {/* Section aperçu (Tendance) */}
            <section className={styles.tendance}>
                <IndexLineChart/>
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

