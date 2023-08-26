export const employeesData = [
    {
        id: 1,
        name: "John Doe",
        designation: "CEO",
        phone: "9999999990",
        email: "johndoe@gmail.com",
    },
    {
        id: 2,
        name: "Mary",
        designation: "HR",
        phone: "8888888880",
        email: "mary@gmail.com",
    },
    {
        id: 3,
        name: "Rob",
        designation: "Head of Engineering",
        phone: "8787990033",
        email: "rob@gmail.com",
    },
    {
        id: 4,
        name: "Ramesh",
        designation: "Head of Design",
        phone: "7878002246",
        email: "ramesh@gmail.com",
    },
    {
        id: 5,
        name: "Rahul",
        designation: "Team Leader of Frontend team",
        phone: "9937952675",
        email: "rahul@gmail.com",
    },
    {
        id: 6,
        name: "Sachin",
        designation: "Team Leader of Figma team",
        phone: "998652455",
        email: "sachin@gmail.com",
    },
    {
        id: 7,
        name: "Manish",
        designation: "Engineer",
        phone: "8836852435",
        email: "manish@gmail.com",
    },
    {
        id: 8,
        name: "Ronnie",
        designation: "Engineer",
        phone: "7735244467",
        email: "ronnie@gmail.com",
    },
    {
        id: 9,
        name: "Evelina",
        designation: "Designer",
        phone: "7723456561",
        email: "evelina@gmail.com",
    },
    {
        id: 10,
        name: "Sarthak",
        designation: "Designer",
        phone: "9099253331",
        email: "sarthak@gmail.com",
    },
    {
        id: 11,
        name: "Ronald",
        designation: "State Sales Head",
        phone: "7724566781",
        email: "ronald@gmail.com",
    },
    {
        id: 12,
        name: "Leroy",
        designation: "Country Sales Head",
        phone: "8989245720",
        email: "leroy@gmail.com",
    },
    {
        id: 13,
        name: "Ankan pal",
        designation: "Sales",
        phone: "6905245789",
        email: "ankanpal@gmail.com",
    },
    {
        id: 14,
        name: "rohit",
        designation: "Sales",
        phone: "9942367891",
        email: "rohit@gmail.com",
    },
];

export const dept_data = {
    CEO: {
        departments: {
            HR: {
                teams: [
                    {
                        teamId: "t-01",
                        teamName: "State Sales Team",
                        leader: 11,
                        members: [14],
                    },
                    {
                        teamId: "t-02",
                        teamName: "Country Sales Team",
                        leader: 12,
                        members: [13],
                    },
                ],
            },
            "Head of Engineering": {
                teams: [
                    {
                        teamId: "t-03",
                        teamName: "Frontend Team",
                        leader: 5,
                        members: [7, 8],
                    },
                ],
            },
            "Head of Design": {
                teams: [
                    {
                        teamId: "t-04",
                        teamName: "Figma Team",
                        leader: 6,
                        members: [9, 10],
                    },
                ],
            },
        },
    },
};
