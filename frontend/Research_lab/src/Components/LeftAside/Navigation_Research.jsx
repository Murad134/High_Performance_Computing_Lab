import { NavLink } from "react-router-dom";
const navigation = [
  {
    label: "Departments",
    path: "departments",
  },
  {
    label: "Teams",
    path: "teams",
  },
];
export default function NavigationResearch() {
  return (
    <aside className="px-4 py-6 ">
      <h2 className="text-xl font-bold mb-6">Research</h2>

      <nav className="space-y-3">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition ${isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}