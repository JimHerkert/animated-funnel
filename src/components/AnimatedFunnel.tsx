import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * AnimatedFunnel Component
 * -----------------------------------
 * Props:
 *  - visitors: monthly unique visitors (number)
 *  - mqlRate: visitor → lead percentage (0‑100)
 *  - customerRate: lead → customer percentage (0‑100)
 *  - uplift: Scribology Effect percentage lift to BOTH conversion stages (0‑100)
 *
 * This component visualises the baseline funnel and animates the uplifted
 * funnel when the `uplift` prop changes. TailwindCSS is used for styling,
 * Framer‑Motion for smooth width transitions.
 */
export interface FunnelProps {
  visitors: number;
  mqlRate: number; // e.g. 4 means 4%
  customerRate: number; // e.g. 10 means 10%
  uplift: number; // 15 means 15% relative lift
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  mqlRate,
  customerRate,
  uplift,
}) => {
  // Derived metrics
  const baselineLeads = visitors * (mqlRate / 100);
  const baselineCustomers = baselineLeads * (customerRate / 100);

  const upliftFactor = 1 + uplift / 100;
  const upliftLeads = baselineLeads * upliftFactor;
  const upliftCustomers = baselineCustomers * upliftFactor;

  // Widths expressed as % of the visitors stage
  const maxWidth = 320; // px – maximum bar width for top of funnel
  const widthBaselineLead = (baselineLeads / visitors) * maxWidth;
  const widthBaselineCust = (baselineCustomers / visitors) * maxWidth;
  const widthUpliftLead = (upliftLeads / visitors) * maxWidth;
  const widthUpliftCust = (upliftCustomers / visitors) * maxWidth;

  // For animation we store current state that updates when props change
  const [leadWidth, setLeadWidth] = useState(widthBaselineLead);
  const [custWidth, setCustWidth] = useState(widthBaselineCust);

  useEffect(() => {
    // Trigger animation whenever uplift changes
    setLeadWidth(widthUpliftLead);
    setCustWidth(widthUpliftCust);
  }, [uplift, widthUpliftLead, widthUpliftCust]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Animated Conversion Funnel</h2>

      {/* Visitors bar (static) */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Visitors</div>
        <div className="bg-gray-200 h-8 w-full rounded-full relative overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center text-xs font-semibold">
            {visitors.toLocaleString()} / mo
          </div>
        </div>
      </div>

      {/* Leads bar */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Leads</div>
        <div className="bg-gray-100 h-8 w-full rounded-full relative overflow-hidden flex items-center">
          <motion.div
            className="bg-red-600 h-full rounded-r-full flex items-center justify-center text-white text-xs font-semibold pl-2"
            initial={{ width: widthBaselineLead }}
            animate={{ width: leadWidth }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {Math.round(upliftLeads).toLocaleString()}
          </motion.div>
        </div>
      </div>

      {/* Customers bar */}
      <div className="w-full flex flex-col items-center">
        <div className="text-sm mb-1">Customers</div>
        <div className="bg-gray-100 h-8 w-full rounded-full relative overflow-hidden flex items-center">
          <motion.div
            className="bg-green-600 h-full rounded-r-full flex items-center justify-center text-white text-xs font-semibold pl-2"
            initial={{ width: widthBaselineCust }}
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
