// src/components/CombinedEmbed.tsx
import React, { useEffect } from "react";

const CombinedEmbed: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.convertcalculator.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Funnel + Calculator</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl">
        {/* ConvertCalculator LEFT */}
        <div className="flex-1 border p-4 rounded shadow">
          <div
            className="calculator"
            data-calc-id="WCFSz5KWq62w2toiB"
            data-type="framed"
          ></div>
        </div>

        {/* Animated Funnel RIGHT */}
        <div className="flex-1 border p-4 rounded shadow">
          <iframe
            src="https://animated-funnel-1t44.vercel.app"
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
