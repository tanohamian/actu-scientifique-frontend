"use client"

import { FetchScholarships } from "@/app/actions/Scholarships"
import { FetchTrainings } from "@/app/actions/Trainings"
import OpportunityCard from "@/app/components/OpportunityCard"
import { ListItem } from "@/app/components/publicationCard"
import { useEffect, useState } from "react"


export default function OpportunitiesPage() {

    const today = new Date().toISOString();
    const [scholarshipsAndTraining, setScholarshipsAndTraining] = useState<ListItem[]>([
            { text: "Bourse journalisme d'investigation 2025", date: today },
            { text: "Formation : Analyse de données", date: today },
            { text: "Stage rédaction internationale", date: today },
            { text: "Programme accéléré éditorial", date: today },
        ])
    useEffect(()=>{
            async function update(){
                const formations = await FetchTrainings()
                const bourses = await FetchScholarships()
                setScholarshipsAndTraining([...formations.slice(0,2), ...bourses.slice(0,2)])
            }
            update()
            }, [])
    return (
        <div>
            <h1>Opportunities</h1>
            {scholarshipsAndTraining.map((item, index)=> 
                <OpportunityCard
                key={index}
                isScholarship={false} 
                content={item.text as string}
                />
            )}
            
        </div>
    )
}