import { useEffect, useRef } from "react";
import Carousel from "../common/Carousel";
import LoginForm from "./LoginForm";

export default function AuthLoginPage() {
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
        <Carousel
          className="w-full  col-span-12 lg:col-span-5 text-black "
          //   buttonClass="bg-white"
        />
        <div
          ref={mainRef}
          className="col-span-12 mx-10 lg:col-span-7 lg:mx-32 xl:mx-32 2xl:mx-64 my-12 "
        >
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
}
