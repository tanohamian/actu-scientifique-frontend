'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/pagination";
import ViewElement from "@/app/components/viewElement";
import { Article } from "@/app/admin/dashboard/newsletters/components/Affichage";
import { FetchArticles } from "@/app/actions/ArticleManager";
import { Rubriques } from "@/app/enum/enums";

export default function Ecohumanity() {
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
                (article: Article) => article.rubrique === Rubriques.ECO_HUMANITY
            );
            setArticles(filtered);
        } catch (error) {
            console.error("Erreur articles:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(articles.length / itemsPerPage);

    if (isLoading) {
        return <div className="w-full text-center p-10 text-white">Chargement...</div>;
    }

    return (
        <div className="w-full min-h-[400px] p-6">
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4"> Eco-humanité </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.length > 0 ? (
                    currentItems.map((item: Article) => (
                        <ViewElement
                            key={item.id}
                            article={item}
                            onclick={() => router.push(`/${item.id}`)}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-400 py-10">
                        Aucun article trouvé.
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
}