import { useStore } from '../../store/useStore';
import type { Role } from '../../types';

const Header = () => {
  const { role, setRole } = useStore();

  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      {/* Left side */}
      <div>
        <p className="text-sm text-gray-500">Welcome back 👋</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            role === 'admin'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {role === 'admin' ? '🛡️ Admin' : '👤 Viewer'}
        </span>

        {/* Role Switcher */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </header>
  );
};

export default Header;