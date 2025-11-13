import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RoutePage from "./Route";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RoutePage />
    </StrictMode>
);
