import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
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
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setShowLanguageOptions(false));

    // Flag URLs
    const englishFlag = "https://flagcdn.com/h20/gb.png";
    const spanishFlag = "https://flagcdn.com/h20/es.png";
    const haitianFlag = "https://flagcdn.com/h20/ht.png"; // Haitian flag

    // Decide which flag to show based on language
    const currentFlag =
        currentLanguage === "en"
            ? englishFlag
            : currentLanguage === "es"
            ? spanishFlag
            : haitianFlag;

    // Translations based on the current language
    const titleText =
        currentLanguage === "es"
            ? "Búsqueda de Tasa de Aprobación de Asilo"
            : currentLanguage === "ht"
            ? "Rechèch To Apwobasyon Azil"
            : "Asylum Grant Rate Search";

    const searchLabel =
        currentLanguage === "es"
            ? "Buscar"
            : currentLanguage === "ht"
            ? "Chèche"
            : "Search";

    const toggleHelpLabel =
        currentLanguage === "es"
            ? "Alternar Ayuda"
            : currentLanguage === "ht"
            ? "Chanje Èd"
            : "Toggle Help";

    const changeLanguageLabel =
        currentLanguage === "es"
            ? "Cambiar Idioma"
            : currentLanguage === "ht"
            ? "Chanje Lang"
            : "Change Language";

    return (
        <header className='header'>
            <Link to='/' style={{ textDecoration: "none" }}>
                <div className='header-title'>{titleText}</div>
            </Link>

            <div className='header-icons'>
                {/* Search icon */}
                <span className='icon-container'>
                    <Link to='/' style={{ textDecoration: "none" }}>
                        <span className='search-icon'>
                            <i className='fas fa-search'></i>
                        </span>
                    </Link>

                    <Link
                        to='/'
                        style={{ textDecoration: "none" }}
                        className='icon-label'
                    >
                        {searchLabel}
                    </Link>
                </span>

                {/* Chat toggle icon */}
                <span className='icon-container' onClick={toggleChat}>
                    <span className='comment-icon'>
                        <i className='fa-regular fa-comment'></i>
                    </span>
                    <span className='icon-label'>{toggleHelpLabel}</span>
                </span>

                {/* Language popover container */}
                <div className='icon-container' ref={dropdownRef}>
                    <div className='language-wrapper'>
                        <div
                            className='language-toggle'
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
                                        : "Haitian Flag"
                                }
                                className='language-flag'
                            />
                            <span className='icon-label'>
                                {changeLanguageLabel}
                            </span>
                        </div>
                    </div>

                    {/* Overlay dropdown */}
                    {showLanguageOptions && (
                        <div className='language-dropdown'>
                            <div className='dropdown-arrow' />
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
                                        className='language-flag-item'
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
                                        className='language-flag-item'
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
                                        alt='Haitian Flag'
                                        className='language-flag-item'
                                    />
                                    <span>Kreyòl Ayisyen</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
