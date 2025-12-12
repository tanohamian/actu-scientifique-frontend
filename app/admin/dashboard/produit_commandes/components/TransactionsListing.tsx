import AffichageTableau from "./ListingTask";

interface Transaction {
    id: string;
    produit: string;
    modeDePaiement: string;
    prix: string;
    acheterPar: string;
}

const donneesTransactions: Transaction[] = [
    { id: 'N 145226', produit: 'Science & vie', modeDePaiement: 'orange money', prix: '15.000 fcfa', acheterPar: 'elie Bamba' },
];

const colonnesTransactions = [
    { key: 'id', header: 'Transactions' },
    { key: 'produit', header: 'Produit' },
    { key: 'modeDePaiement', header: 'Mode de paiement' },
    { key: 'prix', header: 'Prix' },
    { key: 'acheterPar', header: 'Acheter par' },
];

export default function TransactionsTable() {{
    return (
        <AffichageTableau<Transaction>
            titre="Transactions"
            columns={colonnesTransactions}
            data={donneesTransactions}
        />
    );
}}
