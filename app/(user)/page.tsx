/* eslint-disable @next/next/no-img-element */
'use client'
import ViewElement from "../components/viewElement";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { useRouter } from "next/navigation";
import { ShoppingCart } from 'lucide-react'
import { FetchArticles } from "../actions/ArticleManager";
import { FetchMedias } from "../actions/MediasManager";
import { Article, DbMedia } from "../interfaces";
import LoadingComponent from '@/app/components/loadingComponent'
import Script from "next/script";
import AdBanner from "../components/AdBanner";
import { Product } from "@/app/interfaces";
import { FetchProducts } from "@/app/actions/ProductsManager";

export interface FeedInterface {
  id: string,
  url: string,
  title: string,
  type: string,
  description: string,
  createdAt: Date,
}


export default function Home() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [articles, setArticles] = useState<(Article | DbMedia)[]>([])
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(articles.length / itemsPerPage)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide effect
  useEffect(() => {
    if (products.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(products.length, 2))
      }, 4000) // Change slide every 4 seconds

      return () => clearInterval(interval)
    }
  }, [products.length])

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true)
      try {
        const [articlesData, mediasData] = await Promise.all([
          FetchArticles(),
          FetchMedias()
        ]);

        const filteredArticles = articlesData.filter(
          (a) => a.une === true
        );
        const filteredMedias = mediasData.filter(
          (m) => m.une === true
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

  console.log("articles : ", articles)

  useEffect(() => {
    (async () => {
      const response = await FetchProducts()
      if (response) {
        setProducts(response)
      }
    })()
  }, [])

  const firstTwoProducts = products.slice(0, 2)

  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7800085793195104"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <LoadingComponent
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
      />
      <div className="flex flex-col lg:flex-row w-full items-center gap-6 lg:gap-8 ">
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight max-w-xl">
          Décrypter la science, informer le public
        </h1>
        <button
          className="bg-[#E65A46] text-white font-medium rounded-lg border-none transition-all duration-200 hover:bg-[#d14a36] whitespace-nowrap flex justify-center items-center font-sans px-6 py-3 text-base md:text-lg lg:text-xl 2xl:text-3xl h-14 lg:h-16 xl:h-18 2xl:h-20 w-full sm:w-auto 2xl:w-[680px]"
          onClick={() => router.push('/susbscription')}
        >
          {"S'abonner"}
        </button>
      </div>
      <div className="w-[80%] mx-auto h-32 border-2 border-white mt-35 items-center justify-center flex text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-[80%] mx-auto mt-35 mb-5 overflow-hidden">
            <AdBanner dataAdSlot="1234567890" dataAdFormat="horizontal" />
          </div>
          {/*<span className="text-sm font-normal">728 x 90 ou 970 x 90</span>*/}
        </div>
      </div>
      <div className="bg-white w-full rounded-lg p-6 md:p-8 lg:p-12 shadow-xl">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          À la une
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="w-full lg:w-1/4">

            <div className="flex flex-col bg-[#50789B] min-h-[400px] rounded-lg p-4 gap-4 sticky top-6">
              <h1 className="text-xl text-white">Boutique</h1>
              <button
                className="bg-white/10 hover:bg-white/20 transition-all duration-200 rounded-lg p-4 flex  min-h-[300px] group relative overflow-hidden items-center justify-center"
                onClick={() => router.push('/shop')}
              >
                {firstTwoProducts.length > 0 ? (
                  <div className="relative w-full h-full flex ">
                    {firstTwoProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentSlide
                          ? 'opacity-100 translate-x-0'
                          : index < currentSlide
                            ? 'opacity-0 -translate-x-full'
                            : 'opacity-0 translate-x-full'
                          }`}
                      >
                        {product.preview_image && (
                          <div className="relative w-full h-full">
                            <img
                              src={product.preview_image}
                              alt={product.name}
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <ShoppingCart className="text-white w-10 h-10 group-hover:scale-110 transition-transform" />
                    {/*<span className="text-white text-base font-bold">Boutique</span>*/}
                  </div>
                )}
              </button>
              <div className="w-full h-[300px] border-2 border-white rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                <div className="flex flex-col items-center gap-1">
                  <span>Publicité</span>
                  <span className="text-sm font-normal">300 x 250 ou 300 x 600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}