"use client"
import React, { useRef, useState } from 'react';
// 1. IMPORTER LE MODULE SCSS
import styles from "@styles/FileUpload.module.scss" 

import image from "@public/images/Picture.svg"
import Image from 'next/image';


const FileUpload = (): React => {
    const fileInputRef = useRef<HTMLButtonElement>(null);
    const [fileName, setFileName] = useState(null); 

    const handleButtonClick = () => {
        // Déclenche l'ouverture de la boîte de dialogue de sélection de fichiers
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            setFileName(file.name);
            // Logique d'upload ici...
        }
    };
    
    return (
        <div className={styles.fileUploadContainer}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className={styles.fileInput}
            />

            <div 
                onClick={handleButtonClick}
                className={styles.iconContainer}
                title="Cliquer pour téléverser une image"
            >
                <image  className={styles.uploadIcon}  />
                {/*<Image 
                    src={image}
                    alt="Icône Téléverser une image" 
                    // Utilisation de styles.uploadIcon
                    
                    
                />*/}
                
            </div>
            
            <span className={styles.fileName}>
                {fileName}
            </span>
        </div>
    );
};

export default FileUpload;