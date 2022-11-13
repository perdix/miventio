import { readable } from 'svelte/store';

export const visitorStatuses = readable(['ANGEMELDET', 'ABGEMELDET', 'EINGECHECKT']);
export const bookingStatuses = readable(['GEBUCHT', 'BEZAHLT', 'STORNIERT']);
export const visitorTypes = readable(['Teilnehmer', 'Mitarbeiter', 'Aussteller', 'Lieferant']);
