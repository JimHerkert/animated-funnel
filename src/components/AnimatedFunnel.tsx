import React from "react";
import { motion } from "framer-motion";

interface FunnelProps {
  visitors: number;
  mqlRate: number;
  customerRate: number;
  uplift: number;
  leadWidth: number;
  customerWidth: number;
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
  const format = (n: number) => Math.round(n).toLocaleString();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto p-6">
      {/* Visitors */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Visitors</div>
        <div className="bg-gray-200 h-8 w-full rounded-full relative overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center text-xs font-semibold">
            {format(visitors)} / mo
          </div>
        </div>
      </div>

      {/* Leads */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Leads</div>
        <div className="bg-gray-100 h-8 w-full rounded-full relative overflow-hidden flex items-center">
          <motion.div
            className="bg-gray-300 h-full rounded-r-full flex items-center justify-center text-gray-900 text-xs font-semibold px-2"
            initial={{ width: 0 }}
            animate={{ width: leadWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {format(baselineLeads)}
          </motion.div>
          <motion.div
            className="bg-red-600 h-full rounded-r-full flex items-center justify-center text-white text-xs font-semibold px-2"
            initial={{ width: 0 }}
            animate={{ width: leadWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            +{format(upliftLeads - baselineLeads)}
          </motion.div>
        </div>
      </div>

      {/* Customers */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Customers</div>
        <div className="bg-gray-100 h-8 w-full rounded-full relative overflow-hidden flex items-center">
          <motion.div
            className="bg-gray-300 h-full rounded-r-full flex items-center justify-center text-gray-900 text-xs font-semibold px-2"
            initial={{ width: 0 }}
            animate={{ width: customerWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
          >
            {format(baselineCustomers)}
          </motion.div>
          <motion.div
            className="bg-green-600 h-full rounded-r-full flex items-center justify-center text-white text-xs font-semibold px-2"
            initial={{ width: 0 }}
            animate={{ width: customerWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
          >
            +{format(upliftCustomers - baselineCustomers)}
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
