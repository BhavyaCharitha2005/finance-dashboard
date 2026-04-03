import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      {/* Main Content */}
      <main className="ml-56 pt-16 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;