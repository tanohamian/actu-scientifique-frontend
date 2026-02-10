/* eslint-disable @next/next/no-img-element */
'use client'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FetchArticleById } from "@/app/actions/ArticleManager"
import { Article, DbMedia } from "@/app/interfaces"
import { FetchMediaById } from "@/app/actions/MediasManager"
import LoginRegisterComponent from "@/app/components/login_register_Component"
import { InputsProps } from "../layout"
import { ArticleDisplay } from "@/app/components/viewElement"


export default function DetailsArticle() {
    const params = useParams()
    const router = useRouter()
    const articleId = params.id as string

    const [article, setArticle] = useState<Article | null>(null)
    const [media, setMedia] = useState<DbMedia | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const inputs: InputsProps[] = [
        { typeInput: 'email', placeholderInput: 'Email', inputValue: email, setInputValue: setEmail },
        { typeInput: 'password', placeholderInput: 'Mot de passe', inputValue: password, setInputValue: setPassword },
    ];
    const inputsRegister: InputsProps[] = [
        { typeInput: 'text', placeholderInput: 'Nom', inputValue: firstName, setInputValue: setFirstName },
        { typeInput: 'text', placeholderInput: 'Prenom', inputValue: lastName, setInputValue: setLastName },
        { typeInput: 'email', placeholderInput: 'Email', inputValue: email, setInputValue: setEmail },
        { typeInput: 'password', placeholderInput: 'Mot de passe', inputValue: password, setInputValue: setPassword },
        { typeInput: 'password', placeholderInput: 'Confirmer le mot de passe', inputValue: confirmPassword, setInputValue: setConfirmPassword },
    ];

    useEffect(() => {
        const loadContent = async () => {
            if (!articleId) return
            setIsLoading(true)
            try {
                const [resArticle, resMedia] = await Promise.all([
                    FetchArticleById(articleId),
                    FetchMediaById(articleId)
                ])

                if (resArticle) setArticle(resArticle)
                if (resMedia) setMedia(resMedia)
            } catch (error) {
                console.error("Erreur lors du chargement du contenu:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadContent()
    }, [articleId])

    const activeContent = article || media

    const displayUrl = article ? article.illustrationUrl : media?.url
    const isVideo = media?.type === 'video' || displayUrl?.match(/\.(mp4|mkv|webm)$/i)
    const textContent = article ? article.content : media?.description

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Chargement...</div>
    }

    if (!activeContent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
                <p>Contenu non trouvé</p>
                <button onClick={() => router.back()} className="underline hover:text-gray-400">Retour</button>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-10 px-4 md:px-10 lg:px-20">
            <button
                onClick={() => router.back()}
                className="text-white hover:text-gray-400 mb-8 flex items-center gap-2 transition-colors group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour
            </button>

            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                <header>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                        {activeContent.title}
                    </h1>
                    <div className="mt-4 flex gap-4 text-sm text-gray-400 uppercase tracking-widest">
                        <span>{new Date(activeContent?.createdAt as Date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    </div>
                </header>

                <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10 bg-white/5">
                    {isVideo ? (
                        <video
                            src={displayUrl}
                            className="w-full h-auto max-h-[600px]"
                            controls
                            autoPlay
                            loop
                            muted
                        />
                    ) : (
                        <img
                            src={displayUrl}
                            alt={activeContent.title}
                            className="w-full h-auto max-h-[600px] object-cover"
                        />
                    )}
                </div>

                <article className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-3xl shadow-inner relative">
                    <div className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-6">
                        {textContent  ? (
                           ArticleDisplay({ htmlContent: textContent })
                        ) : (
                            <p className="italic text-white">Aucune description disponible.</p>
                        )}
                    </div>

                    {activeContent.withToken === false && (
                        <div className="mt-10 p-8 rounded-2xl bg-gradient-to-t from-blue-900/40 to-transparent border-t border-blue-500/30 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Envie d'en savoir plus ?</h3>
                            <p className="text-gray-300 mb-6">
                                La suite de ce contenu est réservée aux membres de la communauté ActuScientifique.
                            </p>
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
                            >
                                Se connecter pour lire la suite
                            </button>
                        </div>
                    )}
                </article>
            </div>
            {isLoginOpen && (
                <LoginRegisterComponent type='login' title='Connexion' inputs={inputs} onClose={() => setIsLoginOpen(false)}
                    onSubmit={() => { setIsLoginOpen(false); setIsRegisterOpen(true) }} />
            )}
            {isRegisterOpen && (
                <LoginRegisterComponent type='register' title='Inscription' inputs={inputsRegister} onClose={() => setIsRegisterOpen(false)}
                    onSubmit={() => { setIsRegisterOpen(false); setIsLoginOpen(true) }} />
            )}
        </div>
    )
}