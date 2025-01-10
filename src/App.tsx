import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplitPane from "split-pane-react";
import "./App.css";

import "split-pane-react/esm/themes/default.css";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import DecisionTreeChat from "./components/DecisionTreeChat/DecisionTreeChat.tsx";
import Header from "./components/Header/Header.tsx";
import CityPage from "./components/CityPage/CityPage.tsx";
import JudgePage from "./components/JudgePage/JudgePage.tsx";

function App() {
    const [sizes, setSizes] = useState(["70%", "30%"]);
    const [isChatVisible, setIsChatVisible] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState("en");

    const toggleChat = () => {
        setIsChatVisible((prev) => {
            const newSizes = prev ? ["100%", "0%"] : ["70%", "30%"];
            setSizes(newSizes);
            return !prev;
        });
    };

    const handleLanguageChange = (lang: string) => {
        setCurrentLanguage(lang);
    };

    return (
        // Add the basename to the Router
        <Router basename='/asylum_grant_rate_search_system'>
            <div className='App' style={{ height: "calc(100vh - 84px)" }}>
                <Header
                    toggleChat={toggleChat}
                    currentLanguage={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                />
                <Routes>
                    {/* Main SplitPane Layout */}
                    <Route
                        path='/'
                        element={
                            <SplitPane
                                split='vertical'
                                sizes={sizes}
                                onChange={setSizes}
                                resizerSize={13}
                                sashRender={() => (
                                    <div className='resizer-line' />
                                )}
                            >
                                <div style={{ height: "100%" }}>
                                    <SearchBar
                                        currentLanguage={currentLanguage}
                                    />
                                </div>
                                {isChatVisible && (
                                    <div style={{ height: "100%" }}>
                                        <DecisionTreeChat
                                            currentLanguage={currentLanguage}
                                        />
                                    </div>
                                )}
                            </SplitPane>
                        }
                    />

                    {/* City Page */}
                    <Route
                        path='/asylum_grant_rate_search_system/city/:cityName'
                        element={
                            <SplitPane
                                split='vertical'
                                sizes={sizes}
                                onChange={setSizes}
                                resizerSize={13}
                                sashRender={() => (
                                    <div className='resizer-line' />
                                )}
                            >
                                <div style={{ height: "100%" }}>
                                    <CityPage
                                        currentLanguage={currentLanguage}
                                    />
                                </div>
                                {isChatVisible && (
                                    <div style={{ height: "100%" }}>
                                        <DecisionTreeChat
                                            currentLanguage={currentLanguage}
                                        />
                                    </div>
                                )}
                            </SplitPane>
                        }
                    />

                    {/* Judge Page */}
                    <Route
                        path='/asylum_grant_rate_search_system/judge/:judgeName'
                        element={
                            <SplitPane
                                split='vertical'
                                sizes={sizes}
                                onChange={setSizes}
                                resizerSize={13}
                                sashRender={() => (
                                    <div className='resizer-line' />
                                )}
                            >
                                <div style={{ height: "100%" }}>
                                    <JudgePage
                                        currentLanguage={currentLanguage}
                                    />
                                </div>
                                {isChatVisible && (
                                    <div style={{ height: "100%" }}>
                                        <DecisionTreeChat
                                            currentLanguage={currentLanguage}
                                        />
                                    </div>
                                )}
                            </SplitPane>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
