import React from 'react';
import { BookOpen, Target, Users, Shield, Award, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-transparent text-white font-sans">
            <section className="container mx-auto px-6 pt-24 pb-12 relative">
                <div className="absolute inset-0 bg-[#50789B] opacity-[0.15] rounded-3xl blur-3xl"></div>
                
                <div className="max-w-5xl relative">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                        À propos d&apos; <span className="text-[#E65A46]">Actu Scientifiques</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-[#E65A46] mb-8 rounded-full"></div>
                    <p className="text-xl md:text-2xl leading-relaxed text-white/90">
                        <span className="font-semibold text-white">actuscientifiques.com</span> est un média africain de
                        <span className="font-bold text-[#50789B] bg-white px-2 mx-1 rounded">journalisme scientifique</span>
                        dont la vocation est de rendre la science accessible au plus grand nombre.
                        Le projet est né d’un constat simple : en Afrique, une grande partie des informations scientifiques
                        reste difficilement accessible au grand public, alors même qu’elles sont essentielles pour comprendre
                        le monde, faire des choix éclairés et améliorer durablement le bien-être des populations.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-8">
                <div className="bg-[#50789B]/20 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/20 shadow-xl">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="bg-[#E65A46] p-4 rounded-2xl shadow-lg shrink-0">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-white">Notre engagement</h2>
                            <p className="text-lg leading-relaxed text-white/80">
                                <span className="font-medium text-white">actuscientifiques.com</span> s&apos;engage à
                                <span className="text-white font-semibold italic ml-1"> transformer les résultats de la recherche scientifique en informations claires, fiables et compréhensibles</span>, adaptées aux réalités africaines.
                            </p>
                            <p className="text-lg leading-relaxed mt-6 text-white/80 border-l-4 border-[#E65A46] pl-6">
                                Le média s&apos;adresse à tous : citoyens, étudiants, professionnels, décideurs et acteurs de la société civile.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
                <div className="group bg-[#50789B] hover:bg-white p-10 rounded-3xl border border-white/20 hover:border-[#50789B]/30 shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white group-hover:bg-[#50789B] p-3 rounded-xl transition-colors duration-300">
                            <Target className="w-8 h-8 text-[#50789B] group-hover:text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white group-hover:text-[#50789B]">Notre mission</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 group-hover:text-slate-700">
                        Informer, expliquer et former le public sur les sujets scientifiques d&apos;intérêt général, en s&apos;appuyant sur des données issues de la recherche, traitées avec rigueur.
                    </p>
                </div>

                <div className="group bg-[#50789B] hover:bg-white p-10 rounded-3xl border border-white/20 hover:border-[#50789B]/30 shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white group-hover:bg-[#50789B] p-3 rounded-xl transition-colors duration-300">
                            <Award className="w-8 h-8 text-[#50789B] group-hover:text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white group-hover:text-[#50789B]">Notre ambition</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 group-hover:text-slate-700">
                        Contribuer à l&apos;émergence d&apos;une culture scientifique forte en Afrique, capable de lutter contre la désinformation et de favoriser des décisions fondées sur des preuves.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-16">
                <div className="bg-white/5 backdrop-blur-sm p-10 md:p-14 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-10">
                        <BookOpen className="w-10 h-10 text-[#E65A46]" />
                        <h3 className="text-4xl font-bold text-white">Ce que nous faisons</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {['Vulgarisation', 'Décryptage', 'Mise en lumière'].map((title, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border-b-8 border-[#50789B] shadow-md">
                                <h4 className="font-bold text-2xl mb-4 text-[#50789B]">{title}</h4>
                                <p className="text-base leading-relaxed text-slate-600 font-medium">
                                    {idx === 0 && "Vulgarisation des études et résultats de recherche"}
                                    {idx === 1 && "Décryptage de l'actualité scientifique mondiale"}
                                    {idx === 2 && "Mise en lumière des travaux de chercheurs africains"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-16">
                <div className="bg-[#50789B] p-10 md:p-14 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-8">
                        <Users className="w-10 h-10 text-[#E65A46]" />
                        <h3 className="text-4xl font-bold text-white">Notre approche éditoriale</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {[
                            "Fiabilité et vérification",
                            "Clarté et pédagogie",
                            "Contextualisation",
                            "Indépendance",
                            "Éthique"
                        ].map((text) => (
                            <span
                                key={text}
                                className="bg-[#E65A46] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform cursor-default border border-white/10"
                            >
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                        <Globe className="w-16 h-16 text-[#E65A46] animate-pulse" />
                    </div>
                    <h2 className="text-5xl font-bold mb-10 text-white">
                        Pourquoi actuscientifiques.com ?
                    </h2>
                    <div className="bg-white p-12 rounded-3xl shadow-2xl">
                        <p className="text-2xl leading-relaxed text-[#50789B] mb-8 font-medium">
                            Parce que la science ne doit pas rester confinée aux laboratoires.
                            <span className="text-[#E65A46]"> Elle doit être comprise, appropriée et utilisée par tous.</span>
                        </p>
                        <p className="text-lg leading-relaxed text-slate-600">
                            En rapprochant la science des citoyens, nous contribuons à bâtir des sociétés africaines mieux informées et capables de relever les défis contemporains.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 pb-20">
                <div className="text-center border-t border-white/10 pt-10">
                    <p className="text-[#E65A46] font-bold tracking-widest uppercase text-xs">
                        Journalisme Scientifique • Éthique • Indépendant
                    </p>
                </div>
            </section>
        </main>
    );
}