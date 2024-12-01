import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Navbar from "../../components/Navbar";

import Scheduler from "react-mui-scheduler"
const Evaluate = () => {
    const title = "Design a product that helps people find contracts";
    const events = [
        {
            id: "event-1",
            label: "Medical consultation",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "04:00 AM",
            endHour: "05:00 AM",
            date: "2024-11-26",
            createdAt: new Date(),
            createdBy: "Kristina Mayer",
            image: "https://t3.ftcdn.net/jpg/03/54/17/86/360_F_354178616_uSdqA6i1A1vkkskFPKOoxQOED0ZMIcn3.jpg"
        },
        {
            id: "event-2",
            label: "Medical consultation",
            groupLabel: "Dr Claire Brown",
            user: "Dr Claire Brown",
            color: "#099ce5",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2024-11-09",
            createdAt: new Date(),
            createdBy: "Kristina Mayer",
            image: "https://tenten.vn/tin-tuc/wp-content/uploads/2022/05/web-design-4.jpg"
        },
        {
            id: "event-3",
            label: "Medical consultation",
            groupLabel: "Dr Menlendez Hary",
            user: "Dr Menlendez Hary",
            color: "#263686",
            startHour: "13:00",
            endHour: "14:00",
            date: "2024-11-10",
            createdAt: new Date(),
            createdBy: "Kristina Mayer",
            image: "https://tenten.vn/tin-tuc/wp-content/uploads/2022/05/web-design-4.jpg"
        },
        {
            id: "event-4",
            label: "Consultation prénatale",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "08:00 AM",
            endHour: "09:00 AM",
            date: "2024-11-11",
            createdAt: new Date(),
            createdBy: "Kristina Mayer",
            image: "https://tenten.vn/tin-tuc/wp-content/uploads/2022/05/web-design-4.jpg"
        },
        // Dữ liệu khóa học A
        {
            id: "event-5",
            label: "Khóa học A",
            groupLabel: "Instructor A",
            user: "Instructor A",
            color: "#8e44ad",
            startHour: "10:00 AM",
            endHour: "12:00 PM",
            date: "2024-11-26", // Ngày khóa học
            createdAt: new Date(),
            createdBy: "Admin",
            image: "https://tenten.vn/tin-tuc/wp-content/uploads/2022/05/web-design-4.jpg"
        },
        {
            id: "event-6",
            label: "Khóa học A",
            groupLabel: "Instructor A",
            user: "Instructor A",
            color: "#8e44ad",
            startHour: "10:00 AM",
            endHour: "12:00 PM",
            date: "2024-11-27", // Ngày khóa học
            createdAt: new Date(),
            createdBy: "Admin",
            image: "https://tenten.vn/tin-tuc/wp-content/uploads/2022/05/web-design-4.jpg"
        }
    ];
    const [state] = useState({
        options: {
            transitionMode: "zoom",
            startWeekOn: "mon",
            defaultMode: "month",
            minWidth: 540,
            maxWidth: 540,
            minHeight: 540,
            maxHeight: 540
        },

        toolbarProps: {
            showSearchBar: true,
            showSwitchModeButtons: false,
            showDatePicker: true
        }
    })
    const uniqueEvents = [];
    const uniqueLabels = new Set();
    const filteredEvents = events.filter(event => {
        if (!uniqueLabels.has(event.label)) {
            uniqueLabels.add(event.label);
            uniqueEvents.push(event);
            return true;
        }
        return false;
    });
    return (
        <>

            <Navbar />
            <div className="min-h-screen p-6 ">
                <h1 className="text-2xl font-bold mb-6">{title}</h1>
                <div className="flex space-x-6">
                    <div className="bg-blue-50 shadow-md rounded-md p-6 space-y-6 w-5/6">
                        {/* Review Comment */}
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-md text-gray-700">
                                <Scheduler
                                    locale="en"
                                    events={events}
                                    legacyStyle={false}
                                    options={state?.options}
                                    toolbarProps={state?.toolbarProps}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="space-y-6">
                        <div className="bg-white shadow-md rounded-md p-6 space-y-6">
                            <div className="space-y-4">
                                <h2 className="font-semibold text-lg">Your course</h2>
                                <div className="space-y-2">
                                    {filteredEvents.map((event) => (
                                        <div key={`${event.id}-${event.label}`} className="flex flex-col items-center bg-gray-100 rounded-md shadow-md">
                                            {/* Image */}
                                            <img
                                                src={event.image}
                                                alt={event.label}
                                                className="w-full h-40 object-cover rounded-md mb-4"
                                            />
                                            {/* Event Information */}
                                            <p className="text-sm text-gray-500 text-center">{event.createdBy}</p>
                                            <h3 className="text-xl font-semibold text-center mb-4">{event.label}</h3>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </>
    );
};







export default Evaluate;