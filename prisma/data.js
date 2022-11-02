import bcrypt from 'bcryptjs';

export const organisations = [
	{
		name: 'Gesellschaft für Parodontologie'
	},
	{
		name: 'Gesellschaft für HNO-Medizin'
	}
];

export const zahn_events = [
	{
		name: 'Österreichischer Kongress für Zahnmedizin 2022',
		description: 'Das ist eine Beschreibung des Events',
		location: 'Palais Epstein',
		city: 'Wien',
		start: new Date('2022-05-23'),
		end: new Date('2022-05-25')
	},
	{
		name: 'Ungarischer Kongress für Zahnmedizin 2023',
		description: 'Das ist eine Beschreibung des Events',
		location: 'Palais Epstein',
		city: 'Wien',
		start: new Date('2022-05-23'),
		end: new Date('2022-05-25')
	}
];

export const hno_events = [
	{
		name: 'Österreichischer Kongress für HNO 2022',
		description: 'Das ist eine Beschreibung des Events',
		location: 'Goldenes Dachl',
		city: 'Innsbruck',
		start: new Date('2022-05-23'),
		end: new Date('2022-05-25')
	},
	{
		name: 'Tiroler Mini-Workshop für HNO 2023',
		description: 'Das ist eine Beschreibung des Events',
		location: 'Goldenes Dachl',
		city: 'Innsbruck',
		start: new Date('2022-05-23'),
		end: new Date('2022-05-25')
	}
];

export const users = [
	{
		email: 'admin@mivent.io',
		password: await bcrypt.hash('admin', 10)
	}
];

export const memberships = [
	{
		name: "Hauptmitglied"
	},
	{
		name: "Partner"
	},
	{
		name: "Ehrenmitglied"
	}
]

export const contacts = [
	{
		firstName: 'Max 1',
		lastName: 'Mustermann',
		email: 'max1@hallo.io',
		address: 'musterplatz 2',
		city: 'Wien',
		postcode: '1010',
		status: 'AKTIV'
	},
	{
		firstName: 'Max 2',
		lastName: 'Mustermann',
		email: 'max2@hallo.io',
		address: 'musterplatz 2',
		city: 'Wien',
		postcode: '1010',
		status: 'INAKTIV'
	},
	{
		firstName: 'Max 3',
		lastName: 'Mustermann',
		email: 'max3@hallo.io',
		address: 'musterplatz 2',
		city: 'Wien',
		postcode: '1010',
		status: 'PENSIONIERT'
	}
];

export const eventTickets = [
	{
		name: 'Ticket 1',
		price: 32.5,
		validFrom: new Date('2022-05-20'),
		validTo: new Date('2022-05-24')
	},
	{
		name: 'Ticket 2',
		price: 50,
		validFrom: new Date('2022-05-20'),
		validTo: new Date('2022-05-24')
	},
	{
		name: 'Ticket 3',
		price: 50,
		validFrom: new Date('2022-05-20'),
		validTo: new Date('2022-05-24'),
		date: new Date('2022-05-24')
	},
	{
		name: 'Ticket 4',
		price: 150,
		validFrom: new Date('2022-05-20'),
		validTo: new Date('2022-05-24')
	}
];

export const activities = [
	{
		name: 'Workshop 1',
		limit: 30,
		date: new Date('2022-05-24Z14:00'),
		start: new Date('2022-05-24Z14:00'),
		end: new Date('2022-05-24Z16:00'),
		type: 'Workshop',
		speaker: 'Max Musterman'
	},
	{
		name: 'Workshop 2',
		limit: 30,
		date: new Date('2022-05-24Z14:00'),
		start: new Date('2022-05-23Z14:00'),
		end: new Date('2022-05-23Z14:00'),
		type: 'Workshop',
		speaker: 'Max Musterman'
	},
	{
		name: 'Vortrag 1',
		limit: 60,
		date: new Date('2022-05-24Z14:00'),
		start: new Date('2022-05-25Z14:00'),
		end: new Date('2022-05-25Z14:00'),
		type: 'Vortrag',
		speaker: 'Max Musterman'
	},
	{
		name: 'Vortrag 2',
		limit: 70,
		date: new Date('2022-05-24Z14:00'),
		start: new Date('2022-05-25Z14:00'),
		end: new Date('2022-05-25Z14:00'),
		type: 'Vortrag',
		speaker: 'Max Musterman'
	},
	{
		name: 'Vortrag 3',
		limit: 100,
		date: new Date('2022-05-24Z14:00'),
		start: new Date('2022-05-25Z14:00'),
		end: new Date('2022-05-25Z14:00'),
		type: 'Vortrag',
		speaker: 'Max Musterman'
	},
	{
		name: 'Clubbing',
		limit: 150,
		date: new Date('2022-05-24Z14:00'),
		start: new Date('2022-05-25Z20:00'),
		end: new Date('2022-05-25Z23:00'),
		type: 'Rahmenprogramm'
	}
];
