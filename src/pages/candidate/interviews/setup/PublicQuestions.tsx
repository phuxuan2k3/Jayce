import { useState } from "react";
import { useGetPublicQuestionsQuery } from "../../../../features/interviews/api/interview.api";
import { HiOutlineCalendar, HiOutlineRefresh } from "react-icons/hi";
import { useLanguage } from "../../../../LanguageProvider";

const positions = [
    "Software Engineer",
    "Data Analyst",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "Full-Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer (iOS/Android)",
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Scientist",
    "Product Manager",
    "Project Manager (IT)",
    "UI/UX Designer",
    "Network Engineer",
    "System Administrator",
    "Database Administrator (DBA)",
    "QA Engineer / Test Automation Engineer",
    "Business Analyst (IT)",
    "Solutions Architect",
    "Technical Support Specialist",
    "IT Consultant",
    "Scrum Master",
    "Site Reliability Engineer (SRE)",
    "Embedded Systems Engineer",
    "Game Developer",
    "Blockchain Developer",
    "Robotics Engineer",
    "IT Auditor",
];

const experiences = ["intern", "fresher", "junior", "mid", "senior", "lead", "manager", "director"];

// const mockQuestions = Array.from({ length: 40 }, (_, idx) => ({
//     position: positions[idx % positions.length],
//     experience: experiences[idx % experiences.length],
//     content: `This is a mock question for ${positions[idx % positions.length]} (${experiences[idx % experiences.length]} level).`,
//     language: "English",
//     baseData: {
//         createdAt: new Date(Date.now() - idx * 10000000).toISOString(),
//         updatedAt: new Date(Date.now() - idx * 5000000).toISOString(),
//     },
// }));

const SkeletonCard = () => (
    <div className="w-full p-4 rounded-xl border border-[#b3ebef] bg-white shadow animate-pulse space-y-2">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
        <div className="h-5 w-20 bg-blue-100 rounded-full"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="flex justify-between">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
    </div>
);

const PublicQuestionsPage = () => {
    const { t, language } = useLanguage();
    const [page, setPage] = useState(1);
    const [position, setPosition] = useState("");
    const [experience, setExperience] = useState("");
    const [lang, setLang] = useState<string>(language === "en" ? "English" : "Vietnamese");

    const { data, isLoading, isFetching, error } = useGetPublicQuestionsQuery({
        pos: position,
        exp: experience,
        lang,
        page
    });

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleDateString(language === "en" ? "en-US" : "vi-VN", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // const data = {
    //     questions: mockQuestions.filter(
    //         (q) =>
    //             (!position || q.position === position) &&
    //             (!experience || q.experience === experience) &&
    //             (!lang || (q.language === lang))
    //     ),
    //     totalPages: 10,
    // };

    return (
        <div className="w-full px-8 py-8">
            <h2 className="text-2xl font-bold mb-6 text-[#2e808a] text-center">
                {t("tab_public_questions")}
            </h2>

            <div className="flex flex-wrap gap-4 justify-center mb-6">
                <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="text-md py-2 pe-12 ps-2 shadow rounded-md"
                >
                    <option value="">{t("select_position")}</option>
                    {positions.map((pos) => (
                        <option key={pos} value={pos}>{pos}</option>
                    ))}
                </select>

                <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="text-md py-2 pe-12 ps-2 shadow rounded-md"
                >
                    <option value="">{t("select_experience")}</option>
                    {experiences.map((exp) => (
                        <option key={exp} value={exp}>{t(`experience_${exp}`)}</option>
                    ))}
                </select>

                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="text-md py-2 pe-12 ps-2 shadow rounded-md"
                >
                    <option value="English">English</option>
                    <option value="Vietnamese">Vietnamese</option>
                </select>
            </div>

            {(isLoading || isFetching) && (
                <div className="flex flex-wrap gap-4">
                    {[...Array(2)].map((_, idx) => <SkeletonCard key={idx} />)}
                </div>
            )}

            {error && (
                <div className="text-center text-red-600 font-semibold">
                    {t("failed_to_load_questions")}
                </div>
            )}

            {data?.questions?.length === 0 && !isLoading && !isFetching && (
                <div className="text-center text-gray-500">
                    {t("no_questions_found")}
                </div>
            )}

            <div className="space-y-4">
                {data?.questions.map((q, idx) => (
                    <div
                        key={idx}
                        className="w-full p-4 rounded-xl border border-[#b3ebef] bg-gradient-to-r from-[#f6fafd] via-[#ecf9f8] to-[#e5f7f9] shadow-sm hover:shadow transition"
                    >
                        <div className="mb-1">
                            <div className="text-sm font-semibold text-[#2e808a]">{q.position}</div>
                            <div className="inline-block mt-1 px-2 py-0.5 bg-primary-toned-100 text-primary-toned-700 text-xs rounded-full">
                                {t(`experience_${q.experience}`)}
                            </div>
                        </div>

                        <p className="text-sm text-gray-800 mb-2" title={q.content}>
                            {q.content}
                        </p>

                        <div className="flex justify-between text-xs text-gray-500">
                            <div className="italic">{q.language}</div>
                            <div className="flex items-center gap-1">
                                <HiOutlineCalendar className="w-4 h-4 text-[#2e808a]" />
                                {formatDate(q.baseData.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                                <HiOutlineRefresh className="w-4 h-4 text-[#2e808a]" />
                                {formatDate(q.baseData.updatedAt)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
                                    className={`px-3 py-1 rounded ${page === i + 1
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

export default PublicQuestionsPage;