// src/App.tsx
import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

const App: React.FC = () => {
  const [visitors, setVisitors] = useState(5000);
  const [mqlRate, setMqlRate] = useState(4); // %
  const [customerRate, setCustomerRate] = useState(10); // %
  const [uplift, setUplift] = useState(15); // %
  const [life, setLife] = useState(12); // months

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "UPDATE_FUNNEL") {
        setVisitors(event.data.monthlyVisitors || 0);
        setMqlRate(event.data.mql || 0);
        setCustomerRate(event.data.close || 0);
        setUplift(event.data.uplift || 0);
        setLife(event.data.life || 0);
        console.log("📥 Received from CC:", event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <AnimatedFunnel
      visitors={visitors}
      uplift={uplift}
      mqlRate={mqlRate}
      customerRate={customerRate}
      life={life}
    />
  );
};

export default App;
