import IconComponent from "@/app/components/Icons";
import { Article } from "@/app/interfaces";


export interface ViewArticleProps {
    article: Article
    onclick?: () => void;
}

const getMediaType = (url: string) => {
    if (url.endsWith('.mp4') || url.endsWith('.mkv') || url.endsWith('.webm')) return 'video';
    if (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg')) return 'podcast';
    return 'image';
};


export default function ViewArticleElement({ article, onclick }: ViewArticleProps) {
    return (
        <button className="flex flex-col gap-4 p-6 w-full text-left bg-[#406687] rounded-xl hover:bg-[#4a7296] transition-all" onClick={onclick}>

            {article.illustrationUrl && (
                <div className="w-full overflow-hidden rounded-lg bg-black/10">
                    {getMediaType(article.illustrationUrl) === 'video' ? (
                        <video
                            src={article.illustrationUrl}
                            controls={false}
                            muted
                            className="w-full h-64 object-cover"
                        />
                    ) : getMediaType(article.illustrationUrl) === 'podcast' ? (
                        <div className="flex flex-col items-center justify-center h-48 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
                            <IconComponent name="AudioIcon" className="w-12 h-12 mb-2" />
                            <audio src={article.illustrationUrl} controls className="w-full mt-2" />
                        </div>
                    ) : (
                        <img
                            src={article.illustrationUrl}
                            alt={article.title}
                            className="w-full h-64 object-cover"
                        />
                    )}
                </div>
            )}

            <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold text-white mb-2">{article.title}</h1>
                <p className="text-blue-100 line-clamp-3 text-sm leading-relaxed">{article.content}</p>
            </div>
        </button>
    );
}