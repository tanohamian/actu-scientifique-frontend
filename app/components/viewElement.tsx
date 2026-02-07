/* eslint-disable @next/next/no-img-element */
import IconComponent from "@/app/components/Icons";
import { Article, DbMedia } from "../interfaces";

export interface ViewArticleProps {
    article: Article | DbMedia;
    media?: string
    onclick?: () => void;
}

const getMediaType = (url: string) => {
    if (!url) return 'image';
    const cleanUrl = url.split('?')[0]; // Enlever les paramètres query si présents
    if (cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.mkv') || cleanUrl.endsWith('.webm')) return 'video';
    if (cleanUrl.endsWith('.mp3') || cleanUrl.endsWith('.wav') || cleanUrl.endsWith('.ogg')) return 'podcast';
    return 'image';
};

export default function ViewElement({ article, media, onclick }: ViewArticleProps) {
    if (!article) return null;
    console.log(media)
    const mediaUrl = ('illustrationUrl' in article)
        ? article.illustrationUrl
        : ('url' in article) ? article.url : "";

    const contentText = ('content' in article) ? article.content : "";

    const mediaType = getMediaType(mediaUrl || "");

    return (
        <button
            className="flex flex-col gap-4 p-6 w-full text-left bg-[#406687] rounded-xl hover:bg-[#4a7296] transition-all group"
            onClick={onclick}
        >
            {mediaUrl && (
                <div className="w-full overflow-hidden rounded-lg bg-black/20 aspect-video flex items-center justify-center">
                    {mediaType === 'video' ? (
                        <video
                            src={mediaUrl}
                            controls={false}
                            muted
                            className="w-full h-full object-cover"
                        />
                    ) : mediaType === 'podcast' ? (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-indigo-600 to-[#E85C41] text-white p-4">
                            <IconComponent name="AudioIcon" className="w-16 h-16 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase opacity-70">Podcast</span>
                        </div>
                    ) : (
                        <img
                            src={mediaUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    )}
                </div>
            )}

            <div className="flex flex-col items-start w-full">
                <h1 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {article.title}
                </h1>

                {contentText && (
                    <p className="text-blue-100/80 line-clamp-2 text-sm leading-relaxed">
                        {contentText}
                    </p>
                )}
            </div>
        </button>
    );
}