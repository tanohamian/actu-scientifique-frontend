import Image, { StaticImageData } from "next/image";



export interface ViewElementProps {
    media: string;
    title: string;
    type?: "video" | "image";
    description: string;
    onclick?: () => void;
}


export default function ViewElement({ media, title, type, description, onclick }: ViewElementProps) {
    return (
        <button className="flex flex-col gap-2 p-6" onClick={onclick}>
            {type === "image" ? <Image src={media} alt={title} width={500} height={500} className="rounded-lg" /> : <video src={media} className="rounded-lg" autoPlay loop />}
            <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-gray-600">{description}</p>
            </div>
        </button>
    );
}