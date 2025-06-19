import React from "react";
import CombinedEmbed from "./components/CombinedEmbed";
import EmbedFunnel from "./components/EmbedFunnel";

function App() {
  const path = window.location.pathname;
  return path === "/embed" ? <EmbedFunnel /> : <CombinedEmbed />;
}

export default App;
