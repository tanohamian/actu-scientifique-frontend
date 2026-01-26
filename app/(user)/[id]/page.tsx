'use client'
import { FetchArticleById } from "@/app/actions/ArticleManager"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import IconComponent from "@/app/components/Icons"
import { Article } from "@/app/admin/dashboard/newsletters/components/Affichage"
export default function DetailsArticle() {
    const params = useParams()
    const router = useRouter()
    const articleId = params.id
    const [article, setArticle] = useState<Article | null>(null)

    useEffect(() => {
        (async () => {
            const articleInfo = await FetchArticleById(articleId as string)
            setArticle(articleInfo)
        })()
    }, [articleId])

    if (!article) return <div className="text-white p-10 text-center">Chargement...</div>

    // Fonction de détection du média
    const getMediaType = (url: string) => {
        if (!url) return 'image';
        const extension = url.split('.').pop()?.toLowerCase();
        if (['mp4', 'mkv', 'webm'].includes(extension || '')) return 'video';
        if (['mp3', 'wav', 'ogg'].includes(extension || '')) return 'podcast';
        return 'image';
    };

    const mediaType = getMediaType(article.illustrationUrl as string);

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
                    {mediaType === "image" && (
                        <img
                            src={article.illustrationUrl}
                            alt={article.title}
                            className="w-full h-auto max-h-[700px] object-cover"
                        />
                    )}

                    {mediaType === "video" && (
                        <video
                            src={article.illustrationUrl}
                            className="w-full h-auto max-h-[700px] bg-black"
                            controls
                            autoPlay
                            muted={false}
                        />
                    )}

                    {mediaType === "podcast" && (
                        <div className="w-full py-20 px-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#2c3e50] to-[#000000]">
                            <div className="mb-8 p-6 bg-white/10 rounded-full">
                                <IconComponent name="AudioIcon" className="w-20 h-20 text-[#E85C41]" />
                            </div>
                            <h2 className="text-white text-xl mb-6 font-medium">Écouter le podcast</h2>
                            <audio
                                src={article.illustrationUrl}
                                controls
                                className="w-full max-w-2xl"
                            />
                        </div>
                    )}
                </div>

                <article className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-3xl">
                    <div className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-6">
                        {article.content?.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} className="opacity-90">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>
            </div>
        </div>
    )
}