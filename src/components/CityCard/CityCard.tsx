import React from "react";
import "./CityCard.css";
import { Link } from "react-router-dom";

// Import the judge data so we can compute averages for the city.
import judgeData from "../../data/judge_grant_rates.json";
import DonutChart from "../DonutChart/DonutChart.tsx";

interface Judge {
    city: string;
    judge_name: string;
    denied_percentage: string;
    granted_asylum_percentage: string;
    granted_other_relief_percentage: string;
    total_decisions: string;
}

interface CityCardProps {
    city: string;
    judgeCount: number;
    currentLanguage: string;
}

const CityCard: React.FC<CityCardProps> = ({
    city,
    judgeCount,
    currentLanguage,
}) => {
    // 1) Get all judges for this city from the JSON
    const cityJudgesObj = (judgeData as any)[city] || {};
    const cityJudges: Judge[] = Object.values(cityJudgesObj);
    const judgesCountLabel = currentLanguage === "es" ? "Jueces" : "Judges";
    const viewRatesLabel = currentLanguage === "es" ? "Ver Tasas" : "View Rate";

    const totalRates = cityJudges.map((j) => {
        const asylum = parseFloat(j.granted_asylum_percentage) || 0;
        const other = parseFloat(j.granted_other_relief_percentage) || 0;
        return asylum + other;
    });

    let avgGrantRate = 0;
    if (totalRates.length > 0) {
        const sum = totalRates.reduce((acc, val) => acc + val, 0);
        avgGrantRate = sum / totalRates.length; // e.g., 45.2
    }

    return (
        <div className='judge-card'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DonutChart
                    className='donut-chart'
                    percentage={avgGrantRate}
                    size={115}
                    strokeWidth={17}
                />
                <Link to={`/city/${city}`}>
                    <h3>{city}</h3>
                </Link>
                <p style={{ marginLeft: "30px" }}>
                    {judgeCount} {judgesCountLabel}
                </p>
            </div>
            <Link to={`/city/${city}`}>
                <button>{viewRatesLabel}</button>
            </Link>
        </div>
    );
};

export default CityCard;
