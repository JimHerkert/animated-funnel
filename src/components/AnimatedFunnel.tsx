import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FunnelProps {
  visitors: number;
  uplift: number;
  mqlRate: number;
  customerRate: number;
  life: number;
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  uplift,
  mqlRate,
  customerRate,
  life,
}) => {
  const [suffix, setSuffix] = useState("/ mo");

  // Life multiplier
  const multiplier = suffix === "/ mo" ? 1 : suffix === "/ yr" ? 12 : 12 * life;

  // Adjusted input
  const adjustedVisitors = visitors * multiplier;

  // MQLs and Customers (base and uplifted)
  const baselineLeads = (adjustedVisitors * mqlRate) / 100;
  const upliftLeads = baselineLeads * (1 + uplift / 100);
  const baselineCustomers = (baselineLeads * customerRate) / 100;
  const upliftCustomers = upliftLeads * (customerRate / 100);

  const leadBasePct = baselineLeads / upliftLeads;
  const custBasePct = baselineCustomers / upliftCustomers;

  const fmt = (n: number) => Math.round(n).toLocaleString();

  // Tooltips
  const [hoverLeads, setHoverLeads] = useState(false);
  const [hoverCustomers, setHoverCustomers] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto p-4">
      {/* Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        {["/ mo", "/ yr", "/ life"].map((label) => (
          <button
            key={label}
            onClick={() => setSuffix(label)}
            className={`px-3 py-1 border border-black rounded ${
              suffix === label ? "bg-[#C8102E] text-white" : "bg-white text-black"
            } hover:bg-[#C8102E] hover:text-white transition`}
          >
            {label === "/ mo" ? "Monthly" : label === "/ yr" ? "Yearly" : "Lifetime"}
          </button>
        ))}
      </div>

      {/* Funnel bars */}
      <div className="flex flex-col items-center gap-8 w-full">
        {/* Visitors */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Visitors {suffix}</div>
          <div className="bg-gray-200 h-8 w-full flex items-center justify-center text-xs font-semibold rounded-full">
            {fmt(adjustedVisitors)}
          </div>
        </div>

        {/* Leads */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Leads {suffix}</div>
          <div
            className="bg-gray-100 h-8 flex items-center justify-start mx-auto relative overflow-visible"
            style={{ width: "67%" }}
            onMouseEnter={() => setHoverLeads(true)}
            onMouseLeave={() => setHoverLeads(false)}
          >
            <motion.div
              className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold rounded-l-full"
              style={{ width: `${leadBasePct * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${leadBasePct * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {fmt(baselineLeads)}
            </motion.div>
            <motion.div
              className="bg-[#C8102E] h-full flex items-center justify-center text-white text-xs font-semibold rounded-r-full"
              style={{ width: `${(1 - leadBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - leadBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              +{fmt(upliftLeads - baselineLeads)}
            </motion.div>
            {hoverLeads && (
              <div className="absolute -top-10 left-[67%] text-[#C8102E] text-xs font-medium pointer-events-none bg-white px-2 py-1 rounded shadow max-w-[150px] text-center">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>

        {/* Customers */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Customers {suffix}</div>
          <div
            className="bg-gray-100 h-8 flex items-center justify-start mx-auto relative overflow-visible"
            style={{ width: "44.89%" }}
            onMouseEnter={() => setHoverCustomers(true)}
            onMouseLeave={() => setHoverCustomers(false)}
          >
            <motion.div
              className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold rounded-l-full"
              style={{ width: `${custBasePct * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${custBasePct * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {fmt(baselineCustomers)}
            </motion.div>
            <motion.div
              className="bg-[#C8102E] h-full flex items-center justify-center text-white text-xs font-semibold rounded-r-full"
              style={{ width: `${(1 - custBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - custBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              +{fmt(upliftCustomers - baselineCustomers)}
            </motion.div>
            {hoverCustomers && (
              <div className="absolute -top-10 left-[44.89%] text-[#C8102E] text-xs font-medium pointer-events-none bg-white px-2 py-1 rounded shadow max-w-[150px] text-center">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFunnel;
