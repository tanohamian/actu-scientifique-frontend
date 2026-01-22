import React from 'react';
import { BookOpen, Target, Users, Shield, Award, Globe, Sparkles } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
                <div className="max-w-5xl relative">

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        À propos d'Actu Scientifiques
                    </h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-6">
                        <span className="font-semibold text-orange-400">actuscientifiques.com</span> est un média africain de <span className="font-bold text-blue-300">journalisme scientifique</span> dont la vocation est de <span className="font-bold text-blue-300">rendre la science accessible au plus grand nombre.</span>
                    </p>
                </div>
            </section>

            {/* Engagement Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                    <div className="flex items-start gap-6 mb-6">
                        <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-400/30">
                            <Shield className="w-10 h-10 text-blue-300" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Notre engagement</h2>
                            <p className="text-lg leading-relaxed text-gray-300">
                                <span className="font-medium">actuscientifiques.com</span> s'engage à <span className="text-white font-semibold">transformer les résultats de la recherche scientifique en informations claires, fiables et compréhensibles</span>, adaptées aux réalités africaines.
                            </p>
                            <p className="text-lg leading-relaxed mt-6 text-gray-300">
                                Le média s'adresse à tous : citoyens, étudiants, professionnels, décideurs et acteurs de la société civile, désireux de mieux comprendre les enjeux scientifiques qui influencent leur quotidien.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Ambition Grid */}
            <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
                <div className="group bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent p-10 rounded-3xl backdrop-blur-sm border border-blue-400/20 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-500/30 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-10 h-10 text-blue-300" />
                        </div>
                        <h2 className="text-3xl font-bold">Notre mission</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-300">
                        Informer, expliquer et former le public sur les sujets scientifiques d'intérêt général, en s'appuyant sur des données issues de la recherche, traitées avec rigueur, pédagogie et indépendance éditoriale.
                    </p>
                </div>
                <div className="group bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-transparent p-10 rounded-3xl backdrop-blur-sm border border-purple-400/20 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-purple-500/30 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <Award className="w-10 h-10 text-purple-300" />
                        </div>
                        <h2 className="text-3xl font-bold">Notre ambition</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-300">
                        Contribuer à l'émergence d'une culture scientifique forte en Afrique, capable de lutter contre la désinformation, de renforcer l'esprit critique des citoyens et de favoriser des décisions individuelles et collectives fondées sur des preuves scientifiques.
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-10 md:p-14 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-3 rounded-xl">
                            <BookOpen className="w-10 h-10 text-blue-300" />
                        </div>
                        <h3 className="text-4xl font-bold">Ce que nous faisons</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-blue-400/20 hover:border-blue-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
                            <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                            <h4 className="font-bold text-2xl mb-4 text-white">Vulgarisation</h4>
                            <p className="text-base leading-relaxed text-gray-300">
                                Vulgarisation des études et résultats de recherche
                            </p>
                        </div>
                        <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-400/20 hover:border-purple-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
                            <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                            <h4 className="font-bold text-2xl mb-4 text-white">Décryptage</h4>
                            <p className="text-base leading-relaxed text-gray-300">
                                Décryptage de l'actualité scientifique
                            </p>
                        </div>
                        <div className="group bg-gradient-to-br from-pink-500/10 to-orange-500/10 p-8 rounded-2xl border border-pink-400/20 hover:border-pink-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-1">
                            <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                            <h4 className="font-bold text-2xl mb-4 text-white">Mise en lumière</h4>
                            <p className="text-base leading-relaxed text-gray-300">
                                Mise en lumière des travaux de chercheurs africains
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Approach */}
            <section className="container mx-auto px-6 py-16">
                <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent p-10 md:p-14 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-3 rounded-xl">
                            <Users className="w-10 h-10 text-blue-300" />
                        </div>
                        <h3 className="text-4xl font-bold">Notre approche éditoriale</h3>
                    </div>
                    <p className="text-lg mb-8 text-gray-300">
                        <span className="font-semibold text-white">actuscientifiques.com</span> adopte les principes du journalisme scientifique de qualité:
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { text: "Fiabilité et vérification des sources", color: "from-blue-500 to-blue-600" },
                            { text: "Clarté et pédagogie du langage", color: "from-purple-500 to-purple-600" },
                            { text: "Contextualisation des données", color: "from-pink-500 to-pink-600" },
                            { text: "Indépendance", color: "from-orange-500 to-orange-600" },
                            { text: "Éthique et responsabilité", color: "from-red-500 to-red-600" }
                        ].map((item) => (
                            <span
                                key={item.text}
                                className={`bg-gradient-to-r ${item.color} px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-default`}
                            >
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Section */}
            <section className="container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-5 rounded-2xl">
                            <Globe className="w-14 h-14 text-white" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-bold mb-10 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        Pourquoi actuscientifiques.com ?
                    </h2>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-12 rounded-3xl border border-white/20 shadow-2xl">
                        <p className="text-2xl leading-relaxed text-white mb-8 font-light">
                            Parce que la science ne doit pas rester confinée aux laboratoires ou aux revues spécialisées. <span className="font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Elle doit être comprise, appropriée et utilisée par tous</span>.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-300">
                            En rapprochant la science des citoyens, <span className="font-semibold text-white">actuscientifiques.com</span> contribue à bâtir des sociétés africaines mieux informées, plus résilientes et capables de relever les défis sanitaires, environnementaux et technologiques contemporains.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="container mx-auto px-6 pb-20">
                <div className="text-center">
                    <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-4 rounded-full">
                        <p className="text-sm text-gray-400 font-medium">Un journalisme scientifique éthique, indépendant et responsable, au service de la société.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}