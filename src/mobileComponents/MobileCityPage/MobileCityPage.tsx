import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MobileCityPage.css";
import JudgeInCity from "../MobileJudgeInCity/MobileJudgeInCity.tsx";
import judgeData from "../../data/judge_grant_rates.json";
import DonutChart from "../MobileDonutChart/MobileDonutChart.tsx";
import Tooltip from "../MobileTooltip/MobileTooltip.tsx";
import DropdownMenu from "../MobileDropdownMenu/MobileDropdownMenu.tsx";

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
        ht: "Pousantaj Apwobasyon (Segondè pou Ba)",
    },
    {
        value: "approvalLow",
        en: "Approval Rate (Low to High)",
        es: "Tasa de Aprobación (Baja a Alta)",
        ht: "Pousantaj Apwobasyon (Ba pou Segondè)",
    },
    {
        value: "casesHigh",
        en: "Amount of Cases (High to Low)",
        es: "Cantidad de Casos (Alta a Baja)",
        ht: "Kantite Ka (Segondè pou Ba)",
    },
    {
        value: "casesLow",
        en: "Amount of Cases (Low to High)",
        es: "Cantidad de Casos (Baja a Alta)",
        ht: "Kantite Ka (Ba pou Segondè)",
    },
    {
        value: "alpha",
        en: "Alphabetical",
        es: "Alfabético",
        ht: "Alfabè",
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
        label:
            currentLanguage === "en"
                ? opt.en
                : currentLanguage === "es"
                ? opt.es
                : opt.ht,
    }));

    const sortByLabel =
        currentLanguage === "en"
            ? "Sort by"
            : currentLanguage === "es"
            ? "Ordenar por"
            : "Triye pa";
    const averageRatesLabel =
        currentLanguage === "en"
            ? "Average Rates"
            : currentLanguage === "es"
            ? "Tasas Promedio"
            : "Pousantaj Mwayèn";
    const cityStatsLabel =
        currentLanguage === "en"
            ? "City Stats"
            : currentLanguage === "es"
            ? "Estadísticas de la Ciudad"
            : "Estatistik Vil la";

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
        currentLanguage === "en"
            ? "Asylum Granted"
            : currentLanguage === "es"
            ? "Asilo Otorgado"
            : "Azil Bay";
    const otherRelief =
        currentLanguage === "en"
            ? "Other Relief Granted"
            : currentLanguage === "es"
            ? "Otro Alivio Otorgado"
            : "Lòt Sekou Bay";
    const denied =
        currentLanguage === "en"
            ? "Cases Denied"
            : currentLanguage === "es"
            ? "Casos Denegados"
            : "Ka Refize";

    const cityLabel =
        currentLanguage === "en"
            ? "City"
            : currentLanguage === "es"
            ? "Ciudad"
            : "Vil";
    const judgeLabel =
        currentLanguage === "en"
            ? "Judges"
            : currentLanguage === "es"
            ? "Jueces"
            : "Jij";
    const outOf =
        currentLanguage === "en"
            ? "Out of"
            : currentLanguage === "es"
            ? "De"
            : "Sou";

    const caseIn =
        currentLanguage === "en"
            ? "cases in"
            : currentLanguage === "es"
            ? "casos en"
            : "ka nan";

    const wereGrantedAsylum =
        currentLanguage === "en"
            ? "were granted asylum, "
            : currentLanguage === "es"
            ? "fueron otorgados asilo, "
            : "te bay azil, ";

    const wereGrantedOtherRelief =
        currentLanguage === "en"
            ? "were granted other relief, and "
            : currentLanguage === "es"
            ? "fueron otorgados otro alivio, y "
            : "te resevwa lòt sekou, epi ";

    const wereDenied =
        currentLanguage === "en"
            ? "were denied"
            : currentLanguage === "es"
            ? "fueron denegados"
            : "te refize";

    const asylumGrantedInfo =
        currentLanguage === "en"
            ? "This number is the percent of cases in this city where asylum was granted."
            : currentLanguage === "es"
            ? "Este número es el porcentaje de casos en esta ciudad donde se otorgó asilo. "
            : "Nimewo sa a se pousantaj ka nan vil sa a kote yo te bay azil.";

    const otherReliefInfo =
        currentLanguage === "en"
            ? "This number is the percent of cases in this city where other relief, such as withholding of removal, convention against torture (CAT), or discretionary humanitarian relief was granted."
            : currentLanguage === "es"
            ? "Este número es el porcentaje de casos en esta ciudad donde se otorgó otro tipo de ayuda, como la suspensión de la deportación, la convención contra la tortura (CAT) o la ayuda humanitaria discrecional."
            : "Nimewo sa a se pousantaj ka nan vil sa a kote yo te bay lòt sekou, tankou sispansyon depòtasyon, konvansyon kont tòti (CAT), oswa sekou imanitè diskresyonè.";

    const deniedInfo =
        currentLanguage === "en"
            ? "This number is the percent of cases in this city that were denied, whether asylum or other."
            : currentLanguage === "es"
            ? "Este número es el porcentaje de casos en esta ciudad donde se denegaron, ya sea asilo u otro tipo de alivio."
            : "Nimewo sa a se pousantaj ka nan vil sa a ki te refize, kit se azil oswa lòt sekou.";
    return (
        <div className='mobile-judge-page'>
            <div className='mobile-judge-header-section'>
                <div className='mobile-judge-title-description'>
                    <h2 className='mobile-judge-section-header judge-title'>
                        {city}
                    </h2>
                    <h1 className='mobile-judge-descriptor judge-label'>
                        {cityLabel}
                    </h1>
                    <h3 className='mobile-judge-descriptor judge-city'>
                        {cityJudges.length} {judgeLabel}
                    </h3>
                </div>
            </div>
            <div className='mobile-judge-rates-section'>
                <h2 className='mobile-judge-section-header judge-rates'>
                    {averageRatesLabel}
                </h2>
                <div
                    className={`mobile-judge-donut-charts-container ${
                        currentLanguage === "ht" ? "haitian-percents" : ""
                    }`}
                >
                    <div className='mobile-judge-asylum-granted-section'>
                        <div
                            className='mobile-judge-donut-chart-div'
                            id='asylum-chart'
                        >
                            <DonutChart
                                title={asylumGranted}
                                percentage={avgAsylumGrantRate}
                                className='mobile-judge-asylum-granted-donut-chart'
                                size={80}
                                strokeWidth={11}
                                color={"#C5FBA3"}
                                fontSize='20'
                            />
                        </div>
                        <div className='mobile-judge-donut-chart-description'>
                            <p>{asylumGranted}</p>
                            <Tooltip text={asylumGrantedInfo} position='above'>
                                <span className='mobile-judge-info-icon'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='mobile-judge-other-relief-section'>
                        <div
                            className='mobile-judge-donut-chart-div'
                            id='other-chart'
                        >
                            <DonutChart
                                title={otherRelief}
                                percentage={avgOtherGrantRate}
                                className='mobile-judge-other-relief-donut-chart'
                                size={80}
                                strokeWidth={11}
                                color={"#C5FBA3"}
                                fontSize='20'
                            />
                        </div>
                        <div className='mobile-judge-donut-chart-description'>
                            <p>{otherRelief}</p>
                            <Tooltip text={otherReliefInfo} position='above'>
                                <span className='mobile-judge-info-icon'>
                                    <i className='fas fa-info-circle'></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='mobile-judge-denied-section'>
                        <div
                            className='mobile-judge-donut-chart-div'
                            id='denied-chart'
                        >
                            <DonutChart
                                title={denied}
                                percentage={avgDeniedRate}
                                className='mobile-judge-denied-donut-chart'
                                size={80}
                                strokeWidth={11}
                                color={"#FF7A7A"}
                                fontSize='20'
                            />
                        </div>
                        <div className='mobile-judge-donut-chart-description'>
                            <p>{denied}</p>
                            <Tooltip text={deniedInfo} position='above-right'>
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
                    {cityStatsLabel}
                </h2>
                <div className='mobile-judge-statistics'>
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
                <div className='mobile-judges-section'>
                    <div className='mobile-judge-header'>
                        <h2 className='mobile-judge-section-header mobile-judges'>
                            {judgeLabel}
                        </h2>
                        <div className='mobile-sort-section'>
                            <span className='mobile-city-sort-by'>
                                {sortByLabel}
                            </span>
                            <DropdownMenu
                                options={dropdownOptions}
                                selectedValue={sortValue}
                                onSelect={(val) => setSortValue(val)}
                            />
                        </div>
                    </div>
                    <div className='mobile-judge-cards'>
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
