import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

type View = "month" | "year" | "life";

function App() {
  const [visitors, setVisitors] = useState(5000);
  const [mqlRate, setMqlRate] = useState(4);
  const [customerRate, setCustomerRate] = useState(10);
  const [uplift, setUplift] = useState(15);
  const [usefulLife, setUsefulLife] = useState(5);
  const [view, setView] = useState<View>("month");

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    setVisitors(parseInt(qs.get("visitors") ?? "5000", 10));
    setMqlRate(parseFloat(qs.get("mql") ?? "4"));
    setCustomerRate(parseFloat(qs.get("close") ?? "10"));
    setUplift(parseFloat(qs.get("uplift") ?? "15"));
    setUsefulLife(parseInt(qs.get("life") ?? "5", 10));
  }, []);

  // Base monthly values
  const baselineLeads = visitors * (mqlRate / 100);
  const baselineCustomers = baselineLeads * (customerRate / 100);
  const upliftFactor = 1 + uplift / 100;
  const upliftLeads = baselineLeads * upliftFactor;
  const upliftCustomers = baselineCustomers * upliftFactor;

  // Scaling
  const scale =
    view === "month" ? 1 :
    view === "year" ? 12 :
    12 * usefulLife;

  const suffix =
    view === "month" ? "/ mo" :
    view === "year" ? "/ yr" :
    `/ ${usefulLife}-yr life`;

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      {/* Toggle */}
      <div className="mb-6 flex gap-2">
        {(["month", "year", "life"] as View[]).map(opt => (
          <button
            key={opt}
            onClick={() => setView(opt)}
            className={`px-4 py-1 border rounded text-sm font-medium transition-colors ${
              view === opt
                ? "bg-[#C8102E] text-white border-[#C8102E]"
                : "bg-white border-black text-black hover:bg-[#C8102E] hover:text-white hover:border-[#C8102E]"
            }`}
          >
            {opt === "month" ? "Month" : opt === "year" ? "Year" : "Lifetime"}
          </button>
        ))}
      </div>

      {/* Funnel */}
      <AnimatedFunnel
        visitors={visitors * scale}
        uplift={uplift}
        baselineLeads={baselineLeads * scale}
        upliftLeads={upliftLeads * scale}
        baselineCustomers={baselineCustomers * scale}
        upliftCustomers={upliftCustomers * scale}
        suffix={suffix}
      />
    </div>
  );
}

export default App;
