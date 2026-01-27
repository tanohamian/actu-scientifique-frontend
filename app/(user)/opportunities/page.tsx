"use client"

import { FetchScholarships } from "@/app/actions/Scholarships"
import { FetchTrainings } from "@/app/actions/Trainings"
import OpportunityCard from "@/app/components/OpportunityCard"
import OpportunityEventCard from "@/app/components/OpportunityEventCard"
import { useEffect, useState } from "react"

const today = new Date().toISOString();

export default function OpportunitiesPage() {
    const [scholarships, setScholarships] = useState<{title: string, createdAt?: Date|string}[]>([
        { title: "Bourse pour la recherche scientifique en Turquie", createdAt: today },
        { title: "Bourse pour la recherche scientifique en Turquie", createdAt: today },
        { title: "Bourse pour la recherche scientifique en Turquie", createdAt: today },
    ])
    const [trainings, setTrainings] = useState<{title: string, createdAt?: Date|string}[]>([
        { title: "Rédaction scientifique pour le web", createdAt: today },
        { title: "Rédaction scientifique pour le web", createdAt: today },
        { title: "Rédaction scientifique pour le web", createdAt: today },
    ])

    useEffect(() => {
        async function update() {
            setTrainings(await FetchTrainings())
            setScholarships(await FetchScholarships())
        }
        update()
    }, [])

    return (
        /* Fond bleu sur toute la page */
        <div className="min-h-screen bg-[#547794] p-8 md:p-12">
            
            <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                    Formations & Bourses
                </h1>
                <p className="text-xl text-blue-100/80 font-medium">Les opportunités disponibles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_0.6fr] gap-8 items-start"> 
                
                
                <section> 
                    <div className="grid grid-cols-1 gap-4">
                        {trainings.map((item, index) => (
                            <OpportunityCard
                                key={index}
                                isScholarship={false} 
                                content={item.title}
                            />
                        ))}
                    </div>
                </section>

                
                <section> 
                    <div className="grid grid-cols-1 gap-4">
                        {scholarships.map((item, index) => (
                            <OpportunityCard
                                key={index}
                                isScholarship={true} 
                                content={item.title}
                            />
                        ))}
                    </div>
                </section>
                <div className="grid grid-cols-1 gap-4">
                    <OpportunityEventCard 
                        title="Événement à venir"
                        content="Description de l'événement spécial."
                    />
                </div>
            </div>

            
        </div>
    )
}