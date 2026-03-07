import { Outlet } from "react-router-dom";
import NavigationResearch from "../../Components/LeftAside/Navigation_Research";
function Researchs() {
  return (
    <div className="grid grid-cols-[280px_1fr]  min-h-screen">

      {/* Left Sidebar */}
      <NavigationResearch />

      {/* Main Content */}
      <main className="px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}
export default Researchs;