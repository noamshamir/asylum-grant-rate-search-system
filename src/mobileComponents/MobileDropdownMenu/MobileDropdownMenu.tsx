import React, { useState } from "react";
import "./MobileDropdownMenu.css";

/** Updated interface uses (value,label) pairs **/
interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownMenuProps {
    options: DropdownOption[];
    selectedValue: string; // We'll store the "value" in the parent
    onSelect: (value: string) => void;
    backgroundColor: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    options,
    selectedValue,
    onSelect,
    backgroundColor,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Find the label for the currently selected value
    const selectedOption = options.find((opt) => opt.value === selectedValue);

    console.log(options);

    const handleOptionClick = (option: DropdownOption) => {
        console.log(option.value);
        onSelect(option.value); // pass back the "value" (sort key)
        setIsOpen(false);
    };

    return (
        <div className='dropdown-menu'>
            <button
                className={`dropdown-button ${isOpen ? "dropdown-open" : ""}`}
                style={{ backgroundColor: backgroundColor }}
                onClick={toggleDropdown}
            >
                {selectedOption ? selectedOption.label : "Select"}
                {isOpen ? (
                    <span className='dropdown-icon'>▲</span>
                ) : (
                    <span className='dropdown-icon'>▼</span>
                )}
            </button>

            {isOpen && (
                <ul className='dropdown-options'>
                    {options.map((opt, index) => (
                        <li
                            key={index}
                            className='dropdown-option'
                            onClick={() => handleOptionClick(opt)}
                            style={{ backgroundColor: backgroundColor }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
