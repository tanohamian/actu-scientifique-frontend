'use client'
import IconComponent, { IconName } from "../components/Icons";
import ViewElement, { ViewElementProps } from "../components/viewElement";
import { useState } from "react";
import Pagination from "../components/pagination";
import SocialNetworks from "../components/socialNetworks";
import { useRouter } from "next/navigation";

const dataFirstInformations: ViewElementProps[] = [
  {
    id: 1,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 2,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 3,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 4,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 5,
    media: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Lutte contre la meningite",
    type: "video",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 6,
    media: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    title: "Lutte contre la meningite",
    type: "video",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 7,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 8,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 9,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 10,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 11,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 12,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 13,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 14,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 15,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 16,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter.la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 17,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
  {
    id: 18,
    media: "https://tse1.mm.bing.net/th/id/OIP.gV0E3SwCl171DqO_C8AYaQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Lutte contre la meningite",
    type: "image",
    description: "la meningite est une maladie contagieuse, il faut la prévenir et la traiter."
  },
]


export default function Home() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataFirstInformations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataFirstInformations.length / itemsPerPage);
  const socialNetworks: IconName[] = ["YouTubeIcon", "FacebookIcon", "TwitterIcon"]
  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl max-w-4xl leading-tight mb-8">
        L'actualité scientifique Africaine, décryptée
      </h1>


      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <button className="bg-[#E65A46] text-white font-medium rounded-lg border-none transition-all duration-200 hover:bg-[#d14a36] whitespace-nowrap flex justify-center items-center font-sans px-6 py-3 text-base md:text-lg lg:text-xl w-full sm:w-auto" onClick={() => router.push('/susbscription')}>
          S'abonner
        </button>

        <button className="bg-white/10 rounded-lg p-3 w-full sm:w-auto sm:aspect-square hover:bg-white/20 transition-all flex items-center justify-center" onClick={() => router.push('/shop')}>
          <IconComponent
            name="ShoppingCartIcon"
            className="text-white w-6 h-6 flex-shrink-0"
          />
        </button>
      </div>

      <div className="bg-white w-full max-w-8xl rounded-lg p-6 md:p-8 lg:p-12 shadow-xl">
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          À la une
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3 min-h-[400px] rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {currentItems.map((item, index) => (
                <ViewElement
                  key={item.id}
                  media={item.media}
                  title={item.title}
                  type={item.type}
                  description={item.description}
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

          <div className="flex flex-col w-full lg:w-1/3 bg-[#50789B] min-h-[400px] rounded-lg p-6 flex">
            <p className="text-white text-xl text-center">Nos réseaux sociaux</p>
            <div className="flex flex-row lg:flex-col gap-4 mt-4">
              {socialNetworks.map((network, index) => (
                <SocialNetworks
                  key={index}
                  name={network}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}