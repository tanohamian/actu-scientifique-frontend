'use client'
import { ViewElementProps } from "@/app/components/viewElement"
import { useParams, useRouter } from "next/navigation"

export default function DetailsArticle() {
    const params = useParams()
    const router = useRouter()
    const articleId = params.id

    const dataFirstInformations: ViewElementProps[] = [
        {
            id: 1,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 2,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 3,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 4,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 5,
            media: "https://www.w3schools.com/html/mov_bbb.mp4",
            title: "Lutte contre la meningite",
            type: "video",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 6,
            media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
            title: "Lutte contre la meningite",
            type: "video",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 7,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 8,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 9,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 10,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 11,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 12,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 13,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 14,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 15,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 16,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 17,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
        {
            id: 18,
            media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Lutte contre la meningite",
            type: "image",
            description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
        },
    ]

    const article = dataFirstInformations.find((item) => item.id === Number(articleId))

    if (!article) return <div className="text-white p-10 text-center">Article non trouvé</div>

    return (
        <div className="min-h-screen py-10 px-4 md:px-10 lg:px-20">
            <button
                onClick={() => router.back()}
                className="text-white hover:text-gray-400 mb-8 flex items-center gap-2 transition-colors group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour aux articles
            </button>

            <div className="max-w-5xl mx-auto flex flex-col gap-8">

                <header>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        {article.title}
                    </h1>
                    <div className="h-1.5 w-24 bg-[#E85C41] mt-6 rounded-full"></div>
                </header>

                <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5">
                    {article.type === "image" ? (
                        <img
                            src={article.media}
                            alt={article.title}
                            className="w-full h-auto max-h-[600px] object-cover"
                        />
                    ) : (
                        <video
                            src={article.media}
                            className="w-full h-auto max-h-[600px]"
                            controls
                            autoPlay
                            loop
                            muted
                        />
                    )}
                </div>

                <article className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-3xl shadow-inner">
                    <div className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-4">
                        {article.description?.split('. ').map((sentence, index) => (
                            <p key={index} className="opacity-90 hover:opacity-100 transition-opacity">
                                {sentence}{sentence.endsWith('.') ? '' : '.'}
                            </p>
                        ))}
                    </div>
                </article>

                {/*<div className="flex justify-between items-center py-6 border-t border-white/10 mt-4">
                    <p className="text-gray-500 text-sm">ID Article: #{article.id}</p>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E85C41]/20 cursor-pointer transition-colors"></div>
                        <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E85C41]/20 cursor-pointer transition-colors"></div>
                    </div>
                </div>*/}
            </div>
        </div>
    )
}