import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu.tsx";

// Import JSON data
import judgeData from "../../data/judge_grant_rates.json";

// Import child components
import CityCard from "../CityCard/CityCard.tsx";
import JudgeCard from "../JudgeCard/JudgeCard.tsx";

// Interfaces
interface Judge {
    city: string;
    judge_name: string;
    denied_percentage: string;
    granted_asylum_percentage: string;
    granted_other_relief_percentage: string;
    total_decisions: string;
}

interface CityDictionary {
    [judgeName: string]: Judge;
}

interface AllCities {
    [cityName: string]: CityDictionary;
}

interface AllJudges {
    [judgeName: string]: Judge;
}

interface SearchBarProps {
    currentLanguage: string;
}

/**
 * Define a type for the "internal" sort keys
 */
type SortKey =
    | "approvalHigh"
    | "approvalLow"
    | "casesHigh"
    | "casesLow"
    | "alphaAsc"
    | "alphaDesc";

/**
 * We store the labels in English & Spanish, and
 * link them to an internal `SortKey` string.
 */
const SORT_OPTIONS_EN: Array<{ label: string; key: SortKey }> = [
    { label: "Approval Rate (High to Low)", key: "approvalHigh" },
    { label: "Approval Rate (Low to High)", key: "approvalLow" },
    { label: "Amount of Cases (High to Low)", key: "casesHigh" },
    { label: "Amount of Cases (Low to High)", key: "casesLow" },
    { label: "Alphabetical (A to Z)", key: "alphaAsc" },
    { label: "Reverse Alphabetical (Z to A)", key: "alphaDesc" },
];

const SORT_OPTIONS_ES: Array<{ label: string; key: SortKey }> = [
    { label: "Tasa de Aprobación (Alta a Baja)", key: "approvalHigh" },
    { label: "Tasa de Aprobación (Baja a Alta)", key: "approvalLow" },
    { label: "Número de Casos (Alto a Bajo)", key: "casesHigh" },
    { label: "Número de Casos (Bajo a Alto)", key: "casesLow" },
    { label: "Alfabético (A a Z)", key: "alphaAsc" },
    { label: "Alfabético Inverso (Z a A)", key: "alphaDesc" },
];

function SearchBar({ currentLanguage }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const navigate = useNavigate();

    /**
     * Instead of storing the entire label in state,
     * we store the "internal" key, e.g. "approvalHigh".
     * Default = "alphaAsc"
     */
    const [sortOption, setSortOption] = useState<SortKey>("alphaAsc");

    // Depending on language, pick the appropriate array of {label, key} items
    const dropdownOptions =
        currentLanguage === "es" ? SORT_OPTIONS_ES : SORT_OPTIONS_EN;

    // JSON data
    const allCities: AllCities = judgeData;
    const allJudges: AllJudges = Object.keys(allCities).reduce(
        (acc, cityName) => {
            const judges = allCities[cityName];
            for (const judgeName in judges) {
                acc[judgeName] = judges[judgeName];
            }
            return acc;
        },
        {} as AllJudges
    );

    // Translations for other UI text
    const translations = {
        en: {
            placeholder: "Search by judge or city...",
            citiesLabel: "Cities",
            judgesLabel: "Judges",
            filterOptions: "Filter Options",
            sortBy: "Sort by",
        },
        es: {
            placeholder: "Buscar por juez o ciudad...",
            citiesLabel: "Ciudades",
            judgesLabel: "Jueces",
            filterOptions: "Opciones de Filtro",
            sortBy: "Ordenar por",
        },
    };

    const { placeholder, citiesLabel, judgesLabel, filterOptions, sortBy } =
        translations[currentLanguage] || translations.en;

    /* ---------------------------------------------------
     *  Helpers to get numeric metrics for Judges and Cities
     * --------------------------------------------------- */
    // For a single Judge
    const getApprovalRate = (j: Judge): number => {
        const asylum = parseFloat(j.granted_asylum_percentage);
        const other = parseFloat(j.granted_other_relief_percentage);
        return asylum + other;
    };

    const getCaseCount = (j: Judge): number => {
        return parseInt(j.total_decisions, 10);
    };

    // For an entire city, we compute the average approval & total cases
    const getCityApprovalRate = (cityName: string): number => {
        const judgesInCity = allCities[cityName];
        let totalApproval = 0;
        let judgeCount = 0;
        for (const judgeName in judgesInCity) {
            totalApproval += getApprovalRate(judgesInCity[judgeName]);
            judgeCount++;
        }
        return judgeCount === 0 ? 0 : totalApproval / judgeCount;
    };

    const getCityTotalCases = (cityName: string): number => {
        const judgesInCity = allCities[cityName];
        let sumCases = 0;
        for (const judgeName in judgesInCity) {
            sumCases += getCaseCount(judgesInCity[judgeName]);
        }
        return sumCases;
    };

    /* --------------------------
     *  Filter results by search
     * -------------------------- */
    let cityResults: string[] = [];
    let judgeResults: Judge[] = [];

    if (!searchTerm.trim()) {
        // If no search term, include all
        cityResults = Object.keys(allCities);
        judgeResults = Object.values(allJudges);
    } else {
        const lowerSearch = searchTerm.toLowerCase();
        for (const cityName in allCities) {
            if (cityName.toLowerCase().includes(lowerSearch)) {
                cityResults.push(cityName);
            }
        }
        for (const judgeName in allJudges) {
            if (judgeName.toLowerCase().includes(lowerSearch)) {
                judgeResults.push(allJudges[judgeName]);
            }
        }
    }

    /* --------------------------
     *  Sorting logic (based on the 'sortOption' key)
     * -------------------------- */
    switch (sortOption) {
        case "approvalHigh":
            // Judges: sort by approval descending
            judgeResults.sort(
                (a, b) => getApprovalRate(b) - getApprovalRate(a)
            );
            // Cities: sort by average approval descending
            cityResults.sort(
                (cityA, cityB) =>
                    getCityApprovalRate(cityB) - getCityApprovalRate(cityA)
            );
            break;

        case "approvalLow":
            judgeResults.sort(
                (a, b) => getApprovalRate(a) - getApprovalRate(b)
            );
            cityResults.sort(
                (cityA, cityB) =>
                    getCityApprovalRate(cityA) - getCityApprovalRate(cityB)
            );
            break;

        case "casesHigh":
            judgeResults.sort((a, b) => getCaseCount(b) - getCaseCount(a));
            cityResults.sort(
                (cityA, cityB) =>
                    getCityTotalCases(cityB) - getCityTotalCases(cityA)
            );
            break;

        case "casesLow":
            judgeResults.sort((a, b) => getCaseCount(a) - getCaseCount(b));
            cityResults.sort(
                (cityA, cityB) =>
                    getCityTotalCases(cityA) - getCityTotalCases(cityB)
            );
            break;

        case "alphaAsc":
            cityResults.sort((a, b) => a.localeCompare(b));
            judgeResults.sort((a, b) =>
                a.judge_name.localeCompare(b.judge_name)
            );
            break;

        case "alphaDesc":
            cityResults.sort((a, b) => b.localeCompare(a));
            judgeResults.sort((a, b) =>
                b.judge_name.localeCompare(a.judge_name)
            );
            break;

        default:
            // fallback
            cityResults.sort((a, b) => a.localeCompare(b));
            judgeResults.sort((a, b) =>
                a.judge_name.localeCompare(b.judge_name)
            );
            break;
    }

    const handleSearchIconClick = () => {
        // Navigate to the homepage or desired route
        navigate("/");
    };

    return (
        <div className='search-bar-container'>
            {/* Top Search Bar */}
            <div className='search-bar'>
                <span className='search-icon' onClick={handleSearchIconClick}>
                    <i className='fas fa-search'></i>
                </span>

                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder={placeholder}
                />

                <div className='search-actions'>
                    <span
                        className='clear-icon'
                        onClick={() => {
                            setSearchTerm("");
                            if (!searchTerm.trim()) {
                                setIsDropdownOpen(false);
                            }
                        }}
                    >
                        <i className='fas fa-times'></i>
                    </span>

                    <div className='divider' />

                    <span
                        className='filter-icon'
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                        <i className='fas fa-sliders-h'></i>
                    </span>

                    <span className='info-icon'>
                        <i className='fas fa-info-circle'></i>
                    </span>
                </div>
            </div>

            {/* Simple white box with dropdown (no dragging) */}
            {showFilterMenu && (
                <div className='filter-menu'>
                    <div className='filter-header'>
                        <span className='filter-header-title'>
                            {filterOptions}
                        </span>
                        <span
                            className='clear-icon filter-box-icon'
                            onClick={() => setShowFilterMenu(false)}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>

                    <div className='filter-body'>
                        <span className='sort-by-text'>{sortBy}:</span>
                        <div
                            className='dropdown-menu-div'
                            style={{ transform: "scale(2)" }}
                        >
                            <DropdownMenu
                                // Pass the *translated* label array as "options"
                                options={dropdownOptions.map((o) => o.label)}
                                // Find the matching label for the current key, or fallback
                                selectedOption={
                                    // get label for the current "sortOption" key
                                    dropdownOptions.find(
                                        (o) => o.key === sortOption
                                    )?.label || ""
                                }
                                // On select, we must map the label back to the key
                                onSelect={(selectedLabel) => {
                                    const found = dropdownOptions.find(
                                        (o) => o.label === selectedLabel
                                    );
                                    if (found) {
                                        setSortOption(found.key);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Search Results Dropdown */}
            {isDropdownOpen &&
                (cityResults.length > 0 || judgeResults.length > 0) && (
                    <>
                        <hr className='horizontal-divider' />
                        <div className='search-results-dropdown'>
                            {/* Cities */}
                            {cityResults.length > 0 && (
                                <>
                                    <h4>{citiesLabel}</h4>
                                    {cityResults.map((cityName) => {
                                        const judgeCount = Object.keys(
                                            allCities[cityName]
                                        ).length;
                                        return (
                                            <CityCard
                                                currentLanguage={
                                                    currentLanguage
                                                }
                                                key={cityName}
                                                city={cityName}
                                                judgeCount={judgeCount}
                                            />
                                        );
                                    })}
                                </>
                            )}

                            {/* Judges */}
                            {judgeResults.length > 0 && (
                                <>
                                    <h4>{judgesLabel}</h4>
                                    {judgeResults.map((judge) => (
                                        <JudgeCard
                                            currentLanguage={currentLanguage}
                                            key={judge.judge_name}
                                            judge={judge}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </>
                )}
        </div>
    );
}

export default SearchBar;
