import "./variables.css";
import { useState } from "react";
import { Sidebar } from "./components/sidebar/Sidebar.tsx";
import { Main } from "./components/main/Main.tsx";

export function App() {
  const [view, setView] = useState("home");

  return (
    <div className="container">
      <Sidebar onViewChange={setView} />
      <Main view={view} />
    </div>
  );
}
