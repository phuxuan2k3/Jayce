import { useEffect, useState } from "react";
import {
  HiOutlineBriefcase,
  // HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineRefresh,
  HiOutlineSearch,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../LanguageProvider";
import { useGetHistoryMutation } from "../../../../features/interviews/api/interview.api";
import FilterListIcon from "@mui/icons-material/FilterList";
const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SCORE_STYLES: Record<
  string,
  { color: string; bg: string; label: string }
> = {
  A: { color: "text-green-700", bg: "bg-green-100", label: "A" },
  B: { color: "text-blue-700", bg: "bg-blue-100", label: "B" },
  C: { color: "text-yellow-700", bg: "bg-yellow-100", label: "C" },
  D: { color: "text-orange-700", bg: "bg-orange-100", label: "D" },
  F: { color: "text-red-700", bg: "bg-red-100", label: "F" },
};

const ScoreBadges = ({
  score,
}: {
  score: { A: number; B: number; C: number; D: number; F: number };
}) => (
  <div className="flex gap-2 flex-wrap items-center flex-[0_0_100%]">
    {Object.entries(score).map(([key, value]) => {
      const style = SCORE_STYLES[key] || {};
      if (value != 0)
        return (
          <span
            key={key}
            className={`inline-flex items-center hover:bg-slate-300 px-2 py-0.5 rounded-full text-sm font-semibold font-mono shadow  border border-opacity-40 border-gray-300`}
            title={`Score ${key}`}
          >
            {value} {style.label}
          </span>
        );
    })}
  </div>
);

const SkeletonCard = () => (
  <div className="relative w-[32%] bg-white border border-gray-200 rounded-2xl shadow animate-pulse">
    {/* Ảnh header */}
    <div className="w-full h-48 bg-gray-200 rounded-t-2xl"></div>

    {/* Experience badge */}
    <div className="absolute top-2 right-2 w-20 h-6 rounded-full bg-gradient-to-r from-green-100 to-blue-100"></div>

    {/* Nội dung bên trong */}
    <div className="p-6 flex flex-col gap-4">
      {/* Position row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 rounded bg-gray-300"></div>
          <div className="w-32 h-4 rounded bg-gray-400"></div>
        </div>
      </div>

      {/* Score badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-6 w-16 rounded-full bg-gray-200"></div>
        ))}
      </div>

      {/* Dates */}
      <div className="flex justify-between mt-2">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="w-20 h-4 rounded bg-gray-200"></div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          <div className="w-20 h-4 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);

const HistoryPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(2);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [getHistory, { data, isLoading, isError }] = useGetHistoryMutation();

  useEffect(() => {
    getHistory({
      pageIndex: 1,
      sort,
      query,
    });
  }, []);

  useEffect(() => {
    getHistory({
      pageIndex: page,
      sort,
      query,
    });
  }, [page, sort, query]);

  const { t } = useLanguage();

  const handleFilterChange = () => {
    setPage(1);
    setQuery(inputValue);
  };

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="text-lg text-red-600 font-semibold">
          {t("failed_to_load_interview_history")}
        </span>
      </div>
    );
  }

  return (
    <div className=" w-full px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#2e808a] text-center">
        {t("interview_history")}
      </h2>
      <div className="flex flex-wrap items-center gap-4 mb-6 px-4 py-3 bg-white rounded-2xl shadow">
        {/* Search input */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <div onClick={() => handleFilterChange()}>
            <HiOutlineSearch className="w-5 h-5 cursor-pointer text-gray-400" />
          </div>
          <input
            className="rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#2e808a] transition w-full"
            placeholder={"Search by position or skill..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <FilterListIcon fontSize="medium" sx={{ color: "#2e808a" }} />
        <div className="flex items-center gap-1">
          <select
            className="border border-gray-300 rounded px-2 py-1 outline-none  transition"
            value={sort}
            onChange={(e) => {
              setSort(Number(e.target.value));
              handleFilterChange();
            }}
          >
            <option value={1}>
              {t("sort_recently_rated") || "Recently rated (Mới đánh giá nhất)"}
            </option>
            <option value={2}>
              {t("sort_least_recently_rated") ||
                "Least recently rated (Cũ nhất)"}
            </option>
            <option value={3}>
              {t("sort_most_total_questions") ||
                "Most total questions (Nhiều câu hỏi nhất)"}
            </option>
            <option value={4}>
              {t("sort_fewest_total_questions") ||
                "Fewest total questions (Ít câu hỏi nhất)"}
            </option>
            <option value={5}>
              {t("sort_max_score") || "Max score (Điểm cao nhất)"}
            </option>
            <option value={6}>
              {t("sort_min_score") || "Min score (Điểm thấp nhất)"}
            </option>
          </select>
        </div>
      </div>

      {data?.interviews?.length === 0 && (
        <div className="text-center text-gray-500">
          {t("no_interview_history")}
        </div>
      )}
      {isLoading && (
        <div className=" mx-auto w-full  px-16 py-8">
          <div className="flex flex-wrap gap-3 max-h-[500px] overflow-y-auto pr-2">
            {[...Array(9)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      )}
      {data && data?.interviews?.length > 0 && (
        <div className="flex flex-wrap gap-4 pr-2">
          {data.interviews.slice(0, 9).map((interview) => (
            <div
              onClick={() =>
                navigate("/candidate/interviews/result", {
                  state: { interviewId: interview.interviewId },
                })
              }
              key={interview.interviewId}
              className="relative w-[32%] cursor-pointer bg-gradient-to-br from-[#f6fafd] via-[#ecf9f8] to-[#e5f7f9]  rounded-2xl  flex flex-col gap-2 border border-[#b3ebef]  hover:shadow-lg transition-all duration-200 group"
            >
              <img
                className="w-full h-48 rounded-t-xl"
                src="https://thumbs.dreamstime.com/b/global-connection-internet-satellite-web-data-network-g-telecommunications-world-space-generated-ai-global-connection-internet-316541882.jpg"
              />
              <div className="flex items-center gap-2">
                <div className=" bg-gradient-to-r from-green-100 to-blue-100 absolute top-2 right-2  px-2 py-1 rounded-full bg-white text-base font-semibold">
                  {interview.experience}
                </div>
              </div>
              <div className="px-6 pb-4 ">
                <div className="flex  flex-wrap sm:flex-row sm:justify-between sm:items-center ">
                  <div className="flex items-center gap-3 w-full flex-shrink-0">
                    <span className="bg-[#e6f4f1] p-2 rounded-full text-[#2e808a] shadow group-hover:scale-110 transition">
                      <HiOutlineBriefcase className="w-6 h-6" />
                    </span>
                    <div>
                      <span className="text-xs  text-gray-500 font-medium">
                        {t("position")}
                      </span>
                      <div className="text-lg font-bold text-[#2e808a]">
                        {interview.position}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <span className="bg-[#ffeecb] p-2 rounded-full text-[#eab308] shadow">
                      <HiOutlineUser className="w-2 h-2" />
                    </span> */}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 items-center">
                  <div className="w-full">
                    <span className="text-sm text-gray-500">{t("scores")}</span>
                    <div className="mt-1">
                      <ScoreBadges score={interview.totalScore} />
                    </div>
                  </div>
                  <div className="flex flex-col  gap-2 mr-auto">
                    <div className="flex">
                      <span className="text-[#2e808a]">
                        <HiOutlineCalendar className="w-5 h-5" />
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(interview.baseData.createdAt)}
                      </span>
                    </div>

                    <div></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex ">
                      {" "}
                      <span className="text-[#2e808a]">
                        <HiOutlineRefresh className="w-5 h-5" />
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(interview.baseData.updatedAt)}
                      </span>
                    </div>

                    <div>
                      {/* <div className="text-base">
                        {formatDate(interview.baseData.updatedAt)}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="p-2 rounded bg-[#2e808a] text-white font-semibold disabled:bg-gray-300"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="10,4 4,8 10,12" />
            </svg>
          </button>
          {Array.from({ length: data.totalPages }).map((_, i) => {
            if (
              i === 0 ||
              i === data.totalPages - 1 ||
              (i >= page - 2 && i <= page + 1)
            ) {
              return (
                <button
                  key={i}
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-[#2e808a] text-white font-bold"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              );
            }
            if (
              (i === page - 3 && page > 4) ||
              (i === page + 2 && page < data.totalPages - 3)
            ) {
              return <span key={i}>...</span>;
            }
            return null;
          })}
          <button
            className="px-2 py-2 rounded bg-[#2e808a] text-white font-semibold disabled:bg-gray-300"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="6,4 12,8 6,12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
