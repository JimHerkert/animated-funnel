import React from "react";
import AnimatedFunnel from "./AnimatedFunnel";

const CombinedEmbed: React.FC = () => {
  // Step 1: Read query params from URL (e.g., for test values)
  const params = new URLSearchParams(window.location.search);
  const visitors = parseInt(params.get("visitors") || "5000", 10);
  const uplift = parseFloat(params.get("uplift") || "15");
  const mql = parseFloat(params.get("mql") || "4");        // % of visitors who become leads
  const closeRate = parseFloat(params.get("close") || "10"); // % of leads who become customers
  const life = parseFloat(params.get("life") || "12");     // months or years depending on toggle

  const baselineLeads = Math.round((visitors * mql) / 100);
  const upliftLeads = Math.round(baselineLeads * (1 + uplift / 100));
  const baselineCustomers = Math.round((baselineLeads * closeRate) / 100);
  const upliftCustomers = Math.round((upliftLeads * closeRate) / 100);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Calculator + Animated Funnel</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl">
        {/* ConvertCalculator Embed on Left */}
        <div className="flex-1">
          <div className="calculator" data-calc-id="WCFSz5KWq62w2toiB" data-type="framed"></div>
          <script src="https://scripts.convertcalculator.com/embed.js" async></script>
        </div>

        {/* Animated Funnel on Right */}
        <div className="flex-1">
          <AnimatedFunnel
            visitors={visitors}
            uplift={uplift}
            baselineLeads={baselineLeads}
            upliftLeads={upliftLeads}
            baselineCustomers={baselineCustomers}
            upliftCustomers={upliftCustomers}
            suffix="/ mo"
          />
        </div>
      </div>
    </div>
  );
};

export default CombinedEmbed;
