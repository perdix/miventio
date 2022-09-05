/** @type {import('./$types').LayoutLoad} */

export function load() {
    return {
      sections: [
        { slug: 'contacts', title: 'Kontakte' },
        { slug: 'events', title: 'Veranstaltungen' }
      ]
    };
  }