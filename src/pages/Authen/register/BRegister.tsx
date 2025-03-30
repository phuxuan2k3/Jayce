import Navbar from "../../../components/Navbar";
import Carousel from "../components/Carousel";
import BRegisterForm from "./BRegisterForm";

export default function BRegister() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="grid grid-cols-12 flex-grow">
				<Carousel
					className="bg-[#D5EEF1] h-full text-3xl font-bold col-span-12 lg:col-span-5 text-black "
					buttonClass="bg-white"
				/>
				<div className=" col-span-12 lg:col-span-7 mx-8 py-12 ">
					<BRegisterForm></BRegisterForm>
				</div>
			</div>
		</div>
	);
}
