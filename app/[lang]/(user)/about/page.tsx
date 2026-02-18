import { BookOpen, Target, Users, Shield, Award, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations("About")
    return (
        <main className="min-h-screen bg-transparent text-white font-sans">
            <section className="container mx-auto px-6 pt-24 pb-12 relative">
                <div className="absolute inset-0 bg-[#50789B] opacity-[0.15] rounded-3xl blur-3xl"></div>

                <div className="max-w-5xl relative">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                        {t("h1")}<span className="text-[#E65A46]">Actu Scientifique</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-[#E65A46] mb-8 rounded-full"></div>
                    <p className="text-xl md:text-2xl leading-relaxed text-white/90">
                        <span className="font-semibold text-white">actuscientifique.com</span> {t("span1")}
                        <span className="font-bold text-[#50789B] bg-white px-2 mx-1 rounded">{t("span2")}</span>
                        {t("p1")}
                    </p>
                    <a
                        href="/charte-editoriale.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 text-[#E65A46] text-lg hover:text-white font-semibold underline hover:no-underline transition-all duration-200"
                    >
                        {t("reading")}
                    </a>
                </div>
            </section>

            <section className="container mx-auto px-6 py-8">
                <div className="bg-[#50789B]/20 backdrop-blur-md p-10 md:p-14 rounded-3xl border border-white/20 shadow-xl">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="bg-[#E65A46] p-4 rounded-2xl shadow-lg shrink-0">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-white">{t('engagement')}</h2>
                            <p className="text-lg leading-relaxed text-white/80">
                                <span className="font-medium text-white">actuscientifiques.com</span> {t('eVerb')}
                                <span className="text-white font-semibold italic ml-1"> {t('eSpan1')}</span>, {t('eLeftOver1')}
                            </p>
                            <p className="text-lg leading-relaxed mt-6 text-white/80 border-l-4 border-[#E65A46] pl-6">
                                {t("eSpan2")}
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
                        <h2 className="text-3xl font-bold text-white group-hover:text-[#50789B]">{t('mission')}</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 group-hover:text-slate-700">
                        { t('mText') }
                    </p>
                </div>

                <div className="group bg-[#50789B] hover:bg-white p-10 rounded-3xl border border-white/20 hover:border-[#50789B]/30 shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white group-hover:bg-[#50789B] p-3 rounded-xl transition-colors duration-300">
                            <Award className="w-8 h-8 text-[#50789B] group-hover:text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white group-hover:text-[#50789B]">{t('ambition')} </h2>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90 group-hover:text-slate-700">
                       { t('aText') }
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-16">
                <div className="bg-white/5 backdrop-blur-sm p-10 md:p-14 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-4 mb-10">
                        <BookOpen className="w-10 h-10 text-[#E65A46]" />
                        <h3 className="text-4xl font-bold text-white">{t('activities')} </h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {t('activitiesText').split(',').map((title, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border-b-8 border-[#50789B] shadow-md">
                                <h4 className="font-bold text-2xl mb-4 text-[#50789B]">{title}</h4>
                                <p className="text-base leading-relaxed text-slate-600 font-medium">
                                    {idx === 0 && "Vulgarisation des études et résultats de recherche"}
                                    {idx === 1 && "Décryptage de l'actualité scientifique"}
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
                        <h3 className="text-4xl font-bold text-white">{t("editorial")} </h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {t("eTexts").split(',').map((text) => (
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
                        {t('why')} actuscientifiques.com ?
                    </h2>
                    <div className="bg-white p-12 rounded-3xl shadow-2xl">
                        <p className="text-2xl leading-relaxed text-[#50789B] mb-8 font-medium">
                            {t("reasonP1")}
                            <span className="text-[#E65A46]">{t("reasonSpan")} </span>
                        </p>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {t("reasonP2")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 pb-20">
                <div className="text-center  border-white/10 pt-10">
                    <p className="text-[#E65A46] font-bold tracking-widest uppercase text-xs">
                        {t('motto')}
                    </p>
                </div>
            </section>
        </main>
    );
}