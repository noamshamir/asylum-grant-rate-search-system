import React from "react";
import { isMobile } from "react-device-detect";
import DesktopApp from "./DesktopApp/DesktopApp.tsx";
import MobileApp from "./MobileApp/MobileApp.tsx";

const App: React.FC = () => {
    return isMobile ? <MobileApp /> : <DesktopApp />;
};

export default App;
