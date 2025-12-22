import styles from "../styles/Dashboard.module.scss";
import { Event } from "./eventDataTable";


export interface ListItem {
    text: string;
    date: string;
}

export interface PublicationCardProps {
    cardTitle: string; 
    items: ListItem[] | Event[]; 
}

const PublicationCard = ({ cardTitle, items }: PublicationCardProps) => {
    return (
        <article className={styles.card}> 
            <h2 className={styles.title}>{cardTitle}</h2>
            <ul className={styles['content-list']}>
                {items.map((item, index) => {
                    const isEvent = 'title' in item;
                    
                    const displayTitle = isEvent ? item.title : item.text;
                    
                    const rawDate = isEvent ? item.date : item.date;
                    const displayDate = rawDate 
                        ? new Date(rawDate).toLocaleDateString() 
                        : "Date inconnue";

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