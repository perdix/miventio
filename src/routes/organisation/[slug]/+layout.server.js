export async function load(request) {

	if (!request.locals.session) {
		return {
			status: 302,
			message: 'You must be logged in to view this page',
			redirect: '/login'
		};
	}

	return {
        session: request.locals.session
    };
}
