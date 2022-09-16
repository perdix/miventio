
/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {

	if (!locals.session) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const { prisma } = locals;
    // Get all organisations of the given user
    const orgs = await prisma.organisation.findMany({
        where: {
          superusers: {  
            some: {
                superuser_id: locals.session.id
            }
          },
        }, 
        // include: { superusers: { include: { superuser: true } } },
      });

      // Prepare the return objects
      // orgs.forEach(o => {
      //   o.superusers = o.superusers.map(s => { 
      //     return {
      //       role: s.role,
      //       id: s.superuser_id,
      //       email: s.superuser.email,
      //     }
      //   }); 
      // });
 
      
    return new Response( JSON.stringify(orgs));
}