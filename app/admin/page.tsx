"use client"

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

interface FormState {
    email: string;
    password: string;
}

export default function Connexion() {

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

    const [formData, setFormData] = useState<FormState>({
        email: "",
        password: ""
    });


    const router = useRouter()


    const handleInputChange = (field: keyof FormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log("Connexion avec:", formData);
        router.push('admin/dashboard')
    };

    const containerStyle: React.CSSProperties = {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #588DA9 0%, #4a7390 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: isMobile ? "20px" : "0", 
    };

    const formContainerStyle: React.CSSProperties = {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        padding: isMobile ? "30px 20px" : "50px 40px", 
        width: "100%",
        maxWidth: "420px"
    };

    const titleStyle: React.CSSProperties = {
        color: "#588DA9",
        fontSize: isMobile ? "24px" : "32px",
        fontWeight: "600",
        marginBottom: "10px",
        textAlign: "center"
    };

    const subtitleStyle: React.CSSProperties = {
        color: "#6b7280",
        fontSize: isMobile ? "12px" : "14px",
        marginBottom: "35px",
        textAlign: "center"
    };

    const inputGroupStyle: React.CSSProperties = {
        marginBottom: "25px"
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        color: "#374151",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "8px"
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "14px 16px",
        fontSize: "15px",
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        outline: "none",
        transition: "all 0.3s ease",
        boxSizing: "border-box"
    };

    const buttonStyle: React.CSSProperties = {
        width: "100%",
        padding: "15px",
        backgroundColor: "#588DA9",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginTop: "10px"
    };

    const linkContainerStyle: React.CSSProperties = {
        textAlign: "center",
        marginTop: "25px"
    };

    const linkStyle: React.CSSProperties = {
        color: "#588DA9",
        fontSize: "14px",
        textDecoration: "none",
        fontWeight: "500",
        cursor: "pointer"
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h1 style={titleStyle}>Connexion</h1>
                <p style={subtitleStyle}>Accédez à votre tableau de bord</p>

                <div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle} htmlFor="email">
                            Adresse e-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="exemple@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#588DA9"}
                            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle} htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "#588DA9"}
                            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        style={buttonStyle}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#4a7390"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#588DA9"}
                    >
                        Se connecter
                    </button>
                </div>

                <div style={linkContainerStyle}>
                    <span style={linkStyle}>
                        Mot de passe oublié ?
                    </span>
                </div>
            </div>
        </div>
    );
}