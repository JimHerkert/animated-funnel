import React from "react";
import CombinedEmbed from "./components/CombinedEmbed";
import EmbedFunnel   from "./components/EmbedFunnel";

/**
 * No router needed: decide view by pathname.
 *   /            → full calculator + funnel
 *   /embed       → funnel-only iframe view
 */
function App() {
  return window.location.pathname === "/embed"
    ? <EmbedFunnel />
    : <CombinedEmbed />;
}

export default App;
