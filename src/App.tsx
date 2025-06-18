import React from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

function App() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Scribology ROI Funnel</h1>
      <AnimatedFunnel
        visitors={5000}        // Monthly site visitors
        mqlRate={4}            // % of visitors who become leads
        customerRate={10}      // % of leads who become customers
        uplift={15}            // % lift from Scribology
      />
    </div>
  );
}

export default App;
