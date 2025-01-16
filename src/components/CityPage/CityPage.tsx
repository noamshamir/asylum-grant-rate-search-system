import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
    if (typeof value === "number") return value; // If it's already a number, return it
    if (!value) return 0; // Handle undefined or null
    return parseFloat(value.toString().replace(/[^0-9.]/g, "")) || 0; // Ensure value is a string
};
function CityPage({ currentLanguage }: CityPageProps) {
    const params = useParams<{ cityName: string }>();

    const city = params.cityName;

    const cityJudgesObj = judgeData[city || ""] || {}; // Fallback to empty object

    const cityJudges: Judge[] = Object.values(cityJudgesObj).map((judge) => ({
        ...judge,
        granted_asylum_percentage: parsePercentage(
            judge.granted_asylum_percentage
        ),
        total_decisions: Number(judge.total_decisions),
    }));

    const [sortOption, setSortOption] = useState<string>(
        "Approval Rate (High to Low)"
    );

    const sortJudges = (judges: Judge[], option: string): Judge[] => {
        switch (option) {
            case "Approval Rate (High to Low)":
                return [...judges].sort(
                    (a, b) =>
                        b.granted_asylum_percentage -
                        a.granted_asylum_percentage
                );
            case "Approval Rate (Low to High)":
                return [...judges].sort(
                    (a, b) =>
                        a.granted_asylum_percentage -
                        b.granted_asylum_percentage
                );
            case "Amount of Cases (High to Low)":
                return [...judges].sort(
                    (a, b) => b.total_decisions - a.total_decisions
                );
            case "Amount of Cases (Low to High)":
                return [...judges].sort(
                    (a, b) => a.total_decisions - b.total_decisions
                );
            case "Alphabetical":
                return [...judges].sort((a, b) =>
                    a.judge_name.localeCompare(b.judge_name)
                );
            default:
                return judges;
        }
    };

    const sortedJudges = sortJudges(cityJudges, sortOption);

    const dropdownOptions = [
        "Approval Rate (High to Low)",
        "Approval Rate (Low to High)",
        "Amount of Cases (High to Low)",
        "Amount of Cases (Low to High)",
        "Alphabetical",
    ];

    const asylumRates = cityJudges.map((j) =>
        parsePercentage(j.granted_asylum_percentage)
    );

    const otherRates = cityJudges.map((j) =>
        parsePercentage(j.granted_other_relief_percentage)
    );

    const deniedPercentage = cityJudges.map((j) =>
        parsePercentage(j.denied_percentage)
    );

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

    let casesAmount: number = 0;
    for (let judge of cityJudges) {
        casesAmount += Number(judge.total_decisions);
    }

    const asylumGrantedAmount = Math.round(
        (casesAmount * avgAsylumGrantRate) / 100
    );
    const otherGrantedAmount = Math.round(
        (casesAmount * avgOtherGrantRate) / 100
    );
    const deniedAmount = Math.round((casesAmount * avgDeniedRate) / 100);

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

    const deniedIndo =
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
                <h2 className='section-header rates'>Average Rates</h2>
                <div className='donut-charts-container'>
                    <div className='cases-granted-section'>
                        <div className='donut-chart-div'>
                            <DonutChart
                                title='Asylum Granted'
                                percentage={avgAsylumGrantRate}
                                className='asylum-granted-donut-chart'
                                size={110}
                                strokeWidth={13}
                                color={"#C5FBA3"}
                            />
                        </div>
                        <div className='donut-chart-description'>
                            <p>Asylum Granted</p>
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
                                title='Other Relief Granted'
                                percentage={avgOtherGrantRate}
                                className='other-relief-donut-chart'
                                size={110}
                                strokeWidth={13}
                                color={"#C5FBA3"}
                            />
                        </div>
                        <div className='donut-chart-description'>
                            <p>Other Relief Granted</p>
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
                                title='Denied'
                                percentage={avgDeniedRate}
                                className='denied-donut-chart'
                                size={110}
                                strokeWidth={13}
                                color={"#FF7A7A"}
                            />
                        </div>
                        <div className='donut-chart-description'>
                            <p>Cases Denied</p>
                            <Tooltip text={deniedIndo}>
                                <span className='info-icon-city'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div className='stats-section'>
                <h2 className='section-header stats'>City Stats</h2>
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
                        <h2 className='section-header judges'>Judges</h2>
                        <span className='sort-by'>Sort by</span>
                        <DropdownMenu
                            options={dropdownOptions}
                            selectedOption={sortOption}
                            onSelect={(option) => setSortOption(option)}
                        />
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
