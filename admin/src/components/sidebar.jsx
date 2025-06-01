import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBarsProgress, faShapes, faPrint, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
  sessionStorage.clear(); // or remove individual keys
  localStorage.removeItem('isUserLoggedIn');
  window.location.href = '/'; // or use navigate('/login')
};


  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar fixed left-0 top-0 z-20 h-full w-full max-w-xs bg-gray-900 text-white shadow-lg border-r border-gray-700 lg:w-1/4 xl:w-1/5">
      <div className="flex items-center justify-center py-6 px-4 border-b border-gray-800">
        <Link to="/dashboard" className="h-20 w-4/5">
          <img src={Logo} alt="Fresh Organic Grocery" className="h-full w-full object-contain" />
        </Link>
      </div>

      <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-md mx-4 my-6 shadow-inner">
        <div className="flex flex-col flex-1">
          <span className="font-semibold text-lg leading-tight truncate">ADMIN</span>
          <span className="text-gray-400 text-sm truncate">admin@gmail.com</span>
        </div>
        {/* Placeholder for avatar or logout button */}
        {/* <button
          className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition"
          title="Profile"
        >
          JD
        </button> */}
      </div>

      <nav className="flex flex-col px-2 space-y-1">
        {[{
          path: "/dashboard",
          icon: faBarsProgress,
          label: "Dashboard"
        }, {
          path: "/users",
          icon: faUsers,
          label: "Users"
        }, {
          path: "/categories",
          icon: faShapes,
          label: "Categories"
        }, {
          path: "/products",
          icon: faPrint,
          label: "Products"
        }].map(({ path, icon, label }) => (
          <Link key={path} to={path} className="group">
            <button
              className={`flex items-center gap-4 w-full rounded-md px-4 py-3 text-sm font-medium transition 
                ${isActive(path)
                  ? 'bg-green-600 border-l-4 border-green-400 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <FontAwesomeIcon icon={icon} className={`w-5 h-5 transition ${isActive(path) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              {label}
            </button>
          </Link>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full rounded-md px-4 py-3 mt-4 text-sm font-medium text-red-400 hover:bg-red-700 hover:text-red-100 transition"
          title="Logout"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
