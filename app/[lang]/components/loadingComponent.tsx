"use client"
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
const customStyles = `
    .custom-select option {
        background-color: #2d4f6b;
        color: white;
    }
    .custom-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

interface LoadingComponentProps{
    isOpen: boolean,
    onClose : () => void
}
export default function LoadingComponent( { isOpen, onClose }:LoadingComponentProps){
    const icon : React.CSSProperties = {
    fontSize: '4em',
    fontWeight: 'lighter',
    color:"#50789B",
    justifyContent: 'center',
    //width: "100vw",
    //height: "100vh",
    paddingLeft: "auto",
    paddingRight: "auto" 
    }
    useEffect(() => {

        }, [isOpen]);
    
        useEffect(() => {
            if (isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return () => {
                document.body.style.overflow = 'unset';
            };
        }, [isOpen]);
    
        if (!isOpen) return null;
    const overlayClasses = "fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 md:p-8";

    const modalClasses = "bg-[#CCCCCC55] rounded-xl p-6 md:p-8 w-full max-w-fit max-h-[90vh] overflow-y-auto relative p-auto";

    return(
    
        <div className={overlayClasses} onClick={onClose}> 
            <div className={modalClasses} onClick={(e) => e.stopPropagation()}>

                <div style={icon} >
                    <FontAwesomeIcon icon={faCircleNotch} spin/>
                </div>
            </div>

            <style jsx global>{customStyles}</style>

        </div>
    )
}