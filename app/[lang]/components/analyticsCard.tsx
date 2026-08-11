import { mockData } from "@/app/constant";
import styles from "../styles/Dashboard.module.scss";
import IndexLineChart from "./IndexLineChart";
import { AnalyticsBoundary } from "../enum/enums";
import { useEffect, useState } from "react";
import { FetchStats } from "../actions/StatManager";
import Tooltip from "./ToolTip";
let today = (new Date()).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
export interface ListItem {
    text ?: string;
    title?:string
    date ?: string | Date;
    createdAt ?: Date|string
}

export interface AnalyticsCardProps {
    cardTitle: string; 
    endpoint: string;
}

const AnalyticsCard = ({ cardTitle, endpoint }: AnalyticsCardProps) => {
    const [data, setData] = useState(mockData); // Replace with your actual data source
    let analyticsBoundaries = Object.values(AnalyticsBoundary).map(boundary => ({
        value: boundary.value,
        label: boundary.label?.replace(/_/g, ' ')
    }));
    useEffect(() => {
        (async () => {
            const rowAnalytics = (await FetchStats({ endpoint, daysRange: 7 })).data;
            const grouped = rowAnalytics.reduce(
                (acc: Record<string, number>, current) => {
                    const date = new Date(current.createdAt).toLocaleDateString("fr-FR");
                    acc[date] = (acc[date] || 0) + 1;

                    return acc;
                },
                {}
            );
            let dataToSet = grouped ? Object.entries(grouped).map(([date, count]) => ({ date, count })) : [];
            console.log("dataToSet = ", dataToSet);
            setData(dataToSet);
        })();
        //console.log("cardTitle: ", cardTitle)
    }, [endpoint]);
    const onFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = parseInt(e.target.value);
        const rowAnalytics = (await FetchStats({ endpoint, daysRange: selectedValue })).data;
        const grouped = rowAnalytics.reduce(
            (acc: Record<string, number>, current) => {
                const date = new Date(current.createdAt).toLocaleDateString("fr-FR");
                acc[date] = (acc[date] || 0) + 1;

                return acc;
            },
            {}
        );
        let dataToSet = grouped ? Object.entries(grouped).map(([date, count]) => ({ date, count })) : [];
        console.log("dataToSet = ", dataToSet);
        setData(dataToSet);
    }
    
    return (
        <article className={styles.card}> 
            <Tooltip data={{ label: cardTitle, messageBubble: `Statistiques pour l'endpoint ${endpoint}`, route: endpoint }} />
            <ul className={styles['content-list']}>
                <select className={styles['select']} onChange={onFilterChange}>
                            {analyticsBoundaries.map((boundary, index) => (
                                <option key={index} value={boundary.value}>{boundary.label}</option>
                            ))}
                </select>
                <IndexLineChart data={data} end={today}></IndexLineChart>
            </ul>
        </article>
    );
}

export default AnalyticsCard;