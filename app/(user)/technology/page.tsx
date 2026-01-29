'use client'
import Pagination from "@/app/components/pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ViewArticleElement from "./view.component";
import { FetchArticles } from "@/app/actions/ArticleManager";
import { Rubriques } from "@/app/enum/enums";
import { Article } from "@/app/interfaces";






export default function Technologie() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [articles, setArticles] = useState<Article[]>([])
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(articles.length / itemsPerPage)
    useEffect(() => {
        const fetchArticles = async () => {
            setArticles((await FetchArticles())
                .filter((article) => article.rubrique === Rubriques.TECHNOLOGY))
        }
        fetchArticles()
    }, [])



    return (
        <div className="w-full min-h-[400px] rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {currentItems.map((item: Article) => (
                    <ViewArticleElement
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