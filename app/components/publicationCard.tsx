import styles from "../styles/Dashboard.module.scss";

export interface ListItem {
    text: string;
    date: string;
}

export interface PublicationCardProps {
    cardTitle: string; 
    items: ListItem[]; 
}

const PublicationCard = ({ cardTitle, items }: PublicationCardProps) => {
    return (
        <article className={styles.card}> 
            <h2 className={styles.title}>{cardTitle}</h2>
            <ul className={styles['content-list']}>
                {items.map((item, index) => (
                    <li key={index} className={styles['list-item']}>
                        <span className={styles['item-text']}>{item.text}</span>
                        <span className={styles['item-date']}>{new Date(item.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

export default PublicationCard;