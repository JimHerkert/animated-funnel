import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

function App() {
  // ── state populated from URL ──────────────────────────────────────────────
  const [visitors, setVisitors]     = useState(5000);
  const [mqlRate, setMqlRate]       = useState(4);
  const [customerRate, setCustomerRate] = useState(10);
  const [uplift, setUplift]         = useState(15);

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    setVisitors(    parseInt(qs.get("visitors") ?? "5000", 10));
    setMqlRate(     parseFloat(qs.get("mql")     ?? "4"));
    setCustomerRate(parseFloat(qs.get("close")   ?? "10"));
    setUplift(      parseFloat(qs.get("uplift")  ?? "15"));
  }, []);

  // ── fixed funnel ratios (100 % / 67 % / ~45 %) ────────────────────────────
  const baselineLeads      = visitors * (mqlRate / 100);
  const baselineCustomers  = baselineLeads * (customerRate / 100);
  const factor             = 1 + uplift / 100;
  const upliftLeads        = baselineLeads     * factor;
  const upliftCustomers    = baselineCustomers * factor;

  return (
    <div className="min-h-screen bg-white p-8">
      <AnimatedFunnel
        visitors={visitors}
        uplift={uplift}
        leadWidth={0}          // width handled in component via 67 % rules
        customerWidth={0}
        baselineLeads={baselineLeads}
        upliftLeads={upliftLeads}
        baselineCustomers={baselineCustomers}
        upliftCustomers={upliftCustomers}
      />
    </div>
  );
}

export default App;
