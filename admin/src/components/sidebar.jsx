import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBarsProgress, faShapes, faPrint, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Logo = `${process.env.REACT_APP_API_URL}/assets/images/logo-white.webp`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    sessionStorage.removeItem('isUserLoggedIn');
    navigate('/');  
  };

  return (
    <aside className="sidebar z-10 lg:z-0 block min-h-screen fixed left-0 pb-14 max-h-screen w-full lg:w-1/4 xl:w-1/5 bg-gray-800 text-white overflow-x-hidden border-r">
      <div className="flex items-center p-2 my-4 mx-3.5">
        <Link to="/dashboard" className="h-20 flex w-max mx-auto items-center justify-center">
          <img src={Logo} alt="Fresh Organic Grocery" className="h-full w-4/5 object-contain" />
        </Link>
      </div>

      <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-md shadow-lg my-4 mx-3.5">
        <div className="flex flex-col gap-0">
          <span className="font-medium text-lg">name</span>
          <span className="text-gray-300 text-sm">mail</span>
        </div>
        <button className="lg:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center"></button>
      </div>

      <div className="flex flex-col w-full gap-0 my-8">
        <Link to="/dashboard">
          <button className="hover:bg-gray-700 flex gap-3 items-center py-2 px-4 font-medium text-sm w-full">
            <FontAwesomeIcon icon={faBarsProgress} /> Dashboard
          </button>
        </Link>
        <Link to="/users">
          <button className="hover:bg-gray-700 flex gap-3 items-center py-2 px-4 font-medium text-sm w-full">
            <FontAwesomeIcon icon={faUsers} /> Users
          </button>
        </Link>
        <Link to="/categories">
          <button className="hover:bg-gray-700 flex gap-3 items-center py-2 px-4 font-medium text-sm w-full">
            <FontAwesomeIcon icon={faShapes} /> Categories
          </button>
        </Link>
        <Link to="#">
          <button className="hover:bg-gray-700 flex gap-3 items-center py-2 px-4 font-medium text-sm w-full">
            <FontAwesomeIcon icon={faPrint} /> Products
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="hover:bg-gray-700 flex gap-3 items-center py-2 px-4 font-medium text-sm w-full"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
