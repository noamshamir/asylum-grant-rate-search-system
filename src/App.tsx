import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router
import SplitPane from "split-pane-react";
import "./App.css";

import "split-pane-react/esm/themes/default.css";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import DecisionTreeChat from "./components/DecisionTreeChat/DecisionTreeChat.tsx";
import Header from "./components/Header/Header.tsx";
import CityPage from "./components/CityPage/CityPage.tsx"; // Import the new CityPage
import JudgePage from "./components/JudgePage/JudgePage.tsx";

function App() {
    const [sizes, setSizes] = useState(["70%", "30%"]);
    const [isChatVisible, setIsChatVisible] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState("en");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if the user is on a mobile device
        const userAgent = window.navigator.userAgent;
        const mobileDevices = /iPhone|iPad|iPod|Android/i;
        setIsMobile(mobileDevices.test(userAgent));
    }, []);

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
        <Router>
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
                                {!isMobile && isChatVisible && (
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
                        path='/city/:cityName'
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
                                {!isMobile && isChatVisible && (
                                    <div style={{ height: "100%" }}>
                                        <DecisionTreeChat
                                            currentLanguage={currentLanguage}
                                        />
                                    </div>
                                )}
                            </SplitPane>
                        }
                    />
                    <Route
                        path='/judge/:judgeName'
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
                                {!isMobile && isChatVisible && (
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
