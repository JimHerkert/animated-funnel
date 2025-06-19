import React from "react";
import { motion } from "framer-motion";

interface FunnelProps {
  visitors: number;
  uplift: number;
  leadWidth: number;         // px (67 % of Visitors)
  customerWidth: number;     // px (67 % of Leads)
  baselineLeads: number;
  upliftLeads: number;
  baselineCustomers: number;
  upliftCustomers: number;
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  uplift,
  leadWidth,
  customerWidth,
  baselineLeads,
  upliftLeads,
  baselineCustomers,
  upliftCustomers,
}) => {
  const fmt = (n: number) => Math.round(n).toLocaleString();

  // proportions for segmented bars
  const leadBasePct = baselineLeads / upliftLeads;
  const custBasePct = baselineCustomers / upliftCustomers;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto p-6">
      {/* Visitors */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Visitors</div>
        <div className="bg-gray-200 h-8 w-full rounded-full flex items-center justify-center text-xs font-semibold">
          {fmt(visitors)} / mo
        </div>
      </div>

      {/* Leads */}
      <div className="flex flex-col items-center">
        <div className="text-sm mb-1">Leads</div>
        <div
          className="bg-gray-100 h-8 rounded-full overflow-hidden flex items-center"
          style={{ width: `${leadWidth}px` }}
        >
          <motion.div
            className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold px-2"
            style={{ width: `${leadBasePct * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${leadBasePct * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {fmt(baselineLeads)}
          </motion.div>
          <motion.div
            className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold px-2"
            style={{ width: `${(1 - leadBasePct) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${(1 - leadBasePct) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            +{fmt(upliftLeads - baselineLeads)}
          </motion.div>
        </div>
      </div>

      {/* Customers */}
      <div className="flex flex-col items-center">
        <div className="text-sm mb-1">Customers</div>
        <div
          className="bg-gray-100 h-8 rounded-full overflow-hidden flex items-center"
          style={{ width: `${customerWidth}px` }}
        >
          <motion.div
            className="bg-gray-300 h-full flex items-center justify-center text-gray-900 text-xs font-semibold px-2"
            style={{ width: `${custBasePct * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${custBasePct * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
          >
            {fmt(baselineCustomers)}
          </motion.div>
          <motion.div
            className="bg-green-600 h-full flex items-center justify-center text-white text-xs font-semibold px-2"
            style={{ width: `${(1 - custBasePct) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${(1 - custBasePct) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
          >
            +{fmt(upliftCustomers - baselineCustomers)}
          </motion.div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        Uplift of <span className="font-medium">{uplift}%</span> applied to both conversion stages
      </p>
    </div>
  );
};

export default AnimatedFunnel;
