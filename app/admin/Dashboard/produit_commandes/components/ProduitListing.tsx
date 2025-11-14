import AffichageTableau from "./ListingTask";

interface Produit {
    id: number;
    produits: string;
    categories: string;
    prix: string;
    stock: number;
}

const donneesProduits: Produit[] = [
    { id: 1, produits: 'Science & vie', categories: 'Livre', prix: '15.000 fcfa', stock: 15 },
    { id: 2, produits: 'Science & vie', categories: 'Livre', prix: '15.000 fcfa', stock: 15 },
    { id: 3, produits: 'Science & vie', categories: 'Livre', prix: '15.000 fcfa', stock: 15 },
];

const colonnesProduits = [
    { key: 'produits', header: 'Produits' },
    { key: 'categories', header: 'Catégories' },
    { key: 'prix', header: 'Prix' },
    { key: 'stock', header: 'Stock' },
];


export default function ProduitsTable() {
    return (
        <AffichageTableau<Produit>
            titre="Produits"
            columns={colonnesProduits}
            data={donneesProduits}
        />
    );
}