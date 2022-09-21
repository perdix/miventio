import { toSuperuserJSON } from '$lib/server/serialization';
import { isLoggedIn } from '$lib/server/authorization'
import bcrypt from 'bcryptjs';

export async function GET({ locals, params }) {

	if (!isLoggedIn(locals)) {
		return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
	}

    const superuser = await locals.prisma.superuser.findUnique({
        where: {
            id: params.userId
          },
        include: {
            organisations: { include: { organisation: true } },
        }
      });
    return new Response(toSuperuserJSON(superuser));
}


export async function PUT({ locals, params, request }) {

    if ((!isLoggedIn(locals)) && (locals.session.id === params.userId)) {
        return new Response(JSON.stringify({message: "Unauthorized"}), { status: 401 })
    }

    const data = await request.json();

    if ('password' in data) {
        if (('password' in data) && ('passwordRepeat' in data) && (data.password === data.passwordRepeat)) {
            data.password = await bcrypt.hash(data.password, 10);  
            delete data.passwordRepeat;
        } else {
            return new Response(JSON.stringify({message: "Bad Request"}), { status: 404 })
        }
    }

    const superuser = await locals.prisma.superuser.update({
        where: {
            id: locals.session.id,
        },
        data: data, 
        include: {
            organisations: { include: { organisation: true } }
        }
    })
    
    return new Response(toSuperuserJSON(superuser));
}