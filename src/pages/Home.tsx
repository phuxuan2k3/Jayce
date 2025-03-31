import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    const navigate=useNavigate()
    return <div>
        <Navbar />
        <div className="text-center py-16 px-4 bg-no-repeat h-[100vh] bg-gradient-to-br from-[#bff3f9] to-[#f4c5b9]">
            <h1 className="text-4xl font-black   mb-4 my-20">
                Everything you need
                <p>
                    to <span className="text-gradient">sharpen</span> your <span className="text-gradient">interview skills</span>
                </p>
            </h1>
            <p className="text-lg font-semibold max-w-2xl mx-auto">
                Get better at technical interviews, communication skills and get detailed feedback on exactly what you need to work on.
            </p>
            <div className="flex gap-8 mx-auto justify-center mt-12">
                <div onClick={()=> navigate('/register')} className="px-10 bg-[var(--primary-color)] rounded-lg text-white py-2 font-bold ">For candidates</div>
                <div onClick={()=> navigate('/bregister')} className="text-[var(--primary-color)] font-bold border border-[var(--primary-color)] px-10 py-2 rounded-lg">For businesses</div>
            </div>
        </div>
    </div>
}

export default Home