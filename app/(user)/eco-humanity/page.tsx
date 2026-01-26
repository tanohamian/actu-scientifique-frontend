

'use client'
import Pagination from "@/app/components/pagination";
import ViewElement, { ViewElementProps } from "@/app/components/viewElement";
import { useRouter } from "next/navigation";
import { useState } from "react";

const dataFirstInformations: ViewElementProps[] = [
    {
        id: 1,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 2,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 3,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 4,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 5,
        media: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Lutte contre la meningite",
        type: "video",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 6,
        media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        title: "Lutte contre la meningite",
        type: "video",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 7,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 8,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 9,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 10,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 11,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 12,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 13,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 14,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 15,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 16,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 17,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
    {
        id: 18,
        media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Lutte contre la meningite",
        type: "image",
        description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.",
        category: "one-health"
    },
]

export default function EcoHumanityPage() {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataFirstInformations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(dataFirstInformations.length / itemsPerPage)
    return (
        <div className="w-full min-h-[400px] rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {currentItems.map((item: ViewElementProps) => (
                    <ViewElement
                        key={item.id}
                        media={item.media}
                        title={item.title}
                        type={item.type}
                        description={item.description}
                        category={item.category}
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