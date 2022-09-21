import bcrypt from 'bcryptjs';

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
    {
        name: 'Österreichischer Kongress für HNO 2022',
        description: 'Das ist eine Beschreibung des Events',
        location: 'Goldenes Dachl',
        city: 'Innsbruck',
        start: new Date('2022-05-23'),
        end: new Date('2022-05-25')
    },
];


export const superusers = [
    {
        email: 'admin@mivent.io',
        password: await bcrypt.hash('admin', 10)
    },
    {
        email: 'admin2@mivent.io',
        password: await bcrypt.hash('admin', 10)
    },
];

export const users = [
    {
        first_name: "Max 1",
        last_name: "Mustermann",
        status: "Student",
        email: 'max1@hallo.io',
        address: "musterplatz 2",
        city: "Wien",
        postcode: "1010"
    },
    {
        first_name: "Max 2",
        last_name: "Mustermann",
        status: "Mitglied",
        email: 'max2@hallo.io',
        address: "musterplatz 2",
        city: "Wien",
        postcode: "1010"
    },
    {
        first_name: "Max 3",
        last_name: "Mustermann",
        status: "Contact",
        email: 'max3@hallo.io',
        address: "musterplatz 2",
        city: "Wien",
        postcode: "1010"
    },
];


export const tickets = [
    {
        name: "Ticket 1",
        price: 32.5,
        category: "MITGLIED"

    },
    {
        name: "Ticket 2",
        price: 50,
        category: "STUDENT"
    },
    {
        name: "Ticket 3",
        price: 50,
        category: "STUDENT",
        date: new Date('2022-05-24')
    },
    {
        name: "Ticket 4",
        price: 150,
        category: "ALLGEMEIN",
    }
]



export const activities = [
    {
        name: "Workshop 1",
        limit: 30,
        price: 34.5,
        start: new Date('2022-05-24Z14:00'),
        end: new Date('2022-05-24Z16:00'),
        category: 'Workshop',
        author: "Max Musterman"
    },
    {
        name: "Workshop 2",
        limit: 30,
        price: 34.5,
        start: new Date('2022-05-23Z14:00'),
        end: new Date('2022-05-23Z14:00'),
        category: 'Workshop',
        author: "Max Musterman"
    },
    {
        name: "Vortrag 1",
        limit: 30,
        price: 34.5,
        start: new Date('2022-05-25Z14:00'),
        end: new Date('2022-05-25Z14:00'),
        category: 'Vortrag',
        author: "Max Musterman"
    },
    {
        name: "Vortrag 2",
        limit: 70,
        price: 34.5,
        start: new Date('2022-05-25Z14:00'),
        end: new Date('2022-05-25Z14:00'),
        category: 'Vortrag',
        author: "Max Musterman"
    },
    {
        name: "Vortrag 3",
        limit: 100,
        price: 34.5,
        start: new Date('2022-05-25Z14:00'),
        end: new Date('2022-05-25Z14:00'),
        category: 'Vortrag',
        author: "Max Musterman"
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