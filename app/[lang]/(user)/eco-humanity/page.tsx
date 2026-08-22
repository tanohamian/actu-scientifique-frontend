"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@app/components/pagination";
import ViewElement from "@app/components/viewElement";
import { FetchArticles } from "@app/actions/ArticleManager";
import { Rubriques } from "@app/enum/enums";
import { Article, DbMedia } from "@app/interfaces";
import { FetchMedias } from "@app/actions/MediasManager";
import LoadingComponent from "@app/components/loadingComponent";
import { useTranslations } from "next-intl";
import { useAuth } from "../../context/authContext";

export default function Ecohumanity() {
  const router = useRouter();
  const { isLoggedIn, loading: authLoading } = useAuth();

  const [articles, setArticles] = useState<(Article | DbMedia)[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 12;

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const [articlesData, mediasData] = await Promise.all([
        FetchArticles(),
        FetchMedias(),
      ]);
      console.log("articlesData : ", articlesData);

      const filteredArticles = articlesData.filter(
        (a) => a.rubrique === Rubriques.ECO_HUMANITY,
      );
      const filteredMedias = mediasData.filter(
        (m) => m.rubrique === Rubriques.ECO_HUMANITY,
      );

      setArticles([...filteredArticles, ...filteredMedias]);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  console.log("articles : ", articles);

  useEffect(() => {
    if (!authLoading) {
      if (isLoggedIn) {
        loadContent();
      } else {
        setArticles([]);
        setIsLoading(false);
      }
    }
  }, [isLoggedIn, authLoading, loadContent]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const t = useTranslations("EcoHumanity");

  return (
    <div className="w-full min-h-[400px] p-6">
      <LoadingComponent
        isOpen={isLoading || authLoading}
        onClose={() => setIsLoading(false)}
      />
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {" "}
          {t("h1")}{" "}
        </h1>
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
