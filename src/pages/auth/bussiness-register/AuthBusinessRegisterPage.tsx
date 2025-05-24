import { useEffect, useRef } from "react";
import Carousel from "../common/Carousel";
import BusinessRegisterForm from "./BusinessRegisterForm";

export default function AuthBusinessRegisterPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-12 flex-grow">
        <Carousel className="bg-[#D5EEF1] h-full text-3xl font-bold col-span-12 lg:col-span-5 text-black " />
        <div
          ref={mainRef}
          className="col-span-12 lg:col-span-7 mx-8 lg:mx-32 xl:mx-32 2xl:mx-64 py-12"
        >
          <BusinessRegisterForm />
        </div>
      </div>
    </div>
  );
}
