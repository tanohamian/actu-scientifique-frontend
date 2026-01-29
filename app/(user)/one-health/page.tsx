'use client'
import { FetchArticles } from "@/app/actions/ArticleManager";
import { FetchMedias } from "@/app/actions/MediasManager";
import Pagination from "@/app/components/pagination";
import ViewElement from "@/app/components/viewElement";
import { Rubriques } from "@/app/enum/enums";
import { Article, DbMedia } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingComponent from '@/app/components/loadingComponent'




export default function OneHealthPage() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [articles, setArticles] = useState<(Article | DbMedia)[]>([])
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(articles.length / itemsPerPage)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const loadContent = async () => {
            try {
                setIsLoading(true)
                const [articlesData, mediasData] = await Promise.all([
                    FetchArticles(),
                    FetchMedias()
                ]);

                const filteredArticles = articlesData.filter(
                    (a) => a.rubrique === Rubriques.ONE_HEALTH
                );
                const filteredMedias = mediasData.filter(
                    (m) => m.rubrique === Rubriques.ONE_HEALTH
                );

                setArticles([...filteredArticles, ...filteredMedias]);
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            } finally {
                setIsLoading(false)
            }
        };

        loadContent();
    }, []);
    return (
        <div className="w-full min-h-[400px] rounded-lg p-6">
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {currentItems.map((item: Article | DbMedia) => (
                    <ViewElement
                        key={item.id}
                        article={item}
                        onclick={() => router.push(`/${item.id}`)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}