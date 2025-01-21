import React, { useState } from "react";
import "./MobileTooltip.css";

interface TooltipProps {
    text: React.ReactNode; // Allow React nodes for rich content
    children: React.ReactNode;
    position?: "above" | "below" | "above-right";
}

const MobileTooltip: React.FC<TooltipProps> = ({
    text,
    children,
    position = "below",
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClass = `mobile-tooltip-${position}`;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
        <div
            className='mobile-tooltip-container'
            onMouseEnter={handleMouseEnter} // Show on hover
            onMouseLeave={handleMouseLeave} // Hide on hover out
        >
            {children}
            {isVisible && (
                <div
                    className={`mobile-tooltip ${positionClass}`}
                    onMouseEnter={handleMouseEnter} // Keep visible on tooltip hover
                    onMouseLeave={handleMouseLeave} // Hide when leaving tooltip
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default MobileTooltip;
