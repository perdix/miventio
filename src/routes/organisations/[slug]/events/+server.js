

export async function GET({ url, locals, params }) {

    if (!locals.session) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const { prisma } = locals;

    const role = await prisma.role.findFirst({
        where: {
            organisation_id: params.slug,
            superuser_id: locals.session.id
        }
    });
    
    if (role === null) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const events = await prisma.event.findMany({
            where: { organisation_id: params.slug }
        }
    );

    return new Response( JSON.stringify(events));
}