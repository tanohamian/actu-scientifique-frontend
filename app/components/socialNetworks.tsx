'use client'
import { FeedInterface } from "../(user)/page";
import IconComponent, { IconName } from "./Icons"


export default function SocialNetworks({
    name,
    className = "",
    feed
}: {
    name: IconName,
    className?: string,
    feed?: FeedInterface
}) {

    const isDirectVideo = feed?.url.match(/\.(mp4|webm|ogg)$/i);
    const isDirectImage = feed?.url.match(/\.(jpeg|jpg|gif|png|webp)$/i);

    const isYouTube = feed?.type.toLowerCase() === 'youtube' || feed?.url.includes('youtube.com') || feed?.url.includes('youtu.be');

    const renderMedia = () => {
        if (!feed) return null;

        if (isYouTube) {
            const videoId = feed.url.split('v=')[1]?.split('&')[0] || feed.url.split('/').pop();
            return (
                <div className="w-full aspect-video rounded-md overflow-hidden mb-3 shadow-inner bg-black">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="w-full h-full"
                        allowFullScreen
                    />
                </div>
            );
        }

        if (isDirectVideo) {
            return (
                <div className="w-full aspect-video rounded-md overflow-hidden mb-3 bg-black">
                    <video controls className="w-full h-full object-cover">
                        <source src={feed.url} type={`video/${isDirectVideo[1]}`} />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                </div>
            );
        }

        if (isDirectImage) {
            return (
                <div className="w-full aspect-square md:aspect-video rounded-md overflow-hidden mb-3">
                    <img
                        src={feed.url}
                        alt={feed.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            );
        }

        return (
            <div className="w-full h-24 bg-white/5 rounded-md mb-3 flex items-center justify-center border border-white/10 italic text-white/40 text-xs px-4 text-center">
                Cliquez pour voir le contenu sur {feed.type}
            </div>
        );
    };

    return (
        <div className={`w-full bg-[#5A8FAC]/50 hover:bg-[#5A8FAC]/70 transition-all duration-300 rounded-xl p-4 flex flex-col group ${className}`}>
            {renderMedia()}

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <IconComponent
                            name={name}
                            className="w-5 h-5 text-white"
                        />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest opacity-70">
                            {feed?.type || name.replace('Icon', '')}
                        </span>
                        <h4 className="text-white text-sm font-semibold truncate">
                            {feed?.title || "Rejoignez-nous"}
                        </h4>
                    </div>
                </div>

                {feed?.description && (
                    <p className="text-white/70 text-xs line-clamp-2 mt-1">
                        {feed.description}
                    </p>
                )}

                <button
                    onClick={() => feed?.url && window.open(feed.url, '_blank')}
                    className="mt-3 w-full py-2 bg-white text-[#50789B] rounded-lg text-xs font-bold hover:bg-opacity-90 transition-colors"
                >
                    Voir la publication
                </button>
            </div>
        </div>
    )
}