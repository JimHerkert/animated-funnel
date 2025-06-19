import React from "react";
import AnimatedFunnel from "./AnimatedFunnel";

const EmbedFunnel: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  // Parse query-string inputs (fallbacks are safe defaults)
  const visitors = parseInt(params.get("visitors") || "5000", 10);
  const mql      = parseFloat(params.get("mql")      || "4");
  const close    = parseFloat(params.get("close")    || "10");
  const uplift   = parseFloat(params.get("uplift")   || "15");

  // Monthly baseline numbers
  const baseLeads      = visitors * (mql / 100);
  const baseCustomers  = baseLeads * (close / 100);
  const upliftLeads    = baseLeads     * (1 + uplift / 100);
  const upliftCustomers= baseCustomers * (1 + uplift / 100);

  return (
    <div className="p-4">
      <AnimatedFunnel
        visitors={visitors}
        uplift={uplift}
        baselineLeads={baseLeads}
        upliftLeads={upliftLeads}
        baselineCustomers={baseCustomers}
        upliftCustomers={upliftCustomers}
        suffix="/ mo"
      />
    </div>
  );
};

export default EmbedFunnel;
