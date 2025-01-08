import React from "react";
import "./Tooltip.css"; // Create a CSS file for styling

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    return (
        <div className='tooltip-container'>
            {children}
            <span className='tooltip-text'>{text}</span>
        </div>
    );
};

export default Tooltip;
