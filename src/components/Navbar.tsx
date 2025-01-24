import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "/svg/logo.svg";
import skillsharp from "/svg/skillsharp.svg";
import { useAppSelector } from "../app/hooks";
import { selectIsAuthenticated, selectUserInfo } from "../global/authSlice";
import { useLogoutMutation } from "../features/Auth/authApi";


const NavBar = ({ showNav = true }: { showNav?: boolean; }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isAuth = useAppSelector(selectIsAuthenticated);
	const authState = useAppSelector(selectUserInfo);
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
		navigate('/login');
	};


	return <nav className="bg-white drop-shadow-lg">
		<div className=" lg:mx-12 px-6   ">
			<div className="relative h-[100px] flex items-center justify-between">
				{showNav && <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
					<button onClick={() => { toggleMobileMenu() }} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
						<span className="absolute -inset-0.5"></span>
						<span className="sr-only">Open main menu</span>
						<svg className="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
						<svg className="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>}
				<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
					<div className="flex shrink-0   items-center">
						<img src={logo} alt="logo" />
						<img className="ml-3 hidden lg:block" src={skillsharp} alt="project name" />
					</div>
					{showNav && <div className="hidden w-full sm:block">
						<div className="flex space-x-5 justify-center items-center">
							<a href="#" className="text-nowrap rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white" aria-current="page">Courses <FontAwesomeIcon icon={faChevronDown} /></a>
							<a href="#" className="text-nowrap rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white">Questions <FontAwesomeIcon icon={faChevronDown} /> </a>
							<a href="#" className="rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white">Mock</a>
							<a href="#" className="rounded-md px-3 py-2 text-lg font-semibold text-black hover:bg-[var(--primary-color)] hover:text-white">Pricing</a>
						</div>
					</div>}
				</div>
				<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<div className="relative ml-3">
						<div>
							<FontAwesomeIcon className="block lg:hidden  text-[var(--primary-color)] text-xl" icon={faRightToBracket}></FontAwesomeIcon>
							{isAuth ? (
								<div className="hidden lg:block relative">
									<img
										className="size-8 rounded-full cursor-pointer"
										src={authState?.avatarPath}
										alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqf0Wx4wmsKfLYsiLdBx6H4D8bwQBurWhx5g&s"
										onClick={toggleProfileMenu}
									/>
									{isMenuOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
											<a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
											<a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
											>
												Logout
											</button>
										</div>
									)}
								</div>
							) : (
								<div className="hidden lg:block">
									<Link to="/login">
										<button className="px-3 mr-3 rounded-lg font-bold text-xl py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2">Log In</button>
									</Link>
									<Link to="/register">
										<button className="px-3 rounded-lg font-bold text-xl py-2  text-white bg-[var(--primary-color)]">Sign Up</button>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>

		{isMobileMenuOpen && <div className="sm:hidden" id="mobile-menu">
			<div className="space-y-1 px-2 pb-3 pt-2">
				<a href="#" className="block rounded-m  px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white" aria-current="page">Courses</a>
				<a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white">Questions</a>
				<a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white">Mock</a>
				<a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white">Pricing</a>
			</div>
		</div>
		}
	</nav>
}

export default NavBar;

