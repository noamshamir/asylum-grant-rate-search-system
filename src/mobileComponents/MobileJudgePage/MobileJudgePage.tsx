import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MobileJudgePage.css";
import judgeData from "../../data/judge_grant_rates.json";
import DonutChart from "../MobileDonutChart/MobileDonutChart.tsx";
import Tooltip from "../MobileTooltip/MobileTooltip.tsx";

interface SingleJudge {
    city: string;
    judge_name: string;
    denied_percentage: string | number;
    granted_asylum_percentage: string | number;
    granted_other_relief_percentage: string | number;
    total_decisions: number;
}

interface JudgePageProps {
    currentLanguage: string;
}

const translations = {
    en: {
        judgeNotFound: "Judge not found",
        asylumGranted: "Asylum Granted",
        otherReliefGranted: "Other Relief Granted",
        denied: "Denied",
        averageRates: "Average Rates",
        judgeStats: "Judge Stats",
        judge: "Judge",
        outOf: "Out of",
        casesFor: "cases for",
        wereGrantedAsylum: "were granted asylum,",
        wereGrantedOtherRelief: "were granted other relief,",
        wereDenied: "were denied.",
        asylumGrantedInfo:
            "This is the percentage of cases this judge granted asylum.",
        otherReliefInfo:
            "This is the percentage of cases this judge granted other relief, such as withholding of removal or CAT.",
        deniedInfo: "This is the percentage of cases this judge denied.",
    },
    es: {
        judgeNotFound: "Juez no encontrado",
        asylumGranted: "Asilo Otorgado",
        otherReliefGranted: "Otro Alivio Otorgado",
        denied: "Denegado",
        averageRates: "Tasas Promedio",
        judgeStats: "Estadísticas del Juez",
        judge: "Juez",
        outOf: "De",
        casesFor: "casos de",
        wereGrantedAsylum: "fueron otorgados asilo,",
        wereGrantedOtherRelief: "fueron otorgados otro alivio,",
        wereDenied: "fueron denegados.",
        asylumGrantedInfo:
            "Este es el porcentaje de casos en los que este juez otorgó asilo.",
        otherReliefInfo:
            "Este es el porcentaje de casos en los que este juez otorgó otro alivio, como la suspensión de la deportación o CAT.",
        deniedInfo:
            "Este es el porcentaje de casos en los que este juez denegó la solicitud.",
    },
};

const parsePercentage = (value: string | number | undefined): number => {
    if (typeof value === "number") return value;
    if (!value) return 0;
    return parseFloat(value.toString().replace(/[^0-9.]/g, "")) || 0;
};

function JudgePage({ currentLanguage }: JudgePageProps) {
    const params = useParams<{ judgeName: string }>();
    const judgeNameParam = params.judgeName;

    // Flatten all judges from judgeData (which is keyed by city).
    const allJudges: SingleJudge[] = Object.values(judgeData).flatMap(
        (cityObj) => Object.values(cityObj)
    ) as SingleJudge[];

    // Find the specific judge by name
    const theJudge = allJudges.find(
        (j) => j.judge_name.toLowerCase() === judgeNameParam?.toLowerCase()
    );

    // If judge isn't found, display an error or placeholder
    if (!theJudge) {
        return (
            <div className='mobile-judge-page'>
                <h2>{translations[currentLanguage].judgeNotFound}</h2>
            </div>
        );
    }

    // Convert string percentages to numbers
    const asylumRate = parsePercentage(theJudge.granted_asylum_percentage);
    const otherReliefRate = parsePercentage(
        theJudge.granted_other_relief_percentage
    );
    const deniedRate = parsePercentage(theJudge.denied_percentage);
    const totalDecisions = Number(theJudge.total_decisions);

    // Calculate actual numbers of cases
    const asylumGrantedAmount = Math.round((totalDecisions * asylumRate) / 100);
    const otherGrantedAmount = Math.round(
        (totalDecisions * otherReliefRate) / 100
    );
    const deniedAmount = Math.round((totalDecisions * deniedRate) / 100);

    return (
        <div className='mobile-judge-page'>
            {/* Header Section */}
            <div className='mobile-judge-header-section'>
                <div className='mobile-judge-title-description'>
                    <h2 className='mobile-judge-section-header judge-title'>
                        {theJudge.judge_name}
                    </h2>
                    <h1 className='mobile-judge-descriptor judge-label'>
                        {translations[currentLanguage].judge}
                    </h1>
                    <Link to={`/city/${theJudge.city}`}>
                        <h3 className='mobile-judge-descriptor judge-city'>
                            {theJudge.city}
                        </h3>
                    </Link>
                </div>
            </div>

            {/* Rates Section */}
            <div className='mobile-judge-rates-section'>
                <h2 className='mobile-judge-section-header judge-rates'>
                    {translations[currentLanguage].averageRates}
                </h2>
                <div className='mobile-judge-donut-charts-container'>
                    <div className='mobile-judge-asylum-granted-section'>
                        <div
                            className='mobile-judge-donut-chart-div'
                            id='asylum-chart'
                        >
                            <DonutChart
                                title={
                                    translations[currentLanguage].asylumGranted
                                }
                                percentage={asylumRate}
                                className='mobile-judge-asylum-granted-donut-chart'
                                size={80}
                                strokeWidth={11}
                                color={"#C5FBA3"}
                                fontSize='20'
                            />
                        </div>
                        <div className='mobile-judge-donut-chart-description'>
                            <p>{translations[currentLanguage].asylumGranted}</p>
                            <Tooltip
                                text={
                                    translations[currentLanguage]
                                        .asylumGrantedInfo
                                }
                                position='above'
                            >
                                <span className='mobile-judge-info-icon'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Other Relief Granted */}
                    <div className='mobile-judge-other-relief-section'>
                        <div
                            className='mobile-judge-donut-chart-div'
                            id='other-chart'
                        >
                            <DonutChart
                                title={
                                    translations[currentLanguage]
                                        .otherReliefGranted
                                }
                                percentage={otherReliefRate}
                                className='mobile-judge-other-relief-donut-chart'
                                size={80}
                                strokeWidth={11}
                                color={"#C5FBA3"}
                                fontSize='20'
                            />
                        </div>
                        <div className='mobile-judge-donut-chart-description'>
                            <p>
                                {
                                    translations[currentLanguage]
                                        .otherReliefGranted
                                }
                            </p>
                            <Tooltip
                                text={
                                    translations[currentLanguage]
                                        .otherReliefInfo
                                }
                                position='above'
                            >
                                <span className='mobile-judge-info-icon'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Denied */}
                    <div className='mobile-judge-denied-section'>
                        <div
                            className='mobile-judge-donut-chart-div'
                            id='denied-chart'
                        >
                            <DonutChart
                                title={translations[currentLanguage].denied}
                                percentage={deniedRate}
                                className='mobile-judge-denied-donut-chart'
                                size={80}
                                strokeWidth={11}
                                color={"#FF7A7A"}
                                fontSize='20'
                            />
                        </div>
                        <div className='mobile-judge-donut-chart-description'>
                            <p>{translations[currentLanguage].denied}</p>
                            <Tooltip
                                text={translations[currentLanguage].deniedInfo}
                                position='above-right'
                            >
                                <span className='mobile-judge-info-icon'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mobile-judge-stats-section'>
                <h2 className='mobile-judge-section-header judge-stats'>
                    {translations[currentLanguage].judgeStats}
                </h2>
                <div className='mobile-judge-statistics'>
                    <p>
                        {translations[currentLanguage].outOf}{" "}
                        <span className='mobile-judge-cases-amount'>
                            {totalDecisions}
                        </span>{" "}
                        {translations[currentLanguage].casesFor}{" "}
                        <strong>{theJudge.judge_name}</strong>,{" "}
                        <span className='mobile-judge-asylum-granted'>
                            {asylumGrantedAmount}
                        </span>{" "}
                        {translations[currentLanguage].wereGrantedAsylum}{" "}
                        <span className='mobile-judge-other-granted'>
                            {otherGrantedAmount}
                        </span>{" "}
                        {translations[currentLanguage].wereGrantedOtherRelief}{" "}
                        <span className='mobile-judge-denied-amount'>
                            {deniedAmount}
                        </span>{" "}
                        {translations[currentLanguage].wereDenied}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default JudgePage;
