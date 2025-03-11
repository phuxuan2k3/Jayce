export const Loading: React.FC = () => {
  return (
    <div className=" relative h-[600px] text-center">
      <div className="font-arya  pt-12 flex gap-2 items-center  justify-center ">
        <div className="flex items-center gap-2 text-[24px]">
          <div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
            1
          </div>
          <span>
            Overview
          </span>
        </div>
        <div className="w-24">
          <hr className="border-2 border-gray-800" />
        </div>
        <div className="flex items-center gap-2 text-[24px]">
          <div className="bg-gray-300 rounded-3xl h-10 w-10  text-white font-bold text-center">
            2
          </div>
          <span>
            Question
          </span>
        </div>
        <div className="w-24">
          <hr className="border-2 border-gray-800" />
        </div>
        <div className="flex items-center gap-2 text-[24px]">
          <div className="bg-gray-300  rounded-3xl h-10 w-10  text-white font-bold text-center">
            3
          </div>
          <span>
            Review
          </span>
        </div>
      </div>
      <div className="w-full px-12 mt-12">
        <h2 className="text-2xl font-semibold mb-2">Generating options...</h2>
        <p className="text-gray-500  mt-8">Please wait while we generate the question for you, this will take around 30 seconds</p>
        <progress className="progress w-full mt-12"></progress>
      </div>
    </div>
  );
};
