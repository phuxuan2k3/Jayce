import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faList, faPen, faPlus, faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
// import { format } from "date-fns";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const scenarioData = [
    {
        title: "SQL Query",
        description: "A SQL Query interview is a technical assessment designed to evaluate a candidate's knowledge and skills in Structured Query Language (SQL). This language is used to interact with relational databases, allowing users to retrieve, manipulate, and manage data efficiently.",
        rating: 4.6,
        totalAttemps: 17342,
        createdAt: "01/01/2023",
    },
    {
        title: "SQL Query 2",
        description: "A SQL Query interview is a technical assessment designed to evaluate a candidate's knowledge and skills in Structured Query Language (SQL). This language is used to interact with relational databases, allowing users to retrieve, manipulate, and manage data efficiently.",
        rating: 4.1,
        totalAttemps: 712,
        createdAt: "01/01/2023",
    },
];

const ScenarioListView = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedScenario, setSelectedScenario] = React.useState<typeof scenarioData[0] | null>(null);
    const [scenarios, setScenarios] = React.useState(scenarioData);
    const navigate = useNavigate();

    const handleGoToCreateScenario = () => {
        navigate("/scenario/create/detail");
    };

    const handleGoToEditScenario = () => {
        navigate("/scenario/edit/detail");
    };

    const handleGoToScenarioSubmissionListView = () => {
        navigate("/scenario/submission");
    };

    const handleOpenDialog = (scenario: typeof scenarioData[0]) => {
        setSelectedScenario(scenario);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedScenario(null);
    };

    const handleConfirmDelete = () => {
        if (selectedScenario) {
            setScenarios((prev) => prev.filter((item) => item !== selectedScenario));
        }
        handleCloseDialog();
    };

    return (
        <>
            <div className="w-full flex-grow flex flex-col items-center px-4">
                <div className="w-full flex-1 flex-col mt-6 ml-16">
                    <div className="w-full text-4xl font-bold">Manage your Scenarios</div>
                    <div className="w-full text-xl font-semibold">You can manage all your scenarios here!</div>
                </div>

                <div className="w-full max-w-7xl py-6">
                    <div className="flex flex-col items-center">
                        <div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
                            <span>Your scenarios ({scenarios.length})</span>
                            <div className="h-full w-fit flex items-center cursor-pointer">
                                <div className="h-7 w-7 flex items-center justify-center rounded-lg" onClick={() => handleGoToCreateScenario()}>
                                    <FontAwesomeIcon icon={faPlus} rotation={90} />
                                </div>

                                Add new test
                            </div>
                        </div>

                        {/* Scenario List */}
                        {scenarios.map((scenario, index) => (
                            <div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
                                <div className="font-medium mb-8 text-xl">
                                    <span>{scenario.title}</span>
                                </div>
                                <div className="mb-8">
                                    <span>{scenario.description}</span>
                                </div>

                                <div className="flex-1 flex justify-around mb-2">
                                    <div className="w-1/2 flex items-center justify-start font-semibold opacity-50 space-x-6">
                                        <span>
                                            {scenario.rating} <FontAwesomeIcon icon={faStar} />
                                        </span>
                                        <span>
                                            {scenario.totalAttemps.toLocaleString('de-DE')} <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <span>
                                            {scenario.createdAt} <FontAwesomeIcon icon={faCalendarDays} />
                                        </span>
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end space-x-5">
                                        <div className="flex items-center justify-center border border-primary p-3 rounded-md bg-[#e1c03e] cursor-pointer" onClick={() => handleGoToScenarioSubmissionListView()}>
                                            <FontAwesomeIcon className="h-5 w-5" icon={faList} />
                                        </div>
                                        <div className="flex items-center justify-center border border-primary p-3 rounded-md bg-[#d5eef1] cursor-pointer" onClick={() => handleGoToEditScenario()}>
                                            <FontAwesomeIcon className="h-5 w-5" icon={faPen} />
                                        </div>
                                        <div className="flex items-center justify-center border border-primary p-3 rounded-md bg-[#ff807c] cursor-pointer" onClick={() => handleOpenDialog(scenario)}>
                                            <FontAwesomeIcon className="h-5 w-5" icon={faTrash} />
                                        </div>
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

            <BootstrapDialog className="" onClose={handleCloseDialog} open={open}>
                <div className="bg-[#eaf6f8] rounded-sm shadow-primary p-4 border border-solid border-primary">
                    <DialogContent className="mb-4">
                        <span>Do you really want to delete "{selectedScenario?.title}" Scenario?</span>
                    </DialogContent>
                    <DialogActions className="flex items-center justify-evenly mb-4">
                        <button className="w-1/4 px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleCloseDialog}>
                            No
                        </button>
                        <button className="w-1/4 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleConfirmDelete}>
                            Yes
                        </button>
                    </DialogActions>
                </div>
            </BootstrapDialog>
        </>
    );
}

export default ScenarioListView