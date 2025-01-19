// import React from "react";
// import "./MobileTooltip.css"; // Ensure you have styles for different positions

// interface TooltipProps {
//     text: string;
//     children: React.ReactNode;
//     scale?: string;
//     position?: "default" | "below"; // Add position prop
// }

// const Tooltip: React.FC<TooltipProps> = ({
//     text,
//     children,
//     scale,
//     position = "default",
// }) => {
//     const positionClass =
//         position === "below" ? "tooltip-below" : "tooltip-default";

//     return (
//         <div className={`tooltip-container ${positionClass}`}>
//             {children}
//             <span
//                 style={{ transform: `scale(${scale})` }}
//                 className='tooltip-text'
//             >
//                 {text}
//             </span>
//         </div>
//     );
// };

// export default Tooltip;

import React, { useState } from "react";
import "./MobileTooltip.css"; // Assuming CSS is in a file named App.css

const MobileTooltip = ({ position = "below", text, children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className='mobile-tooltip-container'
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onTouchStart={() => setVisible(!visible)} // Toggle visibility on touch for mobile
        >
            {children}
            {visible && (
                <div
                    className={`mobile-tooltip ${
                        position === "above"
                            ? "mobile-tooltip-above"
                            : "mobile-tooltip-below"
                    }`}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default MobileTooltip;
