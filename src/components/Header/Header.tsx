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
    // local state to toggle the dropdown
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    // ref to the wrapper so we can detect clicks outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Hide dropdown if user clicks away
    useClickOutside(dropdownRef, () => setShowLanguageOptions(false));

    // Flag URLs (examples from flagcdn.com — adjust as you like)
    const englishFlag = "https://flagcdn.com/h20/gb.png"; // or use your own .png
    const spanishFlag = "https://flagcdn.com/h20/es.png";

    // Decide which flag to show based on language
    const currentFlag = currentLanguage === "en" ? englishFlag : spanishFlag;

    const titleText =
        currentLanguage === "es"
            ? "Búsqueda de Tasa de Aprobaciónde Asilo"
            : "Asylum Grant Rate Search";
    const searchLabel = currentLanguage === "es" ? "Buscar" : "Search";
    const toggleHelpLabel =
        currentLanguage === "es" ? "Alternar Ayuda" : "Toggle Help";
    const changeLanguageLabel =
        currentLanguage === "es" ? "Cambiar Idioma" : "Change Language";

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
                                        : "Spanish Flag"
                                }
                                className='language-flag'
                            />
                            <span className='icon-label'>
                                {changeLanguageLabel}
                            </span>
                        </div>
                    </div>

                    {/* Overlay dropdown (only 2 languages) */}
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
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
