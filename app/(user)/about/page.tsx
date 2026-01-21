import React from 'react';
import { BookOpen, Target, Users, Shield, Award, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen text-white">
            <section className="container mx-auto px-6 py-20">
                <div className="max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                        À propos d'Actu Scientifiques
                    </h1>
                    <p className="text-xl md:text-2xl leading-relaxed opacity-90 mb-6">
                        <span className="font-semibold text-orange-500">actuscientifiques.com</span> est un média africain de <span className="font-bold text-orange-500">journalisme scientifique</span> dont la vocation est de <span className="font-bold text-orange-500">rendre la science accessible au plus grand nombre.</span>
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                <div className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-white/20 shadow-2xl">
                    <div className="flex items-start gap-4 mb-4">
                        <Shield className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Notre engagement</h2>
                            <p className="text-lg leading-relaxed">
                                <span>actuscientifiques.com</span> s'engage à <span className="text-white">transformer les résultats de la recherche scientifique en informations claires, fiables et compréhensibles</span>, adaptées aux réalités africaines.
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                Le média s'adresse à tous : citoyens, étudiants, professionnels, décideurs et acteurs de la société civile, désireux de mieux comprendre les enjeux scientifiques qui influencent leur quotidien.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
                <div className="bg-linear-to-r from-blue-600/20 to-blue-600/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="w-8 h-8 text-blue-400" />
                        <h2 className="text-3xl font-bold">Notre mission</h2>
                    </div>
                    <p className="text-lg leading-relaxed">
                        Informer, expliquer et former le public sur les sujets scientifiques d'intérêt général, en s'appuyant sur des données issues de la recherche, traitées avec rigueur, pédagogie et indépendance éditoriale.
                    </p>
                </div>
                <div className="bg-linear-to-r from-blue-600/20 to-blue-600/20 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="w-8 h-8 text-blue-400" />
                        <h2 className="text-3xl font-bold">Notre ambition</h2>
                    </div>
                    <p className="text-lg leading-relaxed">
                        Contribuer à l'émergence d'une culture scientifique forte en Afrique, capable de lutter contre la désinformation, de renforcer l'esprit critique des citoyens et de favoriser des décisions individuelles et collectives fondées sur des preuves scientifiques.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen className="w-8 h-8 text-blue-400" />
                        <h3 className="text-3xl font-bold">Ce que nous faisons</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-linear-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all">
                            <h4 className="font-bold text-xl mb-3 text-white">Vulgarisation</h4>
                            <p className="text-sm leading-relaxed opacity-90">
                                Vulgarisation des études et résultats de recherche
                            </p>
                        </div>
                        <div className="bg-linear-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all">
                            <h4 className="font-bold text-xl mb-3 text-white">Décryptage</h4>
                            <p className="text-sm leading-relaxed opacity-90">
                                Décryptage de l'actualité scientifique
                            </p>
                        </div>
                        <div className="bg-linear-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all">
                            <h4 className="font-bold text-xl mb-3 text-white">Mise en lumière</h4>
                            <p className="text-sm leading-relaxed opacity-90">
                                Mise en lumière des travaux de chercheurs africains
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                <div className="bg-linear-to-r from-blue-500/10 via-blue-500/10 to-blue-500/10 p-8 md:p-12 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="w-8 h-8 text-blue-400" />
                        <h3 className="text-3xl font-bold">Notre approche éditoriale</h3>
                    </div>
                    <p className="text-lg mb-6">
                        <span className="font-semibold">actuscientifiques.com</span> adopte les principes du journalisme scientifique de qualité:
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {[
                            "Fiabilité et vérification des sources",
                            "Clarté et pédagogie du langage",
                            "Contextualisation des données",
                            "Indépendance",
                            "Éthique et responsabilité"
                        ].map((item) => (
                            <span key={item} className="bg-orange-500 px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <Globe className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-8 text-white">
                        Pourquoi actuscientifiques.com ?
                    </h2>
                    <div className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl border border-white/10">
                        <p className="text-xl leading-relaxed text-white mb-6">
                            Parce que la science ne doit pas rester confinée aux laboratoires ou aux revues spécialisées. <span className="text-white">Elle doit être comprise, appropriée et utilisée par tous</span>.
                        </p>
                        <p className="text-lg leading-relaxed opacity-90 text-white">
                            En rapprochant la science des citoyens, <span className="text-white">actuscientifiques.com</span> contribue à bâtir des sociétés africaines mieux informées, plus résilientes et capables de relever les défis sanitaires, environnementaux et technologiques contemporains.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 pb-16">
                <div className="text-center text-sm opacity-60">
                    <p>Un journalisme scientifique éthique, indépendant et responsable, au service de la société.</p>
                </div>
            </section>
        </main>
    );
}