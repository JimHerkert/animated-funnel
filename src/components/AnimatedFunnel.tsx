// src/components/AnimatedFunnel.tsx

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

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
  const funnelRef = useRef<HTMLDivElement>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  // Derived values
  const baselineLeads = (visitors * mqlRate) / 100;
  const upliftLeads = baselineLeads * (1 + uplift / 100);
  const baselineCustomers = (baselineLeads * customerRate) / 100;
  const upliftCustomers = upliftLeads * (customerRate / 100);

  const leadBasePct = baselineLeads / upliftLeads;
  const custBasePct = baselineCustomers / upliftCustomers;

  const exportAsImage = async () => {
    if (funnelRef.current) {
      const canvas = await html2canvas(funnelRef.current);
      const link = document.createElement("a");
      link.download = "funnel.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const [hoverLeads, setHoverLeads] = useState(false);
  const [hoverCustomers, setHoverCustomers] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto p-6">
      {/* Funnel Content */}
      <div ref={funnelRef} className="flex flex-col items-center gap-8 w-full">
        {/* Visitors */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Visitors / mo</div>
          <div className="bg-gray-200 h-8 w-full rounded-full flex items-center justify-center text-xs font-semibold">
            {fmt(visitors)}
          </div>
        </div>

        {/* Leads */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Leads / mo</div>
          <div
            className="bg-gray-100 h-8 overflow-visible flex items-center justify-start mx-auto relative"
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
              <div className="absolute top-[-2.5rem] left-[70%] text-[#C8102E] text-xs font-medium pointer-events-none bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>

        {/* Customers */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Customers / mo</div>
          <div
            className="bg-gray-100 h-8 overflow-visible flex items-center justify-start mx-auto relative"
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
              <div className="absolute top-[-2.5rem] left-[70%] text-[#C8102E] text-xs font-medium pointer-events-none bg-white px-2 py-1 rounded shadow whitespace-nowrap">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportAsImage}
        className="mt-4 px-4 py-2 text-black border border-black rounded hover:bg-[#C8102E] hover:text-white transition"
      >
        Export as Image
      </button>
    </div>
  );
};

export default AnimatedFunnel;
