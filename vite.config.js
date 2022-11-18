import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['devalue']
	},
	test: {
		environment: 'jsdom'
		// globals: true
	}
};

export default config;
