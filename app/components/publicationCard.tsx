import styles from "../styles/Dashboard.module.scss";

export interface ListItem {
    text ?: string;
    title?:string
    date ?: string | Date;
    createdAt ?: Date|string
}

export interface PublicationCardProps {
    cardTitle: string; 
    items: ListItem[] ; 
}

const PublicationCard = ({ cardTitle, items }: PublicationCardProps) => {
    return (
        <article className={styles.card}> 
            <h2 className={styles.title}>{cardTitle}</h2>
            <ul className={styles['content-list']}>
                {items.map((item, index) => {
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