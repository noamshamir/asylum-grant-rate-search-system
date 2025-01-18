import React from "react";
import "./MobileJudgeCard.css";
import { Link } from "react-router-dom";

// 1) Import our new DonutChart
import DonutChart from "../MobileDonutChart/MobileDonutChart.tsx";

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

    const viewRatesLabel = currentLanguage === "es" ? `Ver` : `View`;

    // Truncate judge name if longer than 20 characters
    const truncatedJudgeName =
        judge.judge_name.length > 20
            ? `${judge.judge_name.substring(0, 17)}...`
            : judge.judge_name;

    return (
        <div className='mobile-judge-card'>
            <div style={{ display: "flex", alignItems: "center" }}>
                <DonutChart
                    className='donut-chart'
                    percentage={totalGrantRate}
                    size={55}
                    strokeWidth={7}
                    fontSize={15}
                />
                <Link to={`/judge/${judge.judge_name}`}>
                    <h3>{truncatedJudgeName}</h3>
                </Link>
                <Link to={`/city/${judge.city}`}>
                    <p style={{ marginLeft: "30px" }}>{judge.city}</p>
                </Link>
            </div>
            <Link to={`/judge/${judge.judge_name}`}>
                <button>{viewRatesLabel}</button>
            </Link>
        </div>
    );
};

export default JudgeCard;
