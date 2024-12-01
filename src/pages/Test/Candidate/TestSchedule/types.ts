type Event = {
    id: string;
    label: string;
    groupLabel: string;
    user: string;
    color: string;
    startHour: string;
    endHour: string;
    date: string;
    createdAt: Date;
    createdBy: string;
    image: string;
};

export type TestScheduleProps = {
    title: string;
    events: Event[];
}

export const mockData: TestScheduleProps = {
    title: "Design a product that helps people find contracts",
    events: [
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
    ]
}