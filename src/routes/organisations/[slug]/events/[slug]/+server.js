export let event = {
        title: 'Österreichischer Kongress für Zahnmedizin 2022',
        description: 'Das ist eine Beschreibung des Events',
        date: '21. - 23. März 2022',
        location: 'Palais Epstein',
        visible: true,
        city: 'Wien',
        status: 'Geöffnet',
        bookings: '328'
    }


export async function GET({ url }) {
    
    return new Response( JSON.stringify(event));
}