'use client';
import ButtonComponent from '@/app/components/button';
import InputAndTitleComponent from '@/app/components/inputvalueAndTitle';
import SearchBarComponent from '@/app/components/searchBar';
import React, { useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import { CreateFeed, DeleteFeed, GetFeeds, UpdateFeed } from '@/app/actions/FeedManager';
import { FeedInterface } from '@/app/interfaces';



const filActuFiels: FormFieldConfig[] = [
    { name: 'title', label: 'Titre', type: 'text', placeholder: 'Ecrivez le titre', required: true },
    { name: 'url', label: 'Lien', type: 'text', placeholder: 'http:exemple.com', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Entrez une brève description', required: false },
    {
        name: 'type', label: 'Type', type: 'select', options: [
            { value: 'facebook', label: 'Facebook' },
            { value: 'twitter', label: 'Twitter' },
            { value: 'youtube', label: 'Youtube' }
        ], required: true
    }

];

export default function FilActualite() {
    const [inputValue, setInputValue] = useState<string>('');
    const [formData, setFormData] = useState<FeedInterface>({
        title: '',
        url: '',
        description: '',
        type: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [feedData, setFeedData] = useState<FeedInterface[]>([])


    const [editActu, setEditActu] = useState(false);
    const [selectedActu, setSelectedActu] = useState<FeedInterface | null>(null);

    const handleChange = (field: keyof FeedInterface, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };



    const handleEditActu = (data: FeedInterface) => {
        setSelectedActu(data);
        setEditActu(true);
    };

    const handleDeleteActu = async (data: FeedInterface) => {
        try {
            const response = await DeleteFeed(data)
            if (data && response) {
                setFeedData((prevFeed) => prevFeed.filter((feed) => feed.id !== data.id))
            }
        } catch (error) {
            console.log("erreur suppression feed : ", error)
        }
    };

    const handleSubmitEditFilActu = async (formData: FeedInterface) => {
        try {
            if (!selectedActu) {
                console.log("Aucun feed selectionne")
                return;
            }
            const response = await UpdateFeed(selectedActu.id || '', formData)
            if (response && response.feed) {
                setFeedData((prevFeed) => prevFeed.map((feed) => feed.id === response.feed.id ? response.feed : feed))
            }
            setEditActu(false);
            setSelectedActu(null);
        } catch (error) {
            console.log("erreur récupération feed : ", error)
        }

    };

    let initialData = {};

    if (selectedActu) {
        initialData = {
            title: selectedActu.title,
            url: selectedActu.url,
            description: selectedActu.description,
            type: selectedActu.type,
        };
    }



    const handleSubmitAddFilActu = async (formData: FeedInterface) => {
        try {
            const response = await CreateFeed(formData)
            if (response && response.feed) {
                setFeedData((prevFeed) => [...prevFeed, response.feed])
            }

        } catch (error) {
            console.log("error : ", error)
        }
    }

    const containerClasses = `
        m-0 
        flex 
        flex-col 
        p-5 
        md:p-10 
        lg:p-16 
        font-sans
    `;

    const firstInputClasses = `
        flex 
        flex-col 
        md:flex-row 
        gap-3 
        md:gap-5 
        mt-5
    `;

    const inputWrapperClasses = `
        flex-1 
        w-full 
        md:w-auto
    `;

    const footerInputClasses = `
        flex 
        flex-col 
        md:flex-row 
        gap-3 
        md:gap-5 
        mt-5 
        items-start 
        md:items-end 
        justify-start
    `;

    const typeInputWrapperClasses = `
        w-full 
        md:w-1/2 
        flex-shrink-0
    `;

    const buttonClasses = `
        w-full 
        md:w-2/5 
        lg:w-40
    `;

    const listActuClasses = `
        p-5 
        md:p-10 
        bg-[#5A8FAC] 
        text-white 
        min-h-screen 
        mt-10 
        rounded-xl
    `;

    const headerFileActuClasses = `
        flex 
        flex-wrap 
        md:flex-nowrap 
        justify-between 
        items-center 
        mb-8 
        gap-4 
        md:gap-0
    `;

    const headerCellClasses = `
        hidden 
        md:flex 
        py-2 
        border-b 
        border-white/40 
        font-bold 
        text-sm 
        lg:text-base 
        uppercase
    `;

    const rowClasses = `
        flex 
        flex-col 
        md:flex-row 
        py-3 
        md:py-4 
        border-b 
        border-white/20 
        items-start 
        md:items-center
    `;

    const titleColumnClasses = `
        basis-full 
        md:basis-1/2 
        break-words 
        text-sm 
        md:text-base
    `;

    const urlColumnClasses = `
        basis-full 
        md:basis-2/5 
        break-all 
        text-xs 
        md:text-sm 
        opacity-80 
        md:opacity-100 
        mt-1 
        md:mt-0 
        hover:underline
    `;

    const actionsColumnClasses = `
        basis-full 
        md:basis-1/10 
        flex 
        gap-4 
        md:gap-3 
        justify-end 
        md:justify-start 
        mt-2 
        md:mt-0
    `;

    const iconButtonClasses = `
        bg-transparent 
        border-none 
        cursor-pointer 
        p-1 
        flex 
        items-center 
        justify-center 
        transition-transform 
        duration-200 
        text-white 
        hover:scale-110
    `;

    const iconClasses = `
        h-4 
        w-4 
        md:h-5 
        md:w-5 
        opacity-80
    `;

    const selectTypeClasses = `
        w-full 
        p-3 
        md:p-3.5 
        border 
        border-gray-300 
        bg-[#5A8FAC] 
        rounded-md 
        md:rounded-lg 
        text-white 
        text-sm 
        md:text-base 
        outline-none 
        box-border
    `;

    // Classes de titre
    const mainTitleClasses = `text-2xl md:text-3xl font-light`;
    const subTitleClasses = `text-lg md:text-xl font-light`;


    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const response = await GetFeeds()
                if (response) {
                    setFeedData(response)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])


    const filteredAndSortedData = feedData.filter(feed =>
        feed && (feed?.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
            feed?.url?.toLowerCase().includes(inputValue.toLowerCase())
        )
    )

    return (
        <div className={containerClasses}>

            <div className='text-white mb-5 md:mb-8'>
                <h1 className={mainTitleClasses}>{"Gestion du fil d'actualité"}</h1>
                <h3 className={subTitleClasses}>{"Gérer vos fils d'actualité"}</h3>
            </div>

            {/* Section Ajout d'actualité */}
            <div>
                <div className={firstInputClasses}>
                    <div className={inputWrapperClasses}>
                        <InputAndTitleComponent
                            titleInput='Titre'
                            typeInput='text'
                            placeholderInput='Ecrivez le titre'
                            inputValue={formData?.title || ''}
                            setInputValue={(newValue) => handleChange('title', newValue)}
                        />
                    </div>
                    <div className={inputWrapperClasses}>
                        <InputAndTitleComponent
                            titleInput='Lien'
                            typeInput='text'
                            placeholderInput='http:exemple.com'
                            inputValue={formData?.url || ''}
                            setInputValue={(newValue) => handleChange('url', newValue)}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <InputAndTitleComponent
                        titleInput='Description'
                        typeInput='textarea'
                        placeholderInput='Entrez une brève description'
                        inputValue={formData?.description || ''}
                        setInputValue={(newValue) => handleChange('description', newValue)}
                    />
                </div>

                <div className={footerInputClasses}>
                    <div className={typeInputWrapperClasses}>
                        <h3 className="text-white mb-2 text-base md:text-lg">Type</h3>
                        <select
                            className={selectTypeClasses}
                            onChange={e => handleChange('type', e.target.value)}
                            value={formData.type}
                        >
                            <option value="" disabled>Sélectionner un type</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter</option>
                            <option value="youtube">Youtube</option>
                        </select>
                    </div>

                    <div className={buttonClasses}>
                        <ButtonComponent textButton='Ajouter' size='medium' onclick={() => handleSubmitAddFilActu(formData)} />
                    </div>
                </div>
            </div>

            <div className={listActuClasses}>

                <div className={headerFileActuClasses}>
                    <div className="flex flex-col w-full md:w-auto">
                        <h3 className="m-0 text-xl md:text-2xl font-semibold">{"fil d'actualité"}</h3>
                    </div>
                    <div className="w-full md:w-1/2">
                        <SearchBarComponent
                            placeholder="Rechercher par titre....."
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                    </div>
                </div>

                <div className={headerCellClasses}>
                    <div className="w-1/2">Titres</div>
                    <div className="w-2/5">Urls</div>
                    <div className="w-1/10 pl-3">Actions</div>
                </div>

                {isLoading ? (
                    <div>
                        <p>Chargement...</p>
                    </div>
                ) :
                    feedData.length < 0 ? (
                        <div>
                            <p>Aucune feed</p>
                        </div>
                    ) : (
                        filteredAndSortedData.map((item, index) => (
                            <div key={index} className={rowClasses}>
                                <div className={titleColumnClasses}>
                                    {item.title}
                                </div>

                                <div className={urlColumnClasses}>
                                    <span className="md:hidden font-bold mr-1">URL:</span>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white no-underline">
                                        {item.url}
                                    </a>
                                </div>

                                <div className={actionsColumnClasses}>
                                    <button className={iconButtonClasses} onClick={() => handleEditActu(item)}>
                                        <Pencil className={iconClasses} />
                                    </button>
                                    <button className={iconButtonClasses} onClick={() => handleDeleteActu(item)}>
                                        <Trash2 className={iconClasses} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
            </div>

            <AddElementModal
                isOpen={editActu}
                onClose={() => setEditActu(false)}
                onSubmit={handleSubmitEditFilActu}
                titleComponent="Modifier Informations"
                buttonTitle="Modifier"
                fields={filActuFiels}
                initialData={initialData}
            />
        </div>
    );
}
