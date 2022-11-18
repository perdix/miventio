export async function GET() {
	const check = {
		message: 'Service is working!'
	};

	return new Response(JSON.stringify(check));
}
