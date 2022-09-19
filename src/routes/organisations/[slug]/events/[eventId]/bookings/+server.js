import {toBookingJSON, toBookingsJSON} from '$lib/server/serialization'
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization'


export async function GET({ locals, params }) {

    if (!isOrganisationMember(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const bookings = await locals.prisma.booking.findMany({
            where: { 
                organisation_id: params.slug, 
                event_id: params.bookingId 
            }
        }
    );
    return new Response(toBookingsJSON(bookings));
}


export async function POST({ locals, params, request }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }
    const data = await request.json();
    console.log(data);
    data.event_id = params.eventId;
    const booking = await locals.prisma.booking.create({
        data: data
      })
    
    return new Response(toBookingJSON(booking), {status: 201});
}