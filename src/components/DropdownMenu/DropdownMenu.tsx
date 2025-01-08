import React, { useState } from "react";
import "./DropdownMenu.css";

interface DropdownMenuProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
    color: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    options,
    selectedOption,
    onSelect,
    color,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className='dropdown-menu'>
            <button
                className={`dropdown-button ${isOpen ? "dropdown-open" : ""}`}
                style={{ backgroundColor: { color } }}
                onClick={toggleDropdown}
            >
                {selectedOption}
                {isOpen ? (
                    <span className='dropdown-icon'>▲</span>
                ) : (
                    <span className='dropdown-icon'>▼</span>
                )}
            </button>
            {isOpen && (
                <ul className='dropdown-options'>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className='dropdown-option'
                            onClick={() => handleOptionClick(option)}
                            style={{ backgroundColor: { color } }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
