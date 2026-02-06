"use client"
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Dashboard.module.scss'
import DashboardCardContainer from '@/app/components/dashboardCardsContainer'
import { DashboardCardProps } from '@/app/components/dashboardCards'
import {FetchProducts} from '@/app/actions/ProductsManager'

import { FetchArticles } from '@/app/actions/ArticleManager'

import LoadingComponent from '@/app/components/loadingComponent'
import IndexLineChart from '@/app/components/IndexLineChart'

export default function Page() {
    //const today = new Date().toISOString();
        
    const [isLoading, setIsLoading] = useState(true)
    
    const [articles, setArticles] = useState<DashboardCardProps>({ label: "Articles", value: 0, route: "/gestion_article" })
    const [visitors] = useState<DashboardCardProps>({ label: "Visiteurs", value: 36 })
    const [products, setProducts] = useState<DashboardCardProps>({ label: "Produits", value: 0 })
    const [subscribers] = useState<DashboardCardProps>({ label: "Abonnés", value: 15, route: "/users" })


    const [tendance] = useState<string>("Vous verrez ici un aperçu de tout ce qui se passe sur l'app")

    useEffect(()=>{
    async function update(){
        console.log("1. articles.route = " , articles.route)
        setArticles({label: "Articles", route: "/gestion_article", value: (await FetchArticles()).length})
        setProducts({label: "Produits", route: "/products", value: (await FetchProducts()).length})
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
            <h1 className={textClasses}>Stat</h1>
            <h3 className={subTextClasses}>{"Avoir une vision du traffic sur l'application"}</h3>
            
            <IndexLineChart />
            
            {/* Section aperçu (Tendance) */}
            <section className={styles.tendance}>
                <p>{tendance}</p>
            </section>
            
            
        </main>
    )
}

