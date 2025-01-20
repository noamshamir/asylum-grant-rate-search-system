import React, { useState } from "react";
import "./MobileTooltip.css";

interface TooltipProps {
    text: string;
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
    const handleTouchStart = () => setIsVisible(!isVisible); // For mobile toggle

    return (
        <div
            className='mobile-tooltip-container'
            onMouseEnter={handleMouseEnter} // Show on hover
            onMouseLeave={handleMouseLeave} // Hide on hover out
            onTouchStart={handleTouchStart} // Toggle visibility on touch
        >
            {children}
            {isVisible && (
                <div className={`mobile-tooltip ${positionClass}`}>{text}</div>
            )}
        </div>
    );
};

export default MobileTooltip;
