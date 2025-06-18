import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

function App() {
  // ---------- defaults ----------
  const [visitors, setVisitors]       = useState(5000);
  const [mqlRate, setMqlRate]         = useState(4);
  const [customerRate, setCustomerRate] = useState(10);
  const [uplift, setUplift]           = useState(15);

  // ---------- read query-string once on mount ----------
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    setVisitors(     parseInt(qs.get("visitors") ?? "5000", 10));
    setMqlRate(      parseFloat(qs.get("mql")     ?? "4"));
    setCustomerRate( parseFloat(qs.get("close")   ?? "10"));
    setUplift(       parseFloat(qs.get("uplift")  ?? "15"));
  }, []);

  // ---------- dynamic funnel scaling ----------
  const leadScale      = (mqlRate * (1 + uplift / 100)) / 100;                 // 0-1
  const customerScale  = leadScale * (customerRate * (1 + uplift / 100)) / 100;
  const maxWidth       = 320;                                                  // px
  const leadWidth      = Math.max(leadScale     * maxWidth, 10);               // px
  const customerWidth  = Math.max(customerScale * maxWidth, 10);               // px

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Scribology ROI Funnel</h1>

      <AnimatedFunnel
        visitors={visitors}
        mqlRate={mqlRate}
        customerRate={customerRate}
        uplift={uplift}
        leadWidth={leadWidth}
        customerWidth={customerWidth}
      />
    </div>
  );
}

export default App;
