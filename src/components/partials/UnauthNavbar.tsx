import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "/svg/logo.svg";
import skillsharp from "/svg/skillsharp.svg";
import paths from "../../router/paths";
import LanguageSwitcher from "./Language";
import classNames from "classnames";

const UnauthNavbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const navigate = useNavigate();

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const handleLogoClick = () => {
		navigate(paths._layout);
	};

	const tab = window.location.hash;

	const url = window.location.pathname;

	return (
		<nav className="bg-white drop-shadow-lg">
			<div className=" lg:mx-12 px-6   ">
				<div className="relative h-[60px] flex items-center justify-between">
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
							to="/#interviews"
							className={classNames(
								"flex mr-6 icon-link items-center p-2 hover:text-primary hover:border-b-2 hover:border-primary-toned-500",
								tab === "interviews"
									? "border-b-2 text-primary  border-primary"
									: ""
							)}
						>
							<svg
								width="25"
								height="25"
								viewBox="0 0 40 40"
								xmlns="http://www.w3.org/2000/svg"
								className="icon-path"
							>
								<path
									className={classNames(
										tab === "interviews" ? "icon-select" : "icon-path"
									)}
									d="M27.1608 15.7568C27.1608 15.8315 27.1586 15.9055 27.1543 15.979C27.0845 15.9172 27.011 15.859 26.9343 15.8048C26.4996 15.4975 25.9803 15.3325 25.4481 15.3325C25.1793 15.3325 24.9138 15.3747 24.6608 15.4558V8.24917C24.6608 7.55882 24.1012 6.99917 23.4108 6.99917H9.24408C8.55373 6.99917 7.99408 7.55882 7.99408 8.24917V15.7568C7.99408 16.4472 8.55373 17.0068 9.24408 17.0068H23.0365L23.0211 17.0492L23.0143 17.0687L22.2638 19.3758L22.2491 19.4198C22.2391 19.449 22.2286 19.478 22.2176 19.5068H9.24408C7.17302 19.5068 5.49408 17.8278 5.49408 15.7568V8.24917C5.49408 6.1781 7.17302 4.49917 9.24408 4.49917L15.0766 4.49833L15.078 3.25C15.078 2.61717 15.5482 2.09418 16.1583 2.0114L16.328 2C16.9608 2 17.4838 2.47025 17.5665 3.08038L17.578 3.25L17.5766 4.49833L23.4108 4.49917C25.4818 4.49917 27.1608 6.1781 27.1608 8.24917V15.7568ZM18.0648 22.06L18.2525 21.999H6.75C4.67893 21.999 3 23.678 3 25.749V27.2612C3 29.0825 3.79442 30.8132 5.17545 32.0005C7.78023 34.24 11.5116 35.3344 16.3275 35.3344C19.7873 35.3344 22.6886 34.7693 25.0155 33.621C24.6548 33.5527 24.3108 33.4077 24.008 33.1935C23.5731 32.8862 23.2445 32.4515 23.0672 31.9492L23.0602 31.9297L23.0095 31.7735C21.201 32.4767 18.977 32.8344 16.3275 32.8344C12.0621 32.8344 8.90208 31.9075 6.80527 30.1048C5.97665 29.3923 5.5 28.354 5.5 27.2612V25.749C5.5 25.0587 6.05963 24.499 6.75 24.499H16.3275V24.4935C16.3275 23.9607 16.4928 23.4413 16.8006 23.0067C17.1083 22.5722 17.5433 22.2438 18.0453 22.0668L18.0648 22.06ZM14.6583 11.5813C14.6583 10.4314 13.7261 9.49917 12.5762 9.49917C11.4263 9.49917 10.4941 10.4314 10.4941 11.5813C10.4941 12.7313 11.4263 13.6635 12.5762 13.6635C13.7261 13.6635 14.6583 12.7313 14.6583 11.5813ZM20.0641 9.49917C21.2141 9.49917 22.1463 10.4314 22.1463 11.5813C22.1463 12.7313 21.2141 13.6635 20.0641 13.6635C18.9142 13.6635 17.982 12.7313 17.982 11.5813C17.982 10.4314 18.9142 9.49917 20.0641 9.49917ZM23.1411 27.6863C23.0206 27.5307 22.8903 27.3822 22.7505 27.242C22.2303 26.7202 21.5951 26.327 20.8956 26.0938L18.5993 25.3482C18.4223 25.2858 18.2691 25.17 18.1606 25.017C18.0523 24.8638 17.9941 24.681 17.9941 24.4935C17.9941 24.3058 18.0523 24.123 18.1606 23.9698C18.2691 23.8168 18.4223 23.7012 18.5993 23.6387L20.8956 22.893C21.5853 22.655 22.2105 22.261 22.7225 21.7415C23.2203 21.2362 23.5978 20.6257 23.8275 19.9553L23.8465 19.8985L24.5928 17.604C24.6551 17.4272 24.771 17.274 24.9241 17.1657C25.0775 17.0574 25.2605 16.9992 25.4481 16.9992C25.6358 16.9992 25.819 17.0574 25.9722 17.1657C26.1253 17.274 26.2411 17.4272 26.3035 17.604L27.0498 19.8985C27.282 20.5962 27.6736 21.23 28.1938 21.7498C28.714 22.2697 29.3485 22.661 30.0465 22.893L32.3428 23.6387L32.3888 23.6502C32.5658 23.7125 32.719 23.8283 32.8275 23.9813C32.9358 24.1345 32.9942 24.3173 32.9942 24.5048C32.9942 24.6925 32.9358 24.8753 32.8275 25.0285C32.719 25.1815 32.5658 25.2972 32.3888 25.3597L30.0925 26.1053C29.3943 26.3373 28.76 26.7287 28.2398 27.2485C27.7195 27.7683 27.3278 28.4022 27.0958 29.0998L26.3495 31.3944C26.3428 31.4135 26.3353 31.4322 26.3275 31.4507C26.2617 31.6037 26.1546 31.736 26.018 31.8327C25.8648 31.941 25.6818 31.9992 25.4942 31.9992C25.3065 31.9992 25.1233 31.941 24.9701 31.8327C24.817 31.7243 24.7012 31.5712 24.6387 31.3944L23.8925 29.0998C23.7238 28.588 23.4693 28.1102 23.1411 27.6863ZM35.9656 34.0212L34.69 33.6068C34.302 33.478 33.9496 33.2605 33.6606 32.9718C33.3716 32.683 33.154 32.3308 33.0251 31.9433L32.6105 30.6685C32.5758 30.5703 32.5115 30.4852 32.4263 30.425C32.3412 30.3648 32.2395 30.3325 32.1353 30.3325C32.031 30.3325 31.9293 30.3648 31.8441 30.425C31.759 30.4852 31.6946 30.5703 31.66 30.6685L31.2455 31.9433C31.119 32.3282 30.9053 32.6785 30.621 32.9672C30.3365 33.2557 29.9891 33.4747 29.6061 33.6068L28.3303 34.0212C28.232 34.0558 28.1468 34.12 28.0867 34.2052C28.0265 34.2902 27.9942 34.3918 27.9942 34.496C27.9942 34.6002 28.0265 34.7018 28.0867 34.7868C28.1468 34.8718 28.232 34.9362 28.3303 34.9709L29.6061 35.3852C29.9946 35.5147 30.3475 35.733 30.6365 36.023C30.9256 36.3129 31.1428 36.6664 31.271 37.055L31.6855 38.3298C31.7203 38.428 31.7847 38.5132 31.8696 38.5733C31.9548 38.6335 32.0565 38.6658 32.1608 38.6658C32.265 38.6658 32.3666 38.6335 32.4518 38.5733C32.537 38.5132 32.6013 38.428 32.636 38.3298L33.0506 37.055C33.1795 36.6675 33.3971 36.3153 33.6861 36.0265C33.9751 35.7379 34.3276 35.5204 34.7155 35.3915L35.9911 34.9772C36.0895 34.9425 36.1746 34.8783 36.2348 34.7932C36.2951 34.7082 36.3275 34.6065 36.3275 34.5023C36.3275 34.3982 36.2951 34.2965 36.2348 34.2115C36.1746 34.1265 36.0895 34.0622 35.9911 34.0275L35.9656 34.0212Z"
									fill="#212121"
								/>
							</svg>
							<div
								onClick={() => navigate("/candidate/interviews")}
								className="ps-1"
							>
								<div className="font-bold">AI-Interviewers</div>
							</div>
						</Link>
						<Link
							to="/#tests"
							className={classNames(
								"flex mr-6 icon-link items-center p-2 hover:text-primary hover:border-b-2 hover:border-primary-toned-500",
								tab === "test" ? "border-b-2 text-primary  border-primary" : ""
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
									d="M20.8333 17.0835C20.8333 16.3931 21.393 15.8335 22.0833 15.8335H27.9167C28.607 15.8335 29.1667 16.3931 29.1667 17.0835C29.1667 17.7738 28.607 18.3335 27.9167 18.3335H22.0833C21.393 18.3335 20.8333 17.7738 20.8333 17.0835ZM22.0835 25.0002C21.393 25.0002 20.8335 25.5598 20.8335 26.2502C20.8335 26.9405 21.393 27.5002 22.0835 27.5002H27.9165C28.607 27.5002 29.1665 26.9405 29.1665 26.2502C29.1665 25.5598 28.607 25.0002 27.9165 25.0002H22.0835ZM17.9672 16.3007C18.4553 15.8126 18.4553 15.0211 17.9672 14.5329C17.479 14.0448 16.6877 14.0448 16.1994 14.5329L13.75 16.9823L12.9672 16.1996C12.4791 15.7115 11.6876 15.7115 11.1994 16.1996C10.7113 16.6878 10.7113 17.4792 11.1994 17.9673L12.8661 19.634C13.3543 20.1222 14.1457 20.1222 14.6339 19.634L17.9672 16.3007ZM17.9672 23.6997C18.4553 24.1878 18.4553 24.9792 17.9672 25.4673L14.6339 28.8007C14.1457 29.2888 13.3543 29.2888 12.8661 28.8007L11.1994 27.134C10.7113 26.6458 10.7113 25.8545 11.1994 25.3663C11.6876 24.8782 12.4791 24.8782 12.9672 25.3663L13.75 26.149L16.1994 23.6997C16.6877 23.2115 17.479 23.2115 17.9672 23.6997ZM26.6567 6.80765C26.5155 4.86538 24.895 3.3335 22.9167 3.3335H17.0833C15.1534 3.3335 13.564 4.79136 13.3563 6.6659L10.4167 6.66683C8.34559 6.66683 6.66666 8.34576 6.66666 10.4168V32.9168C6.66666 34.9878 8.34559 36.6668 10.4167 36.6668H29.5833C31.6543 36.6668 33.3333 34.9878 33.3333 32.9168V10.4168C33.3333 8.34576 31.6543 6.66683 29.5833 6.66683L26.6437 6.6659C26.6488 6.7129 26.6532 6.76015 26.6567 6.80765ZM26.658 6.82675L26.6667 7.0835C26.6667 6.9972 26.6638 6.91158 26.658 6.82675ZM17.0833 10.8335H22.9167C24.2167 10.8335 25.3623 10.1719 26.035 9.1671L29.5833 9.16683C30.2737 9.16683 30.8333 9.72648 30.8333 10.4168V32.9168C30.8333 33.6072 30.2737 34.1668 29.5833 34.1668H10.4167C9.72631 34.1668 9.16666 33.6072 9.16666 32.9168V10.4168C9.16666 9.72648 9.72631 9.16683 10.4167 9.16683L13.965 9.16716C14.6378 10.172 15.7833 10.8335 17.0833 10.8335ZM17.0833 5.8335H22.9167C23.607 5.8335 24.1667 6.39315 24.1667 7.0835C24.1667 7.77385 23.607 8.3335 22.9167 8.3335H17.0833C16.393 8.3335 15.8333 7.77385 15.8333 7.0835C15.8333 6.39315 16.393 5.8335 17.0833 5.8335Z"
									fill="#212121"
									className={classNames(
										tab === "test" ? "icon-select" : "icon-path"
									)}
								/>
							</svg>

							<div className="ps-1">
								<div className="font-bold">Daily Assessment</div>
							</div>
						</Link>{" "}
						<Link
							to="/faq"
							className={classNames(
								"flex mr-6 icon-link items-center p-2 hover:text-primary hover:border-b-2 hover:border-primary-toned-500",
								url.includes("/faq")
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
										url.includes("/faq")
											? "icon-select"
											: "icon-path"
									)}
								/>
							</svg>
							<div
								onClick={() => navigate("/faq")}
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
								<div className="hidden lg:block">
									<Link
										to={paths.auth.LOGIN}
										className="px-3 mr-3 rounded-lg font-bold text-xl py-2 text-primary-toned-700"
									>
										Sign in
									</Link>
									<Link
										to={paths.auth.CHOOSE_ROLE}
										className="px-5 rounded-lg font-bold text-xl py-2  text-white bg-primary-toned-700"
									>
										Get started
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="sm:hidden" id="mobile-menu">
					<div className="space-y-1 px-2 pb-3 pt-2">
						<a
							href="#"
							className="block rounded-m  px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
							aria-current="page"
						>
							Scenario
						</a>
						<a
							href="/test/list"
							className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
						>
							Questions
						</a>
						<a
							href="#"
							className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
						>
							Mock
						</a>
						<a
							href="#"
							className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
						>
							Pricing
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default UnauthNavbar;
