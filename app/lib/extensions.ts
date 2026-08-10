declare global {
  interface String {
    capitalize(): string;
  }
}

if (!String.prototype.capitalize) {
  String.prototype.capitalize = function (this: string): string {
    if (!this) return "";
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
}

// Exporter un objet vide pour forcer Next.js à traiter ce fichier comme un module
export {};