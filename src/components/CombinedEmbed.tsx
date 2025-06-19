import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./AnimatedFunnel";

interface FunnelMsg {
  type: "UPDATE_FUNNEL";
  monthlyVisitors?: number;
  mql?: number;
  close?: number;
  uplift?: number;
  life?: number;
}

const CombinedEmbed: React.FC = () => {
  const [data, setData] = useState({
    visitors: 5000,
    mql: 4,
    close: 10,
    uplift: 15,
    life: 5,
  });

  // Inject ConvertCalculator embed.js script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.convertcalculator.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Listen for messages from ConvertCalculator
  useEffect(() => {
    const handler = (e: MessageEvent<FunnelMsg>) => {
      if (e.data?.type === "UPDATE_FUNNEL") {
        console.log("📥 received from calculator:", e.data); // <-- debug log
        setData({
          visitors: e.data.monthlyVisitors ?? data.visitors,
          mql: e.data.mql ?? data.mql,
          close: e.data.close ?? data.close,
          uplift: e.data.uplift ?? data.uplift,
          life: e.data.life ?? data.life,
        });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [data]);

  // Derived values
  const baseLeads = data.visitors * (data.mql / 100);
  const upliftLeads = baseLeads * (1 + data.uplift / 100);
  const baseCust = baseLeads * (data.close / 100);
  const upliftCust = baseCust * (1 + data.uplift / 100);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Calculator + Animated Funnel</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl">
        {/* LEFT – ConvertCalculator */}
        <div className="flex-1 border p-4 rounded shadow overflow-auto">
          <div
            className="calculator"
            data-calc-id="WCFSz5KWq62w2toiB"
            data-type="framed"
          ></div>
        </div>

        {/* RIGHT – Animated Funnel */}
        <div className="flex-1 border p-4 rounded shadow">
          <AnimatedFunnel
            visitors={data.visitors}
            uplift={data.uplift}
            baselineLeads={baseLeads}
            upliftLeads={upliftLeads}
            baselineCustomers={baseCust}
            upliftCustomers={upliftCust}
            suffix="/ mo"
            usefulLife={data.life}
          />
        </div>
      </div>
    </div>
  );
};

export default CombinedEmbed;
