import React from "react";
import "./JudgeCard.css";

// 1) Import our new DonutChart
import DonutChart from "../DonutChart/DonutChart.tsx";

interface Judge {
    city: string;
    judge_name: string;
    denied_percentage: string;
    granted_asylum_percentage: string;
    granted_other_relief_percentage: string;
    total_decisions: string;
}

interface JudgeCardProps {
    judge: Judge;
    currentLanguage: string;
}

const JudgeCard: React.FC<JudgeCardProps> = ({ judge, currentLanguage }) => {
    // 2) Compute total grant rate (asylum + other relief).
    const asylum = parseFloat(judge.granted_asylum_percentage) || 0;
    const other = parseFloat(judge.granted_other_relief_percentage) || 0;
    const totalGrantRate = asylum + other; // e.g., 51.1 + 2.5 => 53.6

    const viewRatesLabel = currentLanguage === "es" ? `Ver Tasas` : `View Rate`;

    return (
        <div className='judge-card'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DonutChart
                    className='donut-chart'
                    percentage={totalGrantRate}
                    size={115}
                    strokeWidth={17}
                />
                <a href={`/judge/${judge.judge_name}`}>
                    <h3>{judge.judge_name}</h3>
                </a>
                <a href={`/city/${judge.city}`}>
                    <p style={{ marginLeft: "30px" }}>{judge.city}</p>
                </a>
            </div>
            <a href={`/judge/${judge.judge_name}`}>
                <button>{viewRatesLabel}</button>
            </a>
        </div>
    );
};

export default JudgeCard;
