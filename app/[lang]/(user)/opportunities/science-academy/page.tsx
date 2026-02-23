'use client'

import { FetchTrainings } from "@/app/[lang]/actions/Trainings";
import { ArticleDisplay } from "@/app/[lang]/components/viewElement";
import { ITraining } from "@/app/[lang]/interfaces";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

export default function ScienceAcademy() {
    const t = useTranslations('SJA');
    const [scienceTraining,setScienceTraining]=useState<ITraining[]>([])

    const steps = [
        {
            number: "01",
            label: t('step1Label'),
            detail: t('step1Detail')
        },
        {
            number: "02",
            label:t('step2Label'),
            detail: t('step2Detail')
        },
        {
            number: "03",
            label:t('step3Label'),
            detail: t('step3Detail')
        }
    ];


    useEffect(()=>{
        (async ()=>{
            const response =  await FetchTrainings()
            if(response){
               const filterTraining = response.filter(
                 (m)=> m.type === "ACADEMY"
               )
               setScienceTraining(filterTraining)
            }
        })()
    },[])


    return (
        <div className="min-h-screen  font-serif">

            <div className="relative px-8 md:px-20 pt-20 ">
                <span className="text-4xl tracking-[0.3em] uppercase text-white font-sans">
                    {t('h1')}
                </span>
                <h1 className="mt-4 text-2xl md:text-3xl font-serif text-white leading-tight max-w-3xl">
                    {t('subtitle')}

                </h1>
               { /*<div className="mt-6 w-12 h-[2px] bg-[#C4622D]" />*/}
            </div>

            <div className="px-8 md:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-16">

                <div className="md:col-span-2 space-y-6">
                    <p className="text-white font-sans text-2xl leading-relaxed">
                        {t('desc1Before')}<span className="text-[#E65A46] font-medium">{t('desc1Span')}</span> {t('desc1After')}<em>{t('desc1Em')}</em> {t('desc1End')}
                    </p>
                    <p className="text-white font-sans text-2xl leading-relaxed">
                        {t('desc2Before')}<span className="text-[#E65A46] font-medium"> {t('desc2Span')}</span>{t('desc2After')}<em>{t('desc2Em')}</em>, {t('desc2End')}
                    </p>
                </div>

                <div className="flex flex-col justify-start gap-4">
                    <span className="text-xl tracking-[0.2em] uppercase text-[#E65A46] font-sans">{t('partners')}</span>
                    {["ASCA", "Afrique One — CSRS", "Science de Chez Nous"].map((p) => (
                        <div key={p} className="border-l-2 border-stone-200 pl-4">
                            <span className="text-white font-sans text-xl">{p}</span>
                        </div>
                    ))}
                </div>
            </div>

           
            <div className="px-8 md:px-20 pb-20">
                <span className="text-2xl tracking-[0.3em] uppercase text-[#E65A46] font-sans">
                    {t('programme')}
                </span>
                <h2 className="mt-3 mb-12 text-xl text-white font-serif">{t('programmeSubtitle')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-stone-200">
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className={`p-8 flex flex-col gap-4 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-stone-200' : ''}`}
                        >
                            <span className="text-4xl font-serif text-white select-none">{step.number}</span>
                            <div className="w-6 h-[1px] bg-[#C4622D]" />
                            <h3 className="text-white font-sans font-semibold text-lg tracking-wide uppercase">
                                {step.label}
                            </h3>
                            <p className="text-white font-sans text-sm leading-relaxed">{step.detail}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-8 md:mx-20 mb-10 bg-stone-800 text-white p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400 font-sans">{t('applyLabel')}</span>
                    <h3 className="mt-2 text-xl font-serif">{t('applyTitle')}</h3>
                </div>
                <button className="flex-shrink-0 bg-[#C4622D] hover:bg-[#a8512a] transition-colors text-white font-sans text-sm tracking-wide uppercase px-8 py-3">
                    {t('applyButton')} →
                </button>
            </div>

            <div className="px-8 md:px-20 py-16 space-y-8">


<div className="space-y-8">
    
    
    
    
    <span className="text-2xl tracking-[0.3em] uppercase text-[#E65A46] font-sans">
       {t('trainingsTitle')}
    </span>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-15">
        {scienceTraining.map((training) => (
            <div
                key={training.id}
                className="border border-white/20 p-8 flex flex-col gap-6 "
            >
                <div className="flex flex-col gap-1">
                    <span className="text-white/40 font-sans text-xs tracking-widest uppercase">
                        {new Date(training.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                    <h2 className="text-white font-serif text-2xl">{training.title}</h2>
                    <div className="w-6 h-[1px] bg-[#E65A46] mt-2" />
                </div>

                <div className="text-white/70 font-sans text-base leading-relaxed flex-grow">
                    {ArticleDisplay({ htmlContent: training.description })}
                </div>

                {(training.documentUrl || training.lien) && (
                    <div className="flex flex-wrap gap-4 pt-2">
                        {training.documentUrl && (
                            <a 
                                href={training.documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white font-sans text-sm tracking-wide uppercase border border-white/30 px-5 py-2 hover:bg-white/10 transition-colors"
                            >
                                📄{t('downloadDoc')}
                            </a>
                        )}
                        {training.lien && (
                            <a 
                                href={training.lien}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white font-sans text-sm tracking-wide uppercase bg-[#E65A46] hover:bg-[#c44a38] transition-colors px-5 py-2"
                            >
                                {t('link')}
                            </a>
                        )}
                    </div>
                )}
            </div>
        ))}
    </div>
</div>

   






</div>

        </div>
    );
}