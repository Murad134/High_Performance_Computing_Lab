import { Outlet } from "react-router-dom";
import LeftAside from "../Components/LeftAsideThesis";
import React, { useState } from "react";

export default function Publication() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  return (
    <div className="pt-10  px-4 md:px-6 flex flex-col md:flex-row gap-6">
      <main className="flex-1 rounded-lg  p-6">
        <Outlet context={{ filter, setFilter, selected, setSelected }} />
      </main>
    </div>

  );
}
