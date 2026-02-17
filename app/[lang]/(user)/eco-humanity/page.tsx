'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@app/components/pagination";
import ViewElement from "@app/components/viewElement";
import { FetchArticles } from "@app/actions/ArticleManager";
import { Rubriques } from "@app/enum/enums";
import { Article, DbMedia } from "@app/interfaces";
import { FetchMedias } from "@app/actions/MediasManager";
import LoadingComponent from '@app/components/loadingComponent'


export default function Ecohumanity() {
    const router = useRouter();

    const [articles, setArticles] = useState<(Article | DbMedia)[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const itemsPerPage = 12;
    useEffect(() => {
        const loadContent = async () => {
            try {
                setIsLoading(true)
                const [articlesData, mediasData] = await Promise.all([
                    FetchArticles(),
                    FetchMedias()
                ]);

                const filteredArticles = articlesData.filter(
                    (a) => a.rubrique === Rubriques.ECO_HUMANITY
                );
                const filteredMedias = mediasData.filter(
                    (m) => m.rubrique === Rubriques.ECO_HUMANITY
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(articles.length / itemsPerPage);


    return (
        <div className="w-full min-h-[400px] p-6">
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
            <div className="mb-12">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4"> Eco-humanité </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item: Article | DbMedia) => (
                    <ViewElement
                        key={item.id}
                        article={item}
                        onclick={() => router.push(`/${item.id}`)}
                    />
                ))}
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