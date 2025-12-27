import styles from "../styles/Dashboard.module.scss"
import DashboardCard, { DashboardCardProps } from "./dashboardCards"
interface DashboardCardContainerProps{
    articles : DashboardCardProps,
    products : DashboardCardProps,
    visitors : DashboardCardProps,
    subscribers : DashboardCardProps
}

const DashboardCardContainer = ({ articles, products, visitors, subscribers }: DashboardCardContainerProps) => {
    return (
        <section className={styles.firstline}>
                <DashboardCard 
                    label={articles.label}
                    value={articles.value} 
                />
                <DashboardCard 
                    label={products.label}
                    value={products.value} 
                />
                <DashboardCard 
                    label={visitors.label}
                    value={visitors.value} 
                />
                <DashboardCard 
                    label={subscribers.label}
                    value={subscribers.value} 
                />
        </section>
    )
}

export default DashboardCardContainer