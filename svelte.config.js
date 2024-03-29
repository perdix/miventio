//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		//adapter: adapter()
		adapter: adapter({ out: 'build' }),
		env: {
			dir: process.cwd(),
			publicPrefix: 'PUBLIC_',
		}
	}
};

export default config;
