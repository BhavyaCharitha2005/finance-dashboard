import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/transactions', label: 'Transactions', icon: '💳' },
  { path: '/insights', label: 'Insights', icon: '💡' },
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-gray-900 text-white flex flex-col z-10">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">💰 FinTrack</h1>
        <p className="text-xs text-gray-400 mt-1">Finance Dashboard</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">© 2024 FinTrack</p>
      </div>
    </aside>
  );
};

export default Sidebar;