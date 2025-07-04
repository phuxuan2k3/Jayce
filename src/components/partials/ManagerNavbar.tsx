import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "/svg/logo.svg";
// import skillsharp from "/svg/skillsharp.svg";
import { useAppSelector } from "../../app/hooks";
import paths from "../../router/paths";
import { useLogoutMutation } from "../../features/auth/api/logout.api";
import { authSelectors } from "../../features/auth/store/authSlice";
import LanguageSwitcher from "./Language";
import Portal from "../ui/common/Portal";

const ManagerNavbar = ({ showNav = true }: { showNav?: boolean }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authState = useAppSelector(authSelectors.selectUserInfo);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate(paths.auth.LOGIN);
  };

  const handleLogoClick = () => {
    navigate(paths.manager.ROOT);
  };

  return (
    <nav className="bg-white drop-shadow-lg">
      <div className=" lg:mx-12 px-6   ">
        <div className="relative h-[60px] flex items-center justify-between">
          {showNav && (
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => {
                  toggleMobileMenu();
                }}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div
              onClick={handleLogoClick}
              className="flex shrink-0 items-center cursor-pointer"
            >
              <img src={logo} alt="logo" className="h-10" />
              {/* <img
                className="ml-3 hidden lg:block"
                src={skillsharp}
                alt="project name"
              />
              <span className="text-[12px] font-bold italic ms-1">Manager</span> */}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <LanguageSwitcher />

            <div className="relative ml-3">
              <div>
                <FontAwesomeIcon
                  className="block lg:hidden  text-[var(--primary-color)] text-xl"
                  icon={faRightToBracket}
                ></FontAwesomeIcon>
                <div className="hidden lg:block relative">
                  <img
                    className="size-8 rounded-full cursor-pointer"
                    src={
                      authState?.avatarPath ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
                    }
                    alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
                    onClick={toggleProfileMenu}
                  />
                  {isMenuOpen && (
                    <Portal id="product">
                      <div className="absolute right-10 top-14 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                        <Link
                          to={paths.manager.profile._layout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </div>
                    </Portal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <Portal id="product">
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/ipractice/pick"
                className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                aria-current="page"
              >
                Scenario
              </Link>
              <Link
                to="/test/list"
                className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
              >
                Questions
              </Link>
              <Link
                to="/mock"
                className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
              >
                Mock
              </Link>
              <Link
                to="/pricing"
                className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
              >
                Pricing
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </nav>
  );
};

export default ManagerNavbar;
