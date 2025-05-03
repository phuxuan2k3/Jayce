import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "/svg/logo.svg";
// import skillsharp from "/svg/skillsharp.svg";
import { useAppSelector } from "../../../app/hooks";
import paths from "../../../router/paths";
import { useLogoutMutation } from "../../../features/auth/api/logout.api";
import { authSelectors } from "../../../features/auth/store/authSlice";

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
    navigate(paths.manager._layout);
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
        <div className="relative h-[100px] flex items-center justify-between">
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
              <img src={logo} alt="logo" />
              {/* <img
                className="ml-3 hidden lg:block"
                src={skillsharp}
                alt="project name"
              />
              <span className="text-[12px] font-bold italic ms-1">Manager</span> */}
            </div>
            {showNav && (
              <div className="hidden w-full sm:flex sm:ml-10 sm:space-x-6 items-center justify-start">
                <div
                  ref={dropdownRef}
                  className="relative ps-12 pe-6 flex items-center py-2 text-xl font-semibold text-black  cursor-pointer"
                  onClick={() => setOpenAssessment(true)}
                >
                  <span>Assessment</span>
                  <FontAwesomeIcon
                    className="ps-2 align-middle"
                    icon={faChevronDown}
                  />
                  {openAssessment && (
                    <div className="absolute px-6 py-4 left-10 top-[70px] mt-1 bg-white shadow-lg rounded w-[300px] z-10 text-lg font-medium">
                      <div className="flex items-center">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.9167 3.33325C24.9015 3.33325 26.526 4.87519 26.658 6.8265L26.6667 7.08325C26.6667 6.9421 26.6589 6.80275 26.6437 6.66565L29.5834 6.66659C31.6544 6.66659 33.3334 8.34552 33.3334 10.4166V32.9166C33.3334 34.9876 31.6544 36.6666 29.5834 36.6666H10.4167C8.34562 36.6666 6.66669 34.9876 6.66669 32.9166V10.4166C6.66669 8.34552 8.34562 6.66659 10.4167 6.66659L13.3563 6.66565C13.3456 6.76282 13.3385 6.8611 13.3353 6.96035L13.3334 7.08325C13.3334 5.01219 15.0123 3.33325 17.0834 3.33325H22.9167ZM22.9167 10.8333H17.0834C15.7599 10.8333 14.5966 10.1477 13.9292 9.11235L13.9651 9.16692L10.4167 9.16658C9.72634 9.16658 9.16669 9.72623 9.16669 10.4166V32.9166C9.16669 33.6069 9.72634 34.1666 10.4167 34.1666H29.5834C30.2737 34.1666 30.8334 33.6069 30.8334 32.9166V10.4166C30.8334 9.72623 30.2737 9.16658 29.5834 9.16658L26.035 9.16692L26.0709 9.11235C25.4034 10.1477 24.2402 10.8333 22.9167 10.8333ZM22.9167 5.83325H17.0834C16.393 5.83325 15.8334 6.3929 15.8334 7.08325C15.8334 7.7736 16.393 8.33325 17.0834 8.33325H22.9167C23.607 8.33325 24.1667 7.7736 24.1667 7.08325C24.1667 6.3929 23.607 5.83325 22.9167 5.83325ZM13.3334 24.1666H20C20.6904 24.1666 21.25 23.6069 21.25 22.9166C21.25 22.2263 20.6904 21.6666 20 21.6666H13.3334C12.643 21.6666 12.0834 22.2263 12.0834 22.9166C12.0834 23.6069 12.643 24.1666 13.3334 24.1666ZM13.3334 17.4999H26.6667C27.357 17.4999 27.9167 16.9403 27.9167 16.2499C27.9167 15.5596 27.357 14.9999 26.6667 14.9999H13.3334C12.643 14.9999 12.0834 15.5596 12.0834 16.2499C12.0834 16.9403 12.643 17.4999 13.3334 17.4999ZM13.3334 30.8333H23.3334C24.0237 30.8333 24.5834 30.2736 24.5834 29.5833C24.5834 28.8929 24.0237 28.3333 23.3334 28.3333H13.3334C12.643 28.3333 12.0834 28.8929 12.0834 29.5833C12.0834 30.2736 12.643 30.8333 13.3334 30.8333Z"
                            fill="#212121"
                          />
                        </svg>

                        <div className="ps-3">
                          <div className="font-bold">Scenarios</div>
                          <div className="text-sm text-gray-600">
                            Create & Manage scenarios
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center py-4">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.8334 17.0833C20.8334 16.3929 21.393 15.8333 22.0834 15.8333H27.9167C28.607 15.8333 29.1667 16.3929 29.1667 17.0833C29.1667 17.7736 28.607 18.3333 27.9167 18.3333H22.0834C21.393 18.3333 20.8334 17.7736 20.8334 17.0833ZM22.0835 24.9999C21.393 24.9999 20.8335 25.5596 20.8335 26.2499C20.8335 26.9403 21.393 27.4999 22.0835 27.4999H27.9165C28.607 27.4999 29.1665 26.9403 29.1665 26.2499C29.1665 25.5596 28.607 24.9999 27.9165 24.9999H22.0835ZM17.9672 16.3005C18.4554 15.8123 18.4554 15.0209 17.9672 14.5327C17.479 14.0446 16.6877 14.0446 16.1995 14.5327L13.75 16.9821L12.9672 16.1994C12.4791 15.7112 11.6876 15.7112 11.1995 16.1994C10.7113 16.6876 10.7113 17.4789 11.1995 17.9671L12.8661 19.6338C13.3543 20.1219 14.1458 20.1219 14.6339 19.6338L17.9672 16.3005ZM17.9672 23.6994C18.4554 24.1876 18.4554 24.9789 17.9672 25.4671L14.6339 28.8004C14.1458 29.2886 13.3543 29.2886 12.8661 28.8004L11.1995 27.1338C10.7113 26.6456 10.7113 25.8543 11.1995 25.3661C11.6876 24.8779 12.4791 24.8779 12.9672 25.3661L13.75 26.1488L16.1995 23.6994C16.6877 23.2113 17.479 23.2113 17.9672 23.6994ZM26.6567 6.8074C26.5155 4.86513 24.895 3.33325 22.9167 3.33325H17.0834C15.1534 3.33325 13.564 4.79112 13.3563 6.66565L10.4167 6.66659C8.34562 6.66659 6.66669 8.34552 6.66669 10.4166V32.9166C6.66669 34.9876 8.34562 36.6666 10.4167 36.6666H29.5834C31.6544 36.6666 33.3334 34.9876 33.3334 32.9166V10.4166C33.3334 8.34552 31.6544 6.66659 29.5834 6.66659L26.6437 6.66565C26.6489 6.71265 26.6532 6.7599 26.6567 6.8074ZM26.658 6.8265L26.6667 7.08325C26.6667 6.99695 26.6639 6.91134 26.658 6.8265ZM17.0834 10.8333H22.9167C24.2167 10.8333 25.3624 10.1717 26.035 9.16685L29.5834 9.16658C30.2737 9.16658 30.8334 9.72623 30.8334 10.4166V32.9166C30.8334 33.6069 30.2737 34.1666 29.5834 34.1666H10.4167C9.72634 34.1666 9.16669 33.6069 9.16669 32.9166V10.4166C9.16669 9.72623 9.72634 9.16658 10.4167 9.16658L13.9651 9.16692C14.6378 10.1718 15.7833 10.8333 17.0834 10.8333ZM17.0834 5.83325H22.9167C23.607 5.83325 24.1667 6.3929 24.1667 7.08325C24.1667 7.7736 23.607 8.33325 22.9167 8.33325H17.0834C16.393 8.33325 15.8334 7.7736 15.8334 7.08325C15.8334 6.3929 16.393 5.83325 17.0834 5.83325Z"
                            fill="#212121"
                          />
                        </svg>

                        <div className="ps-3">
                          <div className="font-bold">Quizzes</div>
                          <div className="text-sm text-gray-600">
                            Create & Manage quizzes
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  ref={dropdownRef}
                  className="relative pe-6 flex items-center py-2 text-xl font-semibold text-black  cursor-pointer"
                  onClick={() => setOpenHiring(true)}
                >
                  <span>Hiring</span>
                  <FontAwesomeIcon
                    className="ps-2 align-middle"
                    icon={faChevronDown}
                  />
                  {openHiring && (
                    <div className="absolute px-6 py-4 left-0 top-[70px] mt-1 bg-white shadow-lg rounded w-[360px] z-10 text-lg font-medium">
                      <div className="flex items-center">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.16668 13.3334C9.16668 11.0322 11.0322 9.16675 13.3333 9.16675C15.6345 9.16675 17.5 11.0322 17.5 13.3334C17.5 15.6346 15.6345 17.5001 13.3333 17.5001C11.0322 17.5001 9.16668 15.6346 9.16668 13.3334ZM13.3333 6.66675C9.65144 6.66675 6.66668 9.65151 6.66668 13.3334C6.66668 17.0152 9.65144 20.0001 13.3333 20.0001C17.0152 20.0001 20 17.0152 20 13.3334C20 9.65151 17.0152 6.66675 13.3333 6.66675ZM25.8333 15.0001C25.8333 13.6194 26.9527 12.5001 28.3333 12.5001C29.714 12.5001 30.8333 13.6194 30.8333 15.0001C30.8333 16.3808 29.714 17.5001 28.3333 17.5001C26.9527 17.5001 25.8333 16.3808 25.8333 15.0001ZM28.3333 10.0001C25.5718 10.0001 23.3333 12.2387 23.3333 15.0001C23.3333 17.7616 25.5718 20.0001 28.3333 20.0001C31.0948 20.0001 33.3333 17.7616 33.3333 15.0001C33.3333 12.2387 31.0948 10.0001 28.3333 10.0001ZM7.08334 23.3334C5.01228 23.3334 3.33334 25.0124 3.33334 27.0834V27.5019V27.5037L3.33336 27.5081L3.33346 27.5186L3.33393 27.5462C3.33441 27.5677 3.33529 27.5952 3.33684 27.6286C3.33994 27.6949 3.34576 27.7842 3.35664 27.8931C3.37836 28.1102 3.42056 28.4084 3.50276 28.7607C3.66659 29.4627 3.99424 30.4007 4.65306 31.3419C6.01778 33.2916 8.61964 35.0001 13.3333 35.0001C16.3642 35.0001 18.522 34.2937 20.0392 33.2711C20.1422 32.6472 20.4432 32.0902 20.8755 31.6667C20.3928 31.1937 20.0738 30.5546 20.0113 29.8417C19.9963 29.8639 19.981 29.8861 19.9655 29.9082C19.1428 31.0836 17.3697 32.5001 13.3333 32.5001C9.29704 32.5001 7.52391 31.0836 6.70113 29.9082C6.26619 29.2869 6.04698 28.6624 5.93736 28.1926C5.88284 27.9589 5.85668 27.7687 5.84423 27.6442C5.83803 27.5822 5.83529 27.5371 5.83413 27.5121L5.83334 27.4912V27.0834C5.83334 26.3931 6.39299 25.8334 7.08334 25.8334H19.5833C19.7458 25.8334 19.901 25.8644 20.0433 25.9207C20.0148 25.7571 20 25.5886 20 25.4167C20 24.6861 20.2687 24.0182 20.7127 23.5064C20.3562 23.3941 19.9768 23.3334 19.5833 23.3334H7.08334ZM20.8755 27.5001C20.8603 27.5149 20.8455 27.5297 20.8307 27.5449L20.8325 27.5121L20.8333 27.4911V27.4579C20.8472 27.4721 20.8613 27.4862 20.8755 27.5001ZM22.9167 24.1667C22.2263 24.1667 21.6667 24.7264 21.6667 25.4167C21.6667 26.1071 22.2263 26.6667 22.9167 26.6667H35.4167C36.107 26.6667 36.6667 26.1071 36.6667 25.4167C36.6667 24.7264 36.107 24.1667 35.4167 24.1667H22.9167ZM22.9167 28.3334C22.2263 28.3334 21.6667 28.8931 21.6667 29.5834C21.6667 30.2737 22.2263 30.8334 22.9167 30.8334H35.4167C36.107 30.8334 36.6667 30.2737 36.6667 29.5834C36.6667 28.8931 36.107 28.3334 35.4167 28.3334H22.9167ZM22.9167 32.5001C22.2263 32.5001 21.6667 33.0597 21.6667 33.7501C21.6667 34.4404 22.2263 35.0001 22.9167 35.0001H35.4167C36.107 35.0001 36.6667 34.4404 36.6667 33.7501C36.6667 33.0597 36.107 32.5001 35.4167 32.5001H22.9167Z"
                            fill="#212121"
                          />
                        </svg>

                        <div className="ps-3">
                          <div className="font-bold">View Candidates</div>
                          <div className="text-sm text-gray-600">
                            Candidates that completed assessments
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center py-4">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.1205 3.33991C21.7827 3.32986 21.4552 3.45703 21.2127 3.69243C20.9702 3.92783 20.8333 4.25139 20.8333 4.58936V17.9164C20.8333 18.6069 21.393 19.1664 22.0833 19.1664H35.4105C35.7485 19.1664 36.072 19.0296 36.3073 18.7871C36.5428 18.5446 36.67 18.2171 36.66 17.8793C36.4242 9.95536 30.0445 3.57576 22.1205 3.33991ZM23.3333 16.6665V5.94326C28.9035 6.68524 33.3147 11.0964 34.0567 16.6665H23.3333ZM18.3333 7.97274C18.3333 7.62171 18.1857 7.28686 17.9267 7.05004C17.6675 6.81324 17.3208 6.69629 16.9712 6.72779C9.32461 7.41686 3.33334 13.8414 3.33334 21.6668C3.33334 29.9509 10.0491 36.6668 18.3333 36.6668C26.1587 36.6668 32.5832 30.6754 33.2722 23.0289C33.3037 22.6793 33.1868 22.3326 32.95 22.0734C32.7132 21.8143 32.3783 21.6668 32.0273 21.6668H18.3333V7.97274ZM5.83334 21.6668C5.83334 15.6195 10.1282 10.5743 15.8333 9.41654V22.9168C15.8333 23.6071 16.393 24.1668 17.0833 24.1668H30.5835C29.4258 29.8718 24.3805 34.1668 18.3333 34.1668C11.4298 34.1668 5.83334 28.5703 5.83334 21.6668Z"
                            fill="#212121"
                          />
                        </svg>

                        <div className="ps-3">
                          <div className="font-bold">Results & Analytics</div>
                          <div className="text-sm text-gray-600">
                            Analyze to identify top talent
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.3333 9.16658C18.3333 12.1053 16.1602 14.5365 13.3333 14.9409V19.1666H23.75C25.821 19.1666 27.5 17.4876 27.5 15.4166V14.7584C25.0905 14.0412 23.3333 11.8091 23.3333 9.16658C23.3333 5.94492 25.945 3.33325 29.1667 3.33325C32.3883 3.33325 35 5.94492 35 9.16658C35 12.1053 32.8268 14.5365 30 14.9409V15.4166C30 18.8684 27.2018 21.6666 23.75 21.6666H13.3333V25.0589C16.1602 25.4634 18.3333 27.8946 18.3333 30.8333C18.3333 34.0549 15.7217 36.6666 12.5 36.6666C9.27832 36.6666 6.66666 34.0549 6.66666 30.8333C6.66666 28.1908 8.42376 25.9586 10.8333 25.2414V14.7584C8.42376 14.0412 6.66666 11.8091 6.66666 9.16658C6.66666 5.94492 9.27832 3.33325 12.5 3.33325C15.7217 3.33325 18.3333 5.94492 18.3333 9.16658ZM12.5 12.4999C14.3409 12.4999 15.8333 11.0075 15.8333 9.16658C15.8333 7.32564 14.3409 5.83325 12.5 5.83325C10.659 5.83325 9.16666 7.32564 9.16666 9.16658C9.16666 11.0075 10.659 12.4999 12.5 12.4999ZM29.1667 12.4999C31.0077 12.4999 32.5 11.0075 32.5 9.16658C32.5 7.32564 31.0077 5.83325 29.1667 5.83325C27.3257 5.83325 25.8333 7.32564 25.8333 9.16658C25.8333 11.0075 27.3257 12.4999 29.1667 12.4999ZM15.8333 30.8333C15.8333 28.9923 14.3409 27.4999 12.5 27.4999C10.659 27.4999 9.16666 28.9923 9.16666 30.8333C9.16666 32.6743 10.659 34.1666 12.5 34.1666C14.3409 34.1666 15.8333 32.6743 15.8333 30.8333Z"
                            fill="#212121"
                          />
                        </svg>

                        <div className="ps-3">
                          <div className="font-bold">Integrations</div>
                          <div className="text-sm text-gray-600">
                            Connect with other HRs and ATS tools
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* <Link
                  to={paths.manager.scenario._layout}
                  className="rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white"
                >
                  Scenarios
                </Link>
                <Link
                  to={paths.manager.tests._layout}
                  className="rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white"
                >
                  Tests
                </Link>
                <Link
                  to={paths.manager.tests.SELF}
                  className="rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white"
                >
                  Manage Tests
                </Link> */}
              </div>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                      <Link
                        to={paths.manager.profile._layout}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Profile
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Settings
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
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
      )}
    </nav>
  );
};

export default ManagerNavbar;
