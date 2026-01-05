"use client"
import React, { useState, useEffect } from 'react';
import ComponentFormProd from './components/FormProd';
import StatGlobal from './components/StatGlobal';
import ProduitsTable from './components/ProduitListing';
import TransactionsTable from './components/TransactionsListing';
import CommandesTable from './components/CommandesListing';
import { Product } from '../../page';

export default function Page() {
    const MOBILE_BREAKPOINT = 768;
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
    );
    const [orderLength, setOrderLength] = useState(0)
    const [validatedLength, setValidatedLength] = useState(0)
    const [revenue, setRevenue] = useState(0)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const container: React.CSSProperties = {
        minHeight: '100vh',
        padding: isMobile ? '20px' : '40px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        gap: '30px',
        flexDirection: isMobile ? 'column' : 'row'
    };

    const leftSection: React.CSSProperties = {
        flex: isMobile ? 'none' : '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        width: isMobile ? '100%' : 'auto'
    };

    const rightSection: React.CSSProperties = {
        width: isMobile ? '100%' : '350px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '30px',
        height: 'fit-content'
    };

    const title: React.CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '28px' : '36px',
        fontWeight: 'bold',
        marginBottom: '1px'
    };

    const Soustitre: React.CSSProperties = {
        color: 'white',
        fontSize: isMobile ? '16px' : '20px',
        fontWeight: 'bold',
        marginBottom: '30px'
    };

    const [products, setProducts] = useState<Product[]>([])
    return (
        <div style={container}>
            <div style={leftSection}>
                <h1 style={title}>Gestion des produits et commandes</h1>
                <h1 style={Soustitre}>Gérer les produits et suivez les commandes en temps réel</h1>
                <StatGlobal numberOrder={orderLength} numberValidated={validatedLength} revenue={revenue} />
                <h1 style={Soustitre}>Produits</h1>
                <ProduitsTable products={products} setProducts={setProducts} />
                <h1 style={Soustitre}>Commandes</h1>
                <CommandesTable setOrderLength={setOrderLength} />
                <h1 style={Soustitre}>Transactions</h1>
                <TransactionsTable />
            </div>
            <div style={rightSection}>
                <ComponentFormProd setProducts={setProducts} />
            </div>
        </div>
    )
}