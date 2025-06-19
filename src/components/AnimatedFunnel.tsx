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
  suffix?: string;
  usefulLife?: number; // for lifetime multiplier
}

const AnimatedFunnel: React.FC<FunnelProps> = ({
  visitors,
  uplift,
  baselineLeads,
  upliftLeads,
  baselineCustomers,
  upliftCustomers,
  suffix = "/ mo",
  usefulLife = 5,
}) => {
  const fmt = (n: number) => Math.round(n).toLocaleString();
  const funnelRef = useRef<HTMLDivElement>(null);

  const [hoverLeads, setHoverLeads] = useState(false);
  const [hoverCustomers, setHoverCustomers] = useState(false);
  const [view, setView] = useState<"month" | "year" | "lifetime">("month");

  const multiplier =
    view === "month" ? 1 : view === "year" ? 12 : 12 * usefulLife;

  const scaled = {
    visitors: visitors * multiplier,
    baseLeads: baselineLeads * multiplier,
    upliftLeads: upliftLeads * multiplier,
    baseCustomers: baselineCustomers * multiplier,
    upliftCustomers: upliftCustomers * multiplier,
  };

  const leadBasePct = scaled.baseLeads / scaled.upliftLeads;
  const custBasePct = scaled.baseCustomers / scaled.upliftCustomers;

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
    <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto p-6">
      {/* Toggle Buttons */}
      <div className="flex gap-4 justify-center mb-2">
        {["month", "year", "lifetime"].map((label) => (
          <button
            key={label}
            onClick={() => setView(label as any)}
            className={`px-4 py-1 border border-black rounded text-sm ${
              view === label ? "bg-[#C8102E] text-white" : "bg-white text-black"
            } hover:bg-[#C8102E] hover:text-white transition`}
          >
            {label[0].toUpperCase() + label.slice(1)}
          </button>
        ))}
      </div>

      <div ref={funnelRef} className="flex flex-col items-center gap-8 w-full">
        {/* Visitors */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Visitors / {view}</div>
          <div className="bg-gray-200 h-8 w-full rounded-full flex items-center justify-center text-xs font-semibold">
            {fmt(scaled.visitors)}
          </div>
        </div>

        {/* Leads */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Leads / {view}</div>
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
              {fmt(scaled.baseLeads)}
            </motion.div>
            <motion.div
              className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold rounded-r-full"
              style={{ width: `${(1 - leadBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - leadBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              +{fmt(scaled.upliftLeads - scaled.baseLeads)}
            </motion.div>
            {hoverLeads && (
              <div className="absolute -top-10 right-0 text-red-600 text-xs font-medium pointer-events-none bg-white px-2 py-1 rounded shadow">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>

        {/* Customers */}
        <div className="w-full flex flex-col items-center">
          <div className="text-sm mb-1">Customers / {view}</div>
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
              {fmt(scaled.baseCustomers)}
            </motion.div>
            <motion.div
              className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-semibold rounded-r-full"
              style={{ width: `${(1 - custBasePct) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(1 - custBasePct) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              +{fmt(scaled.upliftCustomers - scaled.baseCustomers)}
            </motion.div>
            {hoverCustomers && (
              <div className="absolute -top-10 right-0 text-red-600 text-xs font-medium pointer-events-none bg-white px-2 py-1 rounded shadow">
                +{Math.round(uplift)}% Scribology Effect
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportAsImage}
        className="mt-6 px-4 py-1 border border-black rounded text-sm bg-white text-black hover:bg-[#C8102E] hover:text-white transition"
      >
        Export as Image
      </button>
    </div>
  );
};

export default AnimatedFunnel;
