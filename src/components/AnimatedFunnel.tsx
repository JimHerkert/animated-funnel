import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface FunnelProps {
  visitors: number;
  mqlRate: number;
  customerRate: number;
  uplift: number;
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  mqlRate,
  customerRate,
  uplift,
}) => {
  const baselineLeads = visitors * (mqlRate / 100);
  const baselineCustomers = baselineLeads * (customerRate / 100);
  const upliftFactor = 1 + uplift / 100;
  const upliftLeads = baselineLeads * upliftFactor;
  const upliftCustomers = baselineCustomers * upliftFactor;

  const maxWidth = 320;
  const widthUpliftLead = (upliftLeads / visitors) * maxWidth;
  const widthUpliftCust = (upliftCustomers / visitors) * maxWidth;

  const [leadWidth, setLeadWidth] = useState(widthUpliftLead);
  const [custWidth, setCustWidth] = useState(widthUpliftCust);

  useEffect(() => {
    setLeadWidth(widthUpliftLead);
    setCustWidth(widthUpliftCust);
  }, [uplift, widthUpliftLead, widthUpliftCust]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Animated Conversion Funnel</h2>

      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Visitors</div>
        <div className="bg-gray-200 h-8 w-full rounded-full relative overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center text-xs font-semibold">
            {visitors.toLocaleString()} / mo
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Leads</div>
        <div className="bg-gray-100 h-8 w-full rounded-full relative overflow-hidden flex items-center">
          <motion.div
            className="bg-red-600 h-full rounded-r-full flex items-center justify-center text-white text-xs font-semibold pl-2"
            initial={{ width: 0 }}
            animate={{ width: leadWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {Math.round(upliftLeads).toLocaleString()}
          </motion.div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Customers</div>
        <div className="bg-gray-100 h-8 w-full rounded-full relative overflow-hidden flex items-center">
          <motion.div
            className="bg-green-600 h-full rounded-r-full flex items-center justify-center text-white text-xs font-semibold pl-2"
            initial={{ width: 0 }}
            animate={{ width: custWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
          >
            {Math.round(upliftCustomers).toLocaleString()}
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
