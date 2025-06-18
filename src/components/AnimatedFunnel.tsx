import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnimatedFunnel from "./components/AnimatedFunnel";

function App() {
  const [searchParams] = useSearchParams();

  const visitors = parseInt(searchParams.get("visitors") || "5000", 10);
  const mqlRate = parseFloat(searchParams.get("mql") || "4");
  const customerRate = parseFloat(searchParams.get("close") || "10");
  const uplift = parseFloat(searchParams.get("uplift") || "15");

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Scribology ROI Funnel</h1>
      <AnimatedFunnel
        visitors={visitors}
        mqlRate={mqlRate}
        customerRate={customerRate}
        uplift={uplift}
      />
    </div>
  );
}

export default App;
