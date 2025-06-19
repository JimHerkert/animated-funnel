import React, { useEffect, useState } from "react";
import AnimatedFunnel from "./components/AnimatedFunnel";

const App: React.FC = () => {
  const [data, setData] = useState({
    visitors: 0,
    uplift: 0,
    mqlRate: 0,
    customerRate: 0,
    life: 3,
  });

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (typeof event.data !== "object") return;

      const {
        QMNTHLYWEBVISITORS,
        QSCRIBEFFECT,
        QMQLRATE,
        QCUSTCONV,
        QUSEFULELIFE,
      } = event.data;

      setData({
        visitors: parseFloat(QMNTHLYWEBVISITORS) || 0,
        uplift: parseFloat(QSCRIBEFFECT) || 0,
        mqlRate: parseFloat(QMQLRATE) || 0,
        customerRate: parseFloat(QCUSTCONV) || 0,
        life: parseFloat(QUSEFULELIFE) || 3,
      });
    };

    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  return (
    <AnimatedFunnel
      visitors={data.visitors}
      uplift={data.uplift}
      mqlRate={data.mqlRate}
      customerRate={data.customerRate}
      life={data.life}
    />
  );
};

export default App;
