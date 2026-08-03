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
  LAST_7_DAYS : "LAST_7_DAYS",
  LAST_30_DAYS : "LAST_30_DAYS",
  LAST_90_DAYS : "LAST_90_DAYS",
  LAST_6_MONTHS : "LAST_6_MONTHS",
  LAST_1_YEAR : "LAST_1_YEAR"
}