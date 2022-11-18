import Spinner from '$lib/Spinner.svelte';

describe('Spinner Component', () => {
	test('should render the component', () => {
		// Create a new container for the test
		const host = document.createElement('div');
		// Append the new container in the HTML body
		document.body.appendChild(host);
		// Create an instance of the vertical tab
		const instance = new Spinner({ target: host });
		// Check if the instance has value
		expect(instance).toBeTruthy();
		// Test if we can find the class .spin
		expect(host.innerHTML).toContain('spin');
	});
});
