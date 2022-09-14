export let events = [
    {
        title: 'Österreichischer Kongress für Zahnmedizin 2022',
        description: 'Das ist eine Beschreibung des Events',
        date: '21. - 23. März 2022',
        location: 'Palais Epstein',
        visible: true,
        city: 'Wien',
        status: 'Geöffnet',
        bookings: '328'
    },
    {
        title: 'Kongress für Zahnmedizin',
        description: 'Das ist eine Beschreibung des Events',
        date: '21.3.22 - 23.3.22',
        location: 'Palais Epstein',
        city: 'Wien',
        visible: true,
        status: 'Geöffnet',
        bookings: '328'
    },
    {
        title: 'Kongress für Zahnmedizin',
        description: 'Das ist eine Beschreibung des Events',
        date: '21.3.22 - 23.3.22',
        location: 'Palais Epstein',
        city: 'Wien',
        visible: true,
        status: 'Geöffnet',
        bookings: '328'
    },
    {
        title: 'Kongress für Zahnmedizin',
        description: 'Das ist eine Beschreibung des Events',
        date: '21.3.22 - 23.3.22',
        location: 'Palais Epstein',
        city: 'Wien',
        visible: true,
        status: 'Geöffnet',
        bookings: '328'
    },
    {
        title: 'Kongress für Zahnmedizin',
        description: 'Das ist eine Beschreibung des Events',
        date: '21.3.22 - 23.3.22',
        location: 'Palais Epstein',
        city: 'Wien',
        visible: false,
        status: 'Geöffnet',
        bookings: '0'
    },
    {
        title: 'Kongress für Zahnmedizin',
        description: 'Das ist eine Beschreibung des Events',
        date: '21.3.22 - 23.3.22',
        location: 'Palais Epstein',
        city: 'Wien',
        status: 'Geöffnet',
        visible: true,
        bookings: '328'
    },
    {
        title: 'Kongress für Zahnmedizin',
        description: 'Das ist eine Beschreibung des Events',
        date: '21.3.22 - 23.3.22',
        location: 'Palais Epstein',
        city: 'Wien',
        status: 'Geöffnet',
        visible: true,
        bookings: '328'
    }
];


export async function GET({ url }) {
    
    return new Response( JSON.stringify(events));
}