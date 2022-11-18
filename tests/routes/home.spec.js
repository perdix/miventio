import { afterAll, beforeAll, describe, test } from 'vitest';
import { preview } from 'vite';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';

describe('basic', async () => {
	let server;
	let browser;
	let page;

	beforeAll(async () => {
		server = await preview({ preview: { port: 3000 } });
		browser = await chromium.launch();
		page = await browser.newPage();
	});

	afterAll(async () => {
		await browser.close();
		await new Promise((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()));
		});
	});

	test('should have the correct title', async () => {
		await page.goto('http://localhost:3000');
		const h1 = page.locator('h1');
		await expect(h1).toBeDefined();
		await expect(h1).toHaveText('Prototyp Miventio');
	}, 60_000);
});
