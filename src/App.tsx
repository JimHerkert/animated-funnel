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

  // Dynamically adjust width ratios for visual funnel effect
  const leadScale = (mqlRate * (1 + uplift / 100)) / 100;
  const customerScale = (leadScale * customerRate * (1 + uplift / 100)) / 100;

  const maxWidth = 320;
  const leadWidth = Math.max(leadScale * maxWidth, 10);
  const customerWidth = Math.max(customerScale * maxWidth, 10);

  // Calculate baseline and uplifted values for labels
  const baselineLeads = visitors * (mqlRate / 100);
  const baselineCustomers = baselineLeads * (customerRate / 100);
  const upliftFactor = 1 + uplift / 100;
  const upliftLeads = baselineLeads * upliftFactor;
  const upliftCustomers = baselineCustomers * upliftFactor;

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
        baselineLeads={baselineLeads}
        upliftLeads={upliftLeads}
        baselineCustomers={baselineCustomers}
        upliftCustomers={upliftCustomers}
      />
    </div>
  );
}

export default App;
