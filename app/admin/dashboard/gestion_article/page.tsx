
'use client'


import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import DataTable, { TableData } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import Filter, { IFilter } from '@/app/components/filter';
import { DbArticle } from '../newsletters/components/Affichage';
import ComponenteFormulaire from '../newsletters/components/ComponenteFormulaire';
import FetchArticles from '@/app/actions/fetchArticles';

const formatTimestampToDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp, 10)); // Convertir la chaîne en nombre puis en objet Date
  
  // Utiliser Intl.DateTimeFormat pour un format Jours/Mois/Année (français)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',

    hour : '2-digit',
    minute: '2-digit'
  }).format(date);
};



const now = Date.now().toString()

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
    { key: 'rubrique', label: 'Rubrique', flexBasis: '15%' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];


//const TABS_INACTIVE_COLOR = '#5A8FAC'; 

export default function ArticlePage() {
  const formattedDatedNow = formatTimestampToDate(now)
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<TableData | null>(null);
    const [viewMode] = useState<'list' | 'calendar'>('list');
    const [filters] = useState<IFilter[]>(mainHeaders.map((header)=>{
      return {value: header.key, label: header.label}
    }))
    const [articles, setArticles] = useState<DbArticle[]>([])  
    const staticArtcles = [
      {
        id: 1,
        title: "L'Avenir du Développement Front-end",
        content: "Photo",
        rubrique: "Technologie",
        createdAt : formattedDatedNow, 
      },
      {
        id: 2,
        title: "Les Avantages Mécano-Quantiques des Puces M3",
        content: "Video",
        rubrique: "Matériel"
      },
      {
        id: 3,
        title: "Le Design System : Un Investissement Essentiel",
        content: "Photo",
        rubrique: "UX/UI Design"
      },
    ]  
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
        ml-auto
        flex-shrink-0 
        mt-8 
        lg:mt-0 
    `;

    //setArticles(staticArtcles)
    const handleEvent = () => {
        setIsOpen(true);
    };

    const handleSubmitEvent = () => {
        setIsOpen(false);
    };

    let initialData = {
        title: '',
        lieu: '',
        date: '',
        heure: '',
        status: '',
    };

    const handleEditEvent = (item: TableData) => {
        console.log('Editing event:', item);
        setSelectedEvent(item);
        setEditEvent(true);
    };

    const handleSubmitEditEvent = () => {
        setEditEvent(false);
    };

    if (selectedEvent) {
        initialData = {
            title: selectedEvent.title as string || '',
            lieu: selectedEvent.lieu as string || '',
            date: selectedEvent.date as string || '',
            heure: selectedEvent.heure as string || '',
            status: selectedEvent.status as string || '',
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
                <ButtonComponent textButton='Ajouter un article' size='large' onclick={handleEvent} />
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
                            <DataTable
                                tableTitle=""
                                data={articles}
                                columnHeaders={mainHeaders}
                                handleEditEvent={handleEditEvent}
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
                onSubmit={handleSubmitEvent}
                titleComponent="Ajouter un Article"
                buttonTitle="Ajouter"
                fields={ArticleFields}
                initialData={initialData}
            />

            <AddElementModal
                isOpen={editEvent}
                onClose={() => setEditEvent(false)}
                onSubmit={handleSubmitEditEvent}
                titleComponent="Modifier un média"
                buttonTitle="Modifier"
                fields={ArticleFields}
                initialData={initialData}
            />
        </div>
    );
}