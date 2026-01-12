import Image, { StaticImageData } from "next/image";
import ButtonComponent from "./button";


export interface ViewElementProps {
    media: string;
    title: string;
    type?: "video" | "image";
    description: string;
}


export default function ViewElement({ media, title, type, description }: ViewElementProps) {
    return (
        <div className="flex flex-col gap-2 p-6">
            {type === "image" ? <Image src={media} alt={title} width={500} height={500} className="rounded-lg" /> : <video src={media} className="rounded-lg" autoPlay loop />}
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}