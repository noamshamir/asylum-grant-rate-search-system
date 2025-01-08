import React from "react";
import "./DonutChart.css";

interface DonutChartProps {
    percentage: number; // e.g., 73.4
    size?: number; // diameter of the donut
    strokeWidth?: number; // thickness of the ring
    color?: string;
    fontSize?: string;
}

/**
 * Displays a donut chart that starts at the top and fills counterclockwise.
 * By default, it’s 80x80 with a 10px stroke width.
 */
const DonutChart: React.FC<DonutChartProps> = ({
    percentage,
    size = 80,
    strokeWidth = 10,
    color,
    fontSize,
}) => {
    // Donut geometry
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Correct offset calculation for counterclockwise
    const offset = circumference * (1 - percentage / 100);

    let strokeColor;
    if (color) {
        strokeColor = color;
    } else if (percentage > 67) {
        strokeColor = "#C5FBA3"; // Green
    } else if (percentage >= 33) {
        strokeColor = "#FFBD7A"; // Yellow
    } else {
        strokeColor = "#FF7A7A"; // Red
    }

    if (!fontSize) {
        fontSize = "30";
    }
    console.log(strokeColor);
    console.log(color);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className='donut-chart'
        >
            {/* Apply transformation to flip over the x-axis */}
            <g transform={`scale(1, -1) translate(0, -${size})`}>
                {/* Background ring */}
                <circle
                    className='donut-ring'
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill='transparent'
                    stroke='#404247'
                    strokeWidth={strokeWidth}
                />

                {/* Filled arc */}
                <circle
                    className='donut-segment'
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill='transparent'
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap='round'
                    transform={`rotate(90 ${size / 2} ${size / 2})`}
                />
            </g>

            {/* Optional text in the center (rounded to whole percent) */}
            <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dy='.3em'
                fill='white'
                fontSize={fontSize}
            >
                {`${Math.round(percentage)}%`}
            </text>
        </svg>
    );
};

export default DonutChart;
