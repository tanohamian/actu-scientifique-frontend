"use client"
import React, { useRef, useState } from 'react';
// 1. IMPORTER LE MODULE SCSS
import styles from "@styles/FileUpload.module.scss" 

import Imagelement from "@public/images/Picture.svg"
import Image from 'next/image';
export function FileUpload () {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string | null>(null); 

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            setFileName(file.name);
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
                <Imagelement  className={styles.uploadIcon}  />

            </div>
            
            <span className={styles.fileName}>
                {fileName}
            </span>
        </div>
    );
};

