'use client'

import { useParams } from "next/navigation"
import { useState } from "react";
import { Product } from "../page";

export default function DetailsProduct() {
    const params = useParams()
    const productId = params.id
    const [quantity, setQuantity] = useState(1)

    const products: Product[] = [
        { id: 1, name: "Produit 1", price: 10500, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Découvrez l'élégance et la performance réunies dans ce produit d'exception. Conçu avec des matériaux de haute qualité pour une durabilité maximale." },
        { id: 2, name: "Produit 2", price: 20000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 2" },
        { id: 3, name: "Produit 3", price: 30000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 3" },
        { id: 4, name: "Produit 4", price: 40000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 4" },
        { id: 5, name: "Produit 5", price: 50000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 5" },
        { id: 6, name: "Produit 6", price: 60000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 6" },
        { id: 7, name: "Produit 7", price: 70000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 7" },
        { id: 8, name: "Produit 8", price: 80000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 8" },
        { id: 9, name: "Produit 9", price: 90000, image: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", description: "Description du produit 9" },
    ];

    const product = products.find(p => p.id === Number(productId)) || products[0];

    const increaseQuantity = () => setQuantity(prev => prev + 1)
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

    return (
        <div className="min-h-screen text-white p-6 md:p-12 lg:p-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">

                <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[500px] lg:h-[700px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                    <div>
                        <h2 className="text-5xl font-extrabold tracking-tight mb-4">{product.name}</h2>
                        <div className="h-1 w-20 bg-[#E85C41] mb-6"></div>
                        <p className="text-white text-lg leading-relaxed max-w-xl">
                            {product.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-3xl border border-white/10 shadow-inner">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#E85C41] uppercase tracking-widest text-sm font-bold">Prix Unitaire</span>
                            <p className="text-4xl font-bold">{product.price.toLocaleString()} <span className="text-lg font-normal opacity-70">FCFA</span></p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-[#E85C41] uppercase tracking-widest text-sm font-bold">Quantité</span>
                            <div className="flex items-center justify-between bg-white rounded-2xl p-2 w-full max-w-[160px] shadow-lg">
                                <button
                                    onClick={decreaseQuantity}
                                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#E85C41] hover:text-white text-gray-800 transition-all flex items-center justify-center text-2xl"
                                >
                                    −
                                </button>
                                <span className="text-xl font-black text-gray-900">
                                    {quantity}
                                </span>
                                <button
                                    onClick={increaseQuantity}
                                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#E85C41] hover:text-white text-gray-800 transition-all flex items-center justify-center text-2xl"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button className="flex-1 bg-[#E85C41] hover:bg-[#cf4d35] text-white text-xl font-bold py-5 px-8 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-[#E85C41]/20">
                            Acheter maintenant
                        </button>
                        <button className="flex-1 border-2 border-[#E85C41] text-[#E85C41] hover:bg-[#E85C41]/10 text-xl font-bold py-5 px-8 rounded-2xl transition-all">
                            Personnaliser
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}