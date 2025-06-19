import React from "react";
import AnimatedFunnel from "./AnimatedFunnel";

const EmbedFunnel: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const visitors = parseInt(searchParams.get("visitors") || "5000", 10);
  const mql = parseFloat(searchParams.get("mql") || "4");
  const close = parseFloat(searchParams.get("close") || "10");
  const uplift = parseFloat(searchParams.get("uplift") || "15");
  const life = parseInt(searchParams.get("life") || "5", 10);

  const baselineLeads = visitors * (mql / 100);
  const baselineCustomers = baselineLeads * (close / 100);
  const upliftLeads = baselineLeads * (1 + uplift / 100);
  const upliftCustomers = baselineCustomers * (1 + uplift / 100);
  const suffix = "/ mo"; // you could adjust this based on view if needed

  return (
    <div className="p-4">
      <AnimatedFunnel
        visitors={visitors}
        uplift={uplift}
        baselineLeads={baselineLeads}
        upliftLeads={upliftLeads}
        baselineCustomers={baselineCustomers}
        upliftCustomers={upliftCustomers}
        suffix={suffix}
      />
    </div>
  );
};

export default EmbedFunnel;
