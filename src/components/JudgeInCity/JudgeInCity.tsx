import React from "react";
import "./JudgeInCity.css";
import DonutChart from "../DonutChart/DonutChart.tsx";
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

    const viewRatesLabel =
        currentLanguage === "es" ? `Ver Tasas` : `View Rates`;

    return (
        <div className='city-judge-card'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DonutChart
                    className='donut-chart'
                    percentage={totalGrantRate}
                    size={65}
                    strokeWidth={10}
                    fontSize={18}
                />
                <Link to={`/judge/${judge.judge_name}`}>
                    <h3>{judge.judge_name}</h3>
                </Link>

                <p style={{ marginLeft: "15px" }}>
                    {judge.total_decisions} cases
                </p>
            </div>
            <Link to={`/judge/${judge.judge_name}`}>
                <button>{viewRatesLabel}</button>
            </Link>
        </div>
    );
};

export default JudgeCard;
