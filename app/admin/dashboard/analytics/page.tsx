"use client"
import { useEffect, useState } from 'react'
import styles from '../../../styles/Dashboard.module.scss'
import { DashboardCardProps } from '@/app/components/dashboardCards'
import { FetchArticles } from '@/app/actions/ArticleManager'

import LoadingComponent from '@/app/components/loadingComponent'
import IndexLineChart from '@/app/components/IndexLineChart'
import PublicationCard from '@/app/components/publicationCard'
import { FetchStats } from '@/app/actions/StatManager'
import { env } from '@/app/config/env'

interface AnalyticsInterface{
    endpoint : string
    data: {date:string, count: number}[]
}
export default function Page() {
    //const today = new Date().toISOString();

    const [isLoading, setIsLoading] = useState(true)
    const [analytics, setAnalytics] = useState<AnalyticsInterface[]>([])


    const [tendance] = useState<string>("Vous verrez ici un aperçu de tout ce qui se passe sur l'app")

    useEffect(()=>{
    async function update(){
        const rowData = (await FetchStats()).data;
        const allowedPrefixes = [
            '/one-health', '/technology', '/eco-humanity', 
            '/portrait-discovery', '/agenda', '/about', '/opportunities/'
        ];
        
        console.log({rowData})
        const dashboardPath = !env.devMode ? "/dashboard" : "/admin/dashboard";
        allowedPrefixes.push(dashboardPath);

        
        const rowAnalytics = rowData.filter((item) => 
            allowedPrefixes.some(prefix => item.endpoint.startsWith(prefix))
        );
        const grouped = rowAnalytics.reduce((acc: Record<string, Record<string, number>>, current) => {
            const endpoint = current.endpoint;
            const date = new Date(current.createdAt).toLocaleDateString('fr-FR');

            if (!acc[endpoint]) {
                acc[endpoint] = {};
            }

            acc[endpoint][date] = (acc[endpoint][date] || 0) + 1;

            return acc;
        }, {});

        const analyticsPerEndpoint = Object.entries(grouped).map(([endpoint, datesObj]) => ({
            endpoint,
            data: Object.entries(datesObj).map(([date, count]) => ({
                date,
                count
            }))
        }));
        setAnalytics(analyticsPerEndpoint)
        setIsLoading(false)
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
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
            <h1 className={textClasses}>Stat</h1>
            <h3 className={subTextClasses}>{"Avoir une vision du traffic sur l'application HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII"}</h3>

            <IndexLineChart />

            {/* Section aperçu (Tendance) */}
            <section className={styles.tendance}>
                <p>{tendance}</p>
            </section>

            <section /*className={styles['publication-grid']}*/ className="grid grid-cols-1 md:grid-cols-2 gap-[30px] my-10 p-0">
                {analytics.map((item, key)=>{
                    return(
                        <PublicationCard
                            key={key}
                            cardTitle={item.endpoint}
                            items={[]}
                            isAnalytics
                            data={item.data}
                        />
                    )
                })}
                
            </section>
        </main>
    )
}

