/* eslint-disable @next/next/no-img-element */
"use client";
import SearchBarComponent from "@app/components/searchBar";
import { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@app/components/pagination";
import { Product } from "@app/interfaces";
import { FetchProducts } from "@app/actions/ProductsManager";
import { useTranslations } from "next-intl";
import { useAuth } from "../../context/authContext";

export default function ShopPage() {
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const itemsPerPage = 42;
  const router = useRouter();
  const t = useTranslations("Shop");
  const { isLoggedIn, loading: authLoading } = useAuth();

  const loadProducts = useCallback(async () => {
    try {
      const response = await FetchProducts();
      if (response) {
        setProducts(response);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-10 p-8 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("h1")}
          </h1>
        </div>

        <div className="w-full md:w-96">
          <SearchBarComponent
            placeholder={t("searchPlaceholder")}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>

      <div
        className="w-full max-w-sm"
        onClick={() => router.push("/susbscription")}
      >
        <button className="w-full bg-[#E85C41] hover:bg-[#d44d35] text-white text-2xl md:text-4xl font-bold py-2 px-8 rounded-lg transition-colors">
          {t("subscribe")}
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <FilterDropdown label="Catégorie" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {currentItems.map((product) => {
          // Troncation de la description ou des infos si l'utilisateur n'est pas connecté
          const rawDescription = product.description || "";
          const displayDescription =
            !isLoggedIn && rawDescription
              ? rawDescription.length > 50
                ? `${rawDescription.slice(0, 50)}...`
                : rawDescription
              : rawDescription;

          return (
            <button
              key={product.id}
              className="bg-white/20 p-4 rounded-md border border-white/10 text-left flex flex-col justify-between"
              onClick={() => router.push(`/shop/${product.id}`)}
            >
              <div>
                <img
                  src={product.preview_image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-sm"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-semibold mt-4 text-white line-clamp-1">
                    {product.name}
                  </h3>

                  {displayDescription && (
                    <p className="text-sm text-gray-300 mt-1">
                      {displayDescription}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-200 font-bold mt-3">
                {product.price} FCFA
              </p>
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-between gap-8 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md border border-white/10 min-w-[150px] transition-all">
      <span className="font-medium">{label}</span>
      <ChevronDown size={20} />
    </button>
  );
}
