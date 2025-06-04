import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBarsProgress, faShapes, faPrint, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../Actions/userAction';

const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.loginAdmin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  const menuItems = [
    { path: "/dashboard", icon: faBarsProgress, label: "Dashboard" },
    { path: "/users", icon: faUsers, label: "Users" },
    { path: "/categories", icon: faShapes, label: "Categories" },
    { path: "/products", icon: faPrint, label: "Products" },
  ];

  return (
    <aside className="sidebar fixed left-0 top-0 z-20 h-full w-full max-w-xs bg-gray-900 text-white shadow-lg border-r border-gray-700 lg:w-1/4 xl:w-1/5">
      <div className="flex items-center justify-center py-6 px-4 border-b border-gray-800">
        <NavLink to="/dashboard" className="h-20 w-4/5">
          <img src={Logo} alt="Admin Dashboard Logo" className="h-[80px] w-full object-contain" />
        </NavLink>
      </div>

      <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-md mx-4 my-6 shadow-inner">
        <div className="flex flex-col flex-1">
          <span className="font-semibold text-lg leading-tight truncate">ADMIN</span>
          <span className="text-gray-400 text-sm truncate">admin@gmail.com</span>
        </div>
      </div>

      <nav className="flex flex-col px-2 space-y-1">
        {menuItems.map(({ path, icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 w-full rounded-md px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-green-600 border-l-4 border-green-400 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <FontAwesomeIcon icon={icon} className="w-5 h-5" />
            {label}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full rounded-md px-4 py-3 mt-4 text-sm font-medium text-red-400 hover:bg-red-700 hover:text-red-100 transition"
          title="Logout"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
