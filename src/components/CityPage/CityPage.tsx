import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CityPage.css";
import JudgeInCity from "../JudgeInCity/JudgeInCity.tsx";
import judgeData from "../../data/judge_grant_rates.json";
import DonutChart from "../DonutChart/DonutChart.tsx";
import Tooltip from "../Tooltip/Tooltip.tsx";
import DropdownMenu from "../DropdownMenu/DropdownMenu.tsx";

interface Judge {
    city: string;
    judge_name: string;
    denied_percentage: string;
    granted_asylum_percentage: string;
    granted_other_relief_percentage: string;
    total_decisions: number;
}

interface CityPageProps {
    currentLanguage: string;
}

const parsePercentage = (value: string | number | undefined): number => {
    if (typeof value === "number") return value;
    if (!value) return 0;
    return parseFloat(value.toString().replace(/[^0-9.]/g, "")) || 0;
};

/** Step 1: Define a single set of sort "values" and map them to labels (EN + ES). */
const SORT_OPTIONS = [
    {
        value: "approvalHigh",
        en: "Approval Rate (High to Low)",
        es: "Tasa de Aprobación (Alta a Baja)",
    },
    {
        value: "approvalLow",
        en: "Approval Rate (Low to High)",
        es: "Tasa de Aprobación (Baja a Alta)",
    },
    {
        value: "casesHigh",
        en: "Amount of Cases (High to Low)",
        es: "Cantidad de Casos (Alta a Baja)",
    },
    {
        value: "casesLow",
        en: "Amount of Cases (Low to High)",
        es: "Cantidad de Casos (Baja a Alta)",
    },
    {
        value: "alpha",
        en: "Alphabetical",
        es: "Alfabético",
    },
];

function CityPage({ currentLanguage }: CityPageProps) {
    const params = useParams<{ cityName: string }>();
    const city = params.cityName;

    const cityJudgesObj = judgeData[city || ""] || {};
    const cityJudges: Judge[] = Object.values(cityJudgesObj).map((judge) => ({
        ...judge,
        granted_asylum_percentage: parsePercentage(
            judge.granted_asylum_percentage
        ),
        total_decisions: Number(judge.total_decisions),
    }));

    /** Step 2: Store the internal "value" (e.g. "approvalHigh"), not the displayed text. */
    const [sortValue, setSortValue] = useState<string>("approvalHigh");

    /** Step 3: Switch on the "value" rather than the displayed text. */
    const sortJudges = (judges: Judge[], sortValue: string): Judge[] => {
        switch (sortValue) {
            case "approvalHigh":
                return [...judges].sort(
                    (a, b) =>
                        b.granted_asylum_percentage -
                        a.granted_asylum_percentage
                );
            case "approvalLow":
                return [...judges].sort(
                    (a, b) =>
                        a.granted_asylum_percentage -
                        b.granted_asylum_percentage
                );
            case "casesHigh":
                return [...judges].sort(
                    (a, b) => b.total_decisions - a.total_decisions
                );
            case "casesLow":
                return [...judges].sort(
                    (a, b) => a.total_decisions - b.total_decisions
                );
            case "alpha":
                return [...judges].sort((a, b) =>
                    a.judge_name.localeCompare(b.judge_name)
                );
            default:
                return judges;
        }
    };

    const sortedJudges = sortJudges(cityJudges, sortValue);

    /** Step 4: Build the dropdown options based on currentLanguage. 
      Each item: { label: string, value: string } */
    const dropdownOptions = SORT_OPTIONS.map((opt) => ({
        value: opt.value,
        label: currentLanguage === "en" ? opt.en : opt.es,
    }));

    const sortByLabel = currentLanguage === "en" ? "Sort by" : "Ordenar por";
    const averageRatesLabel =
        currentLanguage === "en" ? "Average Rates" : "Tasas Promedio";
    const cityStatsLabel =
        currentLanguage === "en" ? "City Stats" : "Estadísticas de la Ciudad";

    let casesAmount: number = 0;
    for (let judge of cityJudges) {
        casesAmount += Number(judge.total_decisions);
    }

    const asylumRates = cityJudges.map((j) =>
        parsePercentage(j.granted_asylum_percentage)
    );
    const otherRates = cityJudges.map((j) =>
        parsePercentage(j.granted_other_relief_percentage)
    );
    const deniedPercentage = cityJudges.map((j) =>
        parsePercentage(j.denied_percentage)
    );

    // Then compute the averages
    const avgAsylumGrantRate: number = asylumRates.length
        ? asylumRates.reduce((acc, val) => acc + val, 0) / asylumRates.length
        : 0;
    const avgOtherGrantRate: number = otherRates.length
        ? otherRates.reduce((acc, val) => acc + val, 0) / otherRates.length
        : 0;
    const avgDeniedRate: number = deniedPercentage.length
        ? deniedPercentage.reduce((acc, val) => acc + val, 0) /
          deniedPercentage.length
        : 0;

    // Then do:
    const asylumGrantedAmount = Math.round(
        (casesAmount * avgAsylumGrantRate) / 100
    );
    const otherGrantedAmount = Math.round(
        (casesAmount * avgOtherGrantRate) / 100
    );
    const deniedAmount = Math.round((casesAmount * avgDeniedRate) / 100);

    const asylumGranted =
        currentLanguage === "en" ? "Asylum Granted" : "Asilo Otorgado";
    const otherRelief =
        currentLanguage === "en"
            ? "Other Relief Granted"
            : "Otro Alivio Otorgado";
    const denied =
        currentLanguage === "en" ? "Cases Denied" : "Casos Denegados";

    const cityLabel = currentLanguage === "en" ? "City" : "Ciudad";
    const judgeLabel = currentLanguage === "en" ? "Judges" : "Jueces";
    const outOf = currentLanguage === "en" ? "Out of" : "De";
    const caseIn = currentLanguage === "en" ? "cases in" : "casos en";
    const wereGrantedAsylum =
        currentLanguage === "en"
            ? "were granted asylum, "
            : "fueron otorgados asilo, ";
    const wereGrantedOtherRelief =
        currentLanguage === "en"
            ? "were granted other relief, and "
            : "fueron otorgados otro alivio, y ";
    const wereDenied =
        currentLanguage === "en" ? "were denied" : "fueron denegados";

    const asylumGrantedInfo =
        currentLanguage === "en"
            ? "This number is the percent of cases in this city where asylum was granted."
            : "Este número es el porcentaje de casos en esta ciudad donde se otorgó asilo. ";

    const otherReliefInfo =
        currentLanguage === "en"
            ? "This number is the percent of cases in this city where other relief, such as withholding of removal, convention against torture (CAT), or discretionary humanitarian relief was granted."
            : "Este número es el porcentaje de casos en esta ciudad donde se otorgó otro tipo de ayuda, como la suspensión de la deportación, la convención contra la tortura (CAT) o la ayuda humanitaria discrecional.";

    const deniedInfo =
        currentLanguage === "en"
            ? "This number is the percent of cases in this city that were denied, whether asylum or other."
            : "Este número es el porcentaje de casos en esta ciudad donde se denegaron, ya sea asilo u otro tipo de alivio.";

    return (
        <div className='city-page'>
            <div className='header-section'>
                <div className='city-title-description'>
                    <h2 className='section-header city-title'>{city}</h2>
                    <h1 className='city-descriptor label'>{cityLabel}</h1>
                    <h3 className='city-descriptor judge-count'>
                        {cityJudges.length} {judgeLabel}
                    </h3>
                </div>
            </div>
            <div className='rates-section'>
                <h2 className='section-header rates'>{averageRatesLabel}</h2>
                <div className='donut-charts-container'>
                    <div className='cases-granted-section'>
                        <div className='donut-chart-div'>
                            <DonutChart
                                title={asylumGranted}
                                percentage={avgAsylumGrantRate}
                                className='asylum-granted-donut-chart'
                                size={110}
                                strokeWidth={13}
                                color={"#C5FBA3"}
                            />
                        </div>
                        <div className='donut-chart-description'>
                            <p>{asylumGranted}</p>
                            <Tooltip text={asylumGrantedInfo}>
                                <span className='info-icon-city'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='other-relief-section'>
                        <div className='donut-chart-div'>
                            <DonutChart
                                title={otherRelief}
                                percentage={avgOtherGrantRate}
                                className='other-relief-donut-chart'
                                size={110}
                                strokeWidth={13}
                                color={"#C5FBA3"}
                            />
                        </div>
                        <div className='donut-chart-description'>
                            <p>{otherRelief}</p>
                            <Tooltip text={otherReliefInfo}>
                                <span className='info-icon-city'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='denied-section'>
                        <div className='donut-chart-div'>
                            <DonutChart
                                title={denied}
                                percentage={avgDeniedRate}
                                className='denied-donut-chart'
                                size={110}
                                strokeWidth={13}
                                color={"#FF7A7A"}
                            />
                        </div>
                        <div className='donut-chart-description'>
                            <p>{denied}</p>
                            <Tooltip text={deniedInfo}>
                                <span className='info-icon-city'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div className='stats-section'>
                <h2 className='section-header stats'>{cityStatsLabel}</h2>
                <div className='statistics'>
                    <p>
                        {outOf}{" "}
                        <span className='cases-amount'>{casesAmount}</span>{" "}
                        {caseIn} {city},{" "}
                        <span className='asylum-granted'>
                            {asylumGrantedAmount}
                        </span>{" "}
                        {wereGrantedAsylum}{" "}
                        <span className='other-granted'>
                            {otherGrantedAmount}
                        </span>{" "}
                        {wereGrantedOtherRelief}{" "}
                        <span className='denied-amount'>{deniedAmount}</span>{" "}
                        {wereDenied}
                    </p>
                    <div className='granted-percentile-container'>
                        {/* <p>
                            {city} is in the {grantedPercentile} of cases granted
                        </p>{" "}
                        <span className='info-icon-city'>
                            <i className='fas fa-info-circle'></i>
                        </span> */}
                    </div>
                </div>
                <div className='judges-section'>
                    <div className='judge-header'>
                        <h2 className='section-header judges'>{judgeLabel}</h2>
                        <span className='sort-by'>{sortByLabel}</span>
                        <div className='city-page-dropdown-desktop'>
                            <DropdownMenu
                                options={dropdownOptions}
                                selectedValue={sortValue}
                                onSelect={(val) => setSortValue(val)}
                            />
                        </div>
                    </div>
                    <div className='judge-cards'>
                        {sortedJudges.length > 0 && (
                            <>
                                {sortedJudges.map((judge) => (
                                    <JudgeInCity
                                        currentLanguage={currentLanguage}
                                        key={judge.judge_name}
                                        judge={judge}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CityPage;
