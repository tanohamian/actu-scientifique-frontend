import styles from "../styles/Dashboard.module.scss"
export interface DashboardCardProps {
    label: string
    value: number
}

const DashboardCard = ({ label, value }: DashboardCardProps) => {
    return (
        <article className={styles.card}>
            <h3>{label}</h3>
            <p><strong>{value}</strong></p>
        </article>
    )
}

export default DashboardCard