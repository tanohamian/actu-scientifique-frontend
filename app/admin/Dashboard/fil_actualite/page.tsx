'use client';
import ButtonComponent from '@/app/components/button';
import InputAndTitleComponent from '@/app/components/inputvalueAndTitle';
import SearchBarComponent from '@/app/components/searchBar';
import React, { CSSProperties, useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';



interface FormData {
    title: string;
    url: string;
    description: string;
    type: string;
}

const filActuFiels : FormFieldConfig[] = [
    { name: 'title', label: 'Titre', type: 'text', placeholder: 'Ecrivez le titre', required: true },
    { name: 'url', label: 'Lien', type: 'text', placeholder: 'http:exemple.com', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Entrez une brève description', required: false },
    { name: 'type', label: 'Type', type: 'select', options: [
        { value: 'facebook', label: 'Facebook' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'youtube', label: 'Youtube' }
    ], required: true
    }

]



export default function FilActualite(){

    const [windowWidth, setWindowWidth] = useState(1200);
    const [inputValue, setInputValue] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
      title: '',
      url: '',
      description: '',
      type:''
    })

    const [editActu, setEditActu] = useState(false);
    const [selectedActu, setSelectedActu] = useState<any>(null);

    

    const MOBILE_BREAKPOINT = 768;
    const TABLET_BREAKPOINT = 1024;

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
        
    const isMobile = windowWidth < MOBILE_BREAKPOINT;
    const isTablet = windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT;

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prevData => ({
            ...prevData, 
            [field]: value 
        }));
    };

    const containerStyle : CSSProperties = {
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        padding: isMobile ? '20px' : '40px', 
        fontFamily: 'sans-serif',
    }

    const firstInputStyle : CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '10px' : '20px',
        marginTop: '20px',
    }

    const inputWrapperStyle : CSSProperties = {
        flex: isMobile ? 'none' : 1, 
    }

    const footerInputStyle : CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '10px' : '20px',
        marginTop: '20px',
        alignItems: 'flex-end',
        justifyContent: 'flex-start', 
    }
    
    const typeInputWrapperStyle: CSSProperties = {
        width: isMobile ? '100%' : '50%',
        flexShrink: 0
    }

    
    const buttonStyle: CSSProperties = {
        width: isMobile ? '100%' : '40%', 
    }

    


    


    const data = [
        { title: 'les consequences de  la deforestation',url: 'https://www.example.com/meningite'},
        { title: 'les consequences de  la deforestation',url: 'https://www.example.com/meningite'},
        { title: 'les consequences de  la deforestation',url: 'https://www.example.com/meningite'},
        { title: 'les consequences de  la deforestation',url: 'https://www.example.com/meningite'},
        { title: 'les consequences de  la deforestation',url: 'https://www.example.com/meningite'},
        { title: 'les consequences de  la deforestation',url: 'https://www.example.com/meningite'}
    ]

    const listActuStyle: CSSProperties = {
        padding: '40px',
        backgroundColor: '#5A8FAC', 
        color: 'white',
        minHeight: '100vh',
    };

    
    

   const headerCellStyle: CSSProperties = {
        display: isMobile ? 'none' : 'flex', 
        padding: '10px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
    };

    const rowStyle: CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', 
        padding: isMobile ? '10px 0' : '15px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        alignItems: isMobile ? 'flex-start' : 'center',
    };

   const titleColumnStyle: CSSProperties = {
        flexBasis: isMobile ? '100%' : '50%', 
        wordBreak: 'break-word', 
    };
    
    const dateColumnStyle: CSSProperties = {
        flexBasis: isMobile ? '100%' : '30%', 
        wordBreak: 'break-all', 
        fontSize: isMobile ? '0.75rem' : '0.9rem', 
        opacity: isMobile ? 0.8 : 1,
    };
    
    const actionsColumnStyle: CSSProperties = {
        flexBasis: isMobile ? '100%' : '20%', 
        display: 'flex',
        gap: isMobile ? '20px' : '15px',
        justifyContent: isMobile ? 'flex-end' : 'flex-start', 
        marginTop: isMobile ? '10px' : '0', 
    };
    const iconStyle: CSSProperties = {
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'opacity 0.2s',
        height: isMobile ? '16px' : '20px',
        width: isMobile ? '16px' : '20px',
    };

    const headerFileActuStyle: CSSProperties = {
    display: 'flex',
    flexWrap: isMobile ? 'wrap' : 'nowrap', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    gap: isMobile ? '15px' : '0', 
};
    
    const titleContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };
    const iconButtonStyle: CSSProperties = {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease-in-out',
            color: 'white',
        };

    const selectTypeStyle: CSSProperties = {
        width: '100%',
        padding: isMobile ? '0.75rem' : '0.8rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#D1D5DB', 
        backgroundColor: '#5A8FAC', 
        borderRadius: isMobile ? '0.375rem' : '0.5rem',
        color: 'white',
        fontSize: isMobile ? '0.875rem' : '1rem',
        outline: 'none',
        fontFamily: 'sans-serif',
        boxSizing: 'border-box',
    }


    const handleEditActu = (data:any) => {
        setSelectedActu(data);
        setEditActu(true);
    }

    const handleDeleteActu = (data:any) => {
    }

    const handleSubmitEditFilActu = ()=>{
        setEditActu(false);
    }

    let initialData = {}

    if (selectedActu) {
        initialData = {
            title: selectedActu.title,
            url: selectedActu.url,
         }
    }

    return (
        <div style={containerStyle}>
            
            <div style={{color: 'white', marginBottom: '20px'}}>
              <h1>Gestion du fil d'actualité</h1>
              <h3>Gérer vos fils d'actualité</h3>
            </div>

            <div>
              <div style={firstInputStyle}>
                  <div style={inputWrapperStyle}>
                    <InputAndTitleComponent titleInput='Titre' typeInput='text' placeholderInput='Ecrivez le titre' inputValue={formData.title} setInputValue={(newValue)=>handleChange('title',newValue)}/>
                  </div>
                  <div style={inputWrapperStyle}>
                    <InputAndTitleComponent titleInput='Lien' typeInput='text' placeholderInput='http:exemple.com' inputValue={formData.url} setInputValue={(newValue)=>handleChange('url',newValue)}/>
                  </div>
              </div>
              
              <div style={{marginTop: '20px'}}>
                  <InputAndTitleComponent 
                    titleInput='Description' 
                    typeInput='textarea' 
                    placeholderInput='Entrez une brève description' 
                    inputValue={formData.description} 
                    setInputValue={(newValue)=>handleChange('description',newValue)}/>
              </div>


              <div style={footerInputStyle}>
                    
                <div style={typeInputWrapperStyle}>
                    <select style={selectTypeStyle} 
                        onChange={e=>handleChange('type', e.target.value)}
                        >
                        <option value="" selected>Type</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                        <option value="youtube">Youtube</option>
                    </select>
                </div>
                
                <div style={buttonStyle}>
                    <ButtonComponent textButton='Ajouter' size={isMobile ? 'small' : 'medium'} onclick={() => { }} />
                </div>
              </div>

            </div>

        <div style={listActuStyle}>
            
               <div style={headerFileActuStyle}>
                <div style={isMobile ? { width: '100%' } : titleContainerStyle}>
                    <h3 style={{ margin: 0, fontSize: isMobile ? '1.5rem' : '1.8rem' }}>fil d'actualité</h3>
                </div>
                <div style={{ width: isMobile ? '100%' : '50%'}}> 
                    <SearchBarComponent 
                        placeholder="Rechercher par titre....." 
                        inputValue={inputValue} 
                        setInputValue={setInputValue} 
                    />
                </div>
            </div>

            
            <div style={headerCellStyle}>
                <div style={titleColumnStyle}>Titres</div>
                <div style={dateColumnStyle}>Urls</div>
                <div style={actionsColumnStyle}>Actions</div>
            </div>

               {
                data.map((data, index) => (
                    <div key={index} style={rowStyle}>
                        <div style={titleColumnStyle}>
                            {data.title}
                        </div>
                        
                    <div style={dateColumnStyle}>
                        {isMobile && <span style={{ fontWeight: 'bold', marginRight: '5px' }}>URLS:</span>}
                        <a href={data.url} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                            {data.url}
                        </a>
                    </div>
                
                    <div style={actionsColumnStyle}>
                        <button style={iconButtonStyle} onClick={()=>handleEditActu(data)}>
                            <Pencil style={iconStyle} />
                        </button>
                        <button style={iconButtonStyle} onClick={()=>handleDeleteActu(data)}>
                            <Trash2 style={iconStyle} />
                        </button>
                    </div>
                </div>
            ))
        }
                
                


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
    )
}