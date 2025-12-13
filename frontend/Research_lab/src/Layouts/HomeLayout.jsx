// import { Outlet } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// export default function MainLayout() {
//     return (
//         <div className="min-h-screen flex flex-col bg-base-200">
//             <Navbar />
//             <main className="container mx-auto flex-grow p-4">
//                 <Outlet />
//             </main>
//             <Footer />
//         </div>
//     );
// }

import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-base-200">
            <Navbar />
            <main className="w-full flex-grow">   {/* ✅ full width */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
