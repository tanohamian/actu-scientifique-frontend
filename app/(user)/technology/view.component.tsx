import { Article } from "@/app/admin/dashboard/newsletters/components/Affichage";



export interface ViewArticleProps {
    article : Article
    onclick?: () => void;
}


export default function ViewArticleElement({ article, onclick }: ViewArticleProps) {
    return (
        <button className="flex flex-col gap-2 p-6" onClick={onclick}>
            {article.illustrationUrl ? <img src={article.illustrationUrl} alt={article.title} width={500} height={500} className="rounded-lg" /> : null}
            <div className="flex flex-col items-start">
                <h1 className={article.rubrique ? "text-2xl font-bold text-white" : "text-2xl font-bold"}>{article.title}</h1>
                <p className={article.rubrique ? "text-gray-600 line-clamp-2 text-white" : "text-gray-600 line-clamp-2"}>{article.content}</p>
            </div>
        </button>
    );
}