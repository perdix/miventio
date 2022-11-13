import { readable } from 'svelte/store';

export const visitStatuses = readable(['ANGEMELDET', 'STORNIERT', 'BEZAHLT', 'BESUCHT']);

export const bookingStatuses = readable(['ZAHLUNG OFFEN', 'BEZAHLT', 'STORNIERT']);
