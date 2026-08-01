"use client"
import { mockData } from "@/app/constant";
import styles from "../styles/Dashboard.module.scss";
import IndexLineChart from "./IndexLineChart";
import { AnalyticsBoundary } from "../enum/enums";
import { useState } from "react";


export interface ListItem {
    text ?: string;
    title?:string
    date ?: string | Date;
    createdAt ?: Date|string
}

export interface PublicationCardProps {
    cardTitle: string; 
    items: ListItem[] ;
    isAnalytics ?: boolean ;
    data?: {date: string, count: number}[] 
}

const PublicationCard = ({ cardTitle, items=[], data=mockData, isAnalytics=false }: PublicationCardProps) => {
    const [boundary, setBoundary] = useState<keyof typeof AnalyticsBoundary>("LAST_7_DAYS");
    let analyticsBoundaries = Object.values(AnalyticsBoundary).map(boundary => ({
        value: boundary,
        label: boundary.replace(/_/g, ' ').toLowerCase()
    }));

    return (
        <article className={styles.card}> 
            <h2 className={styles.title}>{cardTitle}</h2>
            <ul className={styles['content-list']}>
                {isAnalytics? 
                    (
                    <>
                        <select className={styles['date-filter']} value={boundary} onChange={(e) => setBoundary(e.target.value as keyof typeof AnalyticsBoundary)}>
                            {analyticsBoundaries.map((boundary, index) => (
                                <option key={index} value={boundary.value}>{boundary.label}</option>
                            ))}
                        </select>
                        <IndexLineChart data={data} end={"01/08/2026"}></IndexLineChart>
                    </>
                ) : 
                    
                    
                    items.map((item, index) => {
                    const isEvent = 'title' in item;
                    
                    const displayTitle : string | undefined = isEvent ? item.title : item.title ? item.title : item.text;
                    
                    const rawDate = isEvent ? item.date : item.createdAt;
                    const displayDate = (() => {
                        const d = rawDate ?? item.createdAt;
                        return d
                            ? new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            : "Date inconnue";
                    })();

                    return (
                        <li key={index} className={styles['list-item']}>
                            <span className={styles['item-text']}>{displayTitle}</span>
                            <span className={styles['item-date']}>{displayDate}</span>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default PublicationCard;