"use client"

import { FetchScholarships } from "@/app/actions/Scholarships"
import { FetchTrainings } from "@/app/actions/Trainings"
import OpportunityCard from "@/app/components/OpportunityCard"
import OpportunityEventCard from "@/app/components/OpportunityEventCard"
import { useEffect, useState } from "react"
import LoadingComponent from '@/app/components/loadingComponent'

interface DisplayedElementInterface {
    title: string,
    lien: string,
    createdAt?: Date | string
}
export default function OpportunitiesPage() {
    const [scholarships, setScholarships] = useState<DisplayedElementInterface[]>([])
    const [trainings, setTrainings] = useState<DisplayedElementInterface[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function update() {
            setIsLoading(true)
            setTrainings(await FetchTrainings())
            setScholarships(await FetchScholarships())
            setIsLoading(false)
        }
        update()
    }, [])

    return (
        <div className="min-h-screen bg-[#54779400] p-8 md:p-12">
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
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
                                url={item.lien}
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
                                url={item.lien}
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