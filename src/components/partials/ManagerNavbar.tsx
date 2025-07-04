import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
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

  const [openAssessment, setOpenAssessment] = useState(false);
  const [openHiring, setOpenHiring] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenAssessment(false);
        setOpenHiring(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <div className="border px-2 pt-1 flex rounded-lg border-primary-toned-800 me-12">
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.14369 11.3333C6.14369 7.28324 9.42693 4 13.477 4C17.5272 4 20.8104 7.28324 20.8104 11.3333C20.8104 15.3835 17.5272 18.6667 13.477 18.6667C9.42693 18.6667 6.14369 15.3835 6.14369 11.3333ZM13.477 2C8.32237 2 4.14369 6.17868 4.14369 11.3333C4.14369 16.488 8.32237 20.6667 13.477 20.6667C15.6941 20.6667 17.7306 19.8936 19.3318 18.6024L26.4366 25.7071C26.8272 26.0976 27.4602 26.0976 27.8508 25.7071C28.2413 25.3165 28.2413 24.6835 27.8508 24.2929L20.7461 17.1881C22.0373 15.5869 22.8104 13.5504 22.8104 11.3333C22.8104 6.17868 18.6317 2 13.477 2Z"
                  fill="#19484E"
                />
              </svg>

              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none focus:ring-0 w-[20vw]"
              />
            </div>
            <div className="flex text-xl font-bold text-primary-toned-700 px-2 gap-2">
              <span>Upgrade</span>
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.287675 7.89609C-0.0999453 8.28949 -0.0952554 8.92259 0.298145 9.31019C0.691555 9.69789 1.3247 9.69319 1.71232 9.29979L7.0037 3.92939L7.0037 17.6006C7.0037 18.1529 7.45141 18.6006 8.00371 18.6006C8.55601 18.6006 9.00371 18.1529 9.0037 17.6006L9.0037 3.93599L14.2886 9.29978C14.6762 9.69319 15.3094 9.69789 15.7028 9.31019C16.0962 8.92259 16.1009 8.28949 15.7133 7.89609L8.8909 0.971885C8.4013 0.474985 7.5997 0.474985 7.1101 0.971885L0.287675 7.89609Z"
                  fill="#226068"
                />
              </svg>
            </div>
            <LanguageSwitcher />
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-4 px-1"
            >
              <path
                d="M19.9591 4C26.7089 4 32.2202 9.32458 32.4521 16.0818L32.4591 16.5V23.3283L34.7591 28.5883C34.8742 28.8515 34.9336 29.1357 34.9336 29.423C34.9336 30.5735 34.0009 31.5064 32.8502 31.5064L24.9591 31.5089C24.9591 34.2702 22.7206 36.5089 19.9591 36.5089C17.2962 36.5089 15.1197 34.4272 14.9676 31.8025L14.9583 31.505L7.08387 31.5064C6.79831 31.5064 6.51579 31.4475 6.25386 31.3339C5.19852 30.8754 4.71461 29.6483 5.17301 28.593L7.45909 23.3298V16.4998C7.46009 9.57518 13.0459 4 19.9591 4ZM22.4584 31.505L17.4591 31.5089C17.4591 32.8895 18.5784 34.0089 19.9591 34.0089C21.2586 34.0089 22.3266 33.0173 22.4476 31.7495L22.4584 31.505ZM19.9591 6.5C14.4255 6.5 9.95989 10.9571 9.95909 16.5V23.8493L7.71912 29.0064H32.2132L29.9591 23.851L29.9592 16.5214L29.9531 16.1461C29.7679 10.757 25.3617 6.5 19.9591 6.5Z"
                fill="#226068"
              />
            </svg>

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
