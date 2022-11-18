import Spinner from '$lib/Spinner.svelte';
import { render } from '@testing-library/svelte';

import { describe, expect, it } from 'vitest';

describe('Spinner Test', () => {
	it('sample test which should be true', () => {
		const { container } = render(Spinner);
		expect(container).toBeTruthy();
		expect(container.innerHTML).toContain('spin');
	});
});
