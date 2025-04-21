import * as React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SubjectIcon from '@mui/icons-material/Subject';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GradientBorderNotGood from "../../../../components/ui/border/GradientBorder.notgood";
import { useListScenarioMutation } from "../../../../features/scenarios/apis/concrete/ekko.scenario-api";
import { useListUsersMutation, useFindUsersByMetadataMutation } from "../../../../features/scenarios/apis/concrete/bulbasaur.scenario-api";
import { GetTestsApiResponse, useGetTestsQuery } from "../../../../features/tests/api/test.api-gen";
import { authSelectors, UserInfo } from "../../../../features/auth/store/authSlice";
import { useAppSelector } from "../../../../app/hooks";
import { SortType } from "../../../../features/scenarios/types";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const gettingStarted = [
    {
        text: 'Have a SkillSharp account',
        complete: true,
        navigatePath: null,
    },
    {
        text: 'Create your first test',
        complete: false,
        navigatePath: paths.manager.tests.CREATE,
    },
    {
        text: 'Create your first scenario',
        complete: false,
        navigatePath: paths.manager.scenario.CREATE_DETAIL,
    },
    {
        text: 'Have 1 reputation',
        complete: false,
        navigatePath: null,
    },
];

type DisplayQuestion = GetTestsApiResponse["data"][number] & {
    avatar: string;
    user: string;
    company: string;
};

const ManagerHomePage = () => {
    const navigate = useNavigate();
    const authData = useAppSelector(authSelectors.selectUserInfo);
    const [expand, setExpand] = React.useState(true);
    const [showMoreRecent, setShowMoreRecent] = React.useState(false);
    const [showMoreCompany, setShowMoreCompany] = React.useState(false);

    const [recentTestsData, setRecentTestsData] = React.useState<{ title: string; tags: string[]; company: string; timeAgo: string; type: string; createdAt: Date; }[]>([]);
    const [companyQuestionsData, setCompanyQuestionsData] = React.useState<DisplayQuestion[] | undefined>(undefined);
    const [gettingStartedData, _setGettingStartedData] = React.useState(gettingStarted);
    const [managersData, setManagersData] = React.useState<UserInfo[]>();

    const [listUsers] = useListUsersMutation();
    const [listScenario] = useListScenarioMutation();
    const [findUsersByMetadata] = useFindUsersByMetadataMutation();

    function getTimeAgo(date: Date) {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        const days = Math.floor(seconds / 86400);
        if (days === 0) return "Today";
        if (days === 1) return "1 day ago";
        return `${days} days ago`;
    }

    const { data: recentQuestions } = useGetTestsQuery({ managerIds: [authData?.id ?? ""], sortBy: [{ field: "createdAt", order: "desc" }], perPage: 4 }, { skip: !authData?.id });

    React.useEffect(() => {
        const fetchRecentData = async () => {
            if (!authData?.id) return;

            try {
                const scenariosRes = await listScenario({
                    bm_ids: [Number(authData.id)],
                    sort_methods: [{ name: "created_at", type: SortType.SORT_TYPE_DESC }],
                    page_index: 0,
                    page_size: 4,
                    field_ids: [],
                    min_rating: 0,
                    min_participant: 0,
                }).unwrap();

                const formattedScenarios = scenariosRes.scenario.map((s) => {
                    const rawCreatedAt = s.base_data.created_at;
                    const createdAt =
                        rawCreatedAt instanceof Timestamp
                            ? rawCreatedAt.toDate()
                            : new Date(rawCreatedAt ?? Date.now());

                    return {
                        title: s.name,
                        tags: s.fields.map((f) => f.name),
                        company: authData.metadata?.company || "N/A",
                        timeAgo: getTimeAgo(createdAt),
                        type: "Scenario",
                        createdAt,
                    };
                });

                const testsRes = recentQuestions?.data || [];

                const formattedTests = (testsRes).map((t: any) => {
                    const rawCreatedAt = t.created_at;
                    const createdAt =
                        rawCreatedAt instanceof Timestamp
                            ? rawCreatedAt.toDate()
                            : new Date(rawCreatedAt ?? Date.now());

                    return {
                        title: t.title,
                        tags: t.tags || [],
                        company: authData.metadata?.company || "N/A",
                        timeAgo: getTimeAgo(createdAt),
                        type: "Test",
                        createdAt,
                    };
                });

                const combined = [...formattedScenarios, ...formattedTests];
                combined.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

                setRecentTestsData(combined);
            } catch (err) {
                console.error("Error fetching recent tests/scenarios:", err);
            }
        };

        fetchRecentData();
    }, [authData]);

    const [managerIds, setManagerIds] = React.useState<string[]>([]);
    const { data: companyQuestions, error: companyQuestionsError } = useGetTestsQuery(
        managerIds.length > 0 ? { managerIds, perPage: 4 } : {},
        { skip: managerIds.length === 0 }
    );

    React.useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                let ids: string[] = [];

                if (authData?.metadata.company && authData?.metadata.company !== "") {
                    const response = await findUsersByMetadata({ company: authData.metadata.company, roles: [2] }).unwrap();
                    ids = response.ids || [];
                }

                const otherManagerIds = ids.filter(id => id !== authData?.id);
                setManagerIds(otherManagerIds);

                console.log("Manager IDs:", otherManagerIds);

                const managerList = await listUsers({ user_ids: otherManagerIds.map(id => Number(id)) }).unwrap();
                setManagersData(managerList.users);

                console.log("Manager List:", managerList.users);
            } catch (error) {
                console.error("Error fetching manager list:", error);
            }
        };

        fetchCompanyData();
    }, []);

    React.useEffect(() => {
        if (companyQuestionsError) {
            console.error("Error fetching company questions:", companyQuestionsError);
        }

        if (companyQuestions) {
            console.log("Company Questions:", companyQuestions.data);
            const enhancedQuestions = companyQuestions.data?.map((q: any) => {
                const manager = managersData?.find((u: UserInfo) => String(u.id) === String(q.managerId));
                return {
                    ...q,
                    avatar: manager?.metadata.avatarPath || "/default-avatar.png",
                    user: manager?.metadata.fullname || "Unknown",
                    company: manager?.metadata.company || "N/A"
                };
            }) ?? [];

            setCompanyQuestionsData(enhancedQuestions);
        }
    }, [companyQuestions, companyQuestionsError, managersData]);

    // const navigateToTest = (testId: string) => {
    //     navigate(paths.candidate.tests.in(testId).ATTEMPTS);
    // }

    return (
        <>
            <div className="p-2 max-w-7xl mx-auto mt-4">
                <h1 className="text-3xl font-semibold">Welcome back, Manager!</h1>
                <p className="text-lg mb-6">
                    Continue finding suitable candidates by create tests and scenarios.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 pt-6 pr-6 pb-6">
                <aside className={`${expand ? 'w-full lg:w-1/5' : 'w-12'} overflow-hidden`}>
                    <div className="bg-primary-toned-50 border rounded-r-lg p-4 shadow-sm flex flex-col">
                        <div onClick={() => setExpand(!expand)} className="flex items-center justify-between gap-2 cursor-pointer select-none">
                            {expand && (
                                <h2 className="font-semibold text-lg text-primary whitespace-nowrap">Getting started</h2>
                            )}
                            <ChevronRightIcon
                                className={`transition-transform duration-300 text-primary ${expand ? 'rotate-90' : ''
                                    }`}
                            />
                        </div>

                        {expand && (
                            <ul className="space-y-2 text-sm mt-4">
                                {gettingStartedData.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className={`flex items-start gap-2 ${item.complete ? 'text-gray-500' : ''} ${item.navigatePath ? 'cursor-pointer' : ''}`}
                                        onClick={() => { navigate(item.navigatePath || ''); }}
                                    >
                                        <img
                                            className="h-5 w-5"
                                            src={item.complete ? '/svg/check.svg' : 'svg/not_check.svg'}
                                            alt="complete"
                                        />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </aside>

                <main className={`w-full space-y-10 ${expand ? "lg:w-4/5" : "lg:w-full"}`}>
                    <section>
                        <div className="flex justify-between items-center mb-3 text-primary">
                            <h2 className="text-2xl font-semibold">Recent tests/scenarios</h2>
                            {recentTestsData.length > 2 && (
                                <button
                                    className="text-sm hover:underline"
                                    onClick={() => setShowMoreRecent(prev => !prev)}
                                >
                                    {showMoreRecent ? "Show less" : "Show more"}
                                </button>
                            )}
                        </div>
                        <div className="space-y-3">
                            {recentTestsData.slice(0, showMoreRecent ? 4 : 2).map((test, idx) => (
                                <div key={idx} className="border p-4 rounded-md bg-white shadow-md cursor-pointer" onClick={() => { navigate(test.type === "Test" ? paths.manager.tests.SELF : paths.manager.scenario._layout) }}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-primary">
                                                {test.type === 'Test' ? <FormatListBulletedIcon className="w-10 h-10" /> : <SubjectIcon className="w-10 h-10" />}
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-sm mb-1 text-primary-toned-500">Asked at {test.company}</p>
                                                    <h3 className="font-bold text-lg">{test.title}</h3>
                                                </div>
                                                <div className="flex flex-col items-end justify-end h-full">
                                                    <div className="flex gap-2 mt-1 text-xs">
                                                        {test.tags.slice(0, 2).map((tag: string, i: number) => (
                                                            <GradientBorderNotGood key={i}>
                                                                {tag}
                                                            </GradientBorderNotGood>
                                                        ))}
                                                        {test.tags.length > 2 && (
                                                            <GradientBorderNotGood>
                                                                {`+${test.tags.length - 2} more`}
                                                            </GradientBorderNotGood>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-primary-toned-500">{test.timeAgo}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex justify-between items-center mb-3 text-primary">
                            <h2 className="text-2xl font-semibold">In your companies</h2>
                            {companyQuestionsData && companyQuestionsData.length > 2 && (
                                <button
                                    className="text-sm hover:underline"
                                    onClick={() => setShowMoreCompany(prev => !prev)}
                                >
                                    {showMoreCompany ? "Show less" : "Show more"}
                                </button>
                            )}
                        </div>
                        <div className="space-y-3">
                            {companyQuestionsData?.length ? (
                                companyQuestionsData?.slice(0, showMoreCompany ? 4 : 2).map((q, idx) => (
                                    <div key={idx} className="border p-4 rounded-md bg-white shadow-md flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1 text-sm text-primary">
                                                <img src={q.avatar} alt={q.user} className="rounded-full w-5 h-5" />
                                                <span>{q.user}</span>
                                                <span className="mx-2">&#8226;</span>
                                                <span>{q.company}</span>
                                            </div>
                                            <p className="font-bold">{q.title}</p>
                                        </div>
                                        <button className="px-10 rounded-lg py-2 font-bold cursor-pointer bg-[var(--primary-color)] text-white">View</button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No company questions found.</p>
                            )}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-1 text-primary">Practices</h2>
                        <p className="text-md">
                            Practice makes perfect. You can learn how to write a better test or scenario{' '}
                            <a href="#" className="text-primary hover:underline">here</a>.
                        </p>
                    </section>
                </main>
            </div>
        </>
    );
}

export default ManagerHomePage;