'use client'
import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { TableData } from '@/app/components/eventDataTable';
import React,{CSSProperties,useState,useEffect} from 'react'


const mainEventData : TableData[] = [
    { title: 'IA dans le journalisme', lieu: 'Dakar', status: 'pas en direct', date: '14/10/2025', heure: '10:00' },
    { title: 'IA dans le journalisme', lieu: 'Bouaké', status: 'pas en direct', date: '14/10/2025', heure: '10:00' },
];

const mainHeaders = [
    { key: 'title', label: 'Titre de l\'evenement', flexBasis: '25%' },
    { key: 'lieu', label: 'lieu', flexBasis: '15%' },
    { key: 'status', label: 'Statut', flexBasis: '15%' },
    { key: 'date', label: 'Date', flexBasis: '15%' },
    { key: 'heure', label: 'heure', flexBasis: '15%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];

const liveEventData : TableData[] = [
    { title: 'IA dans le journalisme', status: 'en direct', url: 'https://ghhddd.com' },
    { title: 'IA dans le journalisme', status: 'en direct', url: 'https://vubu.com' },
];

const liveHeaders = [
    { key: 'title', label: 'Titre de l\'evenement', flexBasis: '40%' },
    { key: 'status', label: 'Statut', flexBasis: '30%' },
    { key: 'url', label: 'Url', flexBasis: '30%' },
];


export default function EventPage(){
    
    const [inputValue, setInputValue] = useState('');
    const [windowWidth, setWindowWidth] = useState(1200);

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

    const headerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: isMobile ? '1rem' : '1.5rem',
        gap: isMobile ? '1rem' : '0',
        padding: isMobile ? '20px' : '40px', 
    }

    const pageContainerStyle: CSSProperties = {
       
        minHeight: '100vh',
    }

    const contentContainerStyle: CSSProperties = {
        padding: isMobile ? '20px' : '40px',
        fontFamily: 'sans-serif',
    }

    const textStyle: CSSProperties = {
        margin: 0,
        fontSize: isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem',
        color:'white' 
    }

    const searchAndTabsStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '20px 0',
        justifyContent: isMobile ? 'center' : 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
    }
    
    const searchBarWrapperStyle: CSSProperties = {
        flexGrow: 1,
        maxWidth: isMobile ? '100%' : '500px',
    }

    const TABS_INACTIVE_COLOR = '#5A8FAC'; 
    const TABS_ACTIVE_COLOR = '#374151';
    
    const tabsStyle: CSSProperties = {
      display: 'flex',
      gap: '0',
      backgroundColor: TABS_INACTIVE_COLOR, 
      borderRadius: '8px', 
      overflow: 'hidden',
      padding: '4px',
};
    
    const tabButtonStyle: CSSProperties = {
      padding: '8px 20px', 
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.2s',
      backgroundColor: 'transparent', 
      color: 'white', 
      borderRadius: '6px', 
    };
    return (
        <div style={pageContainerStyle}>
            <div style={headerStyle}>
                <div>
                    <h1 style={textStyle}>Gestion des Evènements</h1> 
                    <h3 style={{color:'white', fontSize: isMobile ? '0.9rem' : '1rem' }}>Ajouter, modifier et supprimer des évènements</h3>
                </div>
                <ButtonComponent textButton='Ajouter un évènement' size={isMobile ? 'medium' : 'large'} onclick={()=>{}} />
            </div>

            <div style={contentContainerStyle}>
                
                <div style={searchAndTabsStyle}>
                    <div style={searchBarWrapperStyle}>
                        <SearchBarComponent placeholder='Rechercher un évènement....' inputValue={inputValue} setInputValue={setInputValue} />
                    </div>
                    
                    <div style={tabsStyle}>
                        <button style={{
                            ...tabButtonStyle,
                            backgroundColor: TABS_ACTIVE_COLOR, 
                            color: 'white',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.4)', 
                        }}>Liste</button>
    
                        <button style={{
                            ...tabButtonStyle,
                            backgroundColor: 'transparent', 
                            color: 'white',
                        }}>Calendrier</button>
                    </div>
                </div>


                <EventDataTable 
                    tableTitle=""
                    data={mainEventData}
                    columnHeaders={mainHeaders}
                />
                
                <EventDataTable 
                    tableTitle="Evènements en direct"
                    data={liveEventData}
                    columnHeaders={liveHeaders}
                />

            </div>
        </div>
    )
}