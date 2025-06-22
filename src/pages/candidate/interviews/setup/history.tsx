import { useState } from "react";
import { useGetHistoryQuery } from "../../../../features/interviews/api/interview.api";
import {
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineRefresh,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
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
  <div className="flex gap-2 flex-wrap items-center">
    {Object.entries(score).map(([key, value]) => {
      const style = SCORE_STYLES[key] || {};
      return (
        <span
          key={key}
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-semibold font-mono shadow-md ${style.bg} ${style.color} border border-opacity-40 border-gray-300`}
          title={`Score ${key}`}
        >
          {style.label}: {value}
        </span>
      );
    })}
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white shadow rounded-xl p-5 flex flex-col gap-2 border animate-pulse">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
      <div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
    <div className="flex flex-wrap gap-8 mt-2 items-center">
      <div>
        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 w-10 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
      <div>
        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 w-24 bg-gray-300 rounded"></div>
      </div>
      <div>
        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
        <div className="h-5 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const HistoryPage = () => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { data, isLoading, isFetching, error } = useGetHistoryQuery({
    pageIndex: page,
  });

  if (isLoading || isFetching) {
    return (
      <div className=" mx-auto w-full  px-16 py-8">
        <h2 className="text-2xl font-bold mb-6 text-[#2e808a] text-center">
          Interview History
        </h2>
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
          {[...Array(3)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <span className="text-lg text-red-600 font-semibold">
          Failed to load interview history.
        </span>
      </div>
    );
  }

  return (
    <div className=" w-full px-16 py-8">
      <h2 className="text-2xl font-bold mb-6 text-[#2e808a] text-center">
        Interview History
      </h2>
      {data?.interviews?.length === 0 && (
        <div className="text-center text-gray-500">
          No interview history found.
        </div>
      )}
      {data && data?.interviews?.length > 0 && (
        <div className="flex flex-col gap-5 max-h-[500px] overflow-y-auto pr-2">
          {data.interviews.map((interview) => (
            <div
              onClick={() =>
                navigate("/candidate/interviews/result", {
                  state: { interviewId: interview.interviewId },
                })
              }
              key={interview.interviewId}
              className="cursor-pointer bg-gradient-to-br from-[#f6fafd] via-[#ecf9f8] to-[#e5f7f9]  rounded-2xl p-6  flex flex-col gap-4 border border-[#b3ebef]  hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="bg-[#e6f4f1] p-2 rounded-full text-[#2e808a] shadow group-hover:scale-110 transition">
                    <HiOutlineBriefcase className="w-6 h-6" />
                  </span>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">
                      Position
                    </span>
                    <div className="text-lg font-bold text-[#2e808a]">
                      {interview.position}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#ffeecb] p-2 rounded-full text-[#eab308] shadow">
                    <HiOutlineUser className="w-6 h-6" />
                  </span>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">
                      Experience
                    </span>
                    <div className="text-base font-semibold">
                      {interview.experience}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-8 mt-2 items-center">
                <div>
                  <span className="text-sm text-gray-500">Scores</span>
                  <div className="mt-1">
                    <ScoreBadges score={interview.totalScore} />
                  </div>
                </div>
                <div className="flex flex-col  gap-2">
                  <div className="flex">
                    <span className="text-[#2e808a]">
                      <HiOutlineCalendar className="w-5 h-5" />
                    </span>
                    <span className="text-sm text-gray-500">Created At</span>
                  </div>

                  <div>
                    <div className="text-base">
                      {formatDate(interview.baseData.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex ">
                    {" "}
                    <span className="text-[#2e808a]">
                      <HiOutlineRefresh className="w-5 h-5" />
                    </span>
                    <span className="text-sm text-gray-500">Updated At</span>
                  </div>

                  <div>
                    <div className="text-base">
                      {formatDate(interview.baseData.updatedAt)}
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
