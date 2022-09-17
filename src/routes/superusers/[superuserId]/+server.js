import { toSuperuserJSON } from '$lib/server/serialization';


export async function GET({ url, locals, params }) {


	if (!locals.session && locals.session.id != params.superuserId) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const { prisma } = locals;

    const superuser = await prisma.superuser.findUnique({
        where: {
          id: locals.session.id,
        },
        include: {
            organisations: { include: { organisation: true } },
        }
    })
    
    return new Response( toSuperuserJSON(superuser));
    

}