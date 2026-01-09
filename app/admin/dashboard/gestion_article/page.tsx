
'use client'


import SearchBarComponent from '@/app/components/searchBar';
import DataTable, { ElementType } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import Filter, { IFilter } from '@/app/components/filter';
import { Article, ArticleRubriques, DbArticle } from '../newsletters/components/Affichage';
import { AddArticle, DeleteArticle, FetchArticles } from '@/app/actions/ArticleManager';
import FormComponent from '@/app/components/FormComponent';



const ArticleFields: FormFieldConfig[] = [
    { name: 'title', label: "Titre de l'article", placeholder: "Entrez le titre de l'article", required: true },
    { name: 'content', label: 'Contenu', type: 'textarea', required: true },
    { name: 'file', label: "Fichier", placeholder: 'Ajoutez une illustration', type: 'file'},
    { 
        name: 'rubrique', 
        label: 'Rubrique', 
        type: 'select', 
        options: [
            { label: "Santé", value: "une seule santé"},
            { value: 'tech', label: 'Technologie' }, 
            { value: 'éco-humanité', label: 'Éco-humanité' }, 
            { value: "opportunité", label:"Opportunités" }, 
            { label: "Agenda", value: "agenda"},
            { label: "Portraits et découverte", value: "portraits et découvertes"}
        ],
        required: true },

];

const mainHeaders = [
    { key: 'title', label: 'Titre', flexBasis: '38%' },
    { key: 'rubrique', label: 'Rubrique', flexBasis: '20%' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '25%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];


//const TABS_INACTIVE_COLOR = '#5A8FAC'; 

export default function ArticlePage() {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editArticle, setEditArticle] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [filters] = useState<IFilter[]>(mainHeaders.map((header)=>{
      return {value: header.key, label: header.label}
    }))
    const [articles, setArticles] = useState<DbArticle[]>([])  
 
    const pageContainerClasses = `
        font-sans
        h-320
    `;

    const headerClasses = `
        flex 
        flex-col 
        md:flex-row 
        justify-between 
        items-start 
        md:items-center 
        mb-4 
        gap-4 
        md:gap-0
        p-5 
        md:p-10
    `;

    const textClasses = `
        m-0 
        text-2xl 
        md:text-3xl 
        lg:text-4xl 
       font-light
        text-white
    `;

    const subTextClasses = `
        text-white 
        text-sm 
        md:text-base 
        font-light
    `;

    const contentContainerClasses = `
        p-5 
        md:p-10
    `;

    const searchAndTabsClasses = `
        flex 
        flex-col 
        md:flex-row 
        items-center 
        gap-4 
        md:gap-5 
        my-5 
        md:my-8 
        justify-center 
        md:justify-between
    `;
    
    const searchBarWrapperClasses = `
        flex-grow 
        w-full 
        md:max-w-xl
    `;

    const rightSectionClasses = `
        w-full 
        lg:w-1/3 
        h-fit 
        ml-auto
        flex-shrink-0 
        mt-8 
        lg:mt-0 
    `;


    const handleSubmitArticle = async() => {
        const article = new FormData()
        article.append('title', initialData["title"] as string)
        article.append('content', initialData["content"] as string )
        article.append('rubrique', initialData["rubrique"] as string)
        article.append('file', initialData["file"] as File)
        const result = await AddArticle(article, false)
        if (result){
            setArticles(prevState => [...prevState, result]);
        }
        setIsOpen(false);
    };

    let initialData : {[key: string]: string | undefined| File} = {
        title: '',
        content:  '',
        illustationUrl: "https://via.placeholder.com/150",
        createdAt:  (new Date()).toLocaleDateString(),
        rubrique: ArticleRubriques.ECOHUMANITY as string
    };

    const handleEditArticle = async (item: ElementType) => {
        console.log('Editing event:', item);
        setSelectedArticle(item as Article);
        setEditArticle(true);
    };
    const handleDeleteArticle = async (item: ElementType) => {
        console.log('Deleting event:', item);
        setSelectedArticle(item as Article);
        setArticles(articles.filter(newItem => newItem.id !== item.id))
        await DeleteArticle(item.id as string)
    };

    const handleSubmitEditArticle = () => {
        setEditArticle(false);
    };

    if (selectedArticle) {
        initialData = {
            title: selectedArticle.title as string || '',
            content: selectedArticle.content as string || '',
            createdAt: selectedArticle.createdAt as string || '',
            rubrique: selectedArticle.rubrique as ArticleRubriques|| '',
            illustationUrl: selectedArticle.illustrationUrl
        };
    }

    useEffect(() => {
        const fetchArtcicles = async () => {
            try {
                const response = await FetchArticles() as DbArticle[]
                console.log({response})
                if (response) {
                    setArticles(response.map(article =>{
                        const createdAt  = new Date(article.createdAt)
                        article.createdAt = createdAt.toLocaleString("fr")
                            console.log("date de création : ", article.createdAt)
                        return article}))
                }

            } catch (err) {
                console.log("erreur lors de la recuperations des utilisateurs : ", err)
            }
        }
        
        fetchArtcicles()
    }, [])

    return (
        <div className={pageContainerClasses}>
            <div className={headerClasses}>
                <div>
                    <h1 className={textClasses}>Gestion des Articles</h1>
                    <h3 className={subTextClasses}>Gérer les articles depuis cette interface</h3>
                </div>
                {/* <ButtonComponent textButton='Ajouter un article' size='large' onclick={handleArticle} /> */}
            </div>

            <div className={contentContainerClasses}>

                <div className={searchAndTabsClasses}>
                    <div className={searchBarWrapperClasses}>
                        <SearchBarComponent placeholder='Rechercher un media....' inputValue={inputValue} setInputValue={setInputValue} />
                    </div>
                    <Filter
                      filters={filters}
                    />
                </div>
                <article className="flex flex-col lg:flex-row gap-8 h-full" >

                    <DataTable
                        tableTitle=""
                        data={articles}
                        columnHeaders={mainHeaders}
                        handleEditEvent={handleEditArticle}
                        handleDeleteEvent={handleDeleteArticle}
                    />

                  <article className={rightSectionClasses}>
                    <FormComponent 
                        isArticle={true} 
                        initialArticleData={initialData}
                        fields={ArticleFields}
                        onSuccess={handleSubmitArticle}
                    />
                  </article>
                </article>
                
              
            </div>

            <AddElementModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSubmitArticle}
                titleComponent="Ajouter un Article"
                buttonTitle="Ajouter"
                fields={ArticleFields}
                initialData={initialData}
            />

            <AddElementModal
                isOpen={editArticle}
                onClose={() => setEditArticle(false)}
                onSubmit={handleSubmitEditArticle}
                titleComponent="Modifier un article"
                buttonTitle="Modifier"
                fields={ArticleFields}
                initialData={initialData}
            />
        </div>
    );
}