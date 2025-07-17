import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <nav className="flex justify-around mb-4 border-b pb-2">
          <Link to="/" className="hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
