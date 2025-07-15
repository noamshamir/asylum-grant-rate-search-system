import React, { useState, useRef, useEffect } from "react";
import "./MobileHeader.css";
import { Link } from "react-router-dom";

interface HeaderProps {
    toggleChat: () => void;
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
}

/** Utility hook: hide dropdown if user clicks outside */
function useClickOutside(
    ref: React.RefObject<HTMLDivElement>,
    onClickOutside: () => void
) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [ref, onClickOutside]);
}

const Header: React.FC<HeaderProps> = ({
    toggleChat,
    currentLanguage,
    onLanguageChange,
}) => {
    // local state to toggle the dropdown
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    // ref to the wrapper so we can detect clicks outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Hide dropdown if user clicks away
    useClickOutside(dropdownRef, () => setShowLanguageOptions(false));

    // Flag URLs
    const englishFlag = "https://flagcdn.com/h20/gb.png";
    const spanishFlag = "https://flagcdn.com/h20/es.png";
    const haitianFlag = "https://flagcdn.com/h20/ht.png";

    // Decide which flag to show based on language
    const currentFlag =
        currentLanguage === "en"
            ? englishFlag
            : currentLanguage === "es"
            ? spanishFlag
            : haitianFlag;

    const titleText =
        currentLanguage === "en"
            ? "Asylum Rates"
            : currentLanguage === "es"
            ? "Tasas de Asilo"
            : "To Azil yo";

    const changeLanguageLabel =
        currentLanguage === "en"
            ? "Change Language"
            : currentLanguage === "es"
            ? "Cambiar Idioma"
            : "Chanje Lang";

    const FAQs =
        currentLanguage === "en"
            ? "Help"
            : currentLanguage === "es"
            ? "Ayuda"
            : "Éd";

    return (
        <header className='mobile-header'>
            <Link to='/' style={{ textDecoration: "none" }}>
                <div className='mobile-header-title'>{titleText}</div>
            </Link>
            <div className='mobile-header-icons'>
                <Link to='/faq' className='mobile-icon-container'>
                    <div className='mobile-language-wrapper'>
                        <div className='mobile-language-toggle'>
                            <span className='mobile-question-icon'>
                                <i class='fa-solid fa-question'></i>{" "}
                            </span>
                            <span className='mobile-icon-label'>{FAQs}</span>
                        </div>
                    </div>
                </Link>
                <div className='mobile-header-icons'>
                    {/* Language popover container */}
                    <div className='mobile-icon-container' ref={dropdownRef}>
                        <div className='mobile-language-wrapper'>
                            <div
                                className='mobile-language-toggle'
                                onClick={() =>
                                    setShowLanguageOptions(!showLanguageOptions)
                                }
                            >
                                <img
                                    src={currentFlag}
                                    alt={
                                        currentLanguage === "en"
                                            ? "English Flag"
                                            : currentLanguage === "es"
                                            ? "Spanish Flag"
                                            : "Haitian Creole Flag"
                                    }
                                    className='mobile-language-flag'
                                />
                                <span className='mobile-icon-label'>
                                    {changeLanguageLabel}
                                </span>
                            </div>
                        </div>

                        {/* Overlay dropdown */}
                        {showLanguageOptions && (
                            <div className='mobile-language-dropdown'>
                                <div className='mobile-dropdown-arrow' />
                                <ul>
                                    <li
                                        onClick={() => {
                                            onLanguageChange("en");
                                            setShowLanguageOptions(false);
                                        }}
                                    >
                                        <img
                                            src={englishFlag}
                                            alt='English Flag'
                                            className='mobile-language-flag-item'
                                        />
                                        <span>English</span>
                                    </li>
                                    <li
                                        onClick={() => {
                                            onLanguageChange("es");
                                            setShowLanguageOptions(false);
                                        }}
                                    >
                                        <img
                                            src={spanishFlag}
                                            alt='Spanish Flag'
                                            className='mobile-language-flag-item'
                                        />
                                        <span>Español</span>
                                    </li>
                                    <li
                                        onClick={() => {
                                            onLanguageChange("ht");
                                            setShowLanguageOptions(false);
                                        }}
                                    >
                                        <img
                                            src={haitianFlag}
                                            alt='Haitian Creole Flag'
                                            className='mobile-language-flag-item'
                                        />
                                        <span>Kreyòl Ayisyen</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
