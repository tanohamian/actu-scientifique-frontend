'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Article } from "@/app/admin/dashboard/newsletters/components/Affichage"
import { FetchArticles } from "@/app/actions/ArticleManager"

export default function DetailsArticle() {
    const params = useParams()
    const router = useRouter()
    const articleId = params.id

    const [article, setArticle] = useState<Article | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadArticle = async () => {
            setIsLoading(true)
            try {
                const allArticles = await FetchArticles()
                const found = allArticles.find((item: Article) => item.id === articleId)
                setArticle(found || null)
            } catch (error) {
                console.error("Erreur chargement article:", error)
            } finally {
                setIsLoading(false)
            }
        }
        if (articleId) loadArticle()
    }, [articleId])

    if (isLoading) return <div className="text-white p-10 text-center">Chargement...</div>
    if (!article) return <div className="text-white p-10 text-center">Article non trouvé</div>

    return (
        <div className="min-h-screen py-10 px-4 md:px-10 lg:px-20">
            <button
                onClick={() => router.back()}
                className="text-white hover:text-gray-400 mb-8 flex items-center gap-2 transition-colors group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour
            </button>

            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                <header>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-[#E85C41] text-white text-xs font-bold rounded-full uppercase">
                            {article.rubrique?.replace('_', ' ')}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        {article.title}
                    </h1>
                </header>

                <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5">
                    {/* Détection vidéo ou image basée sur l'URL */}
                    {article.illustrationUrl && article.illustrationUrl.match(/\.(mp4|mkv|webm)$/i) ? (
                        <video
                            src={article.illustrationUrl}
                            className="w-full h-auto max-h-[600px]"
                            controls
                            autoPlay
                            loop
                            muted
                        />
                    ) : (
                        <img
                            src={article.illustrationUrl}
                            alt={article.title}
                            className="w-full h-auto max-h-[600px] object-cover"
                        />
                    )}
                </div>

                <article className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-3xl shadow-inner">
                    <div className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-4">
                        {article.content?.split('. ').map((sentence, index) => (
                            <p key={index} className="opacity-90 hover:opacity-100 transition-opacity">
                                {sentence}{sentence.endsWith('.') ? '' : '.'}
                            </p>
                        ))}
                    </div>
                </article>
            </div>
        </div>
    )
}