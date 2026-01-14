import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import StateDistrictAnalysis from "./components/StateDistrictAnalysis";
// import DelayBottleneck from "./components/DelayBottleneck";
import Insights from "./components/Insights";
import ExportButtons from "./components/ExportButtons";
import ExtraFeatures from "./components/ExtraFeatures";
import EarlyWarningDashboard from "./components/EarlyWarningDashboard";

function App() {
  return (
    <Router>
      {/* Navbar MUST be here */}
      <Navbar />

      {/* Page routing */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analysis" element={<StateDistrictAnalysis />} />
        {/* <Route path="/delaybottleneck" element={<DelayBottleneck />} /> */}
        <Route path="/insights" element={<Insights />} />
        <Route path="/exportbutton" element={<ExportButtons />} />
        {/* <Route path="/extrafeature" element={<ExtraFeatures />} /> */}
        <Route path="/extrafeatures" element={<ExtraFeatures />} />
        <Route path="/earlywarningdashboard" element={<EarlyWarningDashboard />} />






      </Routes>
    </Router>
  );
}

export default App;
