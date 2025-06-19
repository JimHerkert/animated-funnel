import React from "react";
import AnimatedFunnel from "./AnimatedFunnel";
import { useSearchParams } from "react-router-dom";

const EmbedFunnel: React.FC = () => {
  const [params] = useSearchParams();
  const visitors = parseInt(params.get("visitors") || "5000", 10);
  const mql = parseFloat(params.get("mql") || "4");
  const close = parseFloat(params.get("close") || "10");
  const uplift = parseFloat(params.get("uplift") || "15");
  const life = parseInt(params.get("life") || "5", 10);

  const leads = visitors * (mql / 100);
  const customers = leads * (close / 100);
  const upliftLeads = leads * (1 + uplift / 100);
  const upliftCustomers = customers * (1 + uplift / 100);

  const suffix = "/ mo";

  return (
    <div className="p-4">
      <AnimatedFunnel
        visitors={visitors}
        uplift={uplift}
        baselineLeads={leads}
        upliftLeads={upliftLeads}
        baselineCustomers={customers}
        upliftCustomers={upliftCustomers}
        suffix={suffix}
      />
    </div>
  );
};

export default EmbedFunnel;
