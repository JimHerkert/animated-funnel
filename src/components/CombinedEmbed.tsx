import React, { useEffect } from "react";

const CombinedEmbed: React.FC = () => {
  // load ConvertCalculator embed script once
  useEffect(() => {
    const s = document.createElement("script");
    s.src   = "https://scripts.convertcalculator.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Calculator + Funnel</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl">
        {/* LEFT: ConvertCalculator */}
        <div className="flex-1 border p-4 rounded shadow">
          <div
            className="calculator"
            data-calc-id="WCFSz5KWq62w2toiB"
            data-type="framed"
          ></div>
        </div>

        {/* RIGHT: clean funnel iframe */}
        <div className="flex-1 border p-4 rounded shadow">
          <iframe
            src="https://animated-funnel-1t44.vercel.app/embed?visitors=5000&mql=4&close=10&uplift=15"
            title="Animated Funnel"
            width="100%"
            height="600"
            style={{ border: "none", minHeight: "600px" }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

export default CombinedEmbed;
