// app/admin/dashboard/gestion_article/ArticleClientPage.tsx

'use client'

import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import ArticleDataTable, { ElementType } from '@/app/components/eventDataTable';
import React, { useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import Filter, { IFilter } from '@/app/components/filter';
import { Article } from '../newsletters/components/Affichage';
import ComponenteFormulaire from '../newsletters/components/ComponenteFormulaire';
interface ArticleClientPageProps {
  initialArticles: Article[];
}

const ArticleFields: FormFieldConfig[] = [
    { name: 'title', label: "Titre de l'article", type: 'text', placeholder: "Entrez le titre de l'article", required: true },
    { name: 'content', label: 'Contenu', type: 'text', required: true },
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
    { key: 'type', label: 'Type', flexBasis: '12%' },
    { key: 'rubrique', label: 'Categorie', flexBasis: '15%' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];


export default function ArticleClientPage({ initialArticles }: ArticleClientPageProps) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editArticle, setEditArticle] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [viewMode] = useState<'list' | 'calendar'>('list');
    
    const [articles] = useState<Article[]>(initialArticles) 

    const [filters] = useState<IFilter[]>(mainHeaders.map((header)=>{
      return {value: header.key, label: header.label}
    }))
    

    const handleArticle = () => {
        setIsOpen(true);
    };

    const handleSubmitArticle = () => {
        setIsOpen(false);
    };

    let initialData = {
        title: '',
        content: '',
        createdAt: '',
        rubrique: '',
    };

    const handleEditArticle = (item: ElementType) => {
        console.log('Editing event:', item);
        setSelectedArticle(item as Article);
        setEditArticle(true);
    };

    const handleSubmitEditArticle = () => {
        setEditArticle(false);
    };

    if (selectedArticle) {
        initialData = {
            title: selectedArticle.title as string || '',
            content: selectedArticle.content as string || '',
            createdAt: selectedArticle.createdAt as string || '',
            rubrique: selectedArticle.rubrique as string || '',
        };
    }

    const pageContainerClasses = `
        min-h-screen 
        font-sans
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
        flex-shrink-0 
        mt-8 
        lg:mt-0 
    `;
    return (
        <div className={pageContainerClasses}>
            <div className={headerClasses}>
                <div>
                    <h1 className={textClasses}>Gestion des Articles</h1>
                    <h3 className={subTextClasses}>Gérer les posdcasts et les videos depuis cette interface</h3>
                </div>
                <ButtonComponent textButton='Ajouter un article' size='large' onclick={handleArticle} />
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
                <article className="flex flex-col lg:flex-row gap-8" >
                  {
                    viewMode === 'list' ? (
                        <>
                            <ArticleDataTable
                                tableTitle=""
                                data={articles || []}
                                columnHeaders={mainHeaders}
                                handleEditEvent={handleEditArticle}
                            />
                        </>
                    ) : null
                  }
                  <article className={rightSectionClasses}>
                    <ComponenteFormulaire isArticle={true}/>
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
                titleComponent="Modifier un média"
                buttonTitle="Modifier"
                fields={ArticleFields}
                initialData={initialData}
            />
        </div>
    );
}