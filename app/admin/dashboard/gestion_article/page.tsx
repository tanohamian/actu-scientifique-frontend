
'use client'


import SearchBarComponent from '@/app/components/searchBar';
import DataTable, { ElementType } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig, InitialDataType } from '@/app/components/addElement';
import Filter, { IFilter } from '@/app/components/filter';
import { Article, DbArticle } from '../newsletters/components/Affichage';
import { DeleteArticle, FetchArticles } from '@/app/actions/ArticleManager';
import FormComponent from '@/app/components/FormComponent';
import { Rubriques } from '@/app/enum/enums';



const ArticleFields: FormFieldConfig[] = [
    { name: 'title', label: "Titre de l'article", placeholder: "Entrez le titre de l'article", required: true },
    { name: 'content', label: 'Contenu', type: 'textarea', required: true },
    { name: 'file', label: "Image", placeholder: 'Ajoutez une illustration', type: 'file' },
    {
        name: 'rubrique',
        label: 'Rubrique',
        type: 'select',
        options: [
            { label: "Santé", value: Rubriques.ONE_HEALTH },
            { label: 'Technologie', value: Rubriques.TECHNOLOGY },
            { label: 'Éco-humanité', value: Rubriques.ECO_HUMANITY },
        ],
        required: true
    },
    { name: 'une', label: 'Mettre à la une', type: "select", options: [
        { label: "Oui", value: 1 },
        { label: "Non", value: 0 }
    ]}

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
    const [filters] = useState<IFilter[]>(mainHeaders.map((header) => {
        return { value: header.key, label: header.label }
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

    //const [article, setArticle] = useState<DbArticle>();

    const handleSubmitArticle = (newArticle?: DbArticle) => {
        console.log({ newArticle })
        if (!newArticle) {
            alert("Aucun article à ajouter")
            return
        }
        setArticles(prevState => [...prevState, newArticle]);
        setIsOpen(false);
    };

    let initialData: InitialDataType = {
        title: '',
        content: '',
        illustationUrl: "https://via.placeholder.com/150",
        createdAt: (new Date()).toLocaleDateString(),
        rubrique: Rubriques.TECHNOLOGY as string
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

    const handleSubmitEditArticle = async () => {
        setEditArticle(false);
    };

    if (selectedArticle) {
        initialData = {
            title: selectedArticle.title as string || '',
            content: selectedArticle.content as string || '',
            createdAt: selectedArticle.createdAt as string || '',
            rubrique: selectedArticle.rubrique as Rubriques || '',
            illustationUrl: selectedArticle.illustrationUrl
        };
    }

    useEffect(() => {
        const fetchArtcicles = async () => {
            try {
                const response = await FetchArticles() as DbArticle[]
                console.log({ response })
                if (response) {
                    setArticles(response.map(article => {
                        const createdAt = new Date(article.createdAt)
                        article.createdAt = createdAt.toLocaleString("fr")
                        console.log("date de création : ", article.createdAt)
                        return article
                    }))
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
                        //setter={setArticle}
                        />
                    </article>
                </article>


            </div>

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