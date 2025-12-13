import { Link } from "react-router-dom";

export default function ResearchLayout({ children, leftNav = null }) {
  const defaultNav = [
    { name: "Departments", link: "/research/departments" },
    { name: "Teams", link: "/research/teams" },
    { name: "Experimental Platforms", link: "#" },
    { name: "Cross-cutting axes", link: "#" },
    { name: "European projects and FEDER funded projects", link: "#" }
  ];

  const showBackButton = leftNav !== null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Left Navigation Sidebar */}
        <aside className="w-64 bg-blue-400 text-white rounded-lg p-6 h-fit sticky top-8">
          <h2 className="text-2xl font-bold mb-6">Navigation</h2>
          
          {showBackButton && (
            <Link to="/research" className="block text-pink-300 hover:text-white mb-4">
              &lt; Research
            </Link>
          )}
          
          <nav className="space-y-3">
            {(leftNav || defaultNav).map((item, idx) => (
              <div key={idx}>
                {typeof item === 'string' ? (
                  <div className="text-pink-300">• {item}</div>
                ) : (
                  <>
                    <Link 
                      to={item.link} 
                      className="block text-pink-300 hover:text-white transition"
                    >
                      • {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child, cidx) => (
                          <Link 
                            key={cidx}
                            to={child.link}
                            className="block text-pink-300 hover:text-white text-sm"
                          >
                            • {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>

        {/* Right Sidebar - Colloquium */}
        <aside className="w-80">
          <div className="bg-blue-400 text-white rounded-lg p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Colloquium 2025</h2>
            
            {/* Network Diagram */}
            <div className="relative h-64 mb-6 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Network connections */}
                <line x1="100" y1="40" x2="60" y2="100" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="100" y1="40" x2="140" y2="100" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="60" y1="100" x2="100" y2="160" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="140" y1="100" x2="100" y2="160" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="100" y1="40" x2="170" y2="80" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="170" y1="80" x2="140" y2="100" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="60" y1="100" x2="30" y2="140" stroke="#93C5FD" strokeWidth="2"/>
                <line x1="140" y1="100" x2="170" y2="140" stroke="#93C5FD" strokeWidth="2"/>
                
                {/* Nodes */}
                <circle cx="100" cy="40" r="8" fill="#60A5FA"/>
                <circle cx="60" cy="100" r="8" fill="#60A5FA"/>
                <circle cx="140" cy="100" r="8" fill="#60A5FA"/>
                <circle cx="100" cy="160" r="8" fill="#60A5FA"/>
                <circle cx="170" cy="80" r="8" fill="#60A5FA"/>
                <circle cx="30" cy="140" r="8" fill="#60A5FA"/>
                <circle cx="170" cy="140" r="8" fill="#60A5FA"/>
                
                {/* Central boxes */}
                <rect x="60" y="90" width="80" height="30" fill="#9333EA" rx="4"/>
                <text x="100" y="108" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  COLLOQUIUM
                </text>
                
                <rect x="70" y="115" width="60" height="25" fill="#7C3AED" rx="4"/>
                <text x="100" y="131" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                  LORIA
                </text>
              </svg>
            </div>

            <div className="space-y-3">
              <Link to="#" className="block text-pink-300 hover:text-white transition">
                2025 agenda
              </Link>
              <Link to="#" className="block text-pink-300 hover:text-white transition">
                Previous talks
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}