import AffichageTableau from "./ListingTask";

interface Commande {
    id: number;
    produits: string;
    categorie: string;
    prix: string;
    quantite: number;
    acheterPar: string;
}

const donneesCommandes: Commande[] = [
    { id: 101, produits: 'Science & vie', categorie: 'Livre', prix: '15.000 fcfa', quantite: 2, acheterPar: 'elie Bamba' },
];

const colonnesCommandes = [
    { key: 'produits', header: 'Produits' },
    { key: 'categorie', header: 'Catégorie' },
    { key: 'prix', header: 'Prix' },
    { key: 'quantite', header: 'Quantité' },
    { key: 'acheterPar', header: 'Acheter par' },
];

export default function CommandesTable() {
    return (
        <AffichageTableau<Commande> 
            titre="Commandes"
            columns={colonnesCommandes}
            data={donneesCommandes}
        />
    );
}