import Navbar from "../../../trash/Navbar";
import Carousel from "../components/Carousel";
import LoginForm from "./LoginForm";

export default function Login() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="grid grid-cols-12 flex-grow">
				<Carousel
					className="bg-[#D5EEF1] h-full text-3xl font-bold col-span-12 lg:col-span-5 text-black "
					buttonClass="bg-white"
				/>
				<div className="col-span-12 mx-10 lg:col-span-7 lg:mx-32 xl:mx-32 2xl:mx-64  my-12 ">
					<LoginForm></LoginForm>
				</div>
			</div>
		</div>
	);
}
