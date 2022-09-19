import { toBookingJSON } from '$lib/server/serialization'
import { isOrganisationAdmin, isOrganisationMember } from '$lib/server/authorization'


export async function GET({ locals, params }) {

    if (!isOrganisationMember(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const booking = await locals.prisma.booking.findFirst({
        where: {
          id: params.bookingId,
          organisation_id: params.slug
        }
      })
    return new Response(toBookingJSON(booking));
}



export async function PUT({ locals, params, request }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }
   
    const data = await request.json();
    const booking = await locals.prisma.booking.update({
        where: {
            id: params.bookingId,
        },
        data: data
    })

    return new Response(toBookingJSON(booking), {status: 200});
}


export async function DELETE({ locals, params }) {

    if (!isOrganisationAdmin(locals, params.slug)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }
    
    console.log(params);
    const deletedBooking = await locals.prisma.booking.delete({
        where: {
            id: params.bookingId,
        },
      })
    
    return new Response(JSON.stringify({message: "Booking successfully deleted!"}), {status: 200});
}