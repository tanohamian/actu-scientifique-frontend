"use client"

import { FetchScholarships } from "@app/actions/Scholarships"
import OpportunityCard from "@app/components/OpportunityCard"
import { useEffect, useState } from "react"
import LoadingComponent from '@app/components/loadingComponent'
import { DisplayedElementInterface } from "../training/page"


export default function Scholarships() {
    const [scholarships, setScholarships] = useState<DisplayedElementInterface[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const data = await FetchScholarships()
                setScholarships(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching scholarships:', error)
                setLoading(false)
            }
        }

        fetchScholarships()
    }, [])
    return (
        <div className="min-h-screen bg-[#54779400] p-8 md:p-12">
            <LoadingComponent
                isOpen={loading}
                onClose={() => setLoading(false)}
            />
            <h1 className="text-5xl font-bold text-white mb-5">Bourses</h1>
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
        </div>
    );
}