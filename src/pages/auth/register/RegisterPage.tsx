import Carousel from "../common/Carousel";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="grid grid-cols-12 flex-grow">
				<Carousel
					className="bg-[#D5EEF1] h-full text-3xl font-bold col-span-12 lg:col-span-5 text-black "
					buttonClass="bg-white"
				/>
				<div className=" col-span-12 mx-10 lg:col-span-7 lg:mx-32 xl:mx-32 2xl:mx-64 py-12 ">
					<RegisterForm></RegisterForm>
				</div>
			</div>
		</div>
	);
}
