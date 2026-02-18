import React from "react";
import SimplePage from "./SimplePage";

export default function Cookies() {
  return (
    <SimplePage title="Cookies" subtitle="Explain what cookies are used for on your site.">
      <ul className="text-muted mb-0">
        <li>Essential cookies: login/session (if enabled)</li>
        <li>Analytics cookies: performance and usage (optional)</li>
        <li>No tracking ads in this demo</li>
      </ul>
    </SimplePage>
  );
}
