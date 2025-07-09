import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "/svg/logo.svg";
import skillsharp from "/svg/skillsharp.svg";
import { useAppSelector } from "../../app/hooks";
import paths from "../../router/paths";
import { useLogoutMutation } from "../../features/auth/api/logout.api";
import { authSelectors } from "../../features/auth/store/authSlice";
import LanguageSwitcher from "./Language";
import classNames from "classnames";
import Portal from "../ui/common/Portal";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
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

  const url = window.location.pathname;

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
              <img src={logo} alt="logo" className="size-10" />
              <img
                className="ml-3 hidden lg:block h-8"
                src={skillsharp}
                alt="project name"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              to="/manager/faq"
              className={classNames(
                "flex mr-6 icon-link items-center p-2 hover:text-primary hover:border-b-2 hover:border-primary-toned-500",
                url.includes("/manager/faq")
                  ? "border-b-2 text-primary  border-primary"
                  : ""
              )}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3.33325C29.205 3.33325 36.6667 10.7966 36.6667 19.9999C36.6667 29.2033 29.205 36.6666 20 36.6666C10.795 36.6666 3.33334 29.2033 3.33334 19.9999C3.33334 10.7966 10.795 3.33325 20 3.33325ZM20 6.11159C12.3417 6.11159 6.11168 12.3416 6.11168 19.9999C6.11168 27.6583 12.3417 33.8883 20 33.8883C27.6583 33.8883 33.8883 27.6583 33.8883 19.9999C33.8883 12.3416 27.6583 6.11159 20 6.11159ZM20 25.8333C20.9205 25.8333 21.6667 26.5794 21.6667 27.4999C21.6667 28.4204 20.9205 29.1666 20 29.1666C19.0795 29.1666 18.3333 28.4204 18.3333 27.4999C18.3333 26.5794 19.0795 25.8333 20 25.8333ZM20 11.2499C22.5313 11.2499 24.5833 13.302 24.5833 15.8333C24.5833 17.5179 24.0875 18.4566 22.8315 19.7643L22.5505 20.0504C21.514 21.0869 21.25 21.5271 21.25 22.4999C21.25 23.1903 20.6903 23.7499 20 23.7499C19.3097 23.7499 18.75 23.1903 18.75 22.4999C18.75 20.8153 19.2458 19.8766 20.5018 18.5689L20.7828 18.2828C21.8193 17.2463 22.0833 16.8061 22.0833 15.8333C22.0833 14.6827 21.1507 13.7499 20 13.7499C18.9213 13.7499 18.0342 14.5697 17.9275 15.6202L17.9167 15.8333C17.9167 16.5236 17.357 17.0833 16.6667 17.0833C15.9763 17.0833 15.4167 16.5236 15.4167 15.8333C15.4167 13.302 17.4687 11.2499 20 11.2499Z"
                  fill="#212121"
                  className={classNames(
                    url.includes("/manager/faq")
                      ? "icon-select"
                      : "icon-path"
                  )}
                />
              </svg>
              <div
                onClick={() => navigate("/manager/faq")}
                className="ps-1"
              >
                <div className="font-bold">FAQ</div>
              </div>
            </Link>

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
                          <PersonIcon className="mr-2" />
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          <LogoutIcon className="mr-2" />
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
