export const organisations = [
    {
        name: 'Gesellschaft für Parodontologie 1'
    },
    {
        name: 'Gesellschaft für Parodontologie 2'
    }
];

export const events = [
    {
        name: 'Österreichischer Kongress für Zahnmedizin 2022',
        description: 'Das ist eine Beschreibung des Events',
        location: 'Palais Epstein',
        city: 'Wien',
        start: new Date('2022-05-23'),
        end: new Date('2022-05-25')
    },
];


export const superusers = [
    {
        email: 'admin1@mivent.io'
    },
    {
        email: 'admin2@mivent.io'
    },
];

export const users = [
    {
        first_name: "Max 1",
        last_name: "Mustermann",
        email: 'max1@hallo.io'
    },
    {
        first_name: "Max 2",
        last_name: "Mustermann",
        email: 'max2@hallo.io'
    },
];


export const tickets = [
    {
        name: "Ticket 1",
        price: 32.5
    },
    {
        name: "Ticket 2",
        price: 50
    }
]



export const activities = [
    {
        name: "Workshop 1",
        limit: 30,
        price: 34.5
    },
    {
        name: "Workshop 2",
        limit: 30,
        price: 34.5
    }
]

export const bookings = [
    {
        total: 34.4,
        status: "BEZAHLT",
        cart: [{ person: 'Testperson'}]
    }, 
    {
        total: 54.4,
        status: "BEZAHLT"
    }
]