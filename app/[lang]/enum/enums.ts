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
  LAST_7_DAYS : { label: "LAST_7_DAYS", value: 7 },
  LAST_30_DAYS : { label: "LAST_30_DAYS", value: 30 },
  LAST_90_DAYS : { label: "LAST_90_DAYS", value: 90 },
  LAST_6_MONTHS : { label: "LAST_6_MONTHS", value: 180 },
  LAST_1_YEAR : { label: "LAST_1_YEAR", value: 365 }
}