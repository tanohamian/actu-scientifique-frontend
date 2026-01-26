'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";
import { Article } from "@/app/admin/dashboard/newsletters/components/Affichage";
import { FetchArticles } from "@/app/actions/ArticleManager";
import { Rubriques } from "@/app/enum/enums";

export default function PortraitDiscoveryPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    
    const itemsPerPage = 12;

    const loadArticles = useCallback(async () => {
        setIsLoading(true);
        try {
            const allArticles = await FetchArticles();
            const filtered = allArticles.filter(
                (article: Article) => article.rubrique === Rubriques.PORT_DISCOVERY
            );
            setArticles(filtered);
        } catch (error) {
            console.error("Erreur articles:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { loadArticles(); }, [loadArticles]);

    const currentItems = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(articles.length / itemsPerPage);

    if (isLoading) return <div className="w-full text-center p-10 text-white">Chargement...</div>;

    return (
        <div className="w-full min-h-screen p-6 bg-transparent">
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    Portraits & <br /> Découvertes
                </h1>
                <p className="text-xl text-gray-300 font-medium">Découvertes de la semaine</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center">
                {currentItems.length > 0 ? (
                    currentItems.map((item: Article) => (
                        <div
                            key={item.id}
                            onClick={() => router.push(`/${item.id}`)}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-[#E85C41] transition-all duration-300 shadow-xl">
                                {item.illustrationUrl?.match(/\.(mp4|mkv|webm)$/i) ? (
                                    <video src={item.illustrationUrl} className="w-full h-full object-cover" muted />
                                ) : (
                                    <img
                                        src={item.illustrationUrl || "/placeholder.jpg"}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                )}
                            </div>

                            <div className="mt-6 text-center max-w-[200px]">
                                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#E85C41] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-white">Aucun portrait trouvé.</div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}
        </div>
    );
}