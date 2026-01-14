'use client'
import { useParams } from "next/navigation"

export default function DetailsArticle() {
    const params = useParams()
    const articleId = params.id
    return (
        <div>
            <h1>Details Article {articleId}</h1>
        </div>
    )
}