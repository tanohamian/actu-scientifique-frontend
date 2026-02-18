'use client'

export default function ScienceAcademy() {
    return (
        <div className="min-h-screen  text-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
            }}></div>

            <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32">
                {/* Header with decorative line */}
                <div className="mb-16 relative">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-cyan-400 to-transparent"></div>

                    <div className="inline-block mb-4 px-4 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                        <span className="text-cyan-300 text-sm font-medium tracking-wider uppercase">Formation Certifiante</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none">
                        <span className="block bg-linear-to-r from-slate-50 via-cyan-200 to-slate-50 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]" style={{
                            backgroundSize: '200% 100%'
                        }}>
                            Science
                        </span>
                        <span className="block text-slate-300 mt-2">
                            Journalism
                        </span>
                        <span className="block bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                            Academy
                        </span>
                    </h1>
                </div>

                <div className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl"></div>

                    <div className="relative">
                        <div className="mb-10 pb-10 border-b border-slate-700/50">
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                                La <span className="text-cyan-300 font-medium">Science Journalism Academy (SJA)</span> est une université d'été pensée pour les étudiants en journalisme et organisée sous forme de formation intensive et abordant non seulement les fondamentaux du journalisme scientifique, mais aussi des thématiques transversales comme l'approche <span className="text-violet-300">« Une seule santé »</span> et le <span className="text-violet-300">développement durable</span>.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8 flex items-center gap-3">
                                <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full"></span>
                                Structure de la Formation
                            </h2>

                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Formation certifiante, la SJA s'articule autour de trois (3) temps forts :
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="group relative bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/40 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
                                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        1
                                    </div>
                                    <h3 className="text-lg font-semibold text-cyan-300 mb-3 mt-4">Formation Théorique</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Sessions en salle pour maîtriser les fondamentaux du journalisme scientifique
                                    </p>
                                </div>

                                <div className="group relative bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/40 rounded-xl p-6 hover:border-violet-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1">
                                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-linear-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        2
                                    </div>
                                    <h3 className="text-lg font-semibold text-violet-300 mb-3 mt-4">Visites Pratiques</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Découverte de centres et laboratoires de recherche
                                    </p>
                                </div>

                                <div className="group relative bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/40 rounded-xl p-6 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
                                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        3
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-300 mb-3 mt-4">Terrain</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Travaux d'étude et application concrète des connaissances
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent"></div>

                            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                                <span className="inline-block w-2 h-2 bg-violet-400 rounded-full"></span>
                                Mission & Partenaires
                            </h2>

                            <p className="text-slate-300 leading-relaxed mb-6">
                                Initiée par <span className="text-cyan-300 font-medium">ASCA</span> avec l'appui du consortium <span className="text-cyan-300 font-medium">Afrique One</span> basé au <span className="text-violet-300 font-medium">Centre suisse de recherches scientifiques en Côte d'Ivoire (CSRS)</span> et du média <span className="text-violet-300 font-medium">« Science de Chez Nous »</span>, la SJA vise à former les futurs journalistes à la spécialité du journalisme scientifique afin de favoriser une meilleure diffusion des savoirs scientifiques en Afrique.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
                                    En savoir plus
                                </button>
                                <button className="px-6 py-3 bg-slate-700/50 border border-slate-600 text-slate-200 font-semibold rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all duration-300">
                                    Candidater
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <div className="w-12 h-px bg-linear-to-r from-transparent to-slate-600"></div>
                    <span>Université d'Été</span>
                    <div className="w-12 h-px bg-linear-to-l from-transparent to-slate-600"></div>
                </div>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
                
                * {
                    font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
}