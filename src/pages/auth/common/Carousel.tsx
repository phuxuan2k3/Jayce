import classNames from "classnames";
import  { useState, useEffect } from "react";

function Carousel({className, buttonClass} : {className? : string,buttonClass?: string}) {
    const intervalTime = 5000; 
    const text = [
        "Các nhà triết học chỉ giải thích thế giới bằng các phương thức khác nhau, vấn đề là ở chỗ thay đổi thế giới.",
        "Khoa học cho chúng ta tri thức, nhưng chỉ triết học mới có thể cho chúng ta sự thông thái.",
        "Tính gàn dở của các nhà triết gia mọi thời đại là phủ nhận điều tồn tại và giải thích điều không tồn tại.",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="indicators-carousel" className={classNames("relative w-full h-full", className)} data-carousel="static">
            <div className="lg:h-[600px] h-[300px] overflow-hidden rounded-lg ">
                {text.map((quote, index) => (
                    <div key={index} className={`${index === currentIndex ? "block" : "hidden"} px-10  h-full flex justify-center items-center  duration-700 ease-in-out`} data-carousel-item={index === currentIndex ? "active" : ""}>
                        <div>
                            {quote}
                        </div>
                    </div>
                ))}
            </div>
            <div className=" z-30 flex space-x-4 m-10 justify-center items-center">
                {text.map((_, index) => (
                    <button  
                        key={index}
                        type="button"
                        className={classNames("w-3 h-3 rounded-full ",buttonClass)}
                        aria-current={index === currentIndex ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                        data-carousel-slide-to={index}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
