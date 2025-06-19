import React, { useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

interface FunnelProps {
  visitors: number;
  uplift: number;
  baselineLeads: number;
  upliftLeads: number;
  baselineCustomers: number;
  upliftCustomers: number;
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  uplift,
  baselineLeads,
  upliftLeads,
  baselineCustomers,
  upliftCustomers,
}) => {
  const fmt = (n: number) => Math.round(n).toLocaleString();
  const funnelRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto p-6">
      <button
        onClick={exportAsImage}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Export as Image
      </button>

      <div ref={funnelRef} className="flex flex-col items-center gap-8 w-full">
        {/* Visitors */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Visitors</div>
          <div className="bg-gray-200 h-8 w-full rounded-full flex items-center justify-center text-xs font-semibold">
            {fmt(visitors)} / mo
          </div>
        </div>

        {/* Leads */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Leads</div>
          <div
            className="bg-gray-100 h-8 rounded-full overflow-hidden flex items-center justify-start mx-auto relative group"
            style={{ width: "67%" }}
          >
            <motion.div
              className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold"
              style={{ width: `${leadBasePct * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${leadBasePct * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {fmt(baselineLeads)}
            </motion.div>
            <motion.div
              className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold relative"
              style={{ width: `${(1 - leadBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - leadBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              +{fmt(upliftLeads - baselineLeads)}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                +{Math.round(uplift)}% uplift
              </span>
            </motion.div>
          </div>
        </div>

        {/* Customers */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Customers</div>
          <div
            className="bg-gray-100 h-8 rounded-full overflow-hidden flex items-center justify-start mx-auto relative group"
            style={{ width: "44.89%" }}
          >
            <motion.div
              className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold"
              style={{ width: `${custBasePct * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${custBasePct * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
            >
              {fmt(baselineCustomers)}
            </motion.div>
            <motion.div
              className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold relative"
              style={{ width: `${(1 - custBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - custBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
            >
              +{fmt(upliftCustomers - baselineCustomers)}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                +{Math.round(uplift)}% uplift
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFunnel;
