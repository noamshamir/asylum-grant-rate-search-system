import React from "react";
import "./MobileJudgeInCity.css";
import DonutChart from "../MobileDonutChart/MobileDonutChart.tsx";
import { Link } from "react-router-dom";

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
    const asylum = parseFloat(judge.granted_asylum_percentage) || 0;
    const other = parseFloat(judge.granted_other_relief_percentage) || 0;
    const totalGrantRate = asylum + other;

    const viewRatesLabel = currentLanguage === "es" ? `Ver` : `View`;

    const casesLabel = currentLanguage === "en" ? `cases` : `casos`;

    return (
        <div className='mobile-city-judge-card'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div className='mobile-city-donut-chart'>
                    <DonutChart
                        percentage={totalGrantRate}
                        size={55}
                        strokeWidth={7}
                        fontSize={15}
                    />
                </div>
                <Link to={`/judge/${judge.judge_name}`}>
                    <h3>{judge.judge_name}</h3>
                </Link>

                <p style={{ marginLeft: "15px" }}>
                    {judge.total_decisions} {casesLabel}
                </p>
            </div>
            <Link to={`/judge/${judge.judge_name}`}>
                <button>{viewRatesLabel}</button>
            </Link>
        </div>
    );
};

export default JudgeCard;
