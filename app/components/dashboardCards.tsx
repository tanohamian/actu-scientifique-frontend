import styles from "../styles/Dashboard.module.scss"
export interface DashboardCardProps {
    label: string
    value: number
    route?: string
}

const DashboardCard = ({ label, value, route }: DashboardCardProps) => {
    return (
        <a className={styles.card} href={"/admin/dashboard"+ (route||"")}>
            <h3>{label}</h3>
            <p><strong>{value}</strong></p>
        </a>
    )
}

export default DashboardCard