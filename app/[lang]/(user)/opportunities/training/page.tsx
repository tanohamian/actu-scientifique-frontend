"use client"

import { FetchTrainings } from "@app/actions/Trainings"
import OpportunityCard from "@app/components/OpportunityCard"
import { useEffect, useState } from "react"
import LoadingComponent from '@app/components/loadingComponent'
import { useTranslations } from "next-intl"

export interface DisplayedElementInterface {
    title: string,
    lien: string,
    createdAt?: Date | string
}

export default function Training() {
    const [trainings, setTrainings] = useState<DisplayedElementInterface[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const t = useTranslations('Training')
    useEffect(() => {
        async function update() {
            setIsLoading(true)
            setTrainings(await FetchTrainings())
            setIsLoading(false)
        }
        update()
    }, [])
    return (
        <div>
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
            <h1 className="text-5xl font-bold text-white mb-5">{t('h1')}</h1>
            <section>
                <div className="grid grid-cols-1 gap-4">
                    {trainings.map((item, index) => (
                        <OpportunityCard
                            url={item.lien}
                            key={index}
                            isScholarship={false}
                            content={item.title}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}