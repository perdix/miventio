import { redirect } from '@sveltejs/kit';


export async function load(request) {

	
	if (!('session' in request.locals)) {
		throw redirect(307, '/login');
	}


	return {
        session: request.locals.session
    };
}
