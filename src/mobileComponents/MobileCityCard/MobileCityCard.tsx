import React from "react";
import "./MobileCityCard.css";
import { Link } from "react-router-dom";

// Import data sou jij yo pou kalkile mwayèn pou vil la.
import judgeData from "../../data/judge_grant_rates.json";
import DonutChart from "../MobileDonutChart/MobileDonutChart.tsx";

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
    // 1) Jwenn tout jij pou vil sa a nan JSON
    const cityJudgesObj = (judgeData as any)[city] || {};
    const cityJudges: Judge[] = Object.values(cityJudgesObj);
    const judgesCountLabel =
        currentLanguage === "es"
            ? "Jueces"
            : currentLanguage === "ht"
            ? "Jij"
            : "Judges";
    const viewRatesLabel =
        currentLanguage === "es"
            ? "Ver"
            : currentLanguage === "ht"
            ? "Gade"
            : "View";

    const totalRates = cityJudges.map((j) => {
        const asylum = parseFloat(j.granted_asylum_percentage) || 0;
        const other = parseFloat(j.granted_other_relief_percentage) || 0;
        return asylum + other;
    });

    let avgGrantRate = 0;
    if (totalRates.length > 0) {
        const sum = totalRates.reduce((acc, val) => acc + val, 0);
        avgGrantRate = sum / totalRates.length; // egzanp: 45.2
    }

    // Tronse non vil la si li pi long pase 20 karaktè
    const truncatedCityName =
        city.length > 20 ? `${city.substring(0, 17)}...` : city;

    return (
        <div className='mobile-city-card'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DonutChart
                    className='donut-chart'
                    percentage={avgGrantRate}
                    size={55}
                    strokeWidth={7}
                    fontSize={15}
                />
                <Link to={`/city/${city}`}>
                    <h3>{truncatedCityName}</h3>
                </Link>
                <p className='judge-count' style={{ marginLeft: "30px" }}>
                    {judgeCount} {judgesCountLabel}
                </p>
            </div>
            <div className='button-container'>
                <Link to={`/city/${city}`}>
                    <button>{viewRatesLabel}</button>
                </Link>
            </div>
        </div>
    );
};

export default CityCard;
