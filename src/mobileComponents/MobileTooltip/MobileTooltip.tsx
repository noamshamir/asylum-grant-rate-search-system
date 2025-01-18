import React from "react";
import "./MobileTooltip.css"; // Ensure you have styles for different positions

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    scale?: string;
    position?: "default" | "below"; // Add position prop
}

const Tooltip: React.FC<TooltipProps> = ({
    text,
    children,
    scale,
    position = "default",
}) => {
    const positionClass =
        position === "below" ? "tooltip-below" : "tooltip-default";

    return (
        <div className={`tooltip-container ${positionClass}`}>
            {children}
            <span
                style={{ transform: `scale(${scale})` }}
                className='tooltip-text'
            >
                {text}
            </span>
        </div>
    );
};

export default Tooltip;
