import Image, { StaticImageData } from "next/image";



export interface ViewElementProps {
    id?: number;
    media: string;
    title: string;
    type?: "video" | "image";
    description: string;
    onclick?: () => void;
    category?: string;
}


export default function ViewElement({ media, title, type, description, onclick, category }: ViewElementProps) {
    return (
        <button className="flex flex-col gap-2 p-6" onClick={onclick}>
            {type === "image" ? <img src={media} alt={title} width={500} height={500} className="rounded-lg" /> : <video src={media} className="rounded-lg" autoPlay loop />}
            <div className="flex flex-col items-start">
                <h1 className={category ? "text-2xl font-bold text-white" : "text-2xl font-bold"}>{title}</h1>
                <p className={category ? "text-gray-600 line-clamp-2 text-white" : "text-gray-600 line-clamp-2"}>{description}</p>
            </div>
        </button>
    );
}