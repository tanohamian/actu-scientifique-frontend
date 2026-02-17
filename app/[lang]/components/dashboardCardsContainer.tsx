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
                    route={articles.route}
                />
                <DashboardCard 
                    label={products.label}
                    value={products.value}
                    route={products.route} 
                />
                <DashboardCard 
                    label={visitors.label}
                    value={visitors.value}
                    route={visitors.route}
                />
                <DashboardCard 
                    label={subscribers.label}
                    value={subscribers.value}
                    route={subscribers.route}
                />
        </section>
    )
}

export default DashboardCardContainer