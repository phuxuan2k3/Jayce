import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faMagnifyingGlass, faSquarePollHorizontal, faCalendarMinus, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const scenarioData = {
    testName: "SQL Query",
    totalPoints: 10,
}

const submissionData = [
    {
        submitter: "Nguyen Van A",
        submitedAt: "2024-10-20T13:09:00",
        completeness: 100,
        score: 7.5,
    },
    {
        submitter: "Nguyen Van B",
        submitedAt: "2024-10-20T15:12:00",
        completeness: 10,
        score: 1,
    },
];

const ScenarioSubmissionListView = () => {
    const [open, setOpen] = React.useState(false);
    const [submissionList, _setSubmissionList] = React.useState(submissionData);
    const [submissionOverview, _setSubmissionOverview] = React.useState(scenarioData);
    const [selectedVersion, _setSelectedVersion] = useState<string | "all">("all");
    const [availableVersions, _setAvailableVersions] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    function handleGoToSubmissionDetail(submission: { submitter: string; submitedAt: string; completeness: number; score: number; }): void {
        navigate("/scenario/submission/detail", { state: { submission } });
    }

    return (
        <>
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full max-w-7xl py-6">
                    <h1 className="text-2xl text-center text-[var(--primary-color)] font-bold mb-6">{submissionOverview.testName}</h1>

                    <div className="flex flex-col items-center">
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                            <span>Submission List ({submissionList.length})</span>
                            <div className="h-full w-fit flex items-center">
                                <div className="h-7 w-7 bg-[#EAF6F8] flex items-center justify-center rounded-lg cursor-pointer" onClick={handleClickOpen}>
                                    <FontAwesomeIcon icon={faSliders} rotation={90} />
                                </div>

                                <div className="flex items-center ml-4">
                                    <div className="h-7 w-fit bg-[#EAF6F8] flex items-center justify-center rounded-lg p-2">
                                        <FontAwesomeIcon className="h-4 w-4 mr-2" icon={faMagnifyingGlass} />
                                        <input className="bg-[#EAF6F8]" type="text" placeholder="Search for submitter" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission List */}
                        {submissionList.map((submission, index) => (
                            <div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
                                <div className="flex-1 flex justify-between mb-4">
                                    <span className="font-bold mb-2 opacity-50">
                                        #Version number
                                    </span>

                                    <div className="cursor-pointer" onClick={() => handleGoToSubmissionDetail(submission)}>
                                        <FontAwesomeIcon className="h-6 w-6" icon={faSquarePollHorizontal} />
                                    </div>
                                </div>

                                <div className="font-medium mb-8">
                                    Submitter: <span className="text-[#39A0AD] underline">{submission.submitter}</span>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon className="h-4 w-4" icon={faCalendarMinus} />
                                            <span className="ml-2 text-gray-600 text-sm font-medium">{format(new Date(submission.submitedAt), "dd-MM-yyyy HH:mm:ss")}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FontAwesomeIcon className="h-4 w-4 ml-4" icon={faListCheck} />
                                            <span className="ml-2 text-gray-600 text-sm font-medium">Completeness: {submission.completeness}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        {submission.score === null ? (
                                            <span className="text-red-600 font-semibold">Not graded</span>
                                        ) : (
                                            <span className="text-primary font-semibold">
                                                Overall: {submission.score}/{submissionOverview?.totalPoints}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row justify-center items-center space-x-2 mt-4">
                        <button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-270">
                            ^
                        </button>

                        <button className="w-10 h-10 bg-primary rounded-full text-md font-bold text-white border border-primary cursor-pointer">
                            1
                        </button>

                        <button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-90">
                            ^
                        </button>
                    </div>
                </div>
            </div>
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    sx={{
                        "& .MuiPaper-root": {
                            backgroundColor: "#EAF6F8",
                        },
                    }}
                >
                    <DialogTitle className="text-center font-bold" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Filter
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div className="flex flex-row justify-center">
                            <span className="font-semibold">Date</span>
                            <div className="flex flex-row gap-2 ml-16">
                                <input type="date" className="border border-black rounded-lg text-sm p-1"
                                />
                                <input type="date" className="border border-black rounded-lg text-sm p-1"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <label className="font-semibold">Version</label>
                            <select className="border border-black rounded-lg text-sm p-1 w-fit" value={selectedVersion}>
                                <option value="all">All</option>
                                {availableVersions.map(version => (
                                    <option key={version} value={version}>
                                        {version}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className="w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleClose}>
                            Reset
                        </button>
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleClose}>
                            Apply
                        </button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
        </>
    );
}

export default ScenarioSubmissionListView