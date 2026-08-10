export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  EDITOR = 'ROLE_EDITOR',
  VIEWER = 'ROLE_VIEWER'
};
export enum Rubriques {
  TECHNOLOGY = "technology",
  ONE_HEALTH = "one_health",
  ECO_HUMANITY = "ecohumanity",
  PORT_DISCOVERY = "port_discovery"
}

export enum LANG {
    FR = 'fr',
    EN = 'en'
}
export enum AffichageType {
  ARTICLE = "article",
  NEWSLETTER = "newsletters",
  MEDIAS = "medias"
}

export enum OrderStatus {
    CREATED = "CREATED",
    CANCELED = "CANCELED",
    DELIVERED = "DELIVERED"
}

export const AnalyticsBoundary = {
  LAST_7_DAYS : { label: "Ces 7 derniers jours", value: 7 },
  LAST_30_DAYS : { label: "Ces 30 derniers jours", value: 30 },
  LAST_90_DAYS : { label: "Ces 3 derniers mois", value: 90 },
  LAST_6_MONTHS : { label: "Ces 6 derniers mois", value: 180 },
  LAST_1_YEAR : { label: "Cette année", value: 365 }
}