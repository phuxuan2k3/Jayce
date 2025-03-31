import { useState } from 'react'
import Scheduler from "react-mui-scheduler"
import { mockData } from './types';


const TestSchedule = () => {
    const title = mockData.title;
    const events = mockData.events;

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

export default TestSchedule;