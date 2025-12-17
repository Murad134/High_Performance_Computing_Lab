import { Outlet } from "react-router-dom";
import React, { useState } from "react";

export default function Supervison() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  return (
    <div className="pt-10  px-2 md:px-4 flex flex-col md:flex-row gap-6">
      <main className="flex-1 rounded-lg  px-2 py-4">
        <Outlet context={{ filter, setFilter, selected, setSelected }} />
      </main>
    </div>

  );
}
