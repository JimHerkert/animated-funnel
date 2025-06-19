import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface FunnelProps {
  visitors: number;
  uplift: number;
  baselineLeads: number;
  upliftLeads: number;
  baselineCustomers: number;
  upliftCustomers: number;
  suffix: string;
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  uplift,
  baselineLeads,
  upliftLeads,
  baselineCustomers,
  upliftCustomers,
  suffix,
}) => {
  const fmt = (n: number) => Math.round(n).toLocaleString();
  const funnelRef = useRef<HTMLDivElement>(null);

  const leadBasePct = upliftLeads > 0 ? baselineLeads / upliftLeads : 0;
  const custBasePct = upliftCustomers > 0 ? baselineCustomers / upliftCustomers : 0;

  // hover state
  const [hoverLeads, setHoverLeads] = useState(false);
  const [hoverCust, setHoverCust]   = useState(false);

  // export helper
  const exportImage = async () => {
    if (funnelRef.current) {
      const canvas = await html2canvas(funnelRef.current);
      const a = document.createElement("a");
      a.download = "funnel.png";
      a.href = canvas.toDataURL();
      a.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto p-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={exportImage}
      >
        Export as Image
      </button>

      <div ref={funnelRef} className="flex flex-col items-center gap-8 w-full">
        {/* Visitors */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">{`Visitors ${suffix}`}</div>
          <div className="bg-gray-200 h-8 w-full rounded-full flex items-center justify-center text-xs font-semibold">
            {fmt(visitors)}
          </div>
        </div>

        {/* Leads */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">{`Leads ${suffix}`}</div>
          <div
            className="bg-gray-100 h-8 overflow-visible flex relative mx-auto"
            style={{ width: "67%" }}
            onMouseEnter={() => setHoverLeads(true)}
            onMouseLeave={() => setHoverLeads(false)}
          >
            {/* baseline */}
            <motion.div
              className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold rounded-l-full"
              style={{ width: `${leadBasePct * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${leadBasePct * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {fmt(baselineLeads)}
            </motion.div>
            {/* uplift */}
            <motion.div
              className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold rounded-r-full"
              style={{ width: `${(1 - leadBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - leadBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              +{fmt(upliftLeads - baselineLeads)}
            </motion.div>

            {hoverLeads && (
              <div className="absolute -top-10 right-0 bg-white px-1 rounded shadow text-red-600 text-xs pointer-events-none">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>

        {/* Customers */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">{`Customers ${suffix}`}</div>
          <div
            className="bg-gray-100 h-8 overflow-visible flex relative mx-auto"
            style={{ width: "44.89%" }}
            onMouseEnter={() => setHoverCust(true)}
            onMouseLeave={() => setHoverCust(false)}
          >
            {/* baseline */}
            <motion.div
              className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold rounded-l-full"
              style={{ width: `${custBasePct * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${custBasePct * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
            >
              {fmt(baselineCustomers)}
            </motion.div>
            {/* uplift */}
            <motion.div
              className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold rounded-r-full"
              style={{ width: `${(1 - custBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - custBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
            >
              +{fmt(upliftCustomers - baselineCustomers)}
            </motion.div>

            {hoverCust && (
              <div className="absolute -top-10 right-0 bg-white px-1 rounded shadow text-red-600 text-xs pointer-events-none">
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
