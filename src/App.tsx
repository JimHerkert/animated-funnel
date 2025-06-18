import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

function App() {
  const [visitors, setVisitors] = useState(5000);
  const [mqlRate, setMqlRate] = useState(4);
  const [customerRate, setCustomerRate] = useState(10);
  const [uplift, setUplift] = useState(15);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setVisitors(parseInt(searchParams.get("visitors") || "5000", 10));
    setMqlRate(parseFloat(searchParams.get("mql") || "4"));
    setCustomerRate(parseFloat(searchParams.get("close") || "10"));
    setUplift(parseFloat(searchParams.get("uplift") || "15"));
  }, []);

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
