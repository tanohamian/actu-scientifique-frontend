import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
            test: /\.svg$/i,
            issuer: { and: [/\.(js|ts|md)x?$/] }, // S'assure que cela ne s'applique qu'aux imports JS/TS
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        // Options pour nettoyer le SVG (optionnel mais recommandé)
                        svgoConfig: {
                            plugins: [
                                { name: 'removeViewBox', active: false },
                                { name: 'removeDimensions', active: true },
                            ],
                        },
                        // Permet d'injecter des props comme 'style' et 'onClick'
                        typescript: true, 
                        ext: 'tsx', // Utiliser l'extension TSX pour les composants
                    },
                },
            ],
        });

        return config;
  }
};

export default nextConfig;
